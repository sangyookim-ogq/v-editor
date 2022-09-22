const SelectionUtils = {}


SelectionUtils.getSelection = ()=> {
  return window.getSelection()
}

SelectionUtils.getRange = ()=> {
  return window.getSelection().getRangeAt(0)
}

SelectionUtils.getContentAfterCaretInBlock = ()=> {
  const selection = SelectionUtils.getSelection()
  
  if (!selection.isCollapsed) return

  // Text Node base
  const startAt = selection.anchorOffset
  const endAt = selection.anchorNode.length

  const range = new Range();
  range.setStart(selection.anchorNode, startAt);
  range.setEnd(selection.anchorNode, endAt);

  // SelectionUtils.getSelection().removeAllRanges()
  // SelectionUtils.getSelection().addRange(range)
  
  console.log(range)
  
  return range.toString()
}

export default SelectionUtils