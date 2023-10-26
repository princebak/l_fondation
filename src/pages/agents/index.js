import { Button, Card, CardHeader, Grid, Link, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Loader from 'src/@core/components/Loader'
import { AddAgentModal } from 'src/utils/Modal'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

const Agents = () => {
  const [agents, setAgents] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [success, setSuccess] = useState(false)
  const [successMsg, setSuccessMsg] = useState(false)
  const [loading, setLoading] = useState(false)

  const { data: session } = useSession()
  const user = session?.user

  const reset = async res => {
    setOpenModal(false)
    if (res !== null && !res.error) {
      await loadAgents()
      setSuccess(true)
      setSuccessMsg(res.msg)
      setTimeout(() => setSuccess(false), 3000)
    }
  }

  const loadAgents = async () => {
    setLoading(true)

    const response = await fetch('/api/agents', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const agents = await response.json()
    console.log('User response >> ', agents)

    setAgents(agents)

    setLoading(false)
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
    await loadAgents()
    setSuccess(true)
    setSuccessMsg(deleteRes.msg)
    setTimeout(() => setSuccess(false), 3000)
  }

  useEffect(() => {
    const fetchData = async () => {
      await loadAgents()
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
          <Link href='#'>Liste des Agents</Link>
        </Typography>
        <Typography variant='body2'>Tous les agents enregistrés</Typography>
      </Grid>
      {success ? <div className='successMsg'>{successMsg}</div> : ''}
      <Grid item xs={12}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
            <CardHeader title='Agents' titleTypographyProps={{ variant: 'h6' }} />
            <Button
              size='large'
              variant='contained'
              sx={{ height: 'fit-content', marginTop: '10px', marginRight: '10px' }}
              onClick={() => setOpenModal(true)}
            >
              Ajouter
            </Button>
          </div>
          {!loading ? (
            <TableStickyHeader
              columns={columns}
              rows={agents}
              handleDeleteUser={handleDeleteUser}
              userType={user?.type}
            />
          ) : (
            <Loader />
          )}
        </Card>
      </Grid>
      {openModal ? <AddAgentModal reset={reset} /> : ''}
    </Grid>
  )
}

export default Agents
