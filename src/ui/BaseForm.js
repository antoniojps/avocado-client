import React from 'react';
import { Formik, Field } from 'formik';
import styled from 'styled-components'
import { Button } from 'elements'
import { texts } from 'utilities/validations'

export const inputTypes = {
  FIRST_NAME: 'FIRST_NAME',
  LAST_NAME: 'LAST_NAME',
  AGE: 'AGE',
  PHONE: 'PHONE',
  EMAIL: 'EMAIL',
  SUBDOMAIN: 'SUBDOMAIN',
  ADDRESS: 'ADDRESS',
  PASSWORD: 'PASSWORD',
  REPEAT_PASSWORD: 'REPEAT_PASSWORD',
}

const validate = (values, inputs, language) => {
  const errors = {};
  const {
    EMAIL, FIRST_NAME, LAST_NAME, PHONE, AGE, SUBDOMAIN, ADDRESS, PASSWORD, REPEAT_PASSWORD, SELECT,
  } = inputTypes
  const validations = texts(language);
  inputs.forEach(input => {
    if (input.validation) {
      if (input.required && !values[input.name]) {
        errors[input.name] = validations.required;
      }
      switch (input.name) {
      case FIRST_NAME:
        if (values[FIRST_NAME].length < 2) {
          errors[FIRST_NAME] = validations.firstName.length;
        }
        if (typeof values[FIRST_NAME] !== 'string' || /\d/.test(values[FIRST_NAME])) {
          errors[FIRST_NAME] = validations.lastName.string
        }
        break;
      case LAST_NAME:
        if (values[LAST_NAME].length < 2) {
          errors[LAST_NAME] = validations.lastName.length;
        }
        if (typeof values[LAST_NAME] !== 'string' || /\d/.test(values[LAST_NAME])) {
          errors[LAST_NAME] = validations.lastName.string;
        }
        break;
      case AGE:
        if (Number.isNaN(Number(values[AGE]))) {
          errors[AGE] = validations.age.number
        }
        if (values[AGE] <= 0 && Number(values[AGE])) {
          errors[AGE] = validations.age.positive
        }
        if (values[AGE] > 120 && Number(values[AGE])) {
          errors[AGE] = validations.age.maximum
        }
        break
      case PHONE:
        if (Number.isNaN(Number(values[PHONE]))) {
          errors[PHONE] = validations.phone.number
        }
        if (values[PHONE].length < 9) {
          errors[PHONE] = validations.phone.length
        }
        break
      case EMAIL:
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[EMAIL])) { errors[EMAIL] = validations.email.invalid }
        break
      case SUBDOMAIN:
        if (values[SUBDOMAIN].length > 10) {
          errors[SUBDOMAIN] = validations.subdomain.length
        }
        if (/[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/i.test(values[SUBDOMAIN])) { errors[SUBDOMAIN] = validations.subdomain.invalid }
        break
      case ADDRESS:
        break
      case PASSWORD:
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/i.test(values[PASSWORD])) { errors[PASSWORD] = validations.password.weak }
        break
      case REPEAT_PASSWORD:
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/i.test(values[REPEAT_PASSWORD])) { errors[REPEAT_PASSWORD] = validations.repeat_password.weak }
        if (values[PASSWORD] && values[PASSWORD] !== values[REPEAT_PASSWORD]) { errors[REPEAT_PASSWORD] = validations.repeat_password.different }
        break
      case SELECT:
        if (values[SELECT] === 0) { errors[SELECT] = validations.select.empty }
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
    language,
  },
  className,
}) => {
  const initialValues = {};
  inputs.forEach(input => { initialValues[input.type] = input.initialValue });
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => onSubmit(values, actions)}
      validate={(values) => validate(values, inputs, language)}
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
