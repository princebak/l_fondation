import { Card, CardHeader, Grid, Link, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Loader from 'src/@core/components/Loader'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import { TableSearch } from 'mdi-material-ui'
import { Search } from '@mui/icons-material'
import SearchZone from 'src/@core/components/SearchZone'

const Clients = () => {
  const [clients, setClients] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [totElements, setTotalElements] = useState(0)
  const [pageLimit, setPageLimit] = useState()
  const [success, setSuccess] = useState(false)
  const [successMsg, setSuccessMsg] = useState(false)
  const [loading, setLoading] = useState(false)

  const { data: session } = useSession()
  const user = session?.user

  const loadClients = async (currentPage = 1) => {
    setLoading(true)

    const response = await fetch(`/api/clients?page=${currentPage}&search=${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const responseData = await response.json()
    console.log('ResponseData >> ', responseData)

    setClients(responseData.content)

    // setPage(responseData.currentPage)
    setTotalElements(responseData.totalElements)
    setPageLimit(responseData.pageLimit)

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

  const handleChangePage = async page => {
    if (totElements != 0) {
      const totalPages = totElements / pageLimit
      const currentPage = page < 1 ? 1 : page > totalPages ? totalPages : page
      setPage(Math.ceil(currentPage))
    } else {
      setPage(page)
    }
    await loadClients(page)
  }

  const handleFilter = async () => {
    setPage(1)
    await loadClients()
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
          <div
            style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center'}}
          >
            <CardHeader title='Clients' titleTypographyProps={{ variant: 'h6' }} />

            <SearchZone search={search} setSearch={setSearch} handleFilter={handleFilter} />
          </div>

          {!loading ? (
            <TableStickyHeader
              columns={columns}
              rows={clients}
              userType={user?.type}
              handleValidateUser={handleValidateUser}
              page={page}
              totElements={totElements}
              pageLimit={pageLimit}
              handleChangePage={handleChangePage}
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
