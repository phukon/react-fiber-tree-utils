function createGeneralTree(rootNode) {
  if (!rootNode) return null;

  // Initialize a map to store references to nodes by their return (parent) key
  const nodeMap = new Map();

  // Convert the root node to a general tree node
  const rootGeneralNode = {
    tag: rootNode.tag,
    elementType: rootNode.elementType,
    type: rootNode.type,
    loltag: rootNode.loltag,
    memoizedProps: rootNode.memoizedProps,
    memoizedState: rootNode.memoizedState,
    children: [],
  };

  // Add the root node to the map with a null parent key
  nodeMap.set(null, rootGeneralNode);

  // Use a stack to traverse the Fiber tree iteratively
  const stack = [rootNode];

  while (stack.length > 0) {
    const currentNode = stack.pop();

    // Get the corresponding general tree node from the map
    const parentGeneralNode = nodeMap.get(currentNode.return);

    // Create a new general tree node for the current Fiber node
    const generalNode = {
      tag: currentNode.tag,
      elementType: currentNode.elementType,
      type: currentNode.type,
      loltag: currentNode.loltag,
      memoizedProps: currentNode.memoizedProps,
      memoizedState: currentNode.memoizedState,
      children: [],
    };

    // Add the new general tree node to its parent's children array
    parentGeneralNode.children.push(generalNode);

    // Add the new general tree node to the map with its return (parent) key
    nodeMap.set(currentNode, generalNode);

    // Add child nodes to the stack for further processing
    if (currentNode.child) {
      stack.push(currentNode.child);
    }

    // Add sibling nodes to the stack for further processing
    if (currentNode.sibling) {
      stack.push(currentNode.sibling);
    }
  }

  return rootGeneralNode;
}
