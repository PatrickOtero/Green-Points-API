const individualPass =
  process.env.PASS_INDIVIDUAL || process.env.INDIVIDUAL_PASS
const companyPass = process.env.PASS_COMPANY || process.env.COMPANY_PASS

module.exports = {
  individualPass,
  companyPass,
}
