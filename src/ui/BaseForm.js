import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Formik, Field } from 'formik';
import styled from 'styled-components'
import { Button } from 'elements'
import { texts } from 'utilities/validations'
import { queryDomainAlreadyExists } from 'utilities'
import { debounce } from 'lodash'

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

class Form extends Component {
  state = {
    workspace: null,
    workspaceFailure: false,
  }

  debouncedValidate = debounce(({ values, inputs, language }) => this.validate(values, inputs, language), 300, {
    leading: true,
    trailing: false,
  })

  validate = async (values, inputs, language) => {
    // in order to allow validations to be made asynchronously
    // the generateInputError returns a promise
    // what the code below does is map the result result of this promises into an array
    // this array of error objects is then reduced into a single errors object
    // that gets thrown when there are errors and is interpreted by formik

    const errorsArray = await Promise.all(inputs.map(async input => ({
      name: input.name,
      message: await this.generateInputError({ input, values, language }),
    })))

    const reduceErrorsArrayToObject = (previousErrors, error) => {
      if (error.message) {
        return {
          ...previousErrors,
          [error.name]: error.message,
        }
      }
      return previousErrors
    }
    const errors = errorsArray.reduce(reduceErrorsArrayToObject, {})

    // only throw errors when they exist :D
    if (Object.keys(errors).length > 0) throw errors
  }

  generateInputError = async ({ input, values, language }) => {
    const {
      EMAIL, FIRST_NAME, LAST_NAME, PHONE, AGE, SUBDOMAIN, ADDRESS, PASSWORD, REPEAT_PASSWORD, SELECT,
    } = inputTypes
    const validations = texts(language)
    const { workspace, workspaceFailure } = this.state

    if (input.validation) {
      if (input.required && !values[input.name]) {
        return validations.required;
      }
      switch (input.name) {
      case FIRST_NAME:
        if (values[FIRST_NAME].length < 2) {
          return validations.firstName.length;
        }
        if (typeof values[FIRST_NAME] !== 'string' || /\d/.test(values[FIRST_NAME])) {
          return validations.lastName.string
        }
        break;
      case LAST_NAME:
        if (values[LAST_NAME].length < 2) {
          return validations.lastName.length;
        }
        if (typeof values[LAST_NAME] !== 'string' || /\d/.test(values[LAST_NAME])) {
          return validations.lastName.string;
        }
        break;
      case AGE:
        if (Number.isNaN(Number(values[AGE]))) {
          return validations.age.number
        }
        if (values[AGE] <= 0 && Number(values[AGE])) {
          return validations.age.positive
        }
        if (values[AGE] > 120 && Number(values[AGE])) {
          return validations.age.maximum
        }
        break
      case PHONE:
        if (Number.isNaN(Number(values[PHONE]))) {
          return validations.phone.number
        }
        if (values[PHONE].length < 9) {
          return validations.phone.length
        }
        break
      case EMAIL:
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[EMAIL])) { return validations.email.invalid }
        break
      case SUBDOMAIN:
        if (values[SUBDOMAIN].length > 10) {
          return validations.subdomain.length
        }
        if (/[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/i.test(values[SUBDOMAIN])) {
          return validations.subdomain.invalid
        }

        // formik validates always validates every input
        // this way the request to check if the domain already exists is only done when necessary
        if (workspace !== values[SUBDOMAIN]) {
          try {
            await queryDomainAlreadyExists(values[SUBDOMAIN])
            this.setState(() => ({
              workspace: values[SUBDOMAIN],
              workspaceFailure: false,
            }))
          } catch (e) {
            this.setState(() => ({ workspace: values[SUBDOMAIN], workspaceFailure: true }))
            return 'Domain already exists'
          }
        } else if (workspaceFailure) return 'Domain already exists'
        break
      case ADDRESS:
        break
      case PASSWORD:
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/i.test(values[PASSWORD])) { return validations.password.weak }
        break
      case REPEAT_PASSWORD:
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/i.test(values[REPEAT_PASSWORD])) { return validations.repeat_password.weak }
        if (values[PASSWORD] && values[PASSWORD] !== values[REPEAT_PASSWORD]) { return validations.repeat_password.different }
        break
      case SELECT:
        if (values[SELECT] === 0) { return validations.select.empty }
        break
      default:
        break
      }
    }
    return null
  }

  render() {
    const {
      form: {
        onSubmit,
        inputs,
        submitButton,
        language,
      },
      className,
    } = this.props

    const initialValues = {};
    inputs.forEach(input => { initialValues[input.type] = input.initialValue });
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => onSubmit(values, actions)}
        validate={(values) => this.debouncedValidate({ values, inputs, language })}
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
            {submitButton || <Button type="submit" modifiers="primary">Submit</Button>}
          </form>
        )}
      />
    )
  }
}

Form.propTypes = {
  form: PropTypes.shape({
    onSubmit: PropTypes.func,
    inputs: PropTypes.arrayOf(PropTypes.shape({})),
    submitButton: PropTypes.node,
    language: PropTypes.oneOf(['pt-pt', 'en-us']),
  }).isRequired,
  className: PropTypes.string,
}

Form.defaultProps = {
  className: '',
}

export default styled(Form)`
  width: 100%;
`
