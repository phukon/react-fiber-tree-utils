function beginWork() {
  while (nextNode) {
    console.log("beginWork", nextNode.tag);

    if (nextNode.child) {
      nextNode = nextNode.child;
    } else {
      complete();
    }
  }
}

function complete() {
  while (nextNode) {
    console.log("complete", nextNode.tag);
    if (nextNode.sibling) {
      nextNode = nextNode.sibling;
      return;
    }
    nextNode = nextNode.return;
  }
}

beginWork();
