import React, { Component } from 'react'
import { Button } from 'elements'
import { BaseFormInput, BaseFormSelect, BaseLoader } from 'ui'
import BaseForm, { inputTypes } from 'ui/BaseForm';
import { fetch } from 'utilities/requests'
import PropTypes from 'prop-types'
import withResources from './withResources'

class ResourceCreateFrom extends Component {
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
      const { data: { data: options } } = await fetch({ url: 'resourcetype' });
      this.setState({ options })
    }
  }

  componentWillUpdate(nextProps) {
    const { onSubmit } = this.props;
    if (nextProps.closeModal) onSubmit();
  }

  renderSubmitButton = () => {
    const { isPostLoading, isPutLoading, type } = this.props;
    if (!isPostLoading && !isPutLoading) return <Button type="submit" modifiers="primary">Submit Resource</Button>
    return (
      <BaseLoader message={type === 'Add' ? 'Adding resource....' : 'Editing resource....'} />
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
          autoComplete="username"
          touched={touched[field.name]}
          error={errors[field.name]}
          options={[{ id: 0, value: 'Select type', selected: true }, ...options.map(({ id, name }) => ({ id, value: name }))]}
          initial={0}
        />
      )
    }
    return null
  }

  onSubmit = ({ RESOURCE_NAME, TEXTAREA, SELECT }) => {
    const {
      postResource, type, resource, putResource,
    } = this.props;
    if (type === 'Add') {
      postResource({
        name: RESOURCE_NAME,
        description: TEXTAREA,
        resource_type_id: +SELECT === 0 ? null : SELECT,
      })
    } else {
      putResource({
        id: resource.id,
        name: RESOURCE_NAME,
        description: TEXTAREA,
        resource_type_id: +SELECT === 0 ? null : SELECT,
      })
    }
  }

  render() {
    const {
      RESOURCE_NAME, TEXTAREA, SELECT,
    } = inputTypes
    const { resource } = this.props
    const { isPostLoading } = this.props;
    const form = {
      name: 'Tenant edit form',
      language: 'en-us',
      onSubmit: (values, actions) => !isPostLoading && this.onSubmit(values, actions),
      inputs: [
        {
          id: RESOURCE_NAME,
          name: RESOURCE_NAME,
          type: RESOURCE_NAME,
          initialValue: resource ? resource.name : '',
          validation: true,
          required: true,
          placeholder: 'Resource name',
          label: 'Resource name',
          component: this.renderInput,
        },
        {
          id: TEXTAREA,
          name: TEXTAREA,
          type: TEXTAREA,
          initialValue: resource ? resource.description : '',
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
          initialValue: resource && resource.type ? resource.type.id : 0,
          validation: true,
          required: true,
          placeholder: 'Type',
          label: 'Type',
          component: this.renderSelectInput,
        },
      ],
      submitButton: this.renderSubmitButton(),
    }

    return <BaseForm form={form} />;
  }
}

ResourceCreateFrom.propTypes = {
  isPutLoading: PropTypes.bool.isRequired,
  isPostLoading: PropTypes.bool.isRequired,
  resource: PropTypes.shape({}),
  postResource: PropTypes.func.isRequired,
  putResource: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['Add', 'Edit']),
  closeModal: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  types: PropTypes.arrayOf(PropTypes.shape({})),
}

ResourceCreateFrom.defaultProps = {
  resource: null,
  type: 'Add',
  types: null,
}

export default withResources(ResourceCreateFrom)
