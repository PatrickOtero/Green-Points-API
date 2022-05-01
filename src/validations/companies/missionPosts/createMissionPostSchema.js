const yup = require('../../schemasConfig')

const createMissionPostSchema = yup.object().shape({
  mission_name: yup
    .string()
    .min(5, 'Por favor, insira um nome de pelo menos 5 caracteres')
    .max(50, 'Por favor, insira até 50 caracteres')
    .required("O campo 'nome' é obrigatório")
    .trim(),
  mission_title: yup
    .string()
    .min(10, 'Por favor, insira um título de pelo menos 10 caracteres')
    .max(100, 'Por favor, insira até 100 caracteres')
    .required("O campo 'título' é obrigatório")
    .trim(),
  mission_description: yup
    .string()
    .min(20, 'Por favor, insira uma descrição de pelo menos 20 caracteres')
    .max(1000, 'Por favor, insira até 1000 caracteres')
    .required("O campo 'descrição' é obrigatório")
    .trim(),
})

module.exports = {
  createMissionPostSchema,
}
