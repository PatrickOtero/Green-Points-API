const yup = require('../schemasConfig')

const editIndividualSchema = yup.object().shape({
  individual_name: yup.string().required("O campo 'nome' é obrigatório").trim(),
  individual_cpf: yup
    .string()
    .min(14, 'Por favor, insira um cpf válido')
    .max(14, 'Por favor, insira um cpf válido')
    .required("O campo 'CPF' é obrigatório"),
  individual_email: yup
    .string()
    .email('Por favor, insira um e-mail em um formato válido')
    .required("O campo 'email' é obrigatório")
    .trim(),
  individual_password: yup
    .string()
    .min(5, 'Senha muito curta. Insira ao menos 5 caracteres')
    .trim(),
})

module.exports = {
  editIndividualSchema,
}
