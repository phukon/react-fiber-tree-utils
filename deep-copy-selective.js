function copyFiberTree(root) {
  if (!root) return null;

  const rootCopy = {
    tag: root.tag,
    loltag: "lol",
    child: null,
    sibling: null,
    return: null,
  };

  const stack = [{ original: root, copy: rootCopy }];

  while (stack.length > 0) {
    const { original, copy } = stack.pop();

    if (original.child) {
      copy.child = {
        tag: original.child.tag,
        loltag: "lol",
        child: null,
        sibling: null,
        return: copy,
      };
      stack.push({ original: original.child, copy: copy.child });
    }

    if (original.sibling) {
      copy.sibling = {
        tag: original.sibling.tag,
        loltag: "lol",
        child: null,
        sibling: null,
        return: copy.return,
      };
      stack.push({ original: original.sibling, copy: copy.sibling });
    }
  }

  return rootCopy;
}

const rootNode = {};
const newRootNode = copyFiberTree(rootNode);
