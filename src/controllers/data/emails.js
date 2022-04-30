const nodemailer = require('../../services/nodemailer/nodemailer')

const companyGreetingsEmail = (reqBody) => {
  const { company_name, company_email, company_cnpj } = reqBody

  const userName = company_name
  const firstInfo = 'CNPJ da empresa:'
  const secondInfo = 'E-mail da empresa:'
  const firstInfoContent = company_cnpj
  const secondInfoContent = company_email
  const sendData = {
    from: 'Time GreenPoints <nao-responder@greenpoints.com.br>',
    to: company_email,
    subject: 'Informações de cadastro',
    template: 'notification',
    context: {
      firstInfoContent,
      secondInfoContent,
      userName,
      firstInfo,
      secondInfo,
    },
  }
  nodemailer.sendMail(sendData)
}

const individualGreetingsEmail = (reqBody) => {
  const { individual_name, individual_email, individual_cpf } = reqBody

  const userName = individual_name
  const firstInfo = 'CPF do usuário:'
  const secondInfo = 'E-mail do usuário:'
  const firstInfoContent = individual_cpf
  const secondInfoContent = individual_email
  const sendData = {
    from: 'Time GreenPoints <nao-responder@greenpoints.com.br>',
    to: individual_email,
    subject: 'Informações de cadastro',
    template: 'notification',
    context: {
      firstInfoContent,
      secondInfoContent,
      userName,
      firstInfo,
      secondInfo,
    },
  }
  nodemailer.sendMail(sendData)
}

module.exports = { companyGreetingsEmail, individualGreetingsEmail }
