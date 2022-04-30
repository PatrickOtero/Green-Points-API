const yup = require('./schemasConfig')

const mainLoginSchema = yup.object().shape({
  user_type: yup
    .string()
    .required('É necessário escolher seu tipo de usuário.')
    .trim(),
})

const individualLoginSchema = yup.object().shape({
  individual_emailOrCpf: yup
    .string()
    .required("O campo 'email ou cpf' é obrigatório")
    .trim(),
  individual_password: yup
    .string()
    .required("O campo 'senha' é obrigatório")
    .trim(),
})

const companyLoginSchema = yup.object().shape({
  company_emailOrCnpj: yup
    .string()
    .required("O campo 'email ou cnpj' é obrigatório")
    .trim(),
  company_password: yup
    .string()
    .required("O campo 'senha' é obrigatório")
    .trim(),
})

module.exports = { mainLoginSchema, individualLoginSchema, companyLoginSchema }
