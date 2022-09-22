class Utils {
  constructor() {

  }
  log(...args) {
    const style = `
      color: white;
      padding: 2px 6px;
      border-radius: 8px;
      background-color: #770EFF;
      font-weight: bold;
    `
    console.log('%cVEditor', style, ...args)
  }
  error(message, ...props) {
    throw new Error(message, ...props)
  }
}

const _u = new Utils()

export default _u