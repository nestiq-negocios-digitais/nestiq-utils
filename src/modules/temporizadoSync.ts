/**
 * Cria um temporizados sync
 * @param {number} time Tempo em milissegundos
 */
const temporizadorSync = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time))
}

export default temporizadorSync
