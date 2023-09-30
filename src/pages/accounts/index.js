import { Button, Card, CardHeader, Grid, Link, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { RechargeModal } from 'src/utils/Modal'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

const Accounts = () => {
  const [accounts, setAccounts] = useState([])
  const [allAccounts, setAllAccounts] = useState([])

  const [filterKey, setFilterKey] = useState('code')
  const [filterValue, setFilterValue] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [receiverAccounts, setReceiverAccounts] = useState([])
  const { data: session } = useSession()
  const [senderAccountCode, setSenderAccountCode] = useState('')
  const [senderAccountBalance, setSenderAccountBalance] = useState(0)
  const [movementType, setMovementType] = useState(null)
  const [sender, setSender] = useState(null)
  const [selectAll, setSelectAll] = useState(false)
  const [success, setSuccess] = useState(false)

  const router = useRouter()

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
      setFilterKey('')
      setFilterValue('')
      await loadAccounts()
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
  }

  const handleFilterValueChange = value => {
    setFilterValue(value)
    if (value.length > 2) {
      if (filterKey == 'code') {
        setAccounts(accounts.filter(account => account.code.toLowerCase().includes(value.toLowerCase())))
      } else if (filterKey == 'name') {
        setAccounts(accounts.filter(account => account.owner.fullName.toLowerCase().includes(value.toLowerCase())))
      } else if (filterKey == 'userType') {
        setAccounts(accounts.filter(account => account.owner.type.toLowerCase().includes(value.toLowerCase())))
      }
    } else {
      setAccounts(allAccounts)
    }
  }

  const loadAccounts = async () => {
    if (session) {
      const currentSender = session.user

      const path = currentSender.type === 'agent interne' ? '/clients' : ''

      const response = await fetch('/api/accounts' + path, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const loadedAccounts = await response.json()
      console.log('Accounts response >> ', loadedAccounts)

      setAccounts(loadedAccounts)
      setAllAccounts(loadedAccounts)

      setSender(currentSender)
      const senderAccount = loadedAccounts.filter(account => account?.owner?.code == currentSender?.code)[0]
      setSenderAccountCode(senderAccount?.code)
      setSenderAccountBalance(senderAccount?.balance)

      setMovementType(sender?.type === 'super admin' || sender?.type === 'admin' ? 'Recharge' : 'Dépôt')
    }

    /*  const senderCode = accounts.filter(account => account?.owner?.code == sender?.code)[0]?.code
    console.log('senderCode >> ', senderCode)
    setSenderAccountCode(senderCode)
    setMovementType(sender?.type === 'super admin' ? 'Recharge' : 'Depot') */
  }

  const handleSelectAll = isChecked => {
    if (isChecked) {
      setSelectAll(true)
    } else {
      setSelectAll(false)
    }
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
          <Button
            size='small'
            variant='contained'
            sx={{ height: 'fit-content', marginTop: '10px', marginRight: '10px' }}
            onClick={() => setOpenModal(true)}
          >
            Recharger
          </Button>
        </div>

        <Typography variant='body2'>Tous les comptes</Typography>
      </Grid>
      {success ? <div className='successMsg'>Rechargement reusie. </div> : ''}

      <Grid item xs={12}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
            <CardHeader title='Comptes' titleTypographyProps={{ variant: 'h6' }} />

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', alignItems: 'center' }}>
              <label>Filtrer par</label>
              <select
                style={{ height: 'fit-content', flex: 1, padding: '4px', marginRight: '5px' }}
                onChange={e => setFilterKey(e.target.value)}
                value={filterKey}
              >
                <option value='code'>Code</option>
                <option value='name'>Nom</option>
                <option value='userType'>Type d'utilisateur</option>
              </select>
              <input
                type='text'
                style={{ height: 'fit-content', flex: 1, padding: '4px', marginRight: '5px' }}
                placeholder='valeur'
                onChange={e => handleFilterValueChange(e.target.value)}
                value={filterValue}
              />
            </div>
          </div>
          <TableStickyHeader
            tableName={'accounts'}
            columns={columns}
            rows={accounts}
            addReceiverAccount={addReceiverAccount}
          />
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
