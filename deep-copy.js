function copyFiberNode(node) {
  if (!node) return null;

  const newNode = {
    ...node,
    loltag: "lol",
    child: null,
    sibling: null,
    return: null,
  };

  newNode.child = copyFiberNode(node.child);
  newNode.sibling = copyFiberNode(node.sibling);
  newNode.return = copyFiberNode(node.return);

  return newNode;
}

const rootNode = {};
const newRootNode = copyFiberNode(rootNode);
