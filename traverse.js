let root = {
  tag: 0,
  val: "this is the root node",
  return: null,
};

const node2 = {
  val: 2,
  return: root,
};

root.child = node2;

const node3 = {
  val: 3,
  return: node2,
};

node2.child = node3;

const node4 = {
  val: 4,
  return: node2,
};

const node5 = {
  val: 5,
  return: node2,
};

node3.sibling = node4;
node4.sibling = node5;

const node6 = {
  val: 6,
  return: node4,
};

node4.child = node6;

const node7 = {
  val: 7,
  return: node4,
};

node6.sibling = node7;

const node8 = {
  val: 8,
  return: node7,
};

node7.child = node8;

let nextNode = root;

function beginWork() {
  while (nextNode) {
    console.log("beginWork", nextNode.val);

    if (nextNode.child) {
      nextNode = nextNode.child;
    } else {
      complete();
    }
  }
}

function complete() {
  while (nextNode) {
    console.log("complete", nextNode.val);
    if (nextNode.sibling) {
      nextNode = nextNode.sibling;
      return;
    }
    nextNode = nextNode.return;
  }
}

beginWork();
