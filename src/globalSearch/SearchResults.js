import React from 'react'

const renderList = (data, title) => (
  <div>
    <div>{title}</div>
    {data.map(row => (
      <div key={row.id}>{row.name}</div>
    ))}
  </div>
)
const SearchResults = ({ data: { users, resources, units } }) => (
  <>
    {users && users.length > 0 && renderList(users, 'Team members:')}
    {resources && resources.length > 0 && renderList(resources, 'Resources:')}
    {units && units.length > 0 && renderList(units, 'Units:')}
  </>
)

export default SearchResults
