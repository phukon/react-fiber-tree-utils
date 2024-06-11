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
