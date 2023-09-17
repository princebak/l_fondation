import { Card, CardHeader, Grid, Link, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

const Clients = () => {
  const [clients, setClients] = useState([])

  const loadClients = async () => {
    const response = await fetch('/api/clients', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const clients = await response.json()
    console.log('User response >> ', clients)

    setClients(clients)
  }

  useEffect(() => {
    const fetchData = async () => {
      await loadClients()
    }
    fetchData()
  }, [])

  const columns = [
    { key: 'code', label: 'Code', size: '170' },
    { key: 'fullName', label: 'Nom complet', size: '170' },
    { key: 'email', label: 'E-mail', size: '170' },
    { key: 'phone', label: 'Téléphone', size: '170' }
  ]

  return (
    <Grid container spacing={6} style={{ backgroundColor: 'rgb(253, 253, 253)' }}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='https://mui.com/components/tables/' target='_blank'>
            Liste des Clients
          </Link>
        </Typography>
        <Typography variant='body2'>Tous les clients inscrits</Typography>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Clients' titleTypographyProps={{ variant: 'h6' }} />
          <TableStickyHeader columns={columns} rows={clients} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Clients
