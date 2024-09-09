
/**
 * 
 * A program to print a diamond-shaped pattern using asterisks is typically designed to display a symmetric figure that resembles a diamond. 
 * The program first prints an upward triangle where the number of asterisks increases with each row, centered by spaces. 
 * After reaching the widest point, it then prints a downward triangle, decreasing the number of asterisks per row symmetrically. 
 * The total number of rows in the diamond is determined by the user or a predefined value, ensuring that the pattern is properly centered and aligned.
 */
function printDiamondPattern(oddNumber: number){

  //Ensure number is odd number and between 1 and 19.
  if(oddNumber < 1 || oddNumber > 19 || (oddNumber % 2 === 0)){
    return console.error("Enter odd number between 1 to 19.")
  }

  //get middle point
  const middlePoint = Math.ceil(oddNumber / 2)
  //I need this step to determine number of space and asterisk to print
  let step = 1

  for(let counter = 1; counter <= oddNumber; counter++){
    //determine the number of space both on the left and the right hand side  
    const spaceLen = ((oddNumber - step) / 2)
    //get space
    let pattern = getSpace(spaceLen)
    //get asterisks
    pattern += getAsterisks(step)
    //get space on the left hand-side
    pattern += getSpace(spaceLen)

    //print the pattern
    console.log(pattern)

    //After reaching the widest point, it then prints a downward triangle, decreasing the number of asterisks per row symmetrically.
    if(counter >= middlePoint){
      step -= 2
    }else{
      step += 2
    }
    
  }//end for loop
}

function getSpace(spaceLen: number){
  let spaces = ""
  for(let spaceCounter = 0; spaceCounter < spaceLen; spaceCounter++){
    spaces += " "
  }

  return spaces
}

function getAsterisks(asteriskLen: number){
  let asterisks = ""
  for(let asteriskCounter = 0; asteriskCounter < asteriskLen; asteriskCounter++){
    asterisks += "*"
  }
  return asterisks
}

printDiamondPattern(21)