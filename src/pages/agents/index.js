import { Button, Card, CardHeader, Grid, Link, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MyModal, { AddAgentModal } from 'src/utils/Modal'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

const Agents = () => {
  const [agents, setAgents] = useState([])
  const [openModal, setOpenModal] = useState(false)

  const reset = async () => {
    setOpenModal(false)
    await loadAgents()
  }

  const loadAgents = async () => {
    const response = await fetch('/api/agents', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const agents = await response.json()
    console.log('User response >> ', agents)

    setAgents(agents)
  }

  useEffect(() => {
    const fetchData = async () => {
      await loadAgents()
    }
    fetchData()
  }, [])

  const columns = [
    { key: 'fullName', label: 'Nom complet', size: '170' },
    { key: 'email', label: 'E-mail', size: '170' },
    { key: 'phone', label: 'Téléphone', size: '170' }
  ]

  return (
    <Grid container spacing={6} style={{ backgroundColor: 'rgb(253, 253, 253)' }}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='#' target='_blank'>
            Liste des Agents
          </Link>
        </Typography>
        <Typography variant='body2'>Tous les agents enregistrés</Typography>
      </Grid>

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
          <TableStickyHeader columns={columns} rows={agents} />
        </Card>
      </Grid>
      {openModal ? <AddAgentModal reset={reset} /> : ''}
    </Grid>
  )
}

export default Agents
