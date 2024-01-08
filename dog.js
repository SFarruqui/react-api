import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentBreedOptions, setCurrentBreedOptions] = useState([]);
    const [streak, setStreak] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const placeholderImage = 'https://wallpapers.com/images/hd/funny-dog-picture-02rmkoy5cmhh647q.jpg';

    useEffect(() => {
        fetchNewDogs();
    }, []);

    const fetchNewDogs = () => {
        axios.get('https://dog.ceo/api/breeds/image/random/3')
            .then(res => {
                setImages(res.data.message);
                generateBreedOptions(res.data.message);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const generateBreedOptions = (dogImages) => {
        const breeds = dogImages.map(image => {
            const urlParts = image.split('/');
            return urlParts[urlParts.indexOf("breeds") + 1];
        }).filter(breed => breed);
        setCurrentBreedOptions(breeds);
    };

    const handleBreedSelection = (selectedBreed) => {
        setSelectedOption(selectedBreed);
        const correctBreed = currentBreedOptions[currentImageIndex];
    
        if (selectedBreed === correctBreed) {
            setIsCorrect(true);
            const newStreak = streak + 1;
            setStreak(newStreak);
            setHighScore(prevHighScore => Math.max(prevHighScore, newStreak));
    
            if (currentImageIndex < 2) {
                setCurrentImageIndex(currentImageIndex + 1);
            } else {
                fetchNewDogs();
                setCurrentImageIndex(0);
            }
        } else {
            setIsCorrect(false);
            // Updated alert message to include the correct breed
            alert(`Sorry, that is incorrect. The correct breed was: ${correctBreed}. Your streak was: ${streak}`);
            setStreak(0);
            fetchNewDogs();
            setCurrentImageIndex(0);
        }
    };    

    const onImageError = (e) => {
        e.target.src = placeholderImage;
    };

     return (
        <div className="main">
            <nav className="navbar">
                <Link to="/dog" className="nav-button">Dog</Link>
                <Link to="/cat" className="nav-button">Cat</Link> 
                <Link to="/bird" className="nav-button">Bird</Link> 
            </nav>
            <section className="image-section">
                {images.length > 0 && (
                    <img 
                        src={images[currentImageIndex]} 
                        alt="Image of a dog" 
                        className="dog-image"
                        onError={onImageError}
                    />
                )}
            </section>
            <article className="breed-article">
                <div className="breed-choices">
                    {currentBreedOptions.map((breed, index) => (
                        <div 
                            key={index} 
                            className={`breed-choice ${selectedOption === breed ? (isCorrect ? 'correct' : 'incorrect') : ''}`} 
                            onClick={() => handleBreedSelection(breed)}
                        >
                            {breed.charAt(0).toUpperCase() + breed.slice(1)}
                        </div>
                    ))}
                </div>
            </article>
            <div className="scoreboard">
                <p>Current Streak: {streak}</p>
                <p>High Score: {highScore}</p>
            </div>
        </div>
    );
}

export default Home;