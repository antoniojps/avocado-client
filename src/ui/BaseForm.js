import React from 'react';
import { Formik, Field } from 'formik';
import styled from 'styled-components'
import { Button } from 'elements'

export const inputTypes = {
  FIRST_NAME: 'FIRST_NAME',
  LAST_NAME: 'LAST_NAME',
  AGE: 'AGE',
  PHONE: 'PHONE',
  EMAIL: 'EMAIL',
  SUBDOMAIN: 'SUBDOMAIN',
  ADDRESS: 'ADDRESS',
}

const validate = (values, inputs) => {
  const errors = {};
  const {
    EMAIL, FIRST_NAME, LAST_NAME, PHONE, AGE, SUBDOMAIN, ADDRESS,
  } = inputTypes

  inputs.forEach(input => {
    if (input.validation) {
      if (input.required && !values[input.name]) {
        errors[input.name] = 'Required'
      }
      switch (input.name) {
      case FIRST_NAME:
        if (values[FIRST_NAME].length < 2) {
          errors[FIRST_NAME] = 'O primeiro nome deve ter, pelo menos, 2 caracteres.'
        }
        if (typeof values[FIRST_NAME] !== 'string' || /\d/.test(values[FIRST_NAME])) {
          errors[FIRST_NAME] = 'O primeiro nome é invalido.'
        }
        break;
      case LAST_NAME:
        if (values[LAST_NAME].length < 2) {
          errors[LAST_NAME] = 'O último nome deve ter, pelo menos, 2 caracteres.'
        }
        if (typeof values[LAST_NAME] !== 'string' || /\d/.test(values[LAST_NAME])) {
          errors[LAST_NAME] = 'O último nome é invalido.'
        }
        break;
      case AGE:
        if (Number.isNaN(values[AGE])) {
          errors[AGE] = 'A idade deve ser um número.'
        }
        if (values[AGE] <= 0 && Number(values[AGE])) {
          errors[AGE] = 'A idade deve ser positiva.'
        }
        if (values[AGE] > 120 && Number(values[AGE])) {
          errors[AGE] = 'A idade deve ser inferior a 120 anos.'
        }
        break
      case PHONE:
        if (Number.isNaN(values[PHONE])) {
          errors[PHONE] = 'O contacto telefónico é invalido.'
        }
        if (values[PHONE].length < 9) {
          errors[PHONE] = 'O contacto telefónico deve ter, pelo menos 9 números.'
        }
        break
      case EMAIL:
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[EMAIL])) { errors[EMAIL] = 'Endereço de e-mail inválido'; }
        break
      case SUBDOMAIN:
        if (values[SUBDOMAIN].length > 10) {
          errors[SUBDOMAIN] = 'O subdomínio só pode ter 10 caracteres.'
        }
        if (/[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/i.test(values[SUBDOMAIN])) { errors[SUBDOMAIN] = 'Subdomínio inválido'; }
        break
      case ADDRESS:
        break
      default:
        break
      }
    }
  })

  return errors;
}

const Form = ({
  form: {
    onSubmit,
    inputs,
    submitButton,
  },
  className,
}) => {
  const initialValues = {};
  inputs.forEach(input => { initialValues[input.type] = input.initialValue });
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => onSubmit(values, actions)}
      validate={(values) => validate(values, inputs)}
      render={(props) => (
        <form className={className} onSubmit={props.handleSubmit}>
          {inputs.map(({
            id, type, name, placeholder, component,
          }) => (
            <div key={id}>
              {component
                ? <Field type={type} name={name} placeholder={placeholder} component={component} />
                : <Field type={type} name={name} placeholder={placeholder} />
              }
            </div>
          ))}
          {submitButton || <Button type="submit" modifiers="primary">Submit</Button>
          }
        </form>
      )}
    />
  )
};

export default styled(Form)`
  width: 100%;
`
