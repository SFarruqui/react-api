import React, { useState, useEffect } from "react";

const Home = () => {
  // setting up state for different parts of the game
  const [activeModal, setActiveModal] = useState(null); // for showing game info
  const [hangmanWord, setHangmanWord] = useState(""); // the word to guess
  const [guessedLetters, setGuessedLetters] = useState([]); // letters guessed
  const [mistakes, setMistakes] = useState(0); // wrong guesses
  const [showHint, setShowHint] = useState(false); // show hint or not
  const maxMistakes = 6; // max wrong guesses allowed

  // list of animal words for the hangman game
  const animalWords = [
    "elephant",
    "tiger",
    "giraffe",
    "monkey",
    "beagle",
    "turtle",
    "parrot",
  ]; // Word bank

  // resets game when page first loads
  useEffect(() => {
    resetGame();
  }, []);

  // function to start a new game
  const resetGame = () => {
    const newWord = animalWords[Math.floor(Math.random() * animalWords.length)];
    setHangmanWord(newWord);
    setGuessedLetters([]);
    setMistakes(0);
    setShowHint(false);
  };

  // descriptions for different animal games
  const gameDescriptions = {
    dog: "Explore the world of dogs. Learn about different breeds, their characteristics, and what makes them unique. In the Dog Breed Guessing Game, you will guess the breed of a dog from a given image.",
    cat: "Delve into the lives of cats. Discover various breeds, their habits, and how to care for them. In the Cat Country Origin Guessing Game, you will guess the country of origin of a cat from a given image.",
    bird: "Uncover the fascinating world of birds. Understand different species, their environments, and behaviors. In the Bird Scientific Name Guessing Game, you will guess the scientific name of a bird from their common name.",
  };

  // titles for these games
  const gameTitles = {
    dog: "Dog Breed Guessing Game",
    cat: "Cat Country Origin Guessing Game",
    bird: "Bird Scientific Name Guessing Game",
  };

  // shows info about a game
  const showModal = (game) => {
    setActiveModal(game);
  };

    // hides the game info
  const hideModal = () => {
    setActiveModal(null);
  };

   // handles each letter guess in the hangman game
  const handleLetterGuess = (letter) => {
    setGuessedLetters((prev) => [...prev, letter]);

    // increases mistakes if guess is wrong
    if (!hangmanWord.includes(letter)) {
      setMistakes((prev) => {
        const newMistakes = prev + 1;
        // shows hint after 3 wrong guesses
        if (newMistakes === 3) setShowHint(true);
        // resets game after 6 wrong guesses
        if (newMistakes === maxMistakes) {
          setTimeout(() => resetGame(), 2000); // waits 2 seconds before resetting
        }
        return newMistakes;
      });
    }
  };

  // shows the word with guessed letters and blanks
  const displayWord = () => {
    return hangmanWord
      .split("")
      .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
      .join(" ");
  };

  // checks if the game is won
  const isGameWon = () =>
    !hangmanWord.split("").some((letter) => !guessedLetters.includes(letter));
  // checks if the game is over (too many mistakes)
    const isGameOver = () => mistakes >= maxMistakes;

  // URLs of animal gifs
  const animalGifs = [
    "https://media3.giphy.com/media/uUs14eCA2SBgs/200w.gif",
    "https://media3.giphy.com/media/GeimqsH0TLDt4tScGw/giphy.gif",
    "https://hips.hearstapps.com/digitalspyuk.cdnds.net/16/21/1464344117-puppy1.gif",
    "https://assets.teenvogue.com/photos/577ec7582fd18be4635019e5/master/w_320%2Cc_limit/2.gif",
    "https://assets.teenvogue.com/photos/577ec77f2fd18be4635019ec/master/w_320%2Cc_limit/21.gif",
    "https://onwardstate.com/wp-content/uploads/2016/05/giphy-gif-11.gif",
  ];

  return (
    <div>
      // header section of the page
      <header className="container content-centered">
        <h1>Animal Encyclopedia Game</h1>
      </header>

      // displaying gifs on the left side
      <div className="animal-gifs-left">
        {animalGifs.slice(0, 3).map((gif, index) => (
          <img key={index} src={gif} alt="Animal gif" className="animal-gif" />
        ))}
      </div>

      // main content area
      <div className="main container">
        {/* Hangman Game Preview Section */}
        <section>
          <h2>Hangman Game without Hangman</h2> 
          <p>Guess the animal word: {displayWord()}</p>
          <p>
            Mistakes: {mistakes} of {maxMistakes}
          </p>
          <div>
            {"abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
              <button
                key={letter}
                onClick={() => handleLetterGuess(letter)}
                disabled={guessedLetters.includes(letter)}
              >
                {letter}
              </button>
            ))}
          </div>
          {isGameOver() && <p>Game Over! The word was: {hangmanWord}</p>}
          {isGameWon() && <p>Congratulations! You've guessed the word!</p>}
          {showHint && <p>Hint: The word is an animal.</p>}

          {/* Game Descriptions Section */}
          {Object.keys(gameDescriptions).map((game) => (
            <section key={game}>
              <h2>{gameTitles[game]}</h2>
              <button onClick={() => showModal(game)}>
                Learn more about the {gameTitles[game]}
              </button>
            </section>
          ))}

          {/* Modal for Game Descriptions */}
          {activeModal && (
            <>
              <div className="overlay active" onClick={hideModal}></div>
              <div className="modal active">
                <h3>{gameTitles[activeModal]} Description</h3>
                <p>{gameDescriptions[activeModal]}</p>
                <button onClick={hideModal}>Close</button>
              </div>
            </>
          )}

          <div className="animal-gifs-right">
            {/* Display right side GIFs */}
            {animalGifs.slice(3).map((gif, index) => (
              <img
                key={index}
                src={gif}
                alt="Animal gif"
                className="animal-gif"
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
