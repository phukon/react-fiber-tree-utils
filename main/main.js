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
    loltag: "lol",
    child: null,
    sibling: null,
    return: null,
    memoizedProps: root.memoizedProps,
    memoizedState: root.memoizedState,
  };

  const stack = [{ original: root, copy: rootCopy }];

  while (stack.length > 0) {
    const { original, copy } = stack.pop();

    if (original.child) {
      copy.child = {
        tag: original.child.tag,
        elementType: original.child.elementType,
        type: original.child.type,
        loltag: "lol",
        child: null,
        sibling: null,
        return: copy,
        memoizedProps: original.child.memoizedProps,
        memoizedState: original.child.memoizedState,
      };
      stack.push({ original: original.child, copy: copy.child });
    }

    if (original.sibling) {
      copy.sibling = {
        tag: original.sibling.tag,
        elementType: original.sibling.elementType,
        type: original.sibling.type,
        loltag: "lol",
        child: null,
        sibling: null,
        return: copy.return,
        memoizedProps: original.sibling.memoizedProps,
        memoizedState: original.sibling.memoizedState,
      };
      stack.push({ original: original.sibling, copy: copy.sibling });
    }
  }

  return rootCopy;
}
