import logger from "../modules/logger"
describe("Teste do logger", () => {
  test("Deveria forçar imprimir se tipo é 'error'", () => {
    process.env.LOGGER_ATIVADO = "false"
    expect(logger("ha", "error")).toBe(true)
  })

  test("Deveria forçar imprimir se tipo é 'warning'", () => {
    process.env.LOGGER_ATIVADO = "false"
    expect(logger("ha", "warning")).toBe(true)
  })

  test("Deveria imprimir se a variável de ambiente 'LOGGER_ATIVADO' é true", () => {
    process.env.LOGGER_ATIVADO = "true"
    expect(logger("ha", "info")).toBe(true)
  })

  test("Não deveria imprimir se a variável de ambiente 'LOGGER_ATIVADO' é false", () => {
    process.env.LOGGER_ATIVADO = "false"
    expect(logger("ha", "info")).toBe(false)
  })
})
