import { Card, CardHeader, Grid, Link, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Loader from 'src/@core/components/Loader'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

const Clients = () => {
  const [clients, setClients] = useState([])
  const [success, setSuccess] = useState(false)
  const [successMsg, setSuccessMsg] = useState(false)
  const [loading, setLoading] = useState(false)

  const { data: session } = useSession()
  const user = session?.user

  const loadClients = async () => {
    setLoading(true)

    const response = await fetch('/api/clients', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const clients = await response.json()
    console.log('User response >> ', clients)

    setClients(clients)

    setLoading(false)
  }

  const handleValidateUser = async (e, userId) => {
    e.preventDefault()

    const response = await fetch(`/api/validate/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const validateRes = await response.json()
    console.log('Validate response >> ', validateRes)
    await loadClients()
    setSuccess(true)
    setSuccessMsg(validateRes.msg)
    setTimeout(() => setSuccess(false), 3000)
  }

  useEffect(() => {
    const fetchData = async () => {
      await loadClients()
    }
    fetchData()
  }, [])

  const actionsColumn = 'admin super admin'.includes(user?.type)
    ? { key: 'actions', label: 'Actions', size: '170' }
    : {}

  const columns = [
    { key: 'code', label: 'Code', size: '170' },
    { key: 'fullName', label: 'Nom complet', size: '170' },
    { key: 'email', label: 'E-mail', size: '170' },
    { key: 'phone', label: 'Téléphone', size: '170' },
    { key: 'doc', label: 'Documents', size: '170' },
    { key: 'status', label: 'Statut', size: '170' },
    actionsColumn
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
          {!loading ? (
            <TableStickyHeader
              columns={columns}
              rows={clients}
              handleValidateUser={handleValidateUser}
              userType={user?.type}
            />
          ) : (
            <Loader />
          )}
        </Card>
      </Grid>
    </Grid>
  )
}

export default Clients
