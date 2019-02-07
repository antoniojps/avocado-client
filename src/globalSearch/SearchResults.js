import React from 'react'
import { Link } from 'react-router-dom'
import { Title } from 'elements'

const renderList = (data, title, reddirect) => (
  <div>
    <Title modifiers={['small', 'noMargin']}>
      {title}
    </Title>
    <div style={{ marginBottom: '10px' }}>
      {data.map(row => (
        <div>
          <Link key={row.id} to={reddirect}>{row.name}</Link>
        </div>
      ))}

    </div>

  </div>
)
const SearchResults = ({ data: { users, resources, units }, currentSearch }) => (
  <>
    {users && users.length > 0 && renderList(users, 'Team members:', `team?search=${currentSearch}`)}
    {resources && resources.length > 0 && renderList(resources, 'Resources:', `resources?search=${currentSearch}`)}
    {units && units.length > 0 && renderList(units, 'Units:', `units?search=${currentSearch}`)}
  </>
)

export default SearchResults
