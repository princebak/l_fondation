import { Card, CardHeader, Grid, Link, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Loader from 'src/@core/components/Loader'
import SearchZone from 'src/@core/components/SearchZone'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

const Movements = () => {
  const [movements, setMovements] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [totElements, setTotalElements] = useState(0)
  const [pageLimit, setPageLimit] = useState()

  const loadMovements = async (currentPage = 1) => {
    setLoading(true)

    const response = await fetch(`/api/movements?page=${currentPage}&search=${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const responseData = await response.json()

    console.log('responseData >> ', responseData)

    setMovements(responseData.content)
    setTotalElements(responseData.totalElements)
    setPageLimit(responseData.pageLimit)

    setLoading(false)
  }

  const handleChangePage = async currentPage => {
    if (totElements != 0) {
      const totalPages = totElements / pageLimit
      const currentPageOk = currentPage < 1 ? 1 : currentPage > totalPages ? totalPages : currentPage
      setPage(Math.ceil(currentPageOk))
    } else {
      setPage(currentPage)
    }
    await loadMovements(currentPage)
  }

  const handleFilter = async () => {
    setPage(1)
    await loadMovements()
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
    { key: 'status', label: 'Status', size: '170' }
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
            <CardHeader title='Movements' titleTypographyProps={{ variant: 'h6' }} />

            <SearchZone search={search} setSearch={setSearch} handleFilter={handleFilter} />
          </div>
          {!loading ? (
            <TableStickyHeader
              tableName={'movements'}
              columns={columns}
              rows={movements}
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

export default Movements
