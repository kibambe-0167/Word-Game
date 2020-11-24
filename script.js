

var levelOneWords = ["hello", "mango", "space", "visual", "game",
	"script", "index", "solve", "shift", "editors", "while", "about",
	"bemba", "range", "based", "faith", "style", "score", "words",
	"equal", "drawn", "csharp", "would", "floor", "value", "their", 
	"puzzle", "chatbot", "chrome", "browser"

];

var levelTwoWords = [ "banana","document", "debugger", "content",
	"america", "outline", "timeline", "inspector", "legendaries",
	"instructions", "pertaining", "collections", "extractions",
	"activities", "classified", "assignments", "intrudingly", 
	"uncountable", "netheness", "platform"

];

var levelThreeWords = [ "university", "mathematics", "terminator",
	"programmer", "maze runner", "south africa", "bootstrap",
	"variables", "extraordinary", "life science", "dependencies",
	"requested", "characteristics", "independent", "inspections",
	"organizations", "pronunciations", "examinations", "buccaneer",
	"lengedaries", "lengenbachite", "unimaginable", "particularly",
	"translations", "johannesburg", "randomized", "localhost",
	"randomization", "initialization", "pronunciational",
	"classifications", "classificationally", "classificatorily",
	"performance", "accessibility", "documenttation"

];

var spacing_char = "_"; // this is the spacing character.
// var len_words = words.length; //length of the array holding words.
var score = 0; // the playes score.
var getSpaces = [];

var intruction = "** Enter a letter to put in puzzle or full word to solve the word puzzle";
var headerLogo = "This Is A Game :)";
var wordScore = 70;

var random_word = getWord();
// var random_word = "";
var puzzle_word = "";
// define a variable to hold the level of the game
var currentLevel = "1";




// this will be called. when the pages loads.
$( function () {
	// console.log("Running");
	// get the tag with id: level and listen to any change from it
	// and when there is change do:
	var level = $("#level").change( function() {
		// get the value of the change, which will be the level for the game.
		var l = $("#level").val();
		currentLevel = l;
		console.log( currentLevel );
	});
	// console.log( currentLevel );








});

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
	var location = 0;
	var word;

	// console.log( "Level:", currentLevel );

	if ( currentLevel == "3" ) {
		console.log( "LEVEL ONE ");
		location = getRandNumber( levelThreeWords.length, 0 );
		word = levelThreeWords[ location ];
		return word;
	}
	else if( currentLevel == "2" ) {
		console.log("LEVEL TWO");
		location = getRandNumber( levelTwoWords.length, 0);
		word = levelTwoWords[ location ];
		return word;
	}
	else {
		// console.log("LEVEL ONE");
		location = getRandNumber( levelOneWords.length, 0);
		word = levelOneWords[ location ];
		return word;
	}
	
}





// function that will make puzzle word to show to user.
function mk_puzzle_word( word ) {
	var len_word = word.length; // lengthof random word.
	var spaces = [];
	// initialise var to hold the puzzled word.
	var puzzle_word = ""; 


	if ( len_word <= 5 ) {
		// console.log("Running first condition");
		// get a random number
		// var loc_show_letter = getRandNumber( len_word, 0 );
		spaces = getSpace( 4, len_word );
		getSpaces = spaces;
		// console.log( word, spaces );

		// initialise var to hold the puzzled word.
		// var puzzle_word = ""; 
		for( var k = 0; k < len_word; k++ ) {
			var happen = 0;
			for ( var b = 0; b < spaces.length; b++ ) {
				if ( spaces[ b ] == k ) {
					puzzle_word += spacing_char;
					happen += 1;
				}
			}
			if ( happen == 0 ) {
				puzzle_word += word[ k ];
			}
			else {
				happen = 0;
			}
		}
		return puzzle_word;
	}


	// ///////////////////////////////////////////////////////
	else if( len_word > 5 && len_word <= 8 ) {
		// console.log("Running second condition");
		spaces = getSpace( 5, len_word );
		getSpaces = spaces;
		// console.log( word, spaces );
		// var puzzle_word = "";
		for ( var y = 0; y < len_word; y++ ) {
			var happen1 = 0;
			for ( var x = 0; x < spaces.length; x++ ) {
				if ( spaces[ x ] == y ) {
					puzzle_word += spacing_char;
					happen1 += 1;
					break;
				}
			}
			if ( happen1 == 0 ) { puzzle_word += word[ y ]; }

			else { happen1 = 0; }
		}
		return puzzle_word;
	}


	// ////////////////////////////////////////////////////////
	else if ( len_word > 8 ) {
		// console.log("Running third condition");
		// number of spaces that must be left empty
		var number_space = 6; 
		spaces = getSpace( number_space, len_word );
		getSpaces = spaces;

		// console.log( word, spaces );
		// var puzzle_word = "";
		for ( var item = 0; item < len_word; item++ ) {
			var happen2 = 0;
			for ( var a = 0; a < spaces.length; a++ ) {
				if ( spaces[ a ] == item ) {
					// puzzle_word += word[i];
					puzzle_word += spacing_char;
					// console.log( "hi");
					happen2 += 1;
					break;
				}
			}
			if ( happen2 == 0 ) { puzzle_word += word[item]; }

			else { happen2 = 0; }
		}
		return puzzle_word;
	}
}




function find( word, puz, letter ) {
	// var index = word.indexOf( letter.toLowerCase() );

	for ( var i = 0; i < word.length; i++ ) {
		// check is letter is word and is the letter actually
		//  represent and empty word in the puzzle word.
		console.log(letter, word[i], i );

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



// this changes the puzzle word, when user presses the
//  next word btn.
function nextWord() {
	// Word from the database.
	// var random_word1 = getWord();
	random_word = getWord();

	// word that is puzzled and have to shown to user.
	// var puzzle_word1 = mk_puzzle_word( random_word1 );
	puzzle_word = mk_puzzle_word( random_word );

	while ( random_word == puzzle_word ) {
		// alert("MATCH WORDS");
		// if the puzzle maker did not make the puzzle
		//  word, get another word before displaying 
		// the word from puzzle maker function
		random_word = getWord();
			
		// word that is puzzled and have to shown to user.
		puzzle_word = mk_puzzle_word( random_word );
	}
	
	// this enables to show words to the user in the html file.
	var puz_word1 = document.getElementById("puz_word");
	puz_word1.innerHTML = puzzle_word;
}



// Event handling
document.addEventListener("DOMContentLoaded",
  function (event) {

		var head = document.getElementById("logoLink");
		head.innerHTML = headerLogo;

		var intr = document.getElementById("intructions");
		intr.innerHTML = intruction;

  	// Word from the database.
		// var random_word = getWord();
		// random_word = getWord();

  	// word that is puzzled and have to shown to user.
		// var puzzle_word = mk_puzzle_word( random_word );
		puzzle_word = mk_puzzle_word( random_word );
		
		while ( random_word == puzzle_word ) {
			// alert("MATCH WORDS");
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

		// console.log( "Spaces:", getSpaces );
		
  	// this is called when the try btn is clicked.
  	function getInput( event ) {
  		// var puz_word = document.getElementById("puz_word");
  		var score_var = document.getElementById("score");
			var letter_var = document.getElementById("letter");
			var wordDocVar = document.getElementById("word");

  		var puzzle = puz_word.innerHTML;
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

			// console.log( "Letter from user: ", letter );

			var update_score = 0; // defin
			
			//check if it a letter, than word
  		if ( letter.length == 1 ) { 
				// change to lowser case and check if random 
				// word from database contains the letter from user.
				console.log( random_word, puzzle.length );
				var index = find( random_word, puzzle,
					letter.toLowerCase() );


				// console.log( letter );
			

				if ( index != -1 ) {
  				// var index = find_var;
  				// console.log("At Index: ", index );

  				puzzle = puz_word.innerHTML;
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
						var congrats = update_puz.toUpperCase() +
						"\n\n\nCongrats, Your Solve The Word";
						alert( congrats );
						// word that is puzzled and have to shown to user.
						var puzzle_word = mk_puzzle_word( random_word );

						while ( random_word == puzzle_word ) {
							// alert("MATCH WORDS");
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



			// Provessing the word field input data.
			else if ( wordUser.length > 1 ) {
				// alert("Got A Word");
				if( wordUser == random_word ) {
					// var update_score = 0;

  				update_score = parseInt( score_var.textContent );
					update_score += wordScore;
					score_var.innerHTML = update_score;
					var congratsMsg = wordUser.toUpperCase() + 
					"\n\n\nCongrats, Your Solve The Word";
					alert( congratsMsg );
					// alert( "Congrats, Your Solve The Word" );

					
					// var random_word2 = getWord();
					random_word = getWord();
					// word that is puzzled and have to shown to user.
					// var puzzle_word2 = mk_puzzle_word( random_word2 );
					puzzle_word = mk_puzzle_word( random_word );

					while ( random_word == puzzle_word ) {
						// alert("MATCH WORDS");
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
					alert("Oops! Wrong Word. Try Again...");
				}
			}

		}


		// // this changes the puzzle word, when user presses the
		// //  next word btn.
		// function nextWord() {
		// 	// Word from the database.
		// 	var random_word1 = getWord();

		// 	// word that is puzzled and have to shown to user.
		// 	var puzzle_word1 = mk_puzzle_word( random_word1 );

		// 	while ( random_word1 == puzzle_word1 ) {
		// 		// alert("MATCH WORDS");
		// 		// if the puzzle maker did not make the puzzle
		// 		//  word, get another word before displaying 
		// 		// the word from puzzle maker function
		// 		random_word1 = getWord();
	
		// 		// word that is puzzled and have to shown to user.
		// 		puzzle_word1 = mk_puzzle_word( random_word1 );
		// 	}
	
		// 	// this enables to show words to the user in the html file.
		// 	var puz_word1 = document.getElementById("puz_word");
		// 	puz_word1.innerHTML = puzzle_word1;
		// }


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