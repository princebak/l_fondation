import Account from 'src/models/Account'
import Movement from 'src/models/Movement'
import { RECHARGE } from 'src/utils/constant'
import { dbConnector } from 'src/utils/dbConnector'
import { DEPOSIT, TRANSFER, WITHDRAW } from 'src/utils/movementType'

export default async function handler(req, res) {
  console.log('API METHOD', req.method)

  if (req.method == 'GET') {
    const { userId } = req.query

    const dashboardData = {
      accountCode: '',
      balance: 0,
      totalSent: 0,
      totalReceived: 0,
      sevenLastRecharges: [],
      sevenLastDeposits: [],
      sevenLastWithdraws: [],
      sevenLastTransfers: []
    }

    await dbConnector()

    try {
      const userAccount = await Account.findOne({ owner: userId })
      dashboardData.accountCode = userAccount.code
      dashboardData.balance = userAccount.balance
      const userAccountId = userAccount._id

      const setMovementCategory = move => {
        if (move.sourceAccount.toString() === userAccountId.toString()) {
          return { ...move._doc, category: 'OUT' }
        }

        if (move.destinationAccounts.includes(userAccountId)) {
          return { ...move._doc, category: 'IN' }
        }
      }

      const userMovements = await Movement.find({
        $or: [{ sourceAccount: userAccountId }, { destinationAccounts: { $all: [userAccountId] } }]
      })

      userMovements.map(movement => {
        if (movement.sourceAccount.toString() === userAccountId.toString()) {
          dashboardData.totalSent = dashboardData.totalSent + movement.amount
        }
        if (movement.destinationAccounts.includes(userAccountId)) {
          dashboardData.totalReceived = dashboardData.totalReceived + movement.amount
        }
      })

      userMovements.sort((a, b) => Number(b.date) - Number(a.date))

      dashboardData.sevenLastRecharges = userMovements
        .filter(movement => movement.type === RECHARGE)
        .slice(0, 7)
        .map(movement => setMovementCategory(movement))
      dashboardData.sevenLastDeposits = userMovements
        .filter(movement => movement.type === DEPOSIT || movement.type === 'Depot')
        .slice(0, 7)
        .map(movement => setMovementCategory(movement))

      dashboardData.sevenLastWithdraws = userMovements
        .filter(movement => movement.type === WITHDRAW)
        .slice(0, 7)
        .map(movement => setMovementCategory(movement))

      dashboardData.sevenLastTransfers = userMovements
        .filter(movement => movement.type === TRANSFER)
        .slice(0, 7)
        .map(movement => setMovementCategory(movement))

      res.status(200).json(dashboardData)
    } catch (error) {
      console.log('Error >> ', error)

      res.status(500).json({ error: error })
    }
  } else {
    return res.status(400).json({ error: 'This API call only accepts GET method.' })
  }
}

/*
0. receive user code
1. find user account ok
2. find movements when user is sender or receiver ok?

  solde => compte.balance ok
  total envoyE = movements when user is sender ok
  total recu = movements when user is receiver ok
  7 dernier recharges = last 7 movements of type recharge
  7 dernier depots = last 7 movements of type depot
  7 dernier retraits = last 7 movements of type retrait
  7 dernier transfert = last 7 movements of type transfert
*/
