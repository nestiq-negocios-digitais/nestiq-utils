import axios from "axios"

/**
 * Envia uma mensagem de log para o Google Cloud Logging.
 * @param msg A mensagem de log a ser enviada.
 * @param tipoLog O tipo de log (o padrão é "INFO").
 * @param nomeAplicacao O nome da aplicação que está enviando o log.
 * @returns Uma promessa que resolve para true se o log foi enviado com sucesso, ou false em caso contrário.
 */
const enviaGoogleLogging = async (msg: string, tipoLog: string = "INFO", nomeAplicacao: string): Promise<boolean> => {

    // Prepara o objeto de log com os campos necessários
    const log = {
        applicationName: nomeAplicacao,
        severity: tipoLog.toUpperCase(),
        message: msg
    }

    try {
        // Envia o log para a API do Google Cloud Logging
        const res = await axios({
            method: "post",
            url: `${process.env.URL_BASE_API_GOOGLE_LOGGING}`, // Supondo que URL_BASE_API_GOOGLE_LOGGING esteja configurado nas variáveis de ambiente
            data: log
        })

        // Verifica se a requisição foi bem-sucedida (código de status 200)
        if (res.status == 200) {
            console.log("Enviado ao google logging.")
            return true
        }

        // Registra um erro se o código de status não for 200
        console.log(`Não foi retornado código 200 no envio ao google logging. Código retornado: ${res.status}`)
        return false

    } catch (error) {
        // Registra qualquer erro que ocorrer durante a requisição
        console.log(`Falha ao registrar ao google logging. Erro: ${error}`)
        return false
    }
}


export default enviaGoogleLogging

