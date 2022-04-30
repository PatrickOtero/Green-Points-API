const yup = require('../schemasConfig')

const editCompanySchema = yup.object().shape({
  company_name: yup.string().required("O campo 'nome' é obrigatório").trim(),
  company_description: yup
    .string()
    .required("O campo 'descrição' é obrigatório")
    .trim(),
  company_cnpj: yup
    .string()
    .required("O campo 'CNPJ' é obrigatório")
    .min(18, 'Por favor, insira um CNPJ válido com 14 caracteres!')
    .max(18, 'Por favor, insira um CNPJ válido com 14 caracteres!')
    .trim(),
  company_email: yup.string().required("O campo 'e-mail' é obrigatório").trim(),
  company_password: yup
    .string()
    .min(5, 'Senha muito curta. Insira ao menos 5 caracteres')
    .trim(),
})

module.exports = {
  editCompanySchema,
}
