
// let el = document.querySelector(".scroller");

// let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

// window.addEventListener("scroll", () => {

//     let scrollTop = document.documentElement.scrollTop;
//     el.style.width = `${(scrollTop / height) * 100}%`;
// });



// the game
// Letters
const letters = "abcdefghijklmnopqrstuvwxyz"

// Get Array from Letters
let lettersArray = Array.from(letters);


// select letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters

lettersArray.forEach(letter => {

    // Create Span
    let span = document.createElement("span");

    // Create Letter Text Node
    let theLetter = document.createTextNode(letter);

    // Append The Letter To Span
    span.appendChild(theLetter);

    // Add Class on Span
    span.className = 'letter-box';

    // Append Span To The Letters Container
    lettersContainer.appendChild(span);

});

// Object of words + Categoris

const words = {
    programing: ["php", "javascript", "go", "scala", "fortran", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahama Ghandi"],
    countries: ["Syria ", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}


// Get Random Property

let allkeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allkeys.length);
let randomPropName = allkeys[randomPropNumber];
let randomPropValue = words[randomPropName];

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];
// console.log(randomPropName);
// console.log(randomPropValue);
// console.log(randomValueNumber);
console.log(randomValueValue);

// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters Guess Element

let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen Word To Array

let lettersAndSpace = Array.from(randomValueValue);

// Creat Spans Depened On Word
lettersAndSpace.forEach(letter => {
    // Creat Empty Span
    let emptySpan = document.createElement("span");
    
    // If Letter Is Space
    if (letter === ' ') {
        // Add Class To Span
        emptySpan.className = 'with-space';

    }
    // Append Spans To The Letters Guess Container

    lettersGuessContainer.appendChild(emptySpan);
});

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Handling Clicking On Letters
document.addEventListener("click", (e) => {
    
    // Set The Chose Status
    let theStatus = false;
    if(e.target.className === 'letter-box') {
        e.target.classList.add("clicked");
        
        // Get Clicked Letter
        let theClickedLetter = e.target.innerHTML.toLowerCase();

        // The Chosen Word
        let chosenWord = Array.from(randomValueValue.toLowerCase());

        // console.log(lettersAndSpace); // The Chosen Word
        
        chosenWord.forEach((wordLetter, wordIndex) => {
            // compare ClickedLetter with Wordlitter
            if (theClickedLetter == wordLetter) {
                // console.log(`found At Index unmber ${index}`)

                 // Set Status To Correct
                         theStatus = true;
               
                // Loop On All Guess Spans
                guessSpans.forEach((span, spanIndex) => {
                    
                    if (wordIndex === spanIndex) {
                        span.innerHTML = theClickedLetter;
                        }
                });

            }
        })

     // Outside Loop
    //    If Letter Is Wrong
        if (theStatus !== true) {
            
            // Increase The Wrong Attempts
            wrongAttempts++;

            // Add Class Wrong On The Draw Element
            theDraw.classList.add(`wrong-${wrongAttempts}`);

            // Play Fail Sound
            document.getElementById("fail").play();

            if (wrongAttempts === 8) {
                endGame();
                lettersContainer.classList.add("finished");
            }
        } else {
             // Play Success Sound
            document.getElementById("success").play();
        }
        
    }
    
});

// End Game Function
function endGame() {
    // Creat Popup Div
    let div = document.createElement("div");

    // Creat Text
    let divText = document.createTextNode(`Game Over, The Word Is ${randomValueValue}`);
    // Append Text
    div.appendChild(divText);
    // Add Class On Div
    div.className = `popup`;
    // Append To The Body
    document.body.appendChild(div);
}
