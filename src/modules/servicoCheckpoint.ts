import createAxiosRetry from "./createAxiosRetry"

/**
 * Atualiza a data do último checkpoint de um serviço no banco de dados para que no dashboard administrativo possa ser visto que o serviço em questão está funcionando corretamente
 * Obs: Precisa das variáveis de ambiente STRAPI_URL_BASE, STRAPI_BEARER_TOKEN
 * @param servicoDocumentId Opcional. Padrão = process.env.SERVICO_DOCUMENT_ID. O documentId do serviço registrado no DB pelo Strapi
 */
const servicoCheckpoint = async (
  servicoDocumentId: string | undefined = process.env.SERVICO_DOCUMENT_ID,
) => {
  if (!servicoDocumentId)
    throw new Error(
      "O 'servicoDocumentId' não está definido como variável de ambiente (process.env.SERVICO_DOCUMENT_ID) e não foi fornecido na chamada da função.",
    )

  if (!process.env.STRAPI_URL_BASE)
    throw new Error(
      "A variável de ambiente 'STRAPI_URL_BASE' não foi definida.",
    )

  if (!process.env.STRAPI_BEARER_TOKEN)
    throw new Error(
      "A variável de ambiente 'STRAPI_BEARER_TOKEN' não foi definida.",
    )

  const axios = createAxiosRetry()
  const url = `${process.env.STRAPI_URL_BASE}/api/servicos/${servicoDocumentId}`
  const token = process.env.STRAPI_BEARER_TOKEN
  const payload = {
    data: {
      ultimo_checkpoint: new Date().toISOString(),
    },
  }

  try {
    const res = await axios.put(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    return res.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    let e
    if (error.response) {
      e = `Status: ${error.response.status}. Body: ${JSON.stringify(error.response.data)}`
    } else e = `Erro desconhecido. Verifique a URL. Detalhes: ${error.message}`
    throw new Error(e)
  }
}

export default servicoCheckpoint
