import Movement from 'src/models/Movement'
import { dbConnector } from 'src/utils/dbConnector'
import Account from 'src/models/Account'
import { generateMovementCode } from 'src/utils/codeGenerator'
import mongoose from 'mongoose'
import { PAGE_LIMIT } from 'src/utils/constant'

export default async function handler(req, res) {
  console.log('API METHOD', req.method)
  const { page, search } = req.query

  if (req.method == 'GET') {
    await dbConnector()
    const limit = PAGE_LIMIT

    try {
      const movements = await Movement.find().populate([
        { path: 'sourceAccount', populate: { path: 'owner' } },
        { path: 'destinationAccounts', populate: { path: 'owner' } }
      ])

      // Filters
      const filteredMovements = movements.filter(movement => {
        const {
          code,
          type,
          amount,
          currency,
          sourceAccount: {
            code: saCode,
            owner: { fullName }
          },
          status
        } = movement

        const slimMovement = {
          code,
          type,
          amount,
          currency,
          sourceAccount: {
            code: saCode,
            owner: { fullName }
          },
          status
        }
        const regExp = new RegExp(search)
        const myJSON = JSON.stringify(slimMovement)

        return regExp.test(myJSON)
      })

      const totalPages = Math.ceil(filteredMovements.length / limit)

      // Sorting
      filteredMovements.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

      // Pagination
      const pageNumber = Number.parseInt(page)

      const currentPage = pageNumber < 1 ? 1 : pageNumber > totalPages ? totalPages : pageNumber

      const startIndex = (currentPage - 1) * limit
      let movementsByPage = []

      let index = startIndex
      while (index >= 0 && index < filteredMovements.length) {
        movementsByPage.push(filteredMovements[index])
        index++
        if (movementsByPage.length === limit) {
          break
        }
      }

      res.status(200).json({
        content: movementsByPage,
        totalElements: filteredMovements.length,
        pageLimit: limit,
        currentPage: pageNumber
      })
    } catch (error) {
      console.log('movements error >> ', error)
      res.status(500).json({ error: error })
    }
  } else if (req.method == 'POST') {
    const { senderAccountCode, receiverAccountCodes, amount, movementType } = req.body
    console.log('Recharge Request >> ', { senderAccountCode, receiverAccountCodes, amount, movementType })
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
      const destinationMovementsIds = await Account.find({ code: { $in: receiverAccountCodes } }, '_id')

      const movement = new Movement({
        code: await generateMovementCode(movementType.substring(0, 3).toUpperCase()),
        type: movementType,
        amount: totalAmount,
        sourceAccount: senderAccount._id,
        destinationMovements: destinationMovementsIds,
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
