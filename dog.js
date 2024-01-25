import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    // state variables for storing images, breed options, scores, selection, and correctness
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentBreedOptions, setCurrentBreedOptions] = useState([]);
    const [streak, setStreak] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const placeholderImage = 'https://wallpapers.com/images/hd/funny-dog-picture-02rmkoy5cmhh647q.jpg';

    // fetches new dog data on component mount
    useEffect(() => {
        fetchNewDogs();
    }, []);

    // fetches random dog images from the API
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

    // generates breed options from fetched images
    const generateBreedOptions = (dogImages) => {
        const breeds = dogImages.map(image => {
            const urlParts = image.split('/');
            return urlParts[urlParts.indexOf("breeds") + 1];
        }).filter(breed => breed);
        setCurrentBreedOptions(breeds);
    };

    // handles breed selection and updates game state
    const handleBreedSelection = (selectedBreed) => {
        setSelectedOption(selectedBreed);
        const correctBreed = currentBreedOptions[currentImageIndex];
    
        // updates streak and high score based on correctness
        if (selectedBreed === correctBreed) {
            setIsCorrect(true);
            const newStreak = streak + 1;
            setStreak(newStreak);
            setHighScore(prevHighScore => Math.max(prevHighScore, newStreak));
    
            // moves to next image or fetches new set of dogs
            if (currentImageIndex < 2) {
                setCurrentImageIndex(currentImageIndex + 1);
            } else {
                fetchNewDogs();
                setCurrentImageIndex(0);
            }
        } else {
            setIsCorrect(false);
            alert(`Sorry, that is incorrect. The correct breed was: ${correctBreed}. Your streak was: ${streak}`);
            setStreak(0);
            fetchNewDogs();
            setCurrentImageIndex(0);
        }
    };    

    // handles image loading errors
    const onImageError = (e) => {
        e.target.src = placeholderImage;
    };

    // rendering the component
    return (
        <div className="main">
            // navigation bar
            <nav className="navbar">
                <Link to="/dog" className="nav-button">Dog</Link>
                <Link to="/cat" className="nav-button">Cat</Link> 
                <Link to="/bird" className="nav-button">Bird</Link> 
            </nav>
            // section for displaying dog images
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
            // section for displaying breed choices
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
            // scoreboard section
            <div className="scoreboard">
                <p>Current Streak: {streak}</p>
                <p>High Score: {highScore}</p>
            </div>
        </div>
    );
}

// export the Home component
export default Home;