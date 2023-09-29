import { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((prev) => prev + 1);
    }, 100);
  }, [count]);

  return (
    <>
      <span>Loading.......{count}</span>
    </>
  );
};

export default LoadingScreen;
