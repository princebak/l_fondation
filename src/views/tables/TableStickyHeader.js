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

const TableStickyHeader = ({ tableName, columns, rows }) => {
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

  if (!rows || rows?.length === 0) {
    return <h1>Pas de données</h1>
  } else {
    return (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='Clients'>
            <TableHead>
              <TableRow>
                {columns.map(col => (
                  <TableCell key={col.key} sx={{ minWidth: col.size }}>
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableName === 'accounts'
                ? rows.map(account => {
                    return (
                      <TableRow hover role='checkbox' tabIndex={-1} key={account._id}>
                        <TableCell key={account.code}>{account.code}</TableCell>
                        <TableCell key={account.owner}>{account.owner?.fullName}</TableCell>
                        <TableCell key={account.balance}>{account.balance}</TableCell>
                        <TableCell key={account.type}>{account.type}</TableCell>
                        <TableCell key={account.status}>{account.status}</TableCell>
                      </TableRow>
                    )
                  })
                : tableName === 'movements'
                ? rows.map(movement => {
                    return (
                      <TableRow hover role='checkbox' tabIndex={-1} key={client._id}>
                        <TableCell key={movement.code}>{movement.code}</TableCell>
                        <TableCell key={movement.type}>{movement.fullName}</TableCell>
                        <TableCell key={movement.amount}>{movement.email}</TableCell>
                        <TableCell key={movement.currency}>{movement.phone}</TableCell>
                        <TableCell key={movement.sourceAccount._id}>{movement.sourceAccount.code}</TableCell>
                        <TableCell key={movement.sender._id}>{movement.sender.fullName}</TableCell>
                        <TableCell key={movement.destinationAccount._id}>{movement.destinationAccount.code}</TableCell>
                        <TableCell key={movement.receiver._id}>{movement.receiver.fullName}</TableCell>
                        <TableCell key={movement.status}>{movement.status}</TableCell>
                      </TableRow>
                    )
                  })
                : rows.map(account => {
                    return (
                      <TableRow hover role='checkbox' tabIndex={-1} key={account._id}>
                        <TableCell key={account.code}>{account.code}</TableCell>
                        <TableCell key={account.owner}>{account.owner?.fullName}</TableCell>
                        <TableCell key={account.balance}>{account.balance}</TableCell>
                        <TableCell key={account.type}>{account.type}</TableCell>
                        <TableCell key={account.status}>{account.status}</TableCell>
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
        <h3>Total : {rows.length}</h3>
      </Paper>
    )
  }
}

export default TableStickyHeader
