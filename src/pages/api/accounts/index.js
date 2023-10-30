import Account from 'src/models/Account'
import { PAGE_LIMIT } from 'src/utils/constant'
import { dbConnector } from 'src/utils/dbConnector'

export default async function handler(req, res) {
  console.log('API METHOD', req.method)
  const { page, search } = req.query

  console.log('{ page, search }', { page, search })
  if (req.method == 'GET') {
    await dbConnector()

    try {
      const limit = PAGE_LIMIT

      const accounts = await Account.find().populate('owner')

      // Filters
      const filteredAccounts = accounts.filter(account => {
        const {
          code,
          balance,
          currency,
          owner: { fullName, email, type: ownerType },
          type,
          status
        } = account

        const slimAccount = {
          code,
          balance,
          currency,
          owner: { fullName, email, type: ownerType },
          type,
          status
        }
        const regExp = new RegExp(search)
        const myJSON = JSON.stringify(slimAccount)

        return regExp.test(myJSON)
      })

      const totalPages = Math.ceil(filteredAccounts.length / limit)

      // Sorting
      filteredAccounts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

      // Pagination
      const pageNumber = Number.parseInt(page)

      const currentPage = pageNumber < 1 ? 1 : pageNumber > totalPages ? totalPages : pageNumber

      const startIndex = (currentPage - 1) * limit
      let accountsByPage = []

      let index = startIndex
      while (index >= 0 && index < filteredAccounts.length) {
        accountsByPage.push(filteredAccounts[index])
        index++
        if (accountsByPage.length === limit) {
          break
        }
      }

      res.status(200).json({
        content: accountsByPage,
        totalElements: filteredAccounts.length,
        pageLimit: limit,
        currentPage: pageNumber
      })
    } catch (error) {
      console.log('Error >> ', error)
      res.status(500).json({ error })
    }
  } else {
    res.status(400).json({ error: 'This API call only accepts GET method.' })
  }
}
