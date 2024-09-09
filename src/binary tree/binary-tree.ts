//binary tree node definition
type BinaryTreeNode<T> = {
  left: BinaryTreeNode<T> | null,
  right: BinaryTreeNode<T> | null,
  data:T
}//end type

//I need this for the recursion helper method
type TRAVERSAL_TYPE = "pre_order" | "in_order" | "post_order"

export default class BinaryTree<T>{
  //initialize root to null
  private root: BinaryTreeNode<T> | null = null

  //create a constructor for the class
  constructor(data?:T){
    //if data is supplied as part of the object definition
    if(data){
      //create root node
      this.root = this.getBinaryTreeNode(data)
    }//end if(data)
  }//end constructor

  //Utility function to create a new node
  private getBinaryTreeNode(data:T): BinaryTreeNode<T>{
    return {left:null, right: null, data}
  }

  //I use this method to recursively move through the binary tree node
  private traversalUsingRecusrsion(node: BinaryTreeNode<T>, output:T[], which: TRAVERSAL_TYPE){
    //
    if(which === "in_order"){
      //if the node has a left node recursively move through the node
      if(node.left){
        this.traversalUsingRecusrsion(node.left, output, which)
      }//end if
  
      //add the data
      output.push(node.data)
  
      //move through the right node
      if(node.right){
        this.traversalUsingRecusrsion(node.right, output, which)
      }//end if
    }//end if

    //if pre order traversal
    else if(which === "pre_order"){
      output.push(node.data)

      if(node.left){
        this.traversalUsingRecusrsion(node.left, output, "pre_order")
      }

      if(node.right){
        this.traversalUsingRecusrsion(node.right, output, "pre_order")
      }
    }

    //post order traversal
    else if(which === "post_order"){
      if(node.left){
        this.traversalUsingRecusrsion(node.left, output, "post_order")
      }
      if(node.right){
        this.traversalUsingRecusrsion(node.right, output, "post_order")
      }
      output.push(node.data)
    }//end if
  }//end method

  //I need this function to get all the node on the left side of the binary tree
  private getAllLeftNode(node: BinaryTreeNode<T>,  nodes: BinaryTreeNode<T>[],): void{
    //push the current node to node array
    nodes.push(node)

    //while node has left node
    while(node.left){
      //push to array
      nodes.push(node.left)
      //move to the left node
      node = node.left
    }//end while loop
  }//end get

  //I need this function to get all nodes on the same level
  private getAllNodesOnTheSameLevel(
    nodesOnTheSameLevel:BinaryTreeNode<T>[],
    //store the data on the node
    output: T[]
  ){
    //store all the node on the same level
    const newNodesOnTheSameLevel: BinaryTreeNode<T>[] = []
    //loop through all node on the same level
    for(const node of nodesOnTheSameLevel){
      //add the data on the node to output arra
      output.push(node.data)
      //if the node as a left child
      if(node.left){
        //push to array
        newNodesOnTheSameLevel.push(node.left)
      }//end if
      //if the node as a right child node
      if(node.right){
        //push to array
        newNodesOnTheSameLevel.push(node.right)
      }//end if
    }//end for loop

    //return the array to caller
    return newNodesOnTheSameLevel
  }//end private method

  private diagonalTravesalHelper(diagonalNodes:BinaryTreeNode<T>[], output:T[][]): BinaryTreeNode<T>[]{
    //
    const nextDiagonalNode: BinaryTreeNode<T>[] = []
    const diagonalData: T[] = []
    //loop through the diagonal node
    for(const node of diagonalNodes){
      //add the data
      diagonalData.push(node.data)
      //if current node as a left child, push to the next diagonal node queue
      if(node.left){
        nextDiagonalNode.push(node.left)
      }
      //if has next right child
      let rightNode: BinaryTreeNode<T> | null = node.right

      //if right node is not null
      while(rightNode){
        //add the data
        diagonalData.push(rightNode.data)
        //if the node as a left child
        if(rightNode.left){
          //push to queue
          nextDiagonalNode.push(rightNode.left)
        }//end if
        rightNode = rightNode.right
      }//end while
    }//end for loop
    
    output.push(diagonalData)

    return nextDiagonalNode
  }//end function

  /**
   * 
   * Method to insert new binary tree node to the binary tree.
   */
  insert(data: T): BinaryTree<T>{
    //if the root node is null
    if(!this.root){
      //insert node to the root.
      this.root = this.getBinaryTreeNode(data)
      //return object for chaining
      return this
    }//end if

    //create array of nodes to insert
    const nodes: BinaryTreeNode<T>[] = [this.root]

    //hold the current node
    let node: BinaryTreeNode<T> | undefined
    //get the node at the front of the queue
    while(node = nodes.shift()){
      //if the current node has a left child
      if(node.left){
        //push th child to the queue
        nodes.push(node.left)
      }else{
        //the left child as a null value, create a new node and insert there.
        node.left = this.getBinaryTreeNode(data)
        //return current object for method chaining, and prevent execution from getting down
        return this
      }//end if

      //if the current node as a right child
      if(node.right){
        //push the child to array
        nodes.push(node.right)
      }else{
        //else its null create new node and assign to this right child
        node.right = this.getBinaryTreeNode(data)
        //
        return this
      }
    }//end while loop
    return this
  }//end method insert

  /**
   * In-order traversal of a binary tree is a depth-first traversal method where nodes are visited in a specific order: left subtree, root node, and then right subtree. 
   * This traversal is commonly used when the goal is to retrieve the values of the nodes in a sorted order, especially for binary search trees (BSTs). 
   * The process is recursive, starting from the root and applying the same steps to each subtree. 
   * In an in-order traversal, the nodes are visited in ascending order if the tree is a BST.
   * 
   * Inorder traversal visits the node in the order: Left -> Root -> Right
   * Algorithm
   * Inorder(tree)
   * Traverse the left subtree, i.e., call Inorder(left->subtree)
   * Visit the root.
   * Traverse the right subtree, i.e., call Inorder(right->subtree)
   */
  inOrderTraversalUsingIteration(){
    //variable to store data in the binary tree
    const output: T[] = []
    //if the root node is null, return empty array
    if(!this.root) return output
    //queue to store each node
    const nodes: BinaryTreeNode<T>[] = []
    //get all left node, and push to array
    this.getAllLeftNode(this.root, nodes)

    let node: BinaryTreeNode<T> | undefined
    //remove from the back of the queue
    while(node = nodes.pop()){
      //get data from the node which is going to be left leaf node on the first loop
      output.push(node.data)
      //if the node has a right node, get all the node on the left node, I need to process the node on the left branch first
      if(node.right){
        this.getAllLeftNode(node.right, nodes)
      }//end if
    }//end while
    //return data back to caller
    return output
  }

  inOrderTraversalUsingRecusrsion(){
    const output: T[] = []
    
    if(!this.root) return output

    this.traversalUsingRecusrsion(this.root, output, "in_order")

    return output
  }

  /**
   * 
   * Preorder traversal visits the node in the order: Root -> Left -> Right
   * 
   * Preorder(tree)
   * Visit the root.
   * Traverse the left subtree, i.e., call Preorder(left->subtree)
   * Traverse the right subtree, i.e., call Preorder(right->subtree)
   * 
   * Pre-order traversal of a binary tree is a depth-first traversal method where nodes are visited in the following order: 
   * 1. **Visit the root node** first.
   * 2. **Traverse the left subtree** by recursively applying the pre-order process.
   * 3. **Traverse the right subtree** by recursively applying the pre-order process.
   * This method is particularly useful when you need to process or print the root node before dealing with its subtrees. 
   * Pre-order traversal is often used for tasks like copying the tree, prefix expression notation, or constructing the tree structure. 
   * The order of traversal ensures that the root is always processed before any of its children.
   */
  preOrderTraversalUsingIteration(){
    //store the data of all the node on the binary tree
    const output: T[] = []
    //if the root node is null return empty array
    if(!this.root) return output
    //create the queue to store all the node
    const nodes: BinaryTreeNode<T>[] = []
    //get all the left node of the tree
    this.getAllLeftNode(this.root, nodes)
    //
    let node: BinaryTreeNode<T> | undefined
    //store all the right node of the binary tree until they are processed
    let rightNodes: BinaryTreeNode<T>[] = []
    //infinity loop
    while(true){
      //get the node from queue
      node = nodes.shift()
      if(node){

        output.push(node.data)
        //if the node as a right child
        if(node.right){
          //push it to the right node queue
          rightNodes.push(node.right)
        }
      }
      //if done with processing from the main queue
      else{
        //get node from the right queue
        const fromRightNode = rightNodes.pop()
        //if not undefined
        if(fromRightNode){
          //push the node to the main queue
          this.getAllLeftNode(fromRightNode, nodes)
        }else{
          //Done with processing the whole tree, break out of the loop.
          break
        }//end else
      }//end else
    }//end while loop
    return output
  }//end method

  preOrderTraversalUsingRecursion(){
    const output: T[] = []

    if(!this.root) return output

    this.traversalUsingRecusrsion(this.root, output, "pre_order")

    return output
  }

  /**
   * Postorder traversal visits the node in the order: Left -> Right -> Root
   * 
   * Algorithm Postorder(tree)
   * Traverse the left subtree, i.e., call Postorder(left->subtree)
   * Traverse the right subtree, i.e., call Postorder(right->subtree)
   * Visit the root
   * 
   * Post-order traversal of a binary tree is a depth-first traversal method where nodes are visited in the following order:
   * 1. **Traverse the left subtree** by recursively applying the post-order process.
   * 2. **Traverse the right subtree** by recursively applying the post-order process.
   * 3. **Visit the root node** last.
   * In this traversal, the root node is processed only after both its left and right subtrees have been completely traversed. 
   * Post-order traversal is particularly useful in scenarios where you need to delete or free nodes, as it ensures that all child nodes 
   * are handled before their parent node. It is also used in evaluating expressions represented by expression trees, 
   * where the leaves represent operands and the internal nodes represent operators.
   */
  postOrderTraversalUsingIteration(){
    const output: T[] = []

    if(!this.root) return output

    const nodes: BinaryTreeNode<T>[] = []

    this.getAllLeftNode(this.root, nodes)

    let node: BinaryTreeNode<T> | undefined

    //pop the node from queue, this will be root node for the first loop
    while(node = nodes.pop()){
      //if the node as a right child
      if(node.right){
        //I don't want to reprocess the right sub-tree, that's why am creating
        //a copy of the node without the right sub-tree
        nodes.push(this.getBinaryTreeNode(node.data))
        //get all the left child of the right node
        this.getAllLeftNode(node.right, nodes)
      }//end if
      else{
        output.push(node.data)
      }//end else
    }//end while loop

    return output
  }//end method

  postOrderTraversalUsingRecursion(){
    const output: T[] = []

    if(!this.root) return output

    this.traversalUsingRecusrsion(this.root, output, "post_order")

    return output
  }

  /**
   * Level Order Traversal visits all nodes present in the same level completely before visiting the next level.
   * 
   * Algorithm for Level Order Traversal:
   * LevelOrder(tree)
   *    Create an empty queue Q
   *    Enqueue the root node of the tree to Q
   *    Loop while Q is not empty
   *      Dequeue a node from Q and visit it
   *      Enqueue the left child of the dequeued node if it exists
   *      Enqueue the right child of the dequeued node if it exists
   * 
   * Level-order traversal of a binary tree is a breadth-first traversal method where nodes are visited level by level, 
   * starting from the root and moving from left to right at each level. The process works as follows:
   * 1. **Start at the root node.**
   * 2. Visit all nodes at the current level, from left to right.
   * 3. Move to the next level and repeat the process until all levels have been traversed.
   * To implement level-order traversal, a queue is often used. The root node is enqueued first, and then nodes are dequeued one by one, 
   * with their child nodes being enqueued for future visits. This method is particularly useful for operations that need to process 
   * nodes in the order of their depth, such as printing the tree level by level or finding the shortest path in an unweighted tree.
   */

  levelOrderTraversal(){
    const output: T[] = []

    if(!this.root) return output

    let nodeOnTheSameLevel: BinaryTreeNode<T>[] = [this.root]

    while(nodeOnTheSameLevel.length > 0){
      //get all nodes on the same level
      nodeOnTheSameLevel = this.getAllNodesOnTheSameLevel(nodeOnTheSameLevel, output)
    }//end while loop

    return output
  }//end method

  //https://www.geeksforgeeks.org/boundary-traversal-of-binary-tree/
  /**
   * 
   * Boundary traversal of a binary tree involves visiting the nodes on the boundary of the tree in a specific order: starting from the left boundary, 
   * then the leaves, and finally the right boundary. The boundary traversal typically includes three main steps:
   * 1. **Left Boundary**: Traverse the left boundary of the tree, starting from the root and moving downward. 
   * This includes all nodes that do not have a left child, stopping before the last leaf node.
   * 2. **Leaves**: Traverse all leaf nodes from left to right. This includes the leaf nodes on both the left and right subtrees.
   * 3. **Right Boundary**: Traverse the right boundary of the tree from bottom to top, excluding the last leaf node and stopping at the root. 
   * This includes all nodes that do not have a right child.
   * 
   * The boundary traversal ensures that each boundary node of the tree is visited in a continuous path, starting from the root, moving 
   * down the left side, then across the leaves, and finally up the right side. It’s a combination of pre-order traversal for the left boundary, 
   * in-order for the leaves, and reverse pre-order for the right boundary.
   */
  boundaryTraversal(){
    
    const output: T[] = []

    if(!this.root) return output

    //add the root data
    output.push(this.root.data)

    let node: BinaryTreeNode<T> = this.root

    //add the left boundary without the left leaf node
    while(node.left && node.left.left){
      output.push(node.left.data)
      node = node.left
    }//end while loop

    //add the leaf node
    let nodes: BinaryTreeNode<T>[] = [this.root]
    let n: BinaryTreeNode<T> | undefined  
    
    while(n = nodes.pop()){
      
      if(n.right){
        nodes.push(n.right)
      }

      if(n.left){
        nodes.push(n.left)
      }

      if(!n.left || !n.right){
        output.push(n.data)
      }
    }//end while loop

    //add the right boundary without the right leaf node
    node = this.root
    while(node.right && node.right.right){
      output.push(node.right.data)
      node = node.right
    }//end while loop

    return output;
  }//end method

  /**
   * Diagonal traversal of a binary tree is a technique where nodes are grouped and visited based on their diagonal levels. 
   * In this traversal, all nodes with the same diagonal distance from the root are processed together. The diagonal distance is 
   * determined by how far a node is shifted to the right or left as you move down the tree.
   * 
   * Here’s how diagonal traversal works:
   * 1. **Diagonal Grouping**: Nodes are grouped based on their distance from the root, where:
   *    - The root node has a diagonal distance of 0.
   *    - Moving to a right child keeps the diagonal distance the same.
   *    - Moving to a left child increases the diagonal distance by 1.
   * 
   * 2. **Traversal Process**:
   *    - Start from the root and traverse the tree diagonally.
   *    - For each node, add it to the group corresponding to its diagonal distance.
   *    - First, visit the current node, then recursively visit its right child (which remains on the same diagonal), 
   *      and finally, visit its left child (which will be on the next diagonal).
   * 
   * 3. **Output**: After grouping nodes by their diagonal levels, the nodes are typically printed level by level, 
   * from the topmost diagonal (closest to the root) to the bottommost diagonal.
   * 
   * Diagonal traversal is useful for problems where you need to view the tree in a diagonal perspective, such as summing values 
   * along diagonals or extracting diagonal elements. The result is a list of nodes grouped by their diagonals, giving insight into 
   * the tree's structure from a different angle.
   */
  diagonalTravesal(){
    const output: T[][] = []

    if(!this.root) return output

    let nextDiagonalNode: BinaryTreeNode<T>[] = this.diagonalTravesalHelper([this.root], output)

    while(nextDiagonalNode.length > 0){
      nextDiagonalNode = this.diagonalTravesalHelper(nextDiagonalNode, output)
    }

    return output
  }
}