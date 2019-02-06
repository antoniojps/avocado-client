import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Formik, Field } from 'formik';
import styled from 'styled-components'
import { Button } from 'elements'
import { texts } from 'utilities/validations'
import { queryDomainAlreadyExists } from 'utilities'

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
  COMPANY: 'COMPANY',
  TEXTAREA: 'TEXTAREA',
  SELECT: 'SELECT',
  SELECT_MULTIPLE: 'SELECT_MULTIPLE',
  FILE: 'FILE',
  ROLE: 'ROLE',
  RESOURCE_NAME: 'RESOURCE_NAME',
  UNIT_NAME: 'UNIT_NAME',
  EVENT_NAME: 'EVENT_NAME',
}

class Form extends Component {
  state = {
    workspace: null,
    workspaceFailure: false,
  }

  // not working properly
  // debouncedValidate = debounce(({ values, inputs, language }) => this.validate(values, inputs, language), 300, {
  //   leading: true,
  //   trailing: false,
  // })
  debouncedValidate = ({ values, inputs, language }) => this.validate(values, inputs, language);

  validate = async (values, inputs, language) => {
    // in order to allow validations to be made asynchronously
    // the generateInputError returns a promise which resolves into an "error object"
    // what the code below does is reduce the array of error objects into a single errors object
    // when there are errors we throw them and formik catches them

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
      EMAIL, FIRST_NAME, LAST_NAME, PHONE, AGE, SUBDOMAIN, ADDRESS, PASSWORD, REPEAT_PASSWORD, SELECT, SELECT_MULTIPLE, COMPANY, TEXTAREA, ROLE, RESOURCE_NAME, UNIT_NAME, EVENT_NAME,
    } = inputTypes
    const validations = texts(language)
    const { workspace, workspaceFailure } = this.state

    if (input.validation) {
      if (input.required && !values[input.name]) {
        return validations.required;
      }
      switch (input.name) {
      case ROLE:
        if (values[ROLE].length < 2) {
          return validations.role.length;
        }
        if (typeof values[ROLE] !== 'string' || /\d/.test(values[ROLE])) {
          return validations.role.string
        }
        break;
      case COMPANY:
        if (values[COMPANY].length < 2) {
          return validations.company.length;
        }
        if (typeof values[COMPANY] !== 'string' || /\d/.test(values[COMPANY])) {
          return validations.company.string
        }
        break;
      case RESOURCE_NAME:
        if (values[RESOURCE_NAME].length < 2) {
          return validations.resource_name.length;
        }
        if (typeof values[RESOURCE_NAME] !== 'string' || /\d/.test(values[RESOURCE_NAME])) {
          return validations.resource_name.string
        }
        break;
      case UNIT_NAME:
        if (values[UNIT_NAME].length < 2) {
          return validations.resource_name.length;
        }
        if (typeof values[UNIT_NAME] !== 'string' || /\d/.test(values[UNIT_NAME])) {
          return validations.resource_name.string
        }
        break;
      case EVENT_NAME:
        if (values[EVENT_NAME].length < 2) {
          return validations.resource_name.length;
        }
        if (typeof values[EVENT_NAME] !== 'string' || /\d/.test(values[EVENT_NAME])) {
          return validations.resource_name.string
        }
        break;
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

        // formik always validates every input
        // this way the request is only done when necessary
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
      case SELECT_MULTIPLE:
        console.log('validating', values[SELECT_MULTIPLE]);
        if (values[SELECT_MULTIPLE].length < 1) { return validations.select.empty }
        break
      case TEXTAREA:
        if (values[TEXTAREA].length > 500) {
          return validations.textarea.length;
        }
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
        extraFields,
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
            {extraFields && extraFields}
            {inputs.map(({
              id, type, name, placeholder, component, label, options, isMulti, gridArea, touchedEnv,
            }) => (
              <div key={id} style={{ gridArea }}>
                {component && type
                  ? <Field type={type} name={name} options={options} label={label} isMulti={isMulti} placeholder={placeholder} touchedEnv={touchedEnv} component={component} />
                  : <Field type={type} name={name} label={label} placeholder={placeholder} />
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
