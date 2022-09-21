import Core from './Core'
import _u from './Utils'


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
    this.createBlock()
  }

  createBlock() {
    const block = new Core(this)
    this.blocks.push(block)
    return block
  }
}


export default Editor