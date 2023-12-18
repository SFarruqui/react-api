import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Bird = () => {
    const [birdData, setBirdData] = useState([]);
    const [currentBirdIndex, setCurrentBirdIndex] = useState(0);
    const [sciNameOptions, setSciNameOptions] = useState([]);
    const [selectedSciName, setSelectedSciName] = useState('');
    const [streak, setStreak] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [isCorrect, setIsCorrect] = useState(null);
    const eBirdApiToken = 'r8i06qnhk3jg'; 
    const [animateName, setAnimateName] = useState(false);

    useEffect(() => {
        fetchBirdData();
    }, []);

    useEffect(() => {
        setAnimateName(true);
        setTimeout(() => setAnimateName(false), 1000);
    }, [currentBirdIndex]);

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

    const updateSciNameOptions = (birds) => {
        // Extract unique scientific names
        let sciNames = birds.map(bird => bird.sciName).filter((value, index, self) => self.indexOf(value) === index);
        setSciNameOptions(sciNames);
    };

    const getRandomSciNames = (correctSciName) => {
        let options = sciNameOptions.filter(name => name !== correctSciName);
        while (options.length > 2) {
            options.splice(Math.floor(Math.random() * options.length), 1);
        }
        options.push(correctSciName);
        return options.sort(() => Math.random() - 0.5);
    };

    const handleSciNameSelection = (sciName) => {
        const correctSciName = birdData[currentBirdIndex].sciName;
        setSelectedSciName(sciName);
        setIsCorrect(sciName === correctSciName);

        if (sciName === correctSciName) {
            setStreak(streak + 1);
            setHighScore(Math.max(highScore, streak + 1));
        } else {
            alert(`Sorry, that is incorrect. The correct scientific name was: ${correctSciName}`);
            setStreak(0);
        }

        setCurrentBirdIndex(currentBirdIndex < birdData.length - 1 ? currentBirdIndex + 1 : 0);
    };

    const getButtonClass = (sciName) => {
        if (sciName === selectedSciName && isCorrect) {
            return 'correct';
        } else if (sciName === selectedSciName && !isCorrect) {
            return 'incorrect';
        }
        return '';
    };

    return (
        <div className="main">
            <nav className="navbar">
                <Link to="/dog" className="nav-button">Dog</Link>
                <Link to="/cat" className="nav-button">Cat</Link>
                <Link to="/bird" className="nav-button">Bird</Link>
            </nav>

            <section className="bird-section">
                {birdData.length > 0 && (
                    <div className="game-container">
                        <h2>Guess the Scientific Name</h2>
                        <p className={`common-name ${animateName ? 'animate' : ''}`}>
                            {birdData[currentBirdIndex].comName}
                        </p>
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

            <div className="scoreboard">
                <p>Current Streak: {streak}</p>
                <p>High Score: {highScore}</p>
            </div>
        </div>
    );
};

export default Bird;