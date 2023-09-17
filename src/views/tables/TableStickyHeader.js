// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

const TableStickyHeader = ({ columns, rows }) => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  if (!rows) {
    return <h1>No data</h1>
  } else {
    return (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='Clients'>
            <TableHead>
              <TableRow>
                {columns.map(col => (
                  <TableCell key={col.key} sx={{ minWidth: col.size }}>
                    {col.value}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(client => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={client._id}>
                    <TableCell key={client.fullName}>{client.fullName}</TableCell>
                    <TableCell key={client.email}>{client.email}</TableCell>
                    <TableCell key={client.phone}>{client.phone}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
        <h1>Total : {rows.length}</h1>
      </Paper>
    )
  }
}

export default TableStickyHeader
