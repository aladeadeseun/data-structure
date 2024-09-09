/**
 * https://www.geeksforgeeks.org/introduction-to-binary-search-tree/
 * https://www.geeksforgeeks.org/applications-of-bst/
 * https://www.geeksforgeeks.org/binary-search-tree-traversal-inorder-preorder-post-order/
 */
type BSTNode = {
  left: BSTNode | null;
  right:BSTNode | null;
  data:number
}

//I need this for the recursion helper method
type TRAVERSAL_TYPE = "pre_order" | "in_order" | "post_order"

export default class BST{

  private root:BSTNode | null = null

  constructor(rootNodeData?:number){
    //if the root node data is sent, set it as node
    if(rootNodeData){
      this.root = this.getBSTNode(rootNodeData)
    }
  }

  private getBSTNode(data:number){

    return {
      left:null,
      right:null,
      data
    }

  }

  //I use this method to recursively move through the binary tree node
  private traversalUsingRecusrsion(node: BSTNode, output:number[], which: TRAVERSAL_TYPE){
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

  private getAllNodesOnTheSameLevel(nodesOnTheSameLevel:BSTNode[], output?:number[]){
    //store all the node on the same level
    const newNodesOnTheSameLevel: BSTNode[] = []

    const addOutput = Array.isArray(output)

    //loop through all node on the same level
    for(const node of nodesOnTheSameLevel){
      //to add data to array
      if(addOutput) output.push(node.data)
        
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

  private findMaxOrMinHeight(findMin: boolean){
    //if the root node is null, return 0
    if(!this.root) return -1
    //initialize to root
    let nodesOnTheSameLevel: BSTNode[] = [this.root]

    //set depth to zero
    let depth = 0
    
    do{
      //get all node at this level
      nodesOnTheSameLevel = this.getAllNodesOnTheSameLevel(nodesOnTheSameLevel)
      
      //if to find min height, once I reach a node which is a leaf node break or 
      //I am just tryuing to check if at each level the total number of nodes which are direct descendant are up to the number expected
      //e.g At level 2 direct descendant will be 4
      if((findMin && (nodesOnTheSameLevel.length !== ((depth + 1) * 2))) || (nodesOnTheSameLevel.length < 1)) break

      //increment 
      depth++

      //if arrey is not empty
    }while(true);
    //return depth to caller
    return depth
  }

  insert(data:number){
    //if root node is null
    if(!this.root){
      this.root = this.getBSTNode(data);
      return this
    }
    let currentNode: BSTNode = this.root

    while(true){

      //ensure there's no addition of duplicate to bst
      if(currentNode.data === data){
        return this
      }
      //if the current node data is less than value to insert
      //then put at the right side of the tree
      else if(currentNode.data < data){
        //has right tree
        if(currentNode.right){
          //set the right tree as the current node
          currentNode = currentNode.right
        }else{
          //else set new node as the right tree node
          currentNode.right = this.getBSTNode(data)
          //return this for method chaining
          return this
        }//end else
      }//end if
      //else put at the right side of the tree
      else{
        if(currentNode.left){
          currentNode = currentNode.left
        }else{
          currentNode.left = this.getBSTNode(data)
          return this
        }//end else
      }//end else
    }//end while loop
  }

  /**
   * 
   * The minimum number will be located on the left node leaf.
   */
  findMin(){
    //if the root node is null, return false
    if(!this.root) return false
    //get current node
    let currentNode: BSTNode = this.root
    //
    while(true){
      //if the current node does not have a left child, return it's data
      if(!currentNode.left) return currentNode.data
      //set current node to the left child
      currentNode = currentNode.left
    }//end while loop
  }//end method

  /**
   * The largest number will be located on the leaf of the right child
   */
  findMax(){
    if(!this.root) return false
    let currentNode = this.root
    while(true){
      //if the current node does not have a right child, return it's data
      if(!currentNode.right) return currentNode.data
      //set current node as the right child
      currentNode = currentNode.right
    }//end while
  }//end method

  find(data:number): BSTNode | null{
    //if root is null return false
    if(!this.root) return null
    //set current node to root
    let currentNode: BSTNode = this.root

    //loop through BST
    while(true){
      //if the current node contain data that I am searching for return true
      if(currentNode.data === data) return currentNode

      //if the current node data is less than data being search for,
      //I need to move to the left of the BST else move to the right.
      if(data < currentNode.data){
        //if current node is the leaf node return false
        if(!currentNode.left) return null
        //move to the left side of the BST
        currentNode = currentNode.left
      }else{
        //if current node is the leaf node return false
        if(!currentNode.right) return null
        //move to the right side of the BST
        currentNode = currentNode.right
      }
    }//end while loop
  }//end method

  isPresent(data:number): boolean{
    
    //if root is null return false
    if(!this.root) return false
    //set current node to root
    let currentNode: BSTNode = this.root

    //loop through BST
    while(true){
      //if the current node contain data that I am searching for return true
      if(currentNode.data === data) return true

      //if the current node data is less than data being search for,
      //I need to move to the left of the BST else move to the right.
      if(data < currentNode.data){
        //if current node is the leaf node return false
        if(!currentNode.left) return false
        //move to the left side of the BST
        currentNode = currentNode.left
      }else{
        //if current node is the leaf node return false
        if(!currentNode.right) return false
        //move to the right side of the BST
        currentNode = currentNode.right
      }
    }//end while loop
  }//end class

  /**
   * 
   * It is used to delete a node with specific key from the BST and return the new BST.
   */
  remove(data: number): boolean{
    //if no root node, no deletion or removal, return false
    if(!this.root) return false


    let currentNode: BSTNode = this.root
    let parentNode: BSTNode | null = null

    while(true){
      //if the current node match data to delete
      if(currentNode.data === data){
        //if the current node is the root node
        /**
         * Here we have to delete the node is such a way, that the resulting tree follows the properties of a BST.  
         * The trick is to find the inorder successor of the node. Copy contents of the inorder successor to the node, 
         * and delete the inorder successor.
         */
        if(currentNode.left && currentNode.right){
          //from the left sub tree get the largest value
          //If taking if from the left subtree, we have to take the largest value in the left subtree.
          let temp = currentNode.left

          //I need to initialize parent now cos am going to need it later
          parentNode = null
          //get the in-order successor of the left sub-tree
          while(temp.right){
            parentNode = temp
            temp = temp.right
          }//end while loop

          if(parentNode){
            //set current node data to temp data
            currentNode.data = temp.data
            //this will delete leaf node on the right side of the left subtree
            parentNode.right = null
          }else{
            //if this happen the current node have one descedant child
            //which will be on the left leaf
            if(currentNode.left === temp){
              currentNode.data = temp.data
              //set the 
              currentNode.left = null
            }else{
              //if this is true, the data to delete is the root node
              //and the root node only have one child
              this.root.data = temp.data
              this.root.left = null
            }
          }
        }
        /**
         * Node to be deleted has one child :
         * You can just replace the node with the child node.
         */
        //if the current node only have left child
        else if(currentNode.left){
          //I could have written the code like this, but for readability
          //and simplicity am sticking to the more expresive way
          //(parentNode || this.root).left = currentNode.left
          //if there's a parent node
          if(parentNode){
            //set parent node left child to current node left child
            parentNode.left = currentNode.left
          }else{
            //set the root child to current node left child
            this.root = currentNode.left
          }
        }
        else if(currentNode.right){
          //if there's a parent
          if(parentNode){
            //set parent right child to current node right child
            parentNode.right = currentNode.right
          }else{
            //else set root
            this.root = currentNode.right
          }
        }

        /**
         * Node to be deleted is the leaf node :
         * Its simple you can just null it out.
         */
        //this will only execute when current node is a leaf node
        //
        else{
          if(parentNode){
            //I need to determine the leaf to delete
            if(parentNode.left === currentNode){
              parentNode.left = null
            }else{
              parentNode.right = null
            }
          }else{
            this.root = null
          }
        }
        return true
      }//end if
      //if the data is less than current node data, move to the left BST.
      else if(data < currentNode.data){
        //if the current node is leaf node return false
        //i.e reach leaf node
        if(!currentNode.left) return false
        //set parent node of the next chiuld as current node
        parentNode = currentNode
        //set left child as current node
        currentNode = currentNode.left
      }//end if
      else{
        //reach leaf
        if(!currentNode.right) return false
        //set parent of child node as current node
        parentNode = currentNode
        currentNode = currentNode.right
      }//end else
    }//end while loop
  }//end method

  /**
   * At first traverse left subtree then visit the root and then traverse the right subtree.
   * 
   * The inorder traversal of the BST gives the values of the nodes in sorted order. 
   * To get the decreasing order visit the right, root, and left subtree.
   */
  inOrderTraversalUsingRecusrsion(){
    const output: number[] = []
    
    if(!this.root) return output

    this.traversalUsingRecusrsion(this.root, output, "in_order")

    return output
  }

  /**
   * At first visit the root then traverse left subtree and then traverse the right subtree.
   * 
   * Follow the below steps to implement the idea:
   *    - Visit the root and print the data.
   *    - Traverse left subtree
   *    - Traverse the right subtree
   */
  preOrderTraversalUsingRecursion(){
    const output: number[] = []

    if(!this.root) return output

    this.traversalUsingRecusrsion(this.root, output, "pre_order")

    return output
  }

  /**
   *
   * At first traverse left subtree then traverse the right subtree and then visit the root.
   * Follow the below steps to implement the idea:
   *    -Traverse left subtree
   *    -Traverse the right subtree
   *    -Visit the root and print the data.
   */
  postOrderTraversalUsingRecursion(){
    const output: number[] = []

    if(!this.root) return output

    this.traversalUsingRecusrsion(this.root, output, "post_order")

    return output
  }

  minHeight(){
    return this.findMaxOrMinHeight(true)
  }

  maxHeight(){
    return this.findMaxOrMinHeight(false)
  }//end method

  isBalance(){
    return ((this.maxHeight() - this.minHeight()) <= 1)
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
    const output: number[] = []

    if(!this.root) return output

    let nodeOnTheSameLevel: BSTNode[] = [this.root]

    while(nodeOnTheSameLevel.length > 0){
      //get all nodes on the same level
      nodeOnTheSameLevel = this.getAllNodesOnTheSameLevel(nodeOnTheSameLevel, output)
    }//end while loop

    return output
  }//end method
}//end class
