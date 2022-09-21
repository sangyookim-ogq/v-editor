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

export default Utils