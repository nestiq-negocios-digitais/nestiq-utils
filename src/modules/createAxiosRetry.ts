import axios from "axios"
import axiosRetry, { isRetryableError } from "axios-retry"

/**
 * Cria uma instância do axios com retentativa automática
 * @param maxTentativas Número máximo de retentativas
 * @param delay Tempo em ms de espera entre requisições
 * @param retryFunction Função a ser executada antes de cada retentativa
 * @returns Uma instância do axios com o retry aplicado
 */
const createAxiosRetry = (
  maxTentativas: number,
  delay: number,
  retryFunction: (retryCount: number) => void = () => {},
) => {
  axiosRetry(axios, {
    retries: maxTentativas,
    retryDelay: (retryCount: number) => {
      retryFunction(retryCount)
      return delay
    },
    retryCondition: (error) => {
      // Verificar se é um erro de timeout
      if (error.code === "ECONNABORTED") {
        return true
      }
      // Ou qualquer outra condição que axiosRetry considera como retentável
      return isRetryableError(error)
    },
  })

  return axios
}

export default createAxiosRetry
