import { isEnter, isShift, isCtrl, isArrow } from './KeyUtils'
import _u from './Utils'
import SelectionUtils from './SelectionUtils'
import DOMUtils from './DOMUtils'

class Core {
  constructor(editor, props) {
    const insertAfter = props.insertAfter || 0
    this.editor = editor
    this.editorEl = editor.rootEl
    this.contentEditableEl = null
    this.index = insertAfter + 1
    this.init()
  }

  init() {
    this.createContentEditable()
  }

  createContentEditable() {
    this.contentEditableEl = document.createElement('div')
    this.contentEditableEl.setAttribute('contenteditable', true)
    if (!this.editor.blocks[0]) {
      this.editorEl.appendChild(this.contentEditableEl)
    } else {
      DOMUtils.insertAfter(
        this.contentEditableEl,
        this.editor.blocks[this.index - 1].contentEditableEl
      )
    }
    this.bindEvents()
  }

  bindEvents() {
    this.contentEditableEl.addEventListener('keydown', this.onKeyDown.bind(this), false)
    this.contentEditableEl.addEventListener('focus', this.onFocus.bind(this), false)
  }

  onKeyDown(e) {
    this.preventNativeShortcuts(e)
    if (isEnter(e) && !isShift(e)) return this.onEnter(e)
    if (isArrow(e)) return this.onArrowKey(e.key)
  }

  onArrowKey(arrowKey) {
    if (arrowKey === 'ArrowUp') {
      // _u.log(arrowKey)
      this.navigateBlock(-1)
    } else if (arrowKey === 'ArrowDown') {
      // _u.log(arrowKey)
      this.navigateBlock(1)
    }
  }

  navigateBlock(amount) {
    /**
     * Node at which the selection starts
     * selection.anchorNode
     * 
     * Node at which the selection ends
     * selection.focusNode
     */
    // const selection = SelectionUtils.getSelection()

    // Get selection and range
    if (this.index <= 0 && amount < 0) {
      // return _u.log("Is first block", amount, this.index)
    } else if (this.index >= (this.editor.blocks.length - 1) && amount > 0) {
      // return _u.log("Is end block", amount, this.index)
    } else {
      // Navigate between blocks
      this.editor.blocks[this.index + amount].contentEditableEl.focus()
    }
  }

  onEnter(e) {
    e.preventDefault()
    // const selection = SelectionUtils.getSelection()
    const contentStr = SelectionUtils.getContentAfterCaretInBlock()
    _u.log("[KEYDOWN] Enter", {
      contentStr,
      insertAfter: this.index
    })
    const block = this.editor.createBlock({
      contentStr,
      insertAfter: this.index
    })
    block.contentEditableEl.focus()
  }

  preventNativeShortcuts(e) {
    if (!isCtrl(e)) return

    // Prevent default bold execution
    if (e.key.toLowerCase() === 'b' || e.keyCode === 66) {
      e.preventDefault()
    }
    // Prevent default italics execution
    if (e.key.toLowerCase() === 'i' || e.keyCode === 73) {
      e.preventDefault()
    }
    // Prevent default paste execution
    if (e.key.toLowerCase() === 'v' || e.keyCode === 86) {
      e.preventDefault()
    }
  }

  onFocus() {
    // _u.log("Focused block", this)
  }

  getSelection() {
  }
}

export default Core