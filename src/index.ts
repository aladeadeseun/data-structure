// import isPalindrome from "./palindrome"
// import MySet from "./set/set"
// import Stack from "./stack"

import LinkList from "./link-list/link-list"

//import BST from "./bst/bst"

//import BinaryTree from "./binary tree/binary-tree"

//import Trie from "./trie/trie"

//console.log("Welcome")

function main(){
  // console.log("racecar is palindrome :", isPalindrome("racecar"))
  // console.log("bob is palindrome :", isPalindrome("bob"))
  // console.log("boat is palindrome :", isPalindrome("boat"))

  // const stack = new Stack(1,2,3)
  // console.log(stack.peek());
  
  // stack.push(4)

  // console.log(stack.peek());
  // console.log(stack.pop())
  // console.log(stack.getSize());

  // const setA = new MySet("a", "b", "c", "d")
  // const setB = new MySet("a", "c", "d", "e")
  
  // console.log("Insection between set A and Set B", setA.intersect(setB).values())
  // console.log("Union between set A and Set B", setA.union(setB).values())
  // console.log("Set A is a subset of set B", setA.subset(setB))
  // console.log("Difference between set A and set B", setA.difference(setB).values())

  // const trie = new Trie()

  // trie.insert("do")
  // trie.insert("dad")
  // trie.insert("at")
  // trie.insert("an")
  // trie.insert("am")
  // trie.insert("am")
  // trie.insert("and")
  // trie.insert("ant")
  // trie.insert("about")
  // trie.insert("girl")
  // trie.insert("girls")
  // trie.insert("account")
  // trie.insert("accountant")
  // console.log("searching for 'andela'", trie.search("andela"))
  // console.log("searching for 'ant'", trie.search("ant"))
  // console.log("searching for 'about'", trie.search("about"))

  //console.log(trie.printAllWord())
  //console.log(trie.printAllWordUsingIteration())
  //console.log(trie.getAllWordFromTrieNode())
  
  //const bt: BinaryTree<number> = new BinaryTree();
  //bt.insert(1).insert(2).insert(3).insert(4).insert(5).insert(6)
  // console.log(bt.inOrderTraversalUsingIteration())
  // console.log(bt.inOrderTraversalUsingRecusrsion())
  // console.log(bt.preOrderTraversalUsingIteration())
  // console.log(bt.preOrderTraversalUsingRecursion())

  //console.log(bt.postOrderTraversalUsingIteration())
  //console.log(bt.postOrderTraversalUsingRecursion())
  //console.log(bt.insert(2).insert(3).insert(4).insert(5).getAllDataInTreeUsingRecursion())
  // bt.insert(5).insert(12).insert(13)
  // bt.insert(7).insert(14).insert(2)
  // bt.insert(17).insert(23).insert(7)
  // bt.insert(3).insert(8).insert(11)

  //console.log(bt.levelOrderTraversalUsingRecursion())

  // bt.insert(1).insert(2).insert(3).insert(4)
  // bt.insert(5).insert(6).insert(7).insert(8)
  // bt.insert(9).insert(10).insert(11)
  // .insert(8)
  // bt.insert(9).insert(10).insert(11)
  // bt.insert(13).insert(14)

  //console.log(bt.boundaryTraversal())
  //console.log(bt.diagonalTravesal())

  //const bst = new BST(100)
  // bst.insert(17).insert(72).insert(12)
  // bst.insert(12).insert(23).insert(54).insert(76)
  // bst.insert(9).insert(14).insert(19).insert(67)

  // console.log("min data", bst.findMin())
  // console.log("max data", bst.findMax())
  // console.log("search", bst.find(9))
  // bst.insert(20).insert(200)
  // bst.insert(10).insert(30).insert(150).insert(300)
  // console.log(bst.remove(100))
  // bst.insert(9)
  // console.log(bst.inOrderTraversalUsingRecusrsion())

  //const bst = new BST(9)
  // bst.insert(4).insert(17).insert(3).insert(6)
  // bst.insert(22).insert(5).insert(7).insert(20)
  // bst.insert(10)
  //const bst = new BST(50)
  // bst.insert(30).insert(20).insert(40).insert(70).insert(60)
  // bst.insert(80)
  // console.log(bst.maxHeight())
  // console.log(bst.minHeight())
  // console.log(bst.isBalance())

  
  // console.log(bst.maxHeight())
  // console.log(bst.minHeight())
  // console.log(bst.isBalance())
  // console.log("in order", bst.inOrderTraversalUsingRecusrsion())
  // console.log("pre order", bst.preOrderTraversalUsingRecursion())
  // console.log("post order", bst.postOrderTraversalUsingRecursion())
  // console.log("level order", bst.levelOrderTraversal())
  const linkList: LinkList<number> = new LinkList<number>(1)
  linkList.add(2).add(3).add(4)

  console.log("data", linkList.getData())
  console.log("size", linkList.size())
  linkList.remove(4)
  console.log("data", linkList.getData())
  console.log("size", linkList.size())
  console.log("is empty", linkList.isEmpty())
  console.log("index of 4", linkList.indexOf(4))
  console.log("index of 3", linkList.indexOf(3))
  console.log("element at", linkList.elementAt(2))
  console.log("element at", linkList.elementAt(5))

  console.log("insert at 0", linkList.insertAt(0, 4))
  console.log("insert at 2", linkList.insertAt(2, 5))
  console.log(`insert at ${linkList.size()}`, linkList.insertAt(linkList.size(), 6))
  console.log("data", linkList.getData())

  console.log("remove at 0", linkList.removeAt(0))
  console.log("data", linkList.getData())
  console.log("remove at 1", linkList.removeAt(1))
  console.log("data", linkList.getData())
}

main()