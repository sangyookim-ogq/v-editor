const isEnter = (e)=> {
  return e.keyCode === 13
}

const isShift = (e)=> {
  return e.keyCode === 16 || e.shiftKey
}

const isCtrl = (e)=> {
  return e.ctrlKey || e.metaKey
}

export {
  isEnter,
  isShift,
  isCtrl
}