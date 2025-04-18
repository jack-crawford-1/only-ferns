import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function getRandomSequence(length: number) {
  return Array.from({ length }, () => {
    const index = Math.floor(Math.random() * LETTERS.length);
    return LETTERS[index];
  });
}

const Dashboard = () => {
  const [sequenceLength, setSequenceLength] = useState(1);
  const [sequence, setSequence] = useState<string[]>([]);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const [userGuess, setUserGuess] = useState('');
  const [isShowingSequence, setIsShowingSequence] = useState(true);
  const [gameStatus, setGameStatus] = useState<'idle' | 'success' | 'fail'>(
    'idle'
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('highScore');
    return saved ? parseInt(saved) : 0;
  });

  useEffect(() => {
    const newSequence = getRandomSequence(sequenceLength);
    setSequence(newSequence);
    setUserGuess('');
    setGameStatus('idle');
    setIsShowingSequence(true);

    let i = 0;
    const interval = setInterval(() => {
      if (i < newSequence.length) {
        const letterToShow = newSequence[i];
        setHighlightIndex(LETTERS.indexOf(letterToShow));
        i++;
      } else {
        clearInterval(interval);
        setHighlightIndex(null);
        setIsShowingSequence(false);
        setTimeout(() => {
          inputRef.current?.focus();
        }, 50);
      }
    }, 700);
    return () => clearInterval(interval);
  }, [sequenceLength]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setUserGuess(value);

    if (value.length === sequence.length) {
      if (value === sequence.join('')) {
        setGameStatus('success');
        setTimeout(() => {
          setSequenceLength((prev) => {
            const newLength = prev + 1;
            if (newLength > highScore) {
              setHighScore(newLength);
              localStorage.setItem('highScore', newLength.toString());
            }
            return newLength;
          });
        }, 1000);
      } else {
        setGameStatus('fail');
        setTimeout(() => setSequenceLength(1), 1000);
      }
    }
  };

  return (
    <div className="flex flex-col justify-around items-center h-screen bg-gray-800 text-gray-800">
      <div className="flex gap-10 text-black font-bold text-xl">
        <p className="text-white">Current: {sequenceLength}</p>
        <p className="text-white">High Score: {highScore}</p>
      </div>

      <motion.div
        animate={
          gameStatus === 'success'
            ? { scale: [1, 1, 1], transition: { duration: 0.5 } }
            : gameStatus === 'fail'
            ? {
                x: [0, -5, 5, -5, 5, 0],
                transition: { duration: 0.6 },
              }
            : {}
        }
      >
        <motion.ul className="p-0 m-0 flex flex-wrap gap-3 md:w-[780px] justify-center list-none">
          {LETTERS.map((letter, index) => {
            const isHighlighted = highlightIndex === index;
            const colour = isHighlighted
              ? 'orange'
              : isShowingSequence
              ? 'white'
              : 'white';

            return (
              <motion.button
                key={letter}
                className="md:w-[100px] md:h-[100px] w-[80px] h-[80px] rounded-full flex items-center justify-center text-3xl font-bold select-none"
                layout
                whileTap={{ scale: 0.9 }}
                disabled={
                  isShowingSequence || userGuess.length >= sequence.length
                }
                onClick={() => {
                  const updated = userGuess + letter;
                  setUserGuess(updated);

                  if (updated.length === sequence.length) {
                    if (updated === sequence.join('')) {
                      setGameStatus('success');
                      setTimeout(() => {
                        setSequenceLength((prev) => {
                          const next = prev + 1;
                          if (next > highScore) {
                            setHighScore(next);
                            localStorage.setItem('highScore', next.toString());
                          }
                          return next;
                        });
                      }, 1000);
                    } else {
                      setGameStatus('fail');
                      setTimeout(() => setSequenceLength(1), 1000);
                    }
                  }
                }}
                transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                style={{
                  backgroundColor: colour,
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {letter}
              </motion.button>
            );
          })}
        </motion.ul>
      </motion.div>

      <div className="p-10">
        <input
          type="text"
          ref={inputRef}
          value={userGuess}
          onChange={handleInput}
          disabled={isShowingSequence}
          className="mt-6 text-white text-xl px-4 py-2 rounded-md hidden md:block"
          placeholder="Type the sequence..."
          maxLength={sequence.length}
        />
      </div>
      {gameStatus === 'success' && (
        <p className="text-green-400 font-bold text-xl mt-4">✅ Correct!</p>
      )}
      {gameStatus === 'fail' && (
        <button
          onClick={() => setSequenceLength(1)}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Fail - Restart Game
        </button>
      )}
    </div>
  );
};

export default Dashboard;
