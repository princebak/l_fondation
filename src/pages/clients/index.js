import { Card, CardHeader, Grid, Link, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

const Clients = () => {
  const [clients, setClients] = useState([])

  const loadClients = async () => {
    const response = await fetch('/api/users', {
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

  return (
    <Grid container spacing={6} style={{ backgroundColor: 'rgb(253, 253, 253)' }}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='https://mui.com/components/tables/' target='_blank'>
            Utilisateur inscrits
          </Link>
        </Typography>
        <Typography variant='body2'>Tous les utilisateurs inscrits</Typography>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Sticky Header' titleTypographyProps={{ variant: 'h6' }} />
          <TableStickyHeader clients={clients} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Clients
