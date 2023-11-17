import { useEffect, useState } from 'react';
import _ from 'lodash';

function App() {
  const [images, setImages] = useState([
    "1.jpg",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png",
    "7.png",
    "8.png",
    "9.png"
  ]);
  const [randomised, setRandomised] = useState(true);

  const handleChange = () => {
    const intervalId = setInterval(() => {
      const newImages = _.shuffle(images);
      if (randomised) {
        setImages(newImages);
      }
    }, 50); // Adjust the interval to your liking (e.g., 50 milliseconds)

    // Clear the interval after 5 seconds
    setTimeout(() => {
      clearInterval(intervalId);
      setRandomised(false);
    }, 5000); // Stop after 5 seconds
  };

  useEffect(() => {
    // Start the animation after 3 seconds
    const timeoutId = setTimeout(() => {
      handleChange();
    }, 3000);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="bg-black h-screen">
      <div className="bg-black w-1/2 mx-auto">
        <div className="bg-black">
          <div className="grid grid-cols-3">
            {images.map((img, index) => (
              <img
                key={index}
                height={200}
                width={200}
                src={`/img/${img}`}
                alt={`img-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
