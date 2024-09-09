export default function isPalindrome(word: string):boolean{
	//I need the length of the word
	const wordLength = word.length

	//all palindrom word length is always odd number if not return false
	if((wordLength % 2) !== 1) return false

	//get the middle length of the word so I can do comparison
	const middle = Math.ceil(wordLength / 2)

	//racecar
	//start comparing all the letter again each other from first against last e.t.c
	for(let counter = 0; counter < middle; counter++){
		if(word[counter] !== word[wordLength - (counter + 1)]) return false
	}

	return true
}