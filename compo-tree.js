class ComponentTree {
  constructor(rootFiber) {
    this.root = this.createNode(rootFiber);
  }

  createNode(fiberNode) {
    return {
      tag: fiberNode.tag,
      key: fiberNode.key,
      elementType: fiberNode.elementType,
      type: fiberNode.type,
      children: fiberNode.child ? [this.createNode(fiberNode.child)] : [],
      sibling: fiberNode.sibling ? this.createNode(fiberNode.sibling) : null,
    };
  }
}

export const compoTree = () => {
  let rootNode;
  const rootDOMElement = document.getElementById("root");
  const props = {};

  // These are the key prefixes React uses to associate internal React state with DOM nodes.
  // There are more tho.
  const reactPropRegex = /^__(reactContainer|reactFiber)/;

  for (let property in rootDOMElement) {
    if (
      Object.hasOwnProperty.call(rootDOMElement, property) &&
      reactPropRegex.test(property)
    ) {
      props[property] = rootDOMElement[property];
    }
  }

  let propLength = Object.keys(props).length;
  if (propLength > 1) {
    /**
     * __reactContainer$ key is used to mark a DOM node as a root container for a React application.
     * I found it in the ReactDOMComponentTree.js file of the react codebase.
     * Therefore, if we find two keys, we are selecting the key that starts with '__reactContainer' as the root node.
     * see {@Github https://github.com/facebook/react/blob/20b6f4c0e8a1f40ee61735201645e0395ff08f94/packages/react-dom-bindings/src/client/ReactDOMComponentTree.js#L40}
     */
    for (let property in props) {
      if (property.startsWith("__reactContainer")) {
        rootNode = props[property];
        break;
      }
    }
  } else {
    const keys = Object.keys(props);
    rootNode = props[keys[0]];
  }
  const componentTree = new ComponentTree(rootNode);
  console.log(componentTree);
};
