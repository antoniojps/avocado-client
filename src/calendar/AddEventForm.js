import React, { Component } from 'react'
import { BaseFormInput, BaseSelect, BaseDateTimePicker } from 'ui'
import { Title, Button } from 'elements'
import BaseForm, { inputTypes } from 'ui/BaseForm';
import styled from 'styled-components'

class AddEventForm extends Component {
  constructor(props) {
    super(props)
    const { addStart, addEnd } = this.props
    this.state = {
      addStart,
      addEnd,
      touched: false,
    }
  }

  renderSubmitButton = () => (
    <div style={{ gridArea: 'btn' }}><Button onClick={this.toggleTouched} type="submit" modifiers="primary">Submit Event</Button></div>
  )

  toggleTouched = () => this.setState({ touched: true })

  renderInput = ({ field, form: { touched, errors }, ...props }) => (
    <BaseFormInput
      {...field}
      {...props}
      type={props.type}
      autoComplete="username"
      touched={touched[field.name]}
      error={errors[field.name]}
    />
  );

  renderInputSelect = ({
    field, form, form: { touched, errors }, options, touchedEnv, ...props
  }) => (
    <BaseSelect
      {...field}
      {...props}
      type={props.type}
      touched={touched[field.name]}
      touchedEnv={touchedEnv}
      error={errors[field.name]}
      options={options}
      onChange={option => form.setFieldValue(field.name, option)}
      initial={[]}
    />
  )


  onChangeStart = addStart => this.setState({ addStart })

  onChangeEnd = addEnd => this.setState({ addEnd })

  renderExtraFields = (addStart, addEnd) => (
    <>
      <div>
        <BaseDateTimePicker
          label="Date start"
          value={addStart}
          placeholder="Test"
          onChange={this.onChangeStart}
        />
      </div>
      <div>
        <BaseDateTimePicker
          label="Date end"
          value={addEnd}
          placeholder="Test"
          onChange={this.onChangeEnd}
        />
      </div>
    </>
  )


  onSubmit = (values) => {
    this.setState({ touched: true })
    console.group('Sumbit------->');
    const { addEnd, addStart } = this.state
    console.table({ ...values, addEnd, addStart })
    console.groupEnd('------------->');
  }


  render() {
    const { selectData: { resources, units, users } } = this.props
    const { addStart, addEnd, touched } = this.state;
    const usersOptions = users.map(({ id: value, name: label }) => ({ value, label }))
    const unitsOptions = units.map(({ id: value, name: label }) => ({ value, label }))
    const resourcesOptions = resources.map(({ id: value, name: label }) => ({ value, label }))

    const {
      EVENT_NAME, SELECT_MULTIPLE, TEXTAREA,
    } = inputTypes

    const form = {
      name: 'Tenant edit form',
      language: 'en-us',
      onSubmit: (values, actions) => this.onSubmit(values, actions),
      inputs: [
        {
          id: EVENT_NAME,
          name: EVENT_NAME,
          type: EVENT_NAME,
          initialValue: '',
          validation: true,
          required: true,
          placeholder: 'Event name',
          label: 'Event name',
          component: this.renderInput,
        },
        {
          id: 'PERSON',
          name: 'PERSON',
          type: SELECT_MULTIPLE,
          initialValue: '',
          validation: true,
          required: true,
          placeholder: 'Person',
          label: 'Person',
          touchedEnv: touched,
          isMulti: true,
          options: usersOptions,
          component: this.renderInputSelect,
        },
        {
          id: 'UNIT',
          name: 'UNIT',
          type: SELECT_MULTIPLE,
          initialValue: '',
          validation: true,
          required: true,
          placeholder: 'Unit',
          label: 'Unit',
          isMulti: false,
          touchedEnv: touched,
          options: unitsOptions,
          component: this.renderInputSelect,
        },
        {
          id: 'RESOURCES',
          name: 'RESOURCES',
          type: SELECT_MULTIPLE,
          initialValue: '',
          validation: true,
          required: true,
          touchedEnv: touched,
          placeholder: 'Resources',
          label: 'Resources',
          isMulti: true,
          options: resourcesOptions,
          component: this.renderInputSelect,
        },
        {
          id: TEXTAREA,
          name: TEXTAREA,
          type: TEXTAREA,
          initialValue: '',
          validation: true,
          required: false,
          placeholder: 'Description',
          label: 'Description',
          component: this.renderInput,
          gridArea: 'description',
        },

      ],
      extraFields: [
        this.renderExtraFields(addStart, addEnd),
      ],
      submitButton: this.renderSubmitButton(),
    }


    return (
      <>
        <Title>Insert new event</Title>
        <Form form={form} />
      </>
    )
  }
}

const Form = styled(BaseForm)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  grid-template-areas: 
    "start end" 
    "name person"
    "unit unit"
    "description description"
    "btn btn";
}
`

export default AddEventForm
