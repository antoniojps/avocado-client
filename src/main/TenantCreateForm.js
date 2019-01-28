import React, { Component } from 'react';
import Form, { inputTypes } from 'ui/BaseForm';

class App extends Component {
  onSubmit = (values, actions) => {
    console.log('onSubmit');
  }

  renderSubmitButton = (props) => (
    <button type="submit">Submit</button>
  )

  render() {
    const CustomInputComponent = ({
      field, // { name, value, onChange, onBlur }
      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
      ...props
    }) => (
      <div>
        <input type="text" {...field} {...props} />
        {touched[field.name]
            && errors[field.name] && <div className="error">{errors[field.name]}</div>}
      </div>
    );

    const {
      EMAIL, FIRST_NAME, LAST_NAME, PHONE, AGE, SUBDOMAIN,
    } = inputTypes

    const form = {
      name: 'Test form',
      onSubmit: (values, actions) => this.onSubmit(values, actions),
      inputs: [
        {
          id: 1,
          name: EMAIL,
          type: EMAIL,
          initialValue: '',
          validation: true,
          required: true,
          placeholder: 'E-mail',
          component: CustomInputComponent,
        },
        {
          id: 2,
          name: FIRST_NAME,
          type: FIRST_NAME,
          initialValue: '',
          validation: true,
          required: true,
          placeholder: 'Primeiro nome',
          component: CustomInputComponent,
        },
        {
          id: 3,
          name: LAST_NAME,
          type: LAST_NAME,
          initialValue: '',
          validation: true,
          required: true,
          placeholder: 'Último nome',
          component: CustomInputComponent,
        },
        {
          id: 4,
          name: PHONE,
          type: PHONE,
          initialValue: '',
          validation: true,
          required: false,
          placeholder: 'Número de telefone',
          component: CustomInputComponent,
        },
        {
          id: 5,
          name: AGE,
          type: AGE,
          initialValue: '',
          validation: true,
          required: true,
          placeholder: 'Idade',
          component: CustomInputComponent,
        },
        {
          id: 6,
          name: SUBDOMAIN,
          type: SUBDOMAIN,
          initialValue: '',
          validation: true,
          required: true,
          placeholder: 'Subdomínio',
          component: CustomInputComponent,
        },
      ],
      // submitButton: this.renderSubmitButton()
    }

    return (
      <>
        <Form form={form} />
      </>
    );
  }
}

export default App;
