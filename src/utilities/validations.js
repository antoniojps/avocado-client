const textsPT = {
  required: 'Este campo é obrigatório.',
  company: {
    length: 'O nome da empresa deve ter, pelo menos, 2 caracteres.',
    string: 'O nome da empresa é inválido.',
  },
  resource_name: {
    length: 'O nome do recurso deve ter, pelo menos, 2 caracteres.',
    string: 'O nome do recurso é inválido.',
  },
  unit_name: {
    length: 'O nome da unidade deve ter, pelo menos, 2 caracteres.',
    string: 'O nome da unidade é inválido.',
  },
  role: {
    length: 'O nome da role deve ter, pelo menos, 2 caracteres.',
    string: 'O nome da role é inválido.',
  },
  firstName: {
    length: 'O primeiro nome deve ter, pelo menos, 2 caracteres.',
    string: 'O primeiro nome é inválido.',
  },
  lastName: {
    length: 'O último nome deve ter, pelo menos, 2 caracteres.',
    string: 'O último é inválido.',
  },
  age: {
    number: 'A idade deve ser um número.',
    positive: 'A idade deve ser positiva.',
    maximum: 'A idade deve ser inferior a 120 anos.',
  },
  phone: {
    number: 'O contacto telefónico é invalido.',
    length: 'O contacto telefónico deve ter, pelo menos 9 números.',
  },
  email: {
    invalid: 'O endereço de e-mail inválido.',
  },
  subdomain: {
    length: 'O subdomínio só pode ter 10 caracteres.',
    invalid: 'O Subdomínio é inválido.',
  },
  address: {},
  password: {
    weak: 'A password é fraca.',
  },
  repeat_password: {
    weak: 'A password é fraca.',
    different: 'As passwords devem ser iguais.',
  },
  select: {
    empty: 'Tem de selecionar um valor.',
  },
  textarea: {
    length: 'A descrição só pode ter um máximo de 200 caracteres.',
  },
}

const textsEN = {
  required: 'This field is required.',
  company: {
    length: 'The Company name must have, at least, 2 characters.',
    string: 'The Company name is invalid',
  },
  resource_name: {
    length: 'The Resource name must have, at least, 2 characters.',
    string: 'The Resource name is invalid',
  },
  unit_name: {
    length: 'The Unit name must have, at least, 2 characters.',
    string: 'The Unit name is invalid',
  },
  role: {
    length: 'The Role name must have, at least, 2 characters.',
    string: 'The Role name is invalid',
  },
  firstName: {
    length: 'The first name must have, at least, 2 characters.',
    string: 'The first name is invalid',
  },
  lastName: {
    length: 'The last name must have, at least, 2 characters.',
    string: 'The last name is invalid.',
  },
  age: {
    number: 'The age must be a number.',
    positive: 'The age must be positive.',
    maximum: 'The age must be under 120.',
  },
  phone: {
    number: 'The phone number is invalid',
    length: 'The phone number must have, at least 9 numbers.',
  },
  email: {
    invalid: 'The e-mail is invalid.',
  },
  subdomain: {
    length: 'The subdomain must have 10 characters maximum.',
    invalid: 'The subdomain is invalid.',
  },
  address: {},
  password: {
    weak: 'The password is weak.',
  },
  repeat_password: {
    weak: 'The password is weak.',
    different: 'The passwords must be the same.',
  },
  select: {
    empty: 'You must select one value.',
  },
  textarea: {
    length: 'The description must have 500 characters maximum.',
  },
}

export const texts = (language) => {
  switch (language) {
  case 'pt-pt':
    return textsPT;
  case 'en-us':
    return textsEN;
  default:
    return textsEN;
  }
}
