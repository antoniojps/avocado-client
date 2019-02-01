
import React, { Component } from 'react'
import styled from 'styled-components'
import TenantEditForm from 'main/TenantEditForm'


export default class FormTenant extends Component {
  render() {
    return (
      <Form>
        <TenantEditForm />
      </Form>
    )
  }
}

const Form = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
