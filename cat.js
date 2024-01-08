import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Cat = () => {
    const [catData, setCatData] = useState([]);
    const [currentCatIndex, setCurrentCatIndex] = useState(0);
    const [originOptions, setOriginOptions] = useState([]);
    const [selectedOrigin, setSelectedOrigin] = useState(null);
    const [previousCorrectOrigin, setPreviousCorrectOrigin] = useState(null);
    const [streak, setStreak] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [isCorrect, setIsCorrect] = useState(null);
    const apiKey = 'live_Xbyf9KsrwnfFe5RODhEU810DzZqDdnKyDC5WmfdVxv41LRcYWowyeh3nrFwd2pCB';
    const placeholderImage = 'https://www.dailypaws.com/thmb/B57wSUXaiqXkHoY5pMPwPjPdVGw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/norwegian-forest-cat-outside-looking-back-256980014-2000-b3a5da005e9a492ca875cd2936970148.jpg';

    useEffect(() => {
        fetchCatData();
    }, []);

    const fetchCatData = () => {
        axios.get('https://api.thecatapi.com/v1/breeds', { headers: { 'x-api-key': apiKey } })
            .then(res => {
                setCatData(res.data);
                updateOriginOptions(res.data);
            })
            .catch(err => console.log(err));
    };

    const updateOriginOptions = (cats) => {
        let origins = cats.map(cat => cat.origin).filter((value, index, self) => self.indexOf(value) === index);
        setOriginOptions(origins);
    };

    const getRandomOrigins = (correctOrigin) => {
        let options = originOptions.filter(o => o !== correctOrigin);
        while (options.length > 2) {
            options.splice(Math.floor(Math.random() * options.length), 1);
        }
        options.push(correctOrigin);
        return options.sort(() => Math.random() - 0.5);
    };

    const handleOriginSelection = (origin) => {
        const correctOrigin = catData[currentCatIndex].origin;
        setSelectedOrigin(origin);

        if (origin === correctOrigin) {
            setIsCorrect(true);
            setStreak(streak + 1);
            setHighScore(prevHighScore => Math.max(prevHighScore, streak + 1));
            setPreviousCorrectOrigin(correctOrigin);
        } else {
            setIsCorrect(false);
            alert(`Sorry, that is incorrect. The correct origin was: ${correctOrigin}`);
            setStreak(0);
            setPreviousCorrectOrigin(null);
        }

        setCurrentCatIndex(currentCatIndex < catData.length - 1 ? currentCatIndex + 1 : 0);
    };

    const getCatImageUrl = () => {
        const cat = catData[currentCatIndex];
        return cat && cat.reference_image_id
            ? `https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`
            : placeholderImage; 
    };

    const handleImageError = (e) => {
        e.target.src = placeholderImage; 
    };

    const getButtonClass = (origin) => {
        if (origin === previousCorrectOrigin) {
            return 'correct';
        }
        return origin === selectedOrigin && !isCorrect ? 'incorrect' : '';
    };

    return (
        <div className="main">
            <nav className="navbar">
                <Link to="/dog" className="nav-button">Dog</Link>
                <Link to="/cat" className="nav-button">Cat</Link> 
                <Link to="/bird" className="nav-button">Bird</Link> 
            </nav>
            <section className="image-section">
                <img 
                    src={getCatImageUrl()}
                    alt={catData[currentCatIndex] ? catData[currentCatIndex].name : "Placeholder Cat"}
                    className="cat-image"
                    onError={handleImageError}
                />
            </section>
            <article className="breed-article">
                <div className="breed-choices">
                    {catData.length > 0 && getRandomOrigins(catData[currentCatIndex].origin).map((origin, index) => (
                        <button
                            key={index} 
                            className={`breed-choice ${getButtonClass(origin)}`} 
                            onClick={() => handleOriginSelection(origin)}
                        >
                            {origin}
                        </button>
                    ))}
                </div>
            </article>
            <div className="scoreboard">
                <p>Current Streak: {streak}</p>
                <p>High Score: {highScore}</p>
            </div>
        </div>
    );
};

export default Cat;