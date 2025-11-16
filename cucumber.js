module.exports = {
  default: {
    require: ['features/step_definitions/**/*.js'],
    format: ['progress', 'json:cucumber-report.json'],
    formatOptions: { snippetInterface: 'async-await' }
  }
}
