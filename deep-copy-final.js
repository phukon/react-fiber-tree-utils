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

const rootNode = {};
const newRootNode = copyFiberTree(rootNode);
