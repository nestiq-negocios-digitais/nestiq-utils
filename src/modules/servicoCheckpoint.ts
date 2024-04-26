import axios from "axios"

/**
 * Realiza um chekpoint no banco de dados para que no dashboard administrativo possa ser visto que o serviço em questão está funcionando corretamente
 * @param url A URL da API que registra os checkpoints no banco de dados
 * @param servicoId O ID do serviço
 */
const servicoCheckpoint = async (url: string, servicoId: string) => {
  try {
    await axios.get(url, { headers: { "aplicacao-id": servicoId } })
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
