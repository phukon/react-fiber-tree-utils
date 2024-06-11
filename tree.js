class TreeNode {
  constructor(data) {
    this.data = data;
    this.children = [];
    this.parent = null;
  }

  addChild(child) {
    child.parent = this;
    this.children.push(child);
  }
}

// --------- -------- --------- --------

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
