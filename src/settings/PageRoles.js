import React, { Component } from 'react'
import { BasePage } from 'ui'
import { Title, P, Button } from 'elements'

export default class PageSettings extends Component {
  render() {
    return (
      <BasePage
        page={{
          title: 'Roles',
        }}
      >
        <Title>
          Roles
        </Title>
        <P>Recursos humanos teste</P>
      </BasePage>
    )
  }
}
