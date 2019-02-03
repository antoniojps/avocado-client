import React, { Component } from 'react'
import { Button, Title } from 'elements'
import { BaseFormInput, BaseFormSelect, BaseLoader } from 'ui'
import BaseForm, { inputTypes } from 'ui/BaseForm';
import { fetch } from 'utilities/requests'
import PropTypes from 'prop-types'
import withUnits from './withUnits'

class UnitCreateFrom extends Component {
  constructor(props) {
    super(props);
    const { types } = this.props;
    this.state = {
      options: types,
    }
  }

  async componentDidMount() {
    const { options } = this.state;
    if (!options) {
      const { data: { data: options } } = await fetch({ url: 'unittype' });
      this.setState({ options })
    }
  }

  componentWillUpdate(nextProps) {
    const { onSubmit } = this.props;
    if (nextProps.closeModal) onSubmit();
  }

  renderSubmitButton = () => {
    const { isPostLoading, isPutLoading, type } = this.props;
    if (!isPostLoading && !isPutLoading) return <Button type="submit" modifiers="primary">Submit Unit</Button>
    return (
      <BaseLoader message={type === 'Add' ? 'Adding unit....' : 'Editing unit....'} />
    )
  }

  renderInput = ({ field, form: { touched, errors }, ...props }) => (
    <BaseFormInput
      {...field}
      {...props}
      type={props.type}
      touched={touched[field.name]}
      error={errors[field.name]}
    />
  );

  renderSelectInput = ({ field, form: { touched, errors }, ...props }) => {
    const { options } = this.state;
    if (options) {
      return (
        <BaseFormSelect
          {...field}
          {...props}
          type={props.type}
          touched={touched[field.name]}
          error={errors[field.name]}
          options={[{ id: 0, value: 'Select type', selected: true }, ...options.map(({ id, name }) => ({ id, value: name }))]}
          initial={0}
        />
      )
    }
    return null
  }

  onSubmit = ({ UNIT_NAME, TEXTAREA, SELECT }) => {
    const {
      postUnit, type, unit, putUnit,
    } = this.props;
    if (type === 'Add') {
      postUnit({
        name: UNIT_NAME,
        description: TEXTAREA,
        unit_type_id: +SELECT === 0 ? null : SELECT,
      })
    } else {
      putUnit({
        id: unit.id,
        name: UNIT_NAME,
        description: TEXTAREA,
        unit_type_id: +SELECT === 0 ? null : SELECT,
      })
    }
  }

  render() {
    const {
      UNIT_NAME, TEXTAREA, SELECT,
    } = inputTypes
    const { unit } = this.props
    const { isPostLoading, type } = this.props;
    const form = {
      name: 'Tenant edit form',
      language: 'en-us',
      onSubmit: (values, actions) => !isPostLoading && this.onSubmit(values, actions),
      inputs: [
        {
          id: UNIT_NAME,
          name: UNIT_NAME,
          type: UNIT_NAME,
          initialValue: unit ? unit.name : '',
          validation: true,
          required: true,
          placeholder: 'Unit name',
          label: 'Unit name',
          component: this.renderInput,
        },
        {
          id: TEXTAREA,
          name: TEXTAREA,
          type: TEXTAREA,
          initialValue: unit ? unit.description : '',
          validation: true,
          required: false,
          placeholder: 'Description',
          label: 'Description',
          component: this.renderInput,
        },
        {
          id: SELECT,
          name: SELECT,
          type: SELECT,
          initialValue: unit && unit.type ? unit.type.id : 0,
          validation: true,
          required: true,
          placeholder: 'Type',
          label: 'Type',
          component: this.renderSelectInput,
        },
      ],
      submitButton: this.renderSubmitButton(),
    }

    return (
      <>
        <Title>{`${type} unit`}</Title>
        <BaseForm form={form} />
      </>
    );
  }
}

UnitCreateFrom.propTypes = {
  isPutLoading: PropTypes.bool.isRequired,
  isPostLoading: PropTypes.bool.isRequired,
  unit: PropTypes.shape({}),
  postUnit: PropTypes.func.isRequired,
  putUnit: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['Add', 'Edit']),
  closeModal: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  types: PropTypes.arrayOf(PropTypes.shape({})),
}

UnitCreateFrom.defaultProps = {
  unit: null,
  type: 'Add',
  types: null,
}

export default withUnits(UnitCreateFrom)
