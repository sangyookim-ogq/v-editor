import { isEnter } from './KeyUtils'
import _u from './Utils'

class Core {
  constructor(editor) {
    this.editor = editor
    this.editorEl = editor.rootEl
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
    this.contentEditableEl.addEventListener('keydown', this.onKeyDown.bind(this), false)
  }

  onKeyDown(e) {
    if (isEnter(e)) return this.onEnter(e)
  }

  onEnter(e) {
    e.preventDefault()
    _u.log("[KEYDOWN] Enter")
    const block = this.editor.createBlock()
    block.contentEditableEl.focus()
  }
}

export default Core