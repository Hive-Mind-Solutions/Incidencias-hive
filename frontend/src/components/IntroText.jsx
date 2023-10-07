import React, { useState, useEffect } from "react";

function IntroText() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const words = ["Eficiencia", "Facilidad", "Ahorro", "Valor"];

  const currentWord = words[index];
  const longestWordLength = Math.max(...words.map((word) => word.length));

  useEffect(() => {
    if (subIndex === currentWord.length) {
      const timeoutId = setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % words.length);
        setSubIndex(0);
      }, 2000);
      return () => clearTimeout(timeoutId);
    } else {
      const timeoutId = setTimeout(() => {
        setSubIndex((prevSubIndex) => prevSubIndex + 1);
      }, 150);
      return () => clearTimeout(timeoutId);
    }
  }, [index, subIndex, currentWord.length, words.length]);

  return (
    <h2>
      Hive mind solutions es:{" "}
      <span className="word" style={{ minWidth: `${longestWordLength}ch` }}>
        {currentWord.substring(0, subIndex)}
        <span className="cursor" />
      </span>
    </h2>
  );
}

export default IntroText;
