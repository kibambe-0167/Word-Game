
var words = ["hello", "banana", "terminator", "programmer", 
"maze runner","document", "debugger", "content", "university",
"mathematics", "america", "south africa", "mango"

];
var spacing_char = "_"; // this is the spacing character.
var len_words = words.length; //length of the array holding words.
var score = 0; // the playes score.
var getSpaces = [];

var intruction = "** Enter a letter to put in puzzle or full word to solve the word puzzle";
var headerLogo = "This Is A Game :)";
var wordScore = 70;

function getRandNumber(max, min) {
	// returns the floor of random by, getting the difference
	//  between max value and min value, multiply that by the
 	// random number and then add the min value. 
	return Math.floor( Math.random()*(max - min) + min);
}

// returns number of random element it given
// function return array of random numbers to called function.
function getSpace( number, range ) {
	var arr = []; // start empty array to hold random numbers.
	var i = 0;
	while ( i < number ) {
		rand = getRandNumber( range, 0 );
		if ( !( arr.includes( rand )) ) {
			arr[ i ] = rand;
			i += 1;
		}
	}
	arr.sort(); // sort for easy use.
	return arr;
}

function getWord() {
	// get a random number. Which will be the location of the random
	// word to return to any function that called this method.
	var location = getRandNumber(len_words, 0);
	var word = words[ location ];
	return word;
}

// function that will make puzzle word to show to user.
function mk_puzzle_word( word ) {
	var len_word = word.length; // lengthof random word.
	// initialise var to hold the puzzled word.
	var puzzle_word = ""; 
	if ( len_word <= 5 ) {
		// console.log("Running first condition");
		// get a random number
		// var loc_show_letter = getRandNumber( len_word, 0 );
		var spaces = getSpace( 4, len_word );
		getSpaces = spaces;
		// console.log( word );

		// initialise var to hold the puzzled word.
		// var puzzle_word = ""; 
		for( var i = 0; i < len_word; i++ ) {
			if ( i == spaces[i] ) {
				puzzle_word += spacing_char;
				// puzzle_word += word[ i ];
			}
			else {
				// if location of letter is not amongs the ones 
				// to put a word, make location have under score for
				//  user to put in.
				puzzle_word += word[ i ];
				// puzzle_word += spacing_char;
			}
		}
		return puzzle_word;
	}

	// ///////////////////////////////////////////////////////
	else if( len_word > 5 && len_word <= 8 ) {
		// console.log("Running second condition");
		var spaces = getSpace( 5, len_word );
		getSpaces = spaces;
		// console.log( spaces );
		// console.log( word );
		// var puzzle_word = "";
		for ( var i = 0; i < len_word; i++ ) {
			var happen = 0;
			for ( var x = 0; x < spaces.length; x++ ) {
				if ( spaces[ x ] == i ) {
					puzzle_word += spacing_char;
					happen += 1;
				}
				// else {
				// 	puzzle_word += "_";
				// 	break;
				// }
			}
			if ( happen == 0 ) { puzzle_word += word[i]; }
			else { happen == 0; }
		}

		return puzzle_word;
	}

	// ////////////////////////////////////////////////////////
	else if ( len_word > 8 ) {
		// console.log("Running third condition");
		// number of spaces that must be left empty
		var number_space = 6; 
		var spaces = getSpace( number_space, len_word );
		getSpaces = spaces;
		// console.log( spaces );
		// console.log( word );
		// var puzzle_word = "";
		for ( var i = 0; i < len_word; i++ ) {
			var happen = 0;
			for ( var x = 0; x < spaces.length; x++ ) {
				if ( spaces[ x ] == i ) {
					// puzzle_word += word[i];
					puzzle_word += spacing_char;
					// console.log( "hi");
					happen += 1;
				}
				// else {
				// 	puzzle_word += "_";
				// 	break;
				// }
			}
			if ( happen == 0 ) { puzzle_word += word[i]; }
			else { happen == 0; }
		}
		return puzzle_word;
	}
}

// // function getSpace
// function ifThere( word, puz, letter ) {
// 	var index = word.indexOf( letter.toLowerCase() );
// 	console.log(getSpaces, index, puz );

// 	if ( puz[index] === "_" && getSpaces.includes(index) ) {
// 		var loc = getSpaces.indexOf( index );
// 		getSpaces.splice(index, 1);
// 		console.log( getSpaces );
// 		return true;
// 	}
// 	else { return false; }
// }



function find( word, puz, letter ) {
	// var index = word.indexOf( letter.toLowerCase() );

	for ( var i = 0; i < word.length; i++ ) {
		// check is letter is word and is the letter actually
		//  represent and empty word in the puzzle word.
		if ( letter == word[ i ] && getSpaces.includes( i ) &&
			puz[ i ] == "_" ) {
			//get location in spaces available
			var loc = getSpaces.indexOf( i );
			getSpaces.splice( loc, 1 );//delete from spaces available
			// console.log( i );
			return i; //return to called function for use.
		}
	}
	return -1;
}

// function start() {
// 	// Word from the database.
// 	var random_word = getWord();

// 	// word that is puzzled and have to shown to user.
// 	var puzzle_word = mk_puzzle_word( random_word );

// 	// this enables to show words to the user in the html file.
// 	var puz_word = document.getElementById("puz_word");
// 	puz_word.innerHTML = puzzle_word;
// }

// Event handling
document.addEventListener("DOMContentLoaded",
  function (event) {

		var head = document.getElementById("logoLink");
		head.innerHTML = headerLogo;

		var intr = document.getElementById("intructions");
		intr.innerHTML = intruction;

  	// Word from the database.
  	var random_word = getWord();

  	// word that is puzzled and have to shown to user.
		var puzzle_word = mk_puzzle_word( random_word );
		
		while ( random_word == puzzle_word ) {
			// if the puzzle maker did not make the puzzle
			//  word, get another word before displaying 
			// the word from puzzle maker function
			random_word = getWord();

			// word that is puzzled and have to shown to user.
			puzzle_word = mk_puzzle_word( random_word );
		}

  	// this enables to show words to the user in the html file.
  	var puz_word = document.getElementById("puz_word");
		puz_word.innerHTML = puzzle_word;
		
		// if ( random_word.toLowerCase() == 
		// puz_word.textContent.toLowerCase() ) {
		// 	random_word = getWord();
		// 	alert( "same");
		// }

		// console.log( "Spaces:", getSpaces );
		



  	// this is called when the try btn is clicked.
  	function getInput( event ) {
  		// var puz_word = document.getElementById("puz_word");
  		var score_var = document.getElementById("score");
			var letter_var = document.getElementById("letter");
			var wordDocVar = document.getElementById("word");

  		var puzzle = puz_word.textContent;
			console.log( puzzle );
			
			// get data from letter field and change it to lower case
			var letter = letter_var.value.toLowerCase();

			// Check if user input more than in character in the 
			// letter input field
			if( letter.length > 1 ) {
				letter = letter[0];
			}
			// get data from word field and change it to lower case
			var wordUser = wordDocVar.value.toLowerCase();

			console.log( "Letter from user: ", letter );

			var update_score = 0; // defin
			
			//check if it a letter, than word
  		if ( letter.length == 1 ) { 
				// change to lowser case and check if random 
				// word from database contains the letter from user.
				var index = find( random_word, puzzle,
					letter.toLowerCase() );

  			console.log( index );
				if ( random_word.toLowerCase().
					includes( letter.toLowerCase() )
  				&& index != -1 ) {
  				// var index = find_var;
  				console.log("At Index: ", index );

  				puzzle = puz_word.textContent;
  				console.log( puzzle );
  				// console.log( puzzle.length );

  				var update_puz = "";
  				// var update_score = 0;

  				update_score = parseInt( score_var.textContent );
  				update_score += 10;

  				for ( var i = 0; i < puzzle.length; i++ ) {
  					if ( i == index ) {
  						update_puz += letter;
  					}
  					else {
  						update_puz += puzzle[ i ]; 
  					}
  				}

  				score_var.innerHTML = update_score;
  				console.log( "Score:", update_score );

  				puz_word.innerHTML = update_puz;
					console.log( update_puz );
					
					// this update another word puzzle
					if(random_word.toLowerCase()==update_puz.toLowerCase()){
						random_word = getWord();
						var congrats = update_puz +
						"\n\n\nCongrats, Your Solve The Word";
						alert( congrats );
						// word that is puzzled and have to shown to user.
						var puzzle_word = mk_puzzle_word( random_word );

						// if( random_word == puzzle_word ) {
						// 	// if the puzzle maker did not make the puzzle
						// 	// word, get another word before displaying the 
						// 	// word from puzzle maker function
						// 	random_word = getWord();
						// }

						while ( random_word == puzzle_word ) {
							// if the puzzle maker did not make the puzzle
							//  word, get another word before displaying 
							// the word from puzzle maker function
							random_word = getWord();
				
							// word that is puzzled and have to shown to user.
							puzzle_word = mk_puzzle_word( random_word );
						}

						// this enables to show words to the user in the html
						// file.
						//var puz_word = document.getElementById("puz_word");
						puz_word.innerHTML = puzzle_word;
					}

  				// making input field empty.
  				letter_var.value = "";
  			}
  			else {
  				// alert( "Did not happen");
					console.log( "Did not happen".toUpperCase() );
					alert("Oops! Wrong Letter. Try Again...");

  				// making input field empty.
  				letter_var.value = "";
  			}
			}

			else if ( wordUser.length > 1 ) {
				// alert("Got A Word");
				if( wordUser == random_word ) {
					// var update_score = 0;

  				update_score = parseInt( score_var.textContent );
					update_score += wordScore;
					score_var.innerHTML = update_score;
					congrats = wordUser + 
					"\n\n\nCongrats, Your Solve The Word";
					alert( congrats );
					// alert( "Congrats, Your Solve The Word" );

					
					random_word = getWord();
					// word that is puzzled and have to shown to user.
					puzzle_word = mk_puzzle_word( random_word );

					// if( random_word == puzzle_word ) {
					// 	// if the puzzle maker did not make the puzzle
					// 	// word, get another word before displaying the 
					// 	// word from puzzle maker function
					// 	random_word = getWord();
					// }

					while ( random_word == puzzle_word ) {
						// if the puzzle maker did not make the puzzle
						//  word, get another word before displaying 
						// the word from puzzle maker function
						random_word = getWord();
			
						// word that is puzzled and have to shown to user.
						puzzle_word = mk_puzzle_word( random_word );
					}

					// this enables to show words to the user in the html
					// file.
					//var puz_word = document.getElementById("puz_word");
					puz_word.innerHTML = puzzle_word;

					// make the word field empty
					wordDocVar.value = "";
				}

				else {
					alert("Oops! Wrong Word Try Again...");
				}
			}

		}

		// this changes the puzzle word, when user presses the
		//  next word btn.
		function nextWord() {
			// Word from the database.
			var random_word = getWord();

			// word that is puzzled and have to shown to user.
			var puzzle_word = mk_puzzle_word( random_word );
	
			// this enables to show words to the user in the html file.
			var puz_word = document.getElementById("puz_word");
			puz_word.innerHTML = puzzle_word;
		}


		// function disableWordField() {
		// 	var wordDoc = document.getElementById("word");
		// 	var data = wordDoc.value;
		// 	if( data != undefined ) {
		// 		wordDoc.disabled = true;
		// 	}
		// 	else if ( data === undefined ) {
		// 		wordDoc.disabled = false;
		// 	}
		// }
		// function disableLetterField() {
		// 	// letterVar.disabled = true;
		// }
		// document.querySelector("#letter").addEventListener(
		// 	"input", disableWordField );

		// document.querySelector("#word").addEventListener(
		// 	"change", disableLetterField );

		// Unobtrusive event binding, this will call the 
		// getInput function and pass the evet to it and the 
		// code in the function will run.
		document.querySelector("#trybtn").addEventListener(
			"click", getInput );

		// get the next word when user presses the next work btn.
		// Unobtrusive event binding, this will call the 
		// getInput function and pass the evet to it and the
		//  code in the function will run.
		document.querySelector("#nextWordbtn").addEventListener
		( "click", nextWord );
	}
);

// onchange
// oninput

// TASK

// Add a function that might give user an hint of the 
// words in the puzzle. Something like a defination 
// of the word.

// Make a code that will disable on input field when the 
// other field is not empty. To Avoid users submitting both
// field with values.



//
//     __()< Quack!! Quack!! Quack!! Quack!!
//    (  )
//     ``
//