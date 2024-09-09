type LinkNode<T> = {
  next:LinkNode<T> | null,
  data:T
}

export default class LinkList<T>{
  private head: LinkNode<T> | null = null
  private length: number = 0

  constructor(data?: T){
    if(data){
      this.head = this.getNextNode(data)
    }
  }

  private getNextNode(data: T): LinkNode<T>{
    //increment length of the link list
    ++this.length
    //create new link list
    return {next:null, data}
  }

  size(){
    //return the size of the link list
    return this.length
  }

  /**
   * Add new node to link list.
   */
  add(data:T){
    //if the head is null
    if(!this.head){
      //create new node and add to head
      this.head = this.getNextNode(data)
      //return this for method chaining
      return this
    }//end if

    //set current node as head
    let currentNode: LinkNode<T> = this.head

    //if the current node have a next node
    while(currentNode.next){
      //set current node as next node
      currentNode = currentNode.next
    }
    //set next node as new node
    currentNode.next = this.getNextNode(data)
    //return this 
    return this
  }

  /**
   * delete a node which contain the given data
   */
  remove(data: T){
    if(!this.head) return false

    let currentNode: LinkNode<T> | null = this.head
    let parentNode: LinkNode<T> | null = null

    while(currentNode){
      if(currentNode.data === data){
        //if current node as a parent
        if(parentNode){
          //set parent next to current node next
          parentNode.next = currentNode.next
        }else{
          //The head is being deleted, set head to current node i.e
          //head to head next
          this.head = currentNode.next
        }
        //decrement length
        this.length -= 1
        //return true, find and deleted
        return true
      }//end if(currentNode.data === data)
      //set parent as current node
      parentNode = currentNode
      //move to next node
      currentNode = currentNode.next
    }//end while loop
    return false
  }//end methid

  getData(): T[]{
    //store the data to be sent back to caller
    const output: T[] = []
    //store current node
    let currentNode: LinkNode<T> | null = this.head
    //if current node is not null
    while(currentNode){
      //push data to output
      output.push(currentNode.data)
      //store current node
      currentNode = currentNode.next
    }//end while loop
    //retuurn data back to caller
    return output
  }

  isEmpty(){
    return this.length === 0
  }

  indexOf(data:T){
    //initialize to -1
    let index: number = -1
    //store current node
    let currentNode: LinkNode<T> | null = this.head
    //while current node is not null
    while(currentNode){
      //increment index by 1
      ++index
      //if the data is found, return index
      if(currentNode.data === data) return index
      //set current node as next node
      currentNode = currentNode.next
    }//end else
    return -1
  }

  elementAt(index: number){
    if((index >= this.length) || (index < 0)) return null

    let indexCounter = 0

    let currentNode: LinkNode<T> | null = this.head

    while(currentNode){
      if(indexCounter === index){
        return currentNode.data
      }
      indexCounter += 1
      currentNode = currentNode.next
    }

    return null
  }//end method

  insertAt(index: number, data: T){
    if((index > this.length) || (index < 0)) return false

    let indexCounter = 0

    let currentNode: LinkNode<T> | null = this.head
    let parentNode: LinkNode<T> | null = null

    while(currentNode){
      if(indexCounter === index){
        
        if(parentNode){
          //set the parent next node as new new node to insert
          parentNode.next = this.getNextNode(data)
          //set current node as parent node next's next
          parentNode.next.next = currentNode
        }//end if(parentNode)
        else{
          //temporarily set head value
          const temp = this.head
          //create new node and set as head
          this.head = this.getNextNode(data)
          //set head next as previous head
          this.head.next = temp
        }//end else
        //this.length
        return true
      }
      //increment index counter
      indexCounter += 1
      //set parent node
      parentNode = currentNode
      //set the current node as next node
      currentNode = currentNode.next
    }//end while
    //if the execution reaches here I am going to insert the node behind
    //parent node
    if(parentNode){
      parentNode.next = this.getNextNode(data)
      //return true back to caller
      return true
    }
    //return false
    return false
  }//end insert at

  removeAt(index: number){
    //if the index is out of range, return false
    if(index < 0 || index >= this.length) return false
    //set parent node to null
    let parentNode: LinkNode<T> | null = null
    //set current node to head
    let currentNode: LinkNode<T> | null = this.head
    //set counter to zero
    let indexCounter: number = 0
    //if the current node is not null, which should be not
    while(currentNode){
      //if the 
      if(indexCounter === index){
        //if parent node
        if(parentNode){
          //set parent node next to current node next
          parentNode.next = currentNode.next
        }else{
          //set head to current node next
          this.head = currentNode.next
        }
        //crement link list length
        this.length -= 1
        //return true to indicate node was deleted
        return true
      }//end if
      //set parent to current node
      parentNode = currentNode
      //set current node to next node
      currentNode = currentNode.next
      indexCounter += 1
    }//end while loop
    //if execution reaches here return false
    return false
  }//end method
}//end class