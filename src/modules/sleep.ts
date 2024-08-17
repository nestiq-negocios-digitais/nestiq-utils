/**
 * Cria um timer síncrono simples
 * @param {number} time Tempo em milissegundos
 */
const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time))
}

export default sleep
