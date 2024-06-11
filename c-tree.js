class TreeNode {
  constructor(fiberNode) {
    this.fiberNode = fiberNode;
    this.children = [];
    this.parent = null;
  }

  addChild(child) {
    child.parent = this;
    this.children.push(child);
  }

  dfs(node) {
    if (!node) return;
    console.log(node.value);
    for (let child of node.children) {
      dfs(child);
    }
  }
}

function constructTreeFromFiber(rootFiber) {
  const constructNode = (fiber) => {
    const node = new TreeNode(fiber);
    let child = fiber.child;
    let sibling = fiber.sibling;
    while (child) {
      node.addChild(constructNode(child));
      child = child.child;
    }
    return node;
  };
  return constructNode(rootFiber);
}
