import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Bird = () => {
    // state for storing bird data and game mechanics
    const [birdData, setBirdData] = useState([]);
    const [currentBirdIndex, setCurrentBirdIndex] = useState(0);
    const [sciNameOptions, setSciNameOptions] = useState([]);
    const [selectedSciName, setSelectedSciName] = useState('');
    const [streak, setStreak] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [isCorrect, setIsCorrect] = useState(null);
    const eBirdApiToken = 'r8i06qnhk3jg'; // API token
    const [animateName, setAnimateName] = useState(false);

    // fetch bird data on component mount
    useEffect(() => {
        fetchBirdData();
    }, []);

    // animation effect for each new bird
    useEffect(() => {
        setAnimateName(true);
        setTimeout(() => setAnimateName(false), 1000);
    }, [currentBirdIndex]);

    // function to fetch bird data from eBird API
    const fetchBirdData = () => {
        axios.get('https://api.ebird.org/v2/data/obs/KZ/recent', {
            headers: { 'X-eBirdApiToken': eBirdApiToken }
        })
        .then(response => {
            const birds = response.data;
            setBirdData(birds);
            updateSciNameOptions(birds);
        })
        .catch(error => console.error('Error fetching bird data:', error));
    };

    // updates the list of unique scientific names
    const updateSciNameOptions = (birds) => {
        let sciNames = birds.map(bird => bird.sciName)
            .filter((value, index, self) => self.indexOf(value) === index);
        setSciNameOptions(sciNames);
    };

    // randomly selects scientific names for the quiz options
    const getRandomSciNames = (correctSciName) => {
        let options = sciNameOptions.filter(name => name !== correctSciName);
        while (options.length > 2) {
            options.splice(Math.floor(Math.random() * options.length), 1);
        }
        options.push(correctSciName);
        return options.sort(() => Math.random() - 0.5);
    };

    // handles the user's selection of a scientific name
    const handleSciNameSelection = (sciName) => {
        const correctSciName = birdData[currentBirdIndex].sciName;
        setSelectedSciName(sciName);
        setIsCorrect(sciName === correctSciName);

        // updates streak and high score
        if (sciName === correctSciName) {
            setStreak(streak + 1);
            setHighScore(Math.max(highScore, streak + 1));
        } else {
            alert(`Sorry, that is incorrect. The correct scientific name was: ${correctSciName}`);
            setStreak(0);
        }

        // moves to the next bird
        setCurrentBirdIndex(currentBirdIndex < birdData.length - 1 ? currentBirdIndex + 1 : 0);
    };

    // determines the button class based on the user's selection
    const getButtonClass = (sciName) => {
        if (sciName === selectedSciName && isCorrect) {
            return 'correct';
        } else if (sciName === selectedSciName && !isCorrect) {
            return 'incorrect';
        }
        return '';
    };

    // rendering the component
    return (
        <div className="main">
            // navigation links
            <nav className="navbar">
                <Link to="/dog" className="nav-button">Dog</Link>
                <Link to="/cat" className="nav-button">Cat</Link>
                <Link to="/bird" className="nav-button">Bird</Link>
            </nav>

            // game section
            <section className="bird-section">
                {birdData.length > 0 && (
                    <div className="game-container">
                        <h2>Guess the Scientific Name</h2>
                        // displays the common name of the bird
                        <p className={`common-name ${animateName ? 'animate' : ''}`}>
                            {birdData[currentBirdIndex].comName}
                        </p>
                        // options for scientific names
                        <div className="sci-name-choices">
                            {getRandomSciNames(birdData[currentBirdIndex].sciName).map((sciName, index) => (
                                <button
                                    key={index}
                                    className={`sci-name-choice ${getButtonClass(sciName)}`}
                                    onClick={() => handleSciNameSelection(sciName)}
                                >
                                    {sciName}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            // scoreboard display
            <div className="scoreboard">
                <p>Current Streak: {streak}</p>
                <p>High Score: {highScore}</p>
            </div>
        </div>
    );
};

// exporting the Bird component
export default Bird;