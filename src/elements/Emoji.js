import React from 'react'
import styled from 'styled-components'

const Emoji = ({ label = 'emoji', emoji, className }) => {
  return (
    <span className={className} role="img" aria-label={label}>
      {emoji}
    </span>
  )
}

export default styled(Emoji)`
  font-size: 10rem;
`