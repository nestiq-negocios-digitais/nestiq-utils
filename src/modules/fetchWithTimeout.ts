import fetch from "node-fetch"
import { HttpsProxyAgent } from "https-proxy-agent"

interface ProxyConfig {
  ativo?: boolean
  user?: string
  pass?: string
  host?: string
  port?: string
}

/**
 *
 * @param url URL da requisição.
 * @param config Objeto contendo as configurações da requisição (ex: headers, method, body).
 * @param timeout Tempo limite em milissegundos para a requisição.
 * @param maxTentativas Número de retentativas em caso de falha.
 * @param interval Intervalo em milissegundos entre as retentativas.
 * @param proxyConfig Configurações de proxy
 * @param retryFunction Funçãoa ser executa em cada retentativa. Se não houver falha, nunca será executa.
 * @returns O retorno do fetch
 * @throws Lança um erro se o tempo limite for excedido ou se todas as retentativas falharem.
 * @example
 * const response = await fetchWithTimeout('https://api.example.com/data', { method: 'GET' }, 3000, 3, 2000);
 * const response = await fetchWithTimeout("https://ifconfig.me", { method: "GET" }) as fetch.Response;
 */
const fetchWithTimeout = async (
  url: string,
  config: fetch.RequestInit,
  timeout: number = 30000,
  maxTentativas: number = 3,
  interval: number = 7000,
  proxyConfig: ProxyConfig = {},
  retryFunction: (retentativa: number) => void = () => {},
) => {
  let lastError

  if (proxyConfig.ativo) {
    const proxyUrl = `http://${proxyConfig.user}:${proxyConfig.pass}@${proxyConfig.host}:${proxyConfig.port}`
    config.agent = new HttpsProxyAgent(proxyUrl)
  }

  for (let retentativa = 0; retentativa < maxTentativas; retentativa++) {
    const timeoutError = new Error(`Timeout de ${timeout} Excedido`)

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(timeoutError), timeout)
    })

    const fetchPromise = fetch(url, config)

    try {
      return await Promise.race([fetchPromise, timeoutPromise])
    } catch (error) {
      lastError = error
      retryFunction(retentativa)
      await new Promise((resolve) => setTimeout(resolve, interval))
    }
  }

  throw lastError
}

export default fetchWithTimeout

/**
 * Realiza uma requisição utilizando o node-fetch com opções de timeout e retentativas.
 *
 * @param {string} url - URL da requisição.
 * @param {Object} config - Objeto contendo as configurações da requisição (ex: headers, method, body).
 * @param {number} Tempo limite em milissegundos para a requisição.
 * @param {number} Número de tentativas em caso de falha.
 * @param {number} Intervalo em milissegundos entre as retentativas.
 *
 * @returns {Promise} - Promise contendo o resultado da requisição.
 *
 * @throws {Error} - Lança um erro se o tempo limite for excedido ou se todas as retentativas falharem.
 *
 * @example
 * const response = await fetchWithTimeout('https://api.example.com/data', { method: 'GET' }, 3000, 3, 2000) as fetch.Response;
 * const response = await fetchWithTimeout("https://ifconfig.me", { method: "GET" }) as fetch.Response;
 */
