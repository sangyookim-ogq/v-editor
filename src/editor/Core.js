import { isEnter, isShift, isCtrl, isArrow, isBackspace } from './KeyUtils'
import _u from './Utils'
import SelectionUtils from './SelectionUtils'
import DOMUtils from './DOMUtils'

class Core {
  constructor(editor, props={}) {
    const insertAfter = props?.insertAfter || 0
    this.editor = editor
    this.editorEl = editor.rootEl
    this.editableEl = null
    this.blockEl = null
    this.index = insertAfter + 1
    this.contentStr = props?.contentStr || ""
    this.init()
  }

  init() {
    this.createContentEditable()
  }

  createContentEditable() {
    
    this.editableEl = document.createElement('div')
    this.editableEl.className = "VEditor__block"
    this.editableEl.innerHTML = this.contentStr
    this.editableEl.setAttribute('contenteditable', true)
    if (!this.editor.blocks[0]) {
      this.editorEl.appendChild(this.editableEl)
    } else {
      DOMUtils.insertAfter(
        this.editableEl,
        this.editor.blocks[this.index - 1].editableEl
      )
    }
    this.bindEvents()
  }

  bindEvents() {
    this.editableEl.addEventListener('keydown', this.onKeyDown.bind(this), false)
    this.editableEl.addEventListener('focus', this.onFocus.bind(this), false)
  }

  onKeyDown(e) {
    this.preventNativeShortcuts(e)
    if (isEnter(e) && !isShift(e)) return this.onEnter(e)
    if (isArrow(e)) return this.onArrowKey(e.key)
    if (isBackspace(e)) return this.onBackspace(e)
  }

  onBackspace(e) {
    const selection = SelectionUtils.getSelection()
    // const range = selection.getRangeAt(0)
    // const commonAncestor = range.commonAncestorContainer
    // _u.log('[onBackspace]', selection.anchorNode.nodeName, this.editableEl)
    // _u.log(selection.getRangeAt(0))
    // _u.log("Root is current editable el", commonAncestor === this.editableEl, commonAncestor )
    if (selection.anchorNode.nodeName === '#text' && selection.anchorNode.parentNode === this.editableEl) {
      // Is start of editable 
      if (selection.isCollapsed && selection.anchorOffset === 0) {
        e.preventDefault()
        this.mergeIntoIndex(this.index - 1)
      }
    }
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
      this.editor.blocks[this.index + amount].editableEl.focus()
    }
  }

  mergeIntoIndex(targetIndex) {
    const targetBlock = this.editor.blocks[targetIndex]
    if (!targetBlock) return
    const targetEditableEl = targetBlock.editableEl
    const fragment = SelectionUtils.getFragmentAfterCaretInBlock(true)
    const range = SelectionUtils.getRangeAtEndOfElement(targetEditableEl)
    SelectionUtils.setCaretWithRange(range)
    range.insertNode(fragment)
    range.collapse(true)
    targetEditableEl.normalize()
  }

  removeSelf() {
    this.editor.removeBlockByIndex(this.index)
  }

  onEnter(e) {
    e.preventDefault()
    // const selection = SelectionUtils.getSelection()
    const contentStr = SelectionUtils.getContentAfterCaretInBlock(true)
    _u.log("[KEYDOWN] Enter", {
      contentStr,
      insertAfter: this.index
    })
    const block = this.editor.createBlock({
      contentStr,
      insertAfter: this.index
    })
    block.editableEl.focus()
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