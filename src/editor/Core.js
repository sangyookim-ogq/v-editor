class Core {
  constructor(editorEl) {
    this.editorEl = editorEl
    this.contentEditableEl = null
    this.init()
  }

  init() {
    this.createContentEditable()
  }

  createContentEditable() {
    this.contentEditableEl = document.createElement('div')
    this.contentEditableEl.setAttribute('contenteditable', true)
    this.editorEl.appendChild(this.contentEditableEl)
    this.bindEvents()
  }

  bindEvents() {
    this.contentEditableEl.addEventListener('keydown', this.onKeyDown, false)
  }
}

export default Core