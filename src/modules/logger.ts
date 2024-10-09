import "dotenv/config"
import Logger, * as bunyan from "bunyan"
import { LoggingBunyan } from "@google-cloud/logging-bunyan"
import { Options } from "@google-cloud/logging-bunyan/build/src/types/core"
import { Writable } from "stream"

/**
 * Cria um Logger do Bunyan que permite enviar as informações para o console e para o GCP de forma estruturada simultanemente.
 * Necessita das variáveis de ambiente 'VERBOSE', 'NODE_ENV' e 'SERVICE_NAME'.
 * @returns um Logger
 */
export default function (): Logger {
  if (!process.env.VERBOSE)
    throw new Error("A variável de ambiente 'VERBOSE' não foi definida.")

  if (!process.env.NODE_ENV)
    throw new Error("A variável de ambiente 'NODE_ENV' não foi definida.")

  if (!process.env.SERVICE_NAME)
    throw new Error("A variável de ambiente 'SERVICE_NAME' não foi definida.")

  if (
    process.env.NODE_ENV == "production" &&
    !process.env.GOOGLE_APPLICATION_CREDENTIALS &&
    !process.env.K_SERVICE &&
    !process.env.CLOUD_RUN_JOB
  ) {
    const msg =
      "A variável de ambiente 'NODE_ENV' é 'production', mas o script não está rodando dentro do GCP. As variáveis de ambiente 'K_SERVICE' e 'CLOUD_RUN_JOB' estão indefinidas. Para simular o log no GCP em testes locais, defina a variável de ambiente 'GOOGLE_APPLICATION_CREDENTIALS' com o caminho do arquivo json que contém a conta de serviço que permite registrar logs no projeto."
    throw new Error(msg)
  }
  // Configuração do Google Cloud Logging
  const options: Options = {}
  const loggingBunyan = new LoggingBunyan(options)
  const streams: bunyan.Stream[] = []

  // Stream customizado para imprimir apenas a mensagem no console
  if (process.env.VERBOSE === "true") {
    const consoleStream = new Writable({
      write(chunk, encoding, callback) {
        try {
          const log = JSON.parse(chunk.toString())
          console.log(log.msg)
        } catch (err) {
          console.error("Erro ao processar log:", err)
        }
        callback()
      },
    })

    streams.push({ stream: consoleStream, level: "info" })
  }

  // Adiciona o stream do Google Cloud Logging apenas em produção
  if (process.env.NODE_ENV === "production") {
    streams.push(loggingBunyan.stream("info"))
  }

  const logger = bunyan.createLogger({
    name: process.env.SERVICE_NAME,
    streams: streams,
  })
  return logger
}
