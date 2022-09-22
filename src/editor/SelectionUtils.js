import _u from './Utils'

const SelectionUtils = {}


SelectionUtils.getSelection = ()=> {
  return window.getSelection()
}

SelectionUtils.getRange = ()=> {
  return window.getSelection().getRangeAt(0)
}

SelectionUtils.getContentAfterCaretInBlock = (removeContentAfter=false)=> {
  const selection = SelectionUtils.getSelection()
  
  if (!selection.isCollapsed) return

  // Text Node base
  const startAt = selection.anchorOffset
  const endAt = selection.anchorNode.length

  const range = new Range();
  range.setStart(selection.anchorNode, startAt);
  range.setEnd(selection.anchorNode, endAt);


  if (removeContentAfter) {
  //   // SelectionUtils.getSelection().removeAllRanges()
  //   // SelectionUtils.getSelection().addRange(range)
  //   // range.deleteContents()
  }
  
  // console.log(range, range.extractContents())
  const temp = document.createElement('div')
  temp.appendChild(range.extractContents())
  return temp.innerHTML
}

SelectionUtils.getFragmentAfterCaretInBlock = ()=> {
  const selection = SelectionUtils.getSelection()
  
  if (!selection.isCollapsed) return

  // Text Node base
  const startAt = selection.anchorOffset
  const endAt = selection.anchorNode.length

  const range = new Range();
  range.setStart(selection.anchorNode, startAt);
  range.setEnd(selection.anchorNode, endAt);
  return range.extractContents()
}

SelectionUtils.setCaretAtEndOfBlock = (el, focusAfter=true)=> {
  const selection = SelectionUtils.getSelection()
  const range = document.createRange()
  selection.removeAllRanges()
  range.selectNodeContents(el)
  range.collapse(false)
  selection.addRange(range)
  if (focusAfter) {
    _u.log("Focus after")
    el.focus()
  }
}
SelectionUtils.getRangeAtEndOfElement = (el)=> {
  const selection = SelectionUtils.getSelection()
  const range = document.createRange()
  selection.removeAllRanges()
  range.selectNodeContents(el)
  range.collapse(false)
  return range
}
SelectionUtils.setCaretWithRange = (range)=> {
  const selection = SelectionUtils.getSelection()
  selection.removeAllRanges()
  selection.addRange(range)
}

export default SelectionUtils