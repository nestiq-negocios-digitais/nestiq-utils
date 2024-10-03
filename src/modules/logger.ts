import "dotenv/config"
import enviaGoogleLogging from "./enviaGoogleLogging"
import logTipo from "../models/logTipo"

/**
 * Imprime uma mensagem no console e envia logs parao GCP.
 * Se a variável de ambiente 'VERBOSE' for igual a 'true', imprime sempre no console.
 * Se o tipo for diferente de "info" envia para o Google Logging e força a impressão mesmo com a variável de ambiente 'VERBOSE' estando 'false'.
 * Obs: Necessita das variáveis de ambiente NODE_ENV, VERBOSE e SERVICO_DOCUMENT_ID definidas para funcionar.
 * @param msg A mensagem a ser impressa no console
 * @param tipo O Tipo do log
 * @param forcarEnvioGoogle Se deve enviar o log mesmo se for do tipo 'info'. Outros tipos são enviados automaticamente
 */
const logger = async (
  msg: string,
  tipo: logTipo = "info",
  forcarEnvioGoogle = false,
): Promise<void> => {
  if (!process.env.VERBOSE)
    throw new Error("A variável de ambiente 'VERBOSE' não foi definida.")

  if (!process.env.NODE_ENV)
    throw new Error("A variável de ambiente 'NODE_ENV' não foi definida.")

  if (!process.env.SERVICO_DOCUMENT_ID)
    throw new Error(
      "A variável de ambiente 'SERVICO_DOCUMENT_ID' não foi definida.",
    )

  const verbose =
    process.env.VERBOSE == "true" || process.env.LOGGER_ATIVADO == "true" // LOGGER_ATIVADO - Mantém a compatibilidade com a versão antiga do módulo

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
  const isProductionEnv =
    process.env.NODE_ENV == "prod" || process.env.NODE_ENV == "production"

  if ((tipo != "info" || forcarEnvioGoogle) && isProductionEnv) {
    try {
      await enviaGoogleLogging(msg, tipo, process.env.SERVICO_DOCUMENT_ID)
    } catch (error) {
      const msg = `Não foi possível enviar o log para o GCP Logging: ${error}`
      console.error(msg)
    }
  } else if (tipo != "info") {
    logger(
      "O log de erro ou warning não será enviado ao Google porque a variável de ambiente NODE_ENV não está configurada como 'production'",
    )
  }
}

export default logger
