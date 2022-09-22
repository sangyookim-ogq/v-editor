const isEnter = (e)=> {
  return e.keyCode === 13
}

const isShift = (e)=> {
  return e.keyCode === 16 || e.shiftKey
}

const isCtrl = (e)=> {
  return e.ctrlKey || e.metaKey
}

const isArrow = (e)=> {
  return [37, 38, 39, 40].includes(e.keyCode) || e.key.startsWith('Arrow')
}

export {
  isEnter,
  isShift,
  isCtrl,
  isArrow
}