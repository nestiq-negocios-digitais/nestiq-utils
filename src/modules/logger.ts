import "dotenv/config"
import enviaGoogleLogging from "./enviaGoogleLogging"

type tipo = "info" | "warning" | "error"
/**
 * Imprime uma mensagem no console se a variável de ambiente 'LOGGER_ATIVADO' for igual a 'true'
 * Se o tipo for diferente de "info", força a impressão mesmo com a variável de ambiente 'LOGGER_ATIVADO' estando 'false',
 * @param msg A mensagem a ser impressa no console
 * @param tipo O Tipo do log
 * @param forcarEnvioGoogle Se deve enviar o log mesmo se for do tipo 'info'
 * @returns true se algo foi impresso no console
 */
const logger = async (msg: string, tipo: tipo = "info", forcarEnvioGoogle = false): Promise<boolean> => {

  const verbose = process.env.VERBOSE == "true" || process.env.LOGGER_ATIVADO == "true" // Mantém a compatibilidade com a versão antiga do módulo

  if (verbose || tipo != "info") {
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
  }

  if ((tipo != "info" || forcarEnvioGoogle) && process.env.NODE_ENV == "prod")
    return await enviaGoogleLogging(msg, tipo, process.env.APLICACAO_ID ?? "DEFAULT")

  return true
}

export default logger
