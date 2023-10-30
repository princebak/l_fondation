import { Search } from '@mui/icons-material'
import { CardHeader } from '@mui/material'
import React from 'react'

const SearchZone = ({ search, setSearch, handleFilter }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type='text'
        style={{
          height: 'fit-content',
          flex: 1,
          padding: '4px'
        }}
        placeholder='valeur de recherche'
        onChange={e => setSearch(e.target.value)}
        value={search}
      />
      <button style={{ marginRight: '8px' }} onClick={() => handleFilter()}>
        <Search style={{ height: '19px' }} />
      </button>
    </div>
  )
}

export default SearchZone
