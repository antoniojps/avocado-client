const textsPT = {
  required: 'Este campo é obrigatório.',
  company: {
    length: 'O nome da empresa deve ter, pelo menos, 2 caracteres.',
    string: 'O nome da empresa é inválido.',
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
  role: {
    length: 'A role deve ter, pelo menos, 2 caracteres.',
    string: 'A role nome é inválida.',
  },
}

const textsEN = {
  required: 'This field is required.',
  company: {
    length: 'The Company name must have, at least, 2 characters.',
    string: 'The Company name is invalid',
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
  role: {
    length: 'Role must have, at least, 2 characters.',
    string: 'Role is invalid',
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
