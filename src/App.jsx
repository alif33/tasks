import React, { 
  useState, 
  useEffect, 
  useRef,
  forwardRef
} from 'react';

const Spinner = forwardRef(({ timer, onFinish }, ref) => {
  const [position, setPosition] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(timer);
  const iconHeight = 188;
  const multiplier = Math.floor(Math.random() * (4 - 1) + 1);
  const speed = iconHeight * multiplier;

  function setStartPosition() {
    return Math.floor(Math.random() * 9) * -iconHeight;
  }

  function moveBackground() {
    setPosition((prevPosition) => prevPosition - speed);
    setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 100);
  }

  function getSymbolFromPosition() {
    let currentPosition = setStartPosition();
    onFinish(currentPosition);
  }

  function tick() {
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      getSymbolFromPosition();
    } else {
      moveBackground();
    }
  }

  useEffect(() => {
    const timerInterval = setInterval(() => {
      tick();
    }, 5);

    return () => clearInterval(timerInterval);
  }, [timeRemaining]);

  useEffect(() => {
    setPosition(setStartPosition());
    setTimeRemaining(timer);
  }, [timer]);

  React.useImperativeHandle(ref, () => ({
    forceUpdateHandler: reset,
  }));

  function reset() {
    clearInterval(timerInterval);
    setPosition(setStartPosition());
    setTimeRemaining(timer);

    timerInterval = setInterval(() => {
      tick();
    }, 100);
  }

  let timerInterval = setInterval(() => {
    tick();
  }, 100);

  return (
    <div
      style={{ backgroundPosition: `0px ${position}px` }}
      className="icons"
    />
  );
});

const App = () => {
  const first = useRef();
  const second = useRef();
  const third = useRef();

  return (
    <div>
      <div className={`spinner-container`}>
        <Spinner onFinish={() => {}} timer="5000" ref={first} />
        <Spinner onFinish={() => {}} timer="5000" ref={second} />
        <Spinner onFinish={() => {}} timer="5000" ref={third} />
        <div className="gradient-fade"></div>
      </div>
    </div>
  );
};

export default App;