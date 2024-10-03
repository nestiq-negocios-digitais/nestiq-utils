import axios from "axios"
import logTipo from "../models/logTipo"

/**
 * Envia uma mensagem de log para o Google Cloud Logging.
 * @param msg A mensagem de log a ser enviada.
 * @param tipoLog Opcional. Padrão = "info. O tipo de log
 * @param servicoDocumentId Opcional. Padrão = process.env.SERVICO_DOCUMENT_ID. O documentId do serviço registrado no DB pelo Strapi
 * @returns Uma promessa que resolve para true se o log foi enviado com sucesso, ou false em caso contrário.
 */
const enviaGoogleLogging = async (
  msg: string,
  tipoLog: logTipo = "info",
  servicoDocumentId: string | undefined = process.env.SERVICO_DOCUMENT_ID,
): Promise<boolean> => {
  if (!process.env.URL_BASE_API_GOOGLE_LOGGING)
    throw new Error(
      "A variável de ambiente 'URL_BASE_API_GOOGLE_LOGGING' não foi definida.",
    )

  if (!servicoDocumentId)
    throw new Error(
      "O 'servicoDocumentId' não está definido como variável de ambiente (process.env.SERVICO_DOCUMENT_ID) e não foi fornecido na chamada da função.",
    )

  // Prepara o objeto de log com os campos necessários
  const log = {
    servicoDocumentId: servicoDocumentId,
    severity: tipoLog.toUpperCase(),
    message: msg,
  }

  try {
    // Envia o log para a API do Google Cloud Logging
    const res = await axios({
      method: "post",
      url: `${process.env.URL_BASE_API_GOOGLE_LOGGING}`, // Supondo que URL_BASE_API_GOOGLE_LOGGING esteja configurado nas variáveis de ambiente
      data: log,
    })

    // Verifica se a requisição foi bem-sucedida (código de status 200)
    if (res.status == 200) {
      console.log("Log enviado ao Google Logging com sucesso.")
      return true
    }
    throw new Error(
      `Não foi retornado código 200 no envio ao Google Logging. Código retornado: ${res.status}`,
    )
  } catch (error) {
    console.error(`Falha ao registrar o log no Google Logging. Erro: ${error}`)
    return false
  }
}

export default enviaGoogleLogging
