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
import Link from 'next/link'
import { MEMBER } from 'src/utils/constant'

const TableStickyHeader = ({ tableName, columns, rows, addReceiverAccount, handleValidateUser, userType }) => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  console.log('DATA >> ', { userType })

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
                {columns.map(col =>
                  col.key ? (
                    <TableCell key={col.key} sx={{ minWidth: col.size }}>
                      {col.label}
                    </TableCell>
                  ) : (
                    ''
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody id='accountsTable'>
              {tableName === 'accounts'
                ? rows.map(account => {
                    return (
                      <TableRow hover role='checkbox' tabIndex={-1} key={account._id}>
                        <TableCell key={account._id}>
                          <input
                            className='checkbox'
                            type='checkbox'
                            id={account.code}
                            onClick={e => addReceiverAccount(account.code, e.target.checked)}
                          />
                        </TableCell>
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
                      <TableRow hover role='checkbox' tabIndex={-1} key={movement._id}>
                        <TableCell key={movement.code}>{movement.code}</TableCell>
                        <TableCell key={movement.type}>{movement.type}</TableCell>
                        <TableCell key={movement.amount}>{movement.amount}</TableCell>
                        <TableCell key={movement.currency}>{movement.currency}</TableCell>
                        <TableCell key={movement.sourceAccount?._id}>{movement?.sourceAccount?.code}</TableCell>
                        <TableCell key={movement.sourceAccount?.owner?._id}>
                          {movement.sourceAccount?.owner?.fullName}
                        </TableCell>
                        <TableCell key={movement.type}>{movement.type === 'Recharge' ? 'Agents' : 'Clients'}</TableCell>
                        <TableCell key={movement.status}>{movement.status}</TableCell>
                      </TableRow>
                    )
                  })
                : rows.map(user => {
                    return (
                      <TableRow hover role='checkbox' tabIndex={-1} key={user._id}>
                        <TableCell key={user.code}>{user.code}</TableCell>
                        <TableCell key={user.fullName}>{user.fullName}</TableCell>
                        <TableCell key={user.email + '2023'}>{user.email}</TableCell>
                        <TableCell key={user.phone}>{user.phone}</TableCell>
                        <TableCell key={user.code + '2023'}>
                          {!user.passportPicUrl ? (
                            'pas de documents soumis'
                          ) : (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <a href={user.passportPicUrl} passHref target='_blank' rel='noreferrer'>
                                photo passeport
                              </a>
                              <a href={user.identityCardUrl} passHref target='_blank' rel='noreferrer'>
                                carte d'identité
                              </a>
                            </div>
                          )}
                        </TableCell>
                        <TableCell key={user.status}>{user.status}</TableCell>

                        {'admin super admin'.includes(userType) ? (
                          <TableCell key={'actions'}>
                            {user.status != MEMBER ? (
                              <Link href={'#'} passHref>
                                <span
                                  style={{ color: 'blue' }}
                                  onClick={async e => await handleValidateUser(e, user._id)}
                                >
                                  Valider
                                </span>
                              </Link>
                            ) : (
                              <span>{''}</span>
                            )}
                          </TableCell>
                        ) : (
                          ''
                        )}
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
