import { Card, CardHeader, Grid, Link, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

const Clients = () => {
  const [clients, setClients] = useState([])
  const [success, setSuccess] = useState(false)
  const [successMsg, setSuccessMsg] = useState(false)

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

  const handleDeleteUser = async userId => {
    const response = await fetch(`/api/delete/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const deleteRes = await response.json()
    console.log('Delete response >> ', deleteRes)
    await loadClients()
    setSuccess(true)
    setSuccessMsg(deleteRes.msg)
    setTimeout(() => setSuccess(false), 3000)
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
    
    /*     { key: 'actions', label: 'Actions', size: '170' }
     */
  ]

  return (
    <Grid container spacing={6} style={{ backgroundColor: 'rgb(253, 253, 253)' }}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='#'>Liste des Clients</Link>
        </Typography>
        <Typography variant='body2'>Tous les clients inscrits</Typography>
      </Grid>
      {success ? <div className='successMsg'>{successMsg}</div> : ''}

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Clients' titleTypographyProps={{ variant: 'h6' }} />
          <TableStickyHeader columns={columns} rows={clients} handleDeleteUser={handleDeleteUser} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Clients
