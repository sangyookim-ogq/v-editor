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
      throw new Error("Editor requires a root element to be instantiated.", {
        code: "ROOT_EL_NOT_FOUND"
      })
    }
    
    this.initEditor()
  }

  initEditor() {
    console.log("Welcome to OGQ Editor")
  }
}


export default Editor