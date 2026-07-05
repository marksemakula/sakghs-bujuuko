import React, { useState, useEffect } from 'react';
import './CollageBackground.css';

const BUJ = (n: number) =>
  `/St. Andrew Kaggwa Gombe High School - Bujuuko/St. Andrew Kaggwa Gombe High School - Bujuuko${n}.jpeg`;

const images: string[] = [17, 20, 22, 23, 26, 28, 30, 32, 33, 36].map(BUJ);

const FOREGROUND_COUNT = 3;

const CollageBackground: React.FC = () => {
  const [foregroundIndexes, setForegroundIndexes] = useState<number[]>([]);
  const [colorIndexes, setColorIndexes] = useState<number[]>([]);

  useEffect(() => {
    setForegroundIndexes(Array.from({ length: FOREGROUND_COUNT }, (_, i) => i));
    setColorIndexes([]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setForegroundIndexes(() => {
        const newIndexes: number[] = [];
        while (newIndexes.length < FOREGROUND_COUNT) {
          const idx = Math.floor(Math.random() * images.length);
          if (!newIndexes.includes(idx)) newIndexes.push(idx);
        }
        return newIndexes;
      });
      setColorIndexes(() => {
        if (foregroundIndexes.length > 0) {
          const idx = foregroundIndexes[Math.floor(Math.random() * foregroundIndexes.length)];
          return [idx];
        }
        return [];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [foregroundIndexes]);

  return (
    <div className="collage-bg">
      {images.map((src, i) => {
        const isForeground = foregroundIndexes.includes(i);
        const isColor = colorIndexes.includes(i);
        return (
          <img
            key={i}
            src={src}
            alt=""
            aria-hidden="true"
            className={`collage-img${isForeground ? ' collage-img-foreground' : ' collage-img-background'}${
              isColor ? ' collage-img-color' : ''
            }`}
            style={{
              zIndex: isForeground ? 2 : 1,
              filter: isColor ? 'none' : 'grayscale(1) contrast(1.1) brightness(0.95)',
              opacity: isForeground ? (isColor ? 1 : 0.95) : 0.5,
              transition: 'all 2s cubic-bezier(.77,0,.18,1)',
              transform: isForeground ? 'scale(1.1) translateY(-10px)' : 'scale(1) translateY(0)',
            }}
            loading="lazy"
          />
        );
      })}
    </div>
  );
};

export default CollageBackground;
