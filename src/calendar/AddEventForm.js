import React, { Component } from 'react'
import { BaseFormInput, BaseSelect, BaseDateTimePicker } from 'ui'
import { Title, Button } from 'elements'
import BaseForm, { inputTypes } from 'ui/BaseForm';
import styled from 'styled-components'
import { postEvent, putEvent, deleteEvent } from 'utilities/requests';
import { toast } from 'utilities'

class AddEventForm extends Component {
  constructor(props) {
    super(props)
    const { addStart, addEnd, selectedEvent } = this.props
    this.state = {
      addStart,
      addEnd,
      touched: false,
      isLoading: false,
      selectedEvent,
    }
  }

  renderSubmitButton = () => (
    <Button isLoading={this.state.isLoading} style={{ gridColumn: '1/3' }} onClick={this.toggleTouched} type="submit" modifiers="primary">{this.state.selectedEvent ? 'Edit Event' : 'Submit Event'}</Button>
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
  )

  renderDelete = id => <Button modifiers={['small', 'danger']} onClick={(e) => this.handleDelete(e, id)}>Delete</Button>

  handleDelete = async (e, id) => {
    e.preventDefault()
    const { onDelete } = this.props;
    try {
      await deleteEvent(id)
      toast.success('Event deleted')
    } catch (e) {
      toast.error('Error deleting event')
    }
    onDelete(id);
  }

  renderInputSelect = ({
    field, initialValue, form, form: { touched, errors }, options, touchedEnv, ...props
  }) => (
    <BaseSelect
      {...field}
      {...props}
      type={props.type}
      // touched={touched[field.name]}
      touchedEnv={touchedEnv}
      error={errors[field.name]}
      options={options}
      initialValue={initialValue}
      onChange={option => form.setFieldValue(field.name, option)}
      initial={[]}
    />
  )


  onChangeStart = addStart => this.setState({ addStart })

  onChangeEnd = addEnd => this.setState({ addEnd })

  renderExtraFields = (addStart, addEnd) => [
    (
      <div>
        <BaseDateTimePicker
          label="Date start"
          value={addStart}
          placeholder="Test"
          onChange={this.onChangeStart}
        />
      </div>
    ),
    (
      <div>
        <BaseDateTimePicker
          label="Date end"
          value={addEnd}
          placeholder="Test"
          onChange={this.onChangeEnd}
        />
      </div>),
  ]


  onSubmit = async ({
    EVENT_NAME, TEXTAREA, PERSON, RESOURCES, UNIT,
  }) => {
    const { addEnd, addStart, selectedEvent } = this.state
    this.setState({ touched: true })
    const { onSubmit } = this.props

    this.setState({
      isLoading: true,
    })
    try {
      let data
      if (selectedEvent && selectedEvent.id) {
        const { data: gotData } = await putEvent({
          ...selectedEvent,
          name: EVENT_NAME,
          description: TEXTAREA,
          start_date: addStart,
          end_date: addEnd,
          unit_id: UNIT ? UNIT.value : null,
          users: PERSON ? PERSON.map(person => person.value) : null,
          resources: RESOURCES ? RESOURCES.map(resource => resource.value) : null,
        })
        data = gotData;
      } else {
        const { data: gotData } = await postEvent({
          name: EVENT_NAME,
          description: TEXTAREA,
          start_date: addStart,
          end_date: addEnd,
          unit_id: UNIT ? UNIT.value : null,
          users: PERSON ? PERSON.map(person => person.value) : null,
          resources: RESOURCES ? RESOURCES.map(resource => resource.value) : null,

        })
        data = gotData;
      }

      this.setState({ isLoading: false })
      toast.success('Event added!')
      onSubmit(data, selectedEvent)
    } catch (e) {
      toast.error('Error adding event')
    }
  }


  render() {
    const { selectData: { resources, units, users } } = this.props
    const {
      addStart, addEnd, touched, selectedEvent,
    } = this.state;
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
          initialValue: selectedEvent ? selectedEvent.title : '',
          validation: true,
          // required: true,
          placeholder: 'Event name',
          label: 'Event name',
          component: this.renderInput,
        },
        {
          id: 'PERSON',
          name: 'PERSON',
          type: SELECT_MULTIPLE,
          initialValue: selectedEvent && selectedEvent.users ? selectedEvent.users.map(ev => ({ value: ev.id, label: ev.name })) : '',
          validation: true,
          // required: true,
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
          initialValue: (selectedEvent && selectedEvent.unit_id) ? { value: selectedEvent.unit_id.id, label: selectedEvent.unit_id.name } : '',
          validation: true,
          // required: true,
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
          initialValue: selectedEvent && selectedEvent.resources ? selectedEvent.resources.map(ev => ({ value: ev.id, label: ev.name })) : '',
          validation: true,
          // required: true,
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
          initialValue: selectedEvent ? selectedEvent.desc : '',
          validation: true,
          required: false,
          placeholder: 'Description',
          label: 'Description',
          component: this.renderInput,
          gridColumn: '1/3',
        },

      ],
      deleteButton: selectedEvent ? this.renderDelete(selectedEvent.id) : null,
      submitButton: this.renderSubmitButton(),
    }


    return (
      <>
        <Title>
          {this.state.selectedEvent ? 'Edit event' : 'Insert new event'}
        </Title>
        {this.renderExtraFields(addStart, addEnd)}
        <Form form={form} />

      </>
    )
  }
}

const Form = styled(BaseForm)`
  width: 100%;
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: 1fr 1fr;
`

export default AddEventForm
