//push, pop, peek:display the top element in the stack
//size: how many element are the in the stack
export default class Stack<T>{
	private store: Record<number, T> = {}
	private size: number = 0

	constructor(...items:T[]){
		for(const item of items){
			this.store[this.size++] = item
		}
	}

	pop(): T | undefined{
		if(this.size > 0){
			--this.size
			const data = this.store[this.size]
			delete this.store[this.size]
			return data
		}
		return undefined
	}

	push(item: T): Stack<T>{
		this.store[this.size++] = item
		return this
	}

	getSize(){
		return this.size
	}

	peek(): T | undefined{
		return this.size > 0 ? this.store[(this.size - 1)] : undefined
	}
}