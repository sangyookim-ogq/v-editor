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
    this.currentBlockIndex = null

    this.initEditor()
  }

  initEditor() {
    _u.log("Welcome to OGQ Editor")
    this.createBlock()
  }

  createBlock(props) {
    const contentStr = props?.contentStr || null
    const insertAfter = props?.insertAfter != null ? props.insertAfter : this.blocks.length - 1

    const block = new Core(this, {
      contentStr,
      insertAfter
    })
    this.blocks.splice(insertAfter + 1, 0, block)
    
    this.blocks.forEach((b, i)=> {
      b.index = i
    })

    return block
  }

  getCurrentBlockIndex() {
    return this.currentBlockIndex
  } 

  removeBlockByIndex(index=0) {
    this.blocks[index].editableEl.parentNode.removeChild(this.blocks[index].editableEl)
    this.blocks.splice(index, 1)
    this.blocks.forEach((b, i)=> {
      b.index = i
    })
  }
}


export default Editor