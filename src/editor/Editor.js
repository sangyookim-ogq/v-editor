import Core from './Core'
import Utils from './Utils'

const _u = new Utils()

class Editor {
  constructor(el) {
    if (el instanceof HTMLElement) {
      this.rootEl = el
    } else if (typeof el === 'string') {
      const elem = document.querySelector(el)
      if (elem) {
        this.rootEl = elem
      } 
    } 
    
    if (!this.rootEl) {
      _u.error("Editor requires a root element to be instantiated.", {
        code: "ROOT_EL_NOT_FOUND"
      })
    }
    
    this.blocks = []

    this.initEditor()
  }

  initEditor() {
    _u.log("Welcome to OGQ Editor")
    this.blocks.push(new Core(this.rootEl))
  }
}


export default Editor