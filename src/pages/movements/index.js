import { Card, CardHeader, Grid, Link, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

const Movements = () => {
  const [movements, setMovements] = useState([])

  const loadMovements = async () => {
    const response = await fetch('/api/movements', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const movements = await response.json()
    console.log('User response >> ', movements)

    setMovements(movements)
  }

  useEffect(() => {
    const fetchData = async () => {
      await loadMovements()
    }
    fetchData()
  }, [])

  const columns = [
    { key: 'code', label: 'Code', size: '170' },
    { key: 'type', label: 'Type', size: '170' },
    { key: 'amount', label: 'Montant', size: '170' },
    { key: 'currency', label: 'Monaie', size: '170' },
    { key: 'sourceAccount', label: 'Compte Expéditeur', size: '170' },
    { key: 'sender', label: 'Expéditeur', size: '170' },
    { key: 'receivers', label: 'Bénéficiaire(s)', size: '170' },
    { key: 'status', label: 'Téléphone', size: '170' }
  ]

  return (
    <Grid container spacing={6} style={{ backgroundColor: 'rgb(253, 253, 253)' }}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='#'>Liste des Mouvements</Link>
        </Typography>
        <Typography variant='body2'>Tous les mouvements inscrits</Typography>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Movements' titleTypographyProps={{ variant: 'h6' }} />
          <TableStickyHeader tableName={'movements'} columns={columns} rows={movements} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Movements
