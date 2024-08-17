import sleep from "./sleep"

/**
 * Cria um temporizados sync
 * @param {number} time Tempo em milissegundos
 * @deprecated utilize a biblioteca 'sleep'
 */
const temporizadorSync = async (time: number) => {
  return await sleep(time)
}

export default temporizadorSync
