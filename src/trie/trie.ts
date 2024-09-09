/**
 * {
 * 		'a':{
 *   		next: {
 *     	t: { next: null, isEnd: true },
 *     	n: { next: null, isEnd: true },
 *     	m: { next: null, isEnd: true }
 *   	},
 *   	isEnd: false
 * 		}
 *	}
 */
//store all the allowed alpahebelts
const ALPHABETS = "abcdefghijklmnopqrstuvwxyz"

/**
 * The node definitiion. 
 * I am using number because I want the node to be ordered, the word to be ordered so am going to use the 
 * alphabelt index value as the key a = 0, b = 1
 */
type TrieNode = Record<number, {isEnd:boolean,next:TrieNode | null}>

type TrieNodeWithPrefix = {prefix:string, node:TrieNode}

//class
export default class Trie{
	//initialize the root node
  private root:TrieNode = {}

	//utility to create a new node
	private getTrieNode(isEnd:boolean){
		return {next:null, isEnd}
	}

	//ensure any character which is not an alphebelt is not allowed
	private validateWord(word: string){
		for(const char of word){
			if(ALPHABETS.indexOf(char) < 0) {
				throw new Error(`Invalid '${char}' in ${word}`)
			}//end if
		}
	}//end function

	//method to insert word
	insert(word: string){
		//don't allow empty string
		if(word.length < 1) throw new Error("Cannot insert empty string.")
		//convert to lower case
		word = word.toLocaleLowerCase()
		//ensure word contain chracter in alphabelt
		this.validateWord(word)

		//get the first character index
		let alphabeltIndex:number = ALPHABETS.indexOf(word[0])
		//indicate if end of char
		let isEnd = ((word.length - 1) === 0)
		
		//if the character is not yet added
		if(!this.root[alphabeltIndex]){
			//add a new node and set the character as the key
			this.root[alphabeltIndex] = this.getTrieNode(isEnd)
		}//end if

		//set node as the one coming from the root
		let node = this.root[alphabeltIndex]
		//loop through the rest of the word
		for(let index = 1; index < word.length; index++){
			//get the next character index
			alphabeltIndex = ALPHABETS.indexOf(word[index])

			//check if its the end of the world
			isEnd = (index >= (word.length - 1))

			//if the node as a next node
			if(node.next){
				//if the character index already exists
				if(node.next[alphabeltIndex]){
					//and it's end of the word
					if(isEnd){
						//set it
						node.next[alphabeltIndex].isEnd = isEnd
					}//end if
				}//end if
				else{
					//create new node and set it as the value of the next 
					node.next[alphabeltIndex] = this.getTrieNode(isEnd)
				}
			}else{
				node.next = {[alphabeltIndex]:this.getTrieNode(isEnd)}
			}
			//set as the next node
			node = node.next[alphabeltIndex]
		}//end for loop
	}//end method insert

	search(word: string): boolean{
		//validate the word
		this.validateWord(word)
		
		//let me know if I already reach the end of the word
		let isEnd: boolean = false

		//store the current node
		let node: TrieNode = this.root

		//loop through the word, one character at a time
		for(let index = 0; index < word.length; index++){
			const alphabeltIndex: number = ALPHABETS.indexOf(word[index])
			//if the word is not 
			if(!node[alphabeltIndex]) return false
			//let me know if I already reach the end of the word 
			isEnd = (index >= (word.length - 1))
			//if end of the word
			if(isEnd){
				//return the current character end
				return node[alphabeltIndex].isEnd
			}

			//If there's is a next node
			if(node[alphabeltIndex].next) {
				//store as the current node
				node = node[alphabeltIndex].next
			}else{
				//else we have reach the end of the node, word does not exists, return false
				return false
			}
		}
		//finally return false, execution should not reach here
		return false
	}//end function

	private getWordFromNodeUsingRecursion(node:TrieNode, store:string[]=[], prefix: string=""){
		//loop through th node starting from the root object
		for(const key in node){

			const char = ALPHABETS[key]
			//if the correct node is end of word push to array
			if(node[key].isEnd){
				store.push(`${prefix}${char}`)
			}

			//if it has next node
			if(node[key].next){
				//call method(self) recursively
				this.getWordFromNodeUsingRecursion(node[key].next, store, `${prefix}${char}`)
			}//end for loop
		}//end for loop
	}//end method

	printAllWord(){
		//array to store the words in the trie tree
		let output: string[] = []
		//call a recursive method to get the word from the trie node tree
		this.getWordFromNodeUsingRecursion(this.root, output, "")
		//return array back to caller
		return output
	}//end method

	/**
	 * 
	 * I need this method to store prefix as key and the next node as value
	 */
	private getNodeWithPrefixList(node:TrieNode, output:string[], prefix:string=""){
		//store the key as prefix by concatenating previous key(s) with current key
		const nodeWithPrefixList: TrieNodeWithPrefix[] = []

		//loop through current node
		for(const key in node){
			
			const char = ALPHABETS[key]
			//if its end of word push to array
			if(node[key].isEnd){
				output.push(`${prefix}${char}`)
			}
			//if the current node as next node
			if(node[key].next){
				//add to object by setting the previous key(s) and current key as the key and
				//the next mode as the value
				nodeWithPrefixList.push({
					prefix:`${prefix}${char}`,
					node:node[key].next
				})
			}//end if
		}//end for loop

		return nodeWithPrefixList.length > 0 ? nodeWithPrefixList : false
	}

	printAllWordUsingIteration(){
		//store the list of word from trie nodes
		const output: string[] = []

		//get nodes with prefix array
		let nodeWithPrefixList: TrieNodeWithPrefix[] | false = this.getNodeWithPrefixList(
			this.root, output, ""
		)
		
		//if false is return, return output
		if(nodeWithPrefixList === false) return output
		
		//loop continously
		do{
			//get the node with 
			const tempNodeWithPrefix = nodeWithPrefixList.pop()

			if(!tempNodeWithPrefix) break

			const tempNodeWithPrefixList = this.getNodeWithPrefixList(tempNodeWithPrefix.node, output, tempNodeWithPrefix.prefix)

			if(tempNodeWithPrefixList !== false){
				//Array.from(tempNodeWithPrefixList)
				for(let counter = (tempNodeWithPrefixList.length - 1); counter > -1; counter--)
					nodeWithPrefixList.push(tempNodeWithPrefixList[counter])
			}
		}while(true);
		
		return output
	}//end method

	private getNextNode(node: TrieNode, prefix: string, output: string[]){
		this.processNode(node, prefix, output)
	}

	private processNode(node: TrieNode, prefix: string, output: string[]){
		
		for(const key in node){

			const char = ALPHABETS[key]
			//if the correct node is end of word push to array
			if(node[key].isEnd){
				output.push(`${prefix}${char}`)
			}

			//if it has next node
			if(node[key].next){
				//call method(self) recursively
				this.getNextNode(node[key].next, `${prefix}${char}`, output)
			}//end for loop
		}//end for loop

	}

	getAllWordFromTrieNode(){
		const output: string[] = []
		this.processNode(this.root, "", output)
		return output
	}
}//end class
