const DOMUtils = {}


DOMUtils.insertAfter = (insertNode, refNode) => {
  refNode.parentNode.insertBefore(insertNode, refNode.nextSibling)
}
export default DOMUtils