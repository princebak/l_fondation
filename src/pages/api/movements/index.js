import Movement from 'src/models/Movement'
import { dbConnector } from 'src/utils/dbConnector'
import Account from 'src/models/Account'
import { generateMovementCode } from 'src/utils/codeGenerator'
import mongoose from 'mongoose'

export default async function handler(req, res) {
  console.log('API METHOD', req.method)

  if (req.method == 'GET') {
    await dbConnector()

    try {
      const movements = await Movement.find().populate([
        { path: 'sourceAccount', populate: { path: 'owner' } },
        { path: 'destinationAccounts', populate: { path: 'owner' } }
      ])

      res.status(200).json(movements)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  } else if (req.method == 'POST') {
    const { senderAccountCode, receiverAccountCodes, amount, movementType } = req.body

    if (receiverAccountCodes.length < 1) {
      res.status(404).json({ error: 'Vous devez selectionnez au moins un comptes bénéficiaire.' })
    }

    await dbConnector()

    const totalAmount = receiverAccountCodes.length * amount
    console.log('totalAmount >> ', totalAmount)
    const senderAccount = await Account.findOne({ code: senderAccountCode })
    console.log('senderAccount >> ', senderAccount)

    if (!senderAccount || senderAccount.balance < totalAmount) {
      console.log('Balance error')
      res.status(404).json({
        error:
          "Le compte de l'expediteur n'existe pas ou il a un solde inferieur au montant total a transferer, qui est de " +
          totalAmount +
          '' +
          senderAccount?.currency
      })

      return
    }

    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      console.log('Balance ok')

      const newSenderAccountBalance = senderAccount.balance - totalAmount
      console.log('newSenderAccountBalance >> ', newSenderAccountBalance)
      await Account.findOneAndUpdate({ _id: senderAccount._id }, { balance: newSenderAccountBalance })

      receiverAccountCodes.map(async receiverAccountCode => {
        const receiverAccount = await Account.findOne({ code: receiverAccountCode }, 'balance')
        const newBalance = Number.parseFloat(receiverAccount.balance) + amount
        await Account.findOneAndUpdate({ code: receiverAccountCode }, { balance: newBalance })
      })
      const destinationAccountsIds = await Account.find({ code: { $in: receiverAccountCodes } }, '_id')

      const movement = new Movement({
        code: await generateMovementCode(movementType.substring(0, 3).toUpperCase()),
        type: movementType,
        amount: totalAmount,
        sourceAccount: senderAccount._id,
        destinationAccounts: destinationAccountsIds,
        note: `${amount} ${senderAccount.currency} par compte bénéficiaire`
      })

      const savedMovement = await movement.save()

      await session.commitTransaction()

      res.status(200).json(savedMovement)
    } catch (error) {
      await session.abortTransaction()
      console.log('Error >> ', error)
      res.status(500).json({ error })
    }
  } else {
    return res.status(400).json({ error: 'This API call only accepts GET and POST method.' })
  }
}
