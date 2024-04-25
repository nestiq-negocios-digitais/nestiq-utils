import "dotenv/config"

type tipo = "info" | "warning" | "error"
/**
 * Imprime uma mensagem no console se a variável de ambiente 'LOGGER_ATIVADO' for igual a 'true'
 * Se o tipo for diferente de "info", força a impressão mesmo com a variável de ambiente 'LOGGER_ATIVADO' estando 'false',
 * @param msg A mensagem a ser impressa no console
 * @param tipo O Tipo do log
 * @returns true se algo foi impresso no console
 */
const logger = (msg: string, tipo: tipo = "info"): boolean => {
  if (process.env.LOGGER_ATIVADO == "true" || tipo != "info") {
    switch (tipo) {
      case "error":
        console.error(msg)
        break

      case "warning":
        console.warn(msg)
        break

      default:
        console.log(msg)
        break
    }
    return true
  }
  return false
}

export default logger
