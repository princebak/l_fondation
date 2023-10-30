import { Search } from '@mui/icons-material'
import { Button, Card, CardHeader, Grid, Link, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Loader from 'src/@core/components/Loader'
import SearchZone from 'src/@core/components/SearchZone'
import { RechargeModal } from 'src/utils/Modal'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

const Accounts = () => {
  const [accounts, setAccounts] = useState([])

  const [openModal, setOpenModal] = useState(false)
  const [receiverAccounts, setReceiverAccounts] = useState([])
  const { data: session } = useSession()
  const [senderAccountCode, setSenderAccountCode] = useState('')
  const [senderAccountBalance, setSenderAccountBalance] = useState(0)
  const [movementType, setMovementType] = useState(null)
  const [selectAll, setSelectAll] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [totElements, setTotalElements] = useState(0)
  const [pageLimit, setPageLimit] = useState()

  const addReceiverAccount = (accountCode, isChecked) => {
    const receiverAccount = accounts.find(account => account.code == accountCode && account.code != senderAccountCode)
    if (receiverAccount) {
      const { code, balance, owner } = receiverAccount
      const existingReceiverAccount = receiverAccounts.find(account => account.code == code)
      if (!existingReceiverAccount) {
        setReceiverAccounts([...receiverAccounts, { code, balance, owner }])
      } else {
        if (!isChecked) {
          for (let index = 0; index < receiverAccounts.length; index++) {
            if (receiverAccounts[index].code == existingReceiverAccount.code) {
              receiverAccounts.splice(index, 1)
            }
          }
        }
      }
    }
  }

  const reset = async res => {
    setOpenModal(false)
    if (res === 'done') {
      setReceiverAccounts([])
      await loadAccounts()
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
  }

  const loadAccounts = async (currentPage = 1) => {
    setLoading(true)
    if (session) {
      const currentSender = session.user

      const path = currentSender.type === 'agent interne' ? '/clients' : ''

      console.log('currentSender >> ', currentSender)
      console.log('path >> ', path)

      const response = await fetch(`/api/accounts${path}?page=${currentPage}&search=${search}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      console.log('responseData.content >> ', responseData.content)
      setAccounts(responseData.content)

      setTotalElements(responseData.totalElements)
      setPageLimit(responseData.pageLimit)

      setSenderAccountCode(currentSender?.accounts[0].code) // The user will select the sending account when he will have many
      setSenderAccountBalance(currentSender?.accounts[0].balance)

      setMovementType(currentSender?.type === 'super admin' || currentSender?.type === 'admin' ? 'Recharge' : 'Dépôt')
    }
    setLoading(false)
  }

  const handleSelectAll = isChecked => {
    if (isChecked) {
      setSelectAll(true)
    } else {
      setSelectAll(false)
    }
  }

  const handleChangePage = async currentPage => {
    if (totElements != 0) {
      const totalPages = totElements / pageLimit
      const currentPageOk = currentPage < 1 ? 1 : currentPage > totalPages ? totalPages : currentPage
      setPage(Math.ceil(currentPageOk))
    } else {
      setPage(currentPage)
    }
    await loadAccounts(currentPage)
  }

  const handleFilter = async () => {
    setPage(1)
    await loadAccounts()
  }

  useEffect(() => {
    const fetchData = async () => {
      await loadAccounts()
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (selectAll) {
      const tableCheckBoxes = document.getElementsByClassName('checkbox')
      for (var i = 0; i < tableCheckBoxes.length; i++) {
        tableCheckBoxes[i].checked = true
        setReceiverAccounts(accounts.filter(account => account.code != senderAccountCode))
      }
    } else {
      const tableCheckBoxes = document.getElementsByClassName('checkbox')
      for (var i = 0; i < tableCheckBoxes.length; i++) {
        tableCheckBoxes[i].checked = false
        setReceiverAccounts([])
      }
    }
  }, [selectAll])

  const columns = [
    {
      key: 'select',
      label: (
        <label style={{ display: 'flex', alignItems: 'center' }}>
          <input type='checkbox' onClick={e => handleSelectAll(e.target.checked)} />
          Tout
        </label>
      ),
      size: '170'
    },
    { key: 'code', label: 'Code', size: '170' },
    { key: 'owner', label: 'Propriétaire', size: '170' },
    { key: 'balance', label: 'Solde(USD)', size: '170' },
    { key: 'type', label: 'Type', size: '170' },
    { key: 'status', label: 'Statut', size: '170' }
  ]

  return (
    <Grid container spacing={6} style={{ backgroundColor: 'rgb(253, 253, 253)' }}>
      <Grid item xs={12}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
          <Typography variant='h5'>
            <Link href='#'>Liste des Comptes</Link>
          </Typography>
        </div>

        <Typography variant='body2'>Tous les comptes</Typography>
      </Grid>
      {success ? <div className='successMsg'>Rechargement reusie. </div> : ''}

      <Grid item xs={12}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
            <CardHeader title='Comptes' titleTypographyProps={{ variant: 'h6' }} />
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type='text'
                  style={{
                    height: 'fit-content',
                    flex: 1,
                    padding: '4px'
                  }}
                  placeholder='valeur de recherche'
                  onChange={e => setSearch(e.target.value)}
                  value={search}
                />
                <button style={{ marginRight: '8px' }} onClick={() => handleFilter()}>
                  <Search style={{ height: '19px' }} />
                </button>
              </div>

              <Button
                size='medium'
                variant='contained'
                sx={{ height: 'fit-content', marginTop: '10px', marginRight: '10px' }}
                onClick={() => setOpenModal(true)}
              >
                Recharger
              </Button>
            </div>
          </div>
          {!loading ? (
            <TableStickyHeader
              tableName={'accounts'}
              columns={columns}
              rows={accounts}
              addReceiverAccount={addReceiverAccount}
              page={page}
              totElements={totElements}
              pageLimit={pageLimit}
              handleChangePage={handleChangePage}
            />
          ) : (
            <Loader />
          )}
        </Card>
        {openModal ? (
          <RechargeModal
            reset={reset}
            movementType={movementType}
            senderAccountCode={senderAccountCode}
            receiverAccounts={receiverAccounts}
            senderAccountBalance={senderAccountBalance}
          />
        ) : (
          ''
        )}
      </Grid>
    </Grid>
  )
}

export default Accounts
