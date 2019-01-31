import React, { Component } from 'react'
import { BasePage } from 'ui'
import { Title, P, Button } from 'elements'

export default class PageResources extends Component {
  handleClick = () => alert('add resource')

  render() {
    return (
      <BasePage
        page={{
          title: 'Resources',
        }}
        sideHeader={(
          <Button modifiers={['primary']} onClick={this.handleClick}>Add resource</Button>
        )}
      >
        <Title>
          Recursos humanos
        </Title>
        <P>Recursos humanos teste</P>
      </BasePage>
    )
  }
}
