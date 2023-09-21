import { Card, CardHeader, Grid, Link, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

const Accounts = () => {
  const [accounts, setAccounts] = useState([])

  const loadAccounts = async () => {
    const response = await fetch('/api/accounts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const accounts = await response.json()
    console.log('Accounts response >> ', accounts)

    setAccounts(accounts)
  }

  useEffect(() => {
    const fetchData = async () => {
      await loadAccounts()
    }
    fetchData()
  }, [])

  const columns = [
    { key: 'code', label: 'Code', size: '170' },
    { key: 'owner', label: 'Propriétaire', size: '170' },
    { key: 'balance', label: 'Solde', size: '170' },
    { key: 'type', label: 'Type', size: '170' },
    { key: 'status', label: 'Statut', size: '170' }
  ]

  return (
    <Grid container spacing={6} style={{ backgroundColor: 'rgb(253, 253, 253)' }}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='#'>Liste des Comptes</Link>
        </Typography>
        <Typography variant='body2'>Tous les comptes</Typography>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Comptes' titleTypographyProps={{ variant: 'h6' }} />
          <TableStickyHeader tableName={'accounts'} columns={columns} rows={accounts} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Accounts
