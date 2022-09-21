class Utils {
  constructor() {

  }
  log(...args) {
    console.log('[VEditor]', ...args)
  }
  error(message, ...props) {
    throw new Error(message, ...props)
  }
}

const _u = new Utils()

export default _u