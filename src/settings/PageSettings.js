import React, { Component } from 'react'
import { BasePage } from 'ui'
import { Title, P, Button } from 'elements'
import FormTenant from './FormTenant';

export default class PageSettings extends Component {
  render() {
    return (
      <BasePage
        page={{
          title: 'Settings',
        }}
      >
        <Title>
          Workspace preferences
        </Title>
        <FormTenant />
      </BasePage>
    )
  }
}
