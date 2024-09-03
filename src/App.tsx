import React, { useState, useEffect } from "react";
import { useDebounce, useThrottling } from "./hooks";
import "./styles.css";

export interface Coordinates {
  x: number;
  y: number;
}

export default function App() {
  const [count, setCount] = useState<number>(0);
  const [coordinates, setCoordinates] = useState<Coordinates>({ x: 0, y: 0 });

  const increase = (): void => {
    setCount((prevCount) => prevCount + 1);
  };
  const decrease = (): void => {
    setCount((prevCount) => prevCount - 1);
  };

  const reset = (): void => {
    setCount(0);
  };

  useEffect(() => {
    const setMouse = (e: { clientX: number; clientY: number }) => {
      setCoordinates({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", setMouse);
    return () => {
      window.removeEventListener("mousemove", setMouse);
    };
  }, []);

  return (
    <div>
      <h1>Counter</h1>
      <div>
        <button onClick={increase}> + </button>
        <button onClick={decrease}> - </button>
        <button onClick={reset}>Reset</button>
      </div>
      <p>{count}</p>
      <h2>
        Mouse position: x = {useDebounce(coordinates.x, 100)} y ={" "}
        {useThrottling(coordinates.y, 300)}
      </h2>
    </div>
  );
}
