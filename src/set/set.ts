//I have to use this name so there won't be conflict
//with that of the javascript 
export default class MySet<T>{
  
  private collection: T[] = []
  
  constructor(...collection:T[]){
    for(const element of collection){
      if(this.collection.indexOf(element) < 0){
        this.collection.push(element)
      }
    }
  }

  add(element: T): boolean{
    //if the element already exist return false to indicate, element was not added
    if(this.collection.indexOf(element) > -1) return false
    //push to collection
    this.collection.push(element)
    //return true to let caller know addition was successful
    return true
  }

  remove(element: T): boolean{
    //get the index of the element in the collection
    const index = this.collection.indexOf(element)
    //in the index is less than zero return false, not exist in collection
    if(index < 0) return false

    //delete the element from collection
    this.collection.splice(index, 1)

    return true
  }//end method

  values(): T[]{
    return this.collection
  }

  has(element: T): boolean{
    return this.collection.indexOf(element) > -1
  }

  size(): number{
    return this.collection.length
  }

  union(otherSet:MySet<T>): MySet<T>{
    //create a new set
    const newSet = new MySet<T>()

    //loop through the current set and add to new set
    for(const element of this.values()){
      //add method ensure we can't add a duplicate element
      newSet.add(element)
    }//ennd for loop

    //add the element of the second set
    for(const element of otherSet.values()){
      newSet.add(element)  
    }//end for loop

    return newSet
  }

  /**
   * 
   * Intersect contain element that exists in both set
   */
  intersect(otherSet: MySet<T>){
    const newSet = new MySet<T>()

    for(const element of this.values()){
      if(otherSet.has(element)){
        newSet.add(element)
      }//if the 
    }//end for loop

    return newSet
  }//end method

  /**
   * 
   * This method get elemnt not in other set but exists in this set
   */
  difference(otherSet: MySet<T>): MySet<T>{
    const diffSet = new MySet<T>()
    for(const element of this.values()){
      if(!otherSet.has(element)){
        diffSet.add(element)
      }//end if
    }//end for loop
    return diffSet
  }//end method

  subset(otherSet: MySet<T>): boolean{
    for(const element of this.values()){
      if(!otherSet.has(element)) return false
    }
    return true
  }
}