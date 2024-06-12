function injectIdToFiberNode() {
  const reactPropRegex = /^__(reactContainer|reactFiber)/;
  document.querySelectorAll("*").forEach((el) => {
    if (el.getAttribute("iterate-id")) {
      let id = el.getAttribute("iterate-id");
      let fiberNode;
      for (let property in el) {
        if (
          Object.hasOwnProperty.call(el, property) &&
          reactPropRegex.test(property)
        ) {
          fiberNode = el[property];
          fiberNode["iterate-id"] = id;
        }
      }
    }
  });
}

function findFiberNodeWithIterateId(node) {
  if (!node) return null;

  const stack = [node];

  while (stack.length > 0) {
    const currentNode = stack.pop();

    if (currentNode.hasOwnProperty("iterate-id")) {
      return currentNode;
    }

    if (currentNode.child) {
      stack.push(currentNode.child);
    }
    if (currentNode.sibling) {
      stack.push(currentNode.sibling);
    }
  }

  return null;
}

function copyFiberTree(root) {
  if (!root) return null;

  const rootCopy = {
    tag: root.tag,
    elementType: root.elementType,
    type: root.type,
    child: null,
    sibling: null,
    return: null,
    memoizedProps: root.memoizedProps,
    memoizedState: root.memoizedState,
    'iterate-id': root['iterate-id'] !== undefined ? root['iterate-id'] : null,
  };

  const stack = [{ original: root, copy: rootCopy }];

  while (stack.length > 0) {
    const { original, copy } = stack.pop();

    if (original.child) {
      copy.child = {
        tag: original.child.tag,
        elementType: original.child.elementType,
        type: original.child.type,
        child: null,
        sibling: null,
        return: copy,
        memoizedProps: original.child.memoizedProps,
        memoizedState: original.child.memoizedState,
        'iterate-id': original.child['iterate-id'] !== undefined ? original.child['iterate-id'] : null,
      };
      stack.push({ original: original.child, copy: copy.child });
    }

    if (original.sibling) {
      copy.sibling = {
        tag: original.sibling.tag,
        elementType: original.sibling.elementType,
        type: original.sibling.type,
        child: null,
        sibling: null,
        return: copy.return,
        memoizedProps: original.sibling.memoizedProps,
        memoizedState: original.sibling.memoizedState,
        'iterate-id': original.sibling['iterate-id'] !== undefined ? original.sibling['iterate-id'] : null,
      };
      stack.push({ original: original.sibling, copy: copy.sibling });
    }
  }

  return rootCopy;
}


function createGeneralTree(rootNode) {
  if (!rootNode) return null;

  const nodeMap = new Map();

  const rootGeneralNode = {
    tag: rootNode.tag,
    elementType: rootNode.elementType,
    type: rootNode.type,
    memoizedProps: rootNode.memoizedProps,
    memoizedState: rootNode.memoizedState,
    "iterate-id": rootNode["iterate-id"],
    children: [],
  };

  nodeMap.set(null, rootGeneralNode);

  const stack = [rootNode];

  while (stack.length > 0) {
    const currentNode = stack.pop();

    const parentGeneralNode = nodeMap.get(currentNode.return);

    const generalNode = {
      tag: currentNode.tag,
      elementType: currentNode.elementType,
      type: currentNode.type,
      memoizedProps: currentNode.memoizedProps,
      memoizedState: currentNode.memoizedState,
      "iterate-id": currentNode["iterate-id"],
      children: [],
    };

    parentGeneralNode.children.push(generalNode);

    nodeMap.set(currentNode, generalNode);

    if (currentNode.child) {
      stack.push(currentNode.child);
    }

    if (currentNode.sibling) {
      stack.push(currentNode.sibling);
    }
  }

  return rootGeneralNode;
}

function getGeneralTreeDepth(root) {
  if (!root) return 0;

  let maxDepth = 0;

  function dfs(node, depth) {
    if (!node) return;

    maxDepth = Math.max(maxDepth, depth);

    for (let child of node.children) {
      dfs(child, depth + 1);
    }
  }

  dfs(root, 1);

  return maxDepth;
}
