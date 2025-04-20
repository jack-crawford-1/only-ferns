import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function getRandomSequence(length: number) {
  return Array.from({ length }, () => {
    const index = Math.floor(Math.random() * LETTERS.length);
    return LETTERS[index];
  });
}

const successMessages = [
  'Phew, dont want to lose already',
  'Still pretty easy',
  'You can count to three',
  "Okay, you're getting better",
  'Five is no joke',
  'Noice!',
  'Sharp',
  "You're locked in now",
  'Kinda impressive',
  'Absolute memory beast',
];

const Dashboard = () => {
  const [sequenceLength, setSequenceLength] = useState(1);
  const [sequence, setSequence] = useState<string[]>([]);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const [userGuess, setUserGuess] = useState('');
  const [isShowingSequence, setIsShowingSequence] = useState(true);
  const [gameStatus, setGameStatus] = useState<'idle' | 'success' | 'fail'>(
    'idle'
  );
  const [messageIndex, setMessageIndex] = useState(0);

  const [roundKey, setRoundKey] = useState(0);

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
      }
    }, 700);

    return () => clearInterval(interval);
  }, [sequenceLength, roundKey]);

  return (
    <div className="flex flex-col md:justify-center justify-around items-center h-screen bg-[#489bee] text-gray-800">
      <div className="flex gap-10 text-black font-bold text-xl md:mb-40">
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
              ? '#FFFF00'
              : isShowingSequence
              ? '#E0E0E0'
              : 'white';

            return (
              <motion.button
                key={letter}
                className="md:w-[100px] md:h-[100px] w-[60px] h-[60px] rounded-md flex items-center justify-center text-3xl font-bold select-none shadow-md shadow-black"
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

                        setGameStatus('idle');
                        setMessageIndex(
                          (prev) => (prev + 1) % successMessages.length
                        );
                      }, 1200);
                    } else {
                      setGameStatus('fail');
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

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={
          gameStatus === 'success' ? { opacity: 1, y: 0 } : { opacity: 0 }
        }
        transition={{ duration: 0.4 }}
        className="absolute top-40"
      >
        {gameStatus === 'success' && (
          <p className="bg-[#48ee57] text-green-800 font-bold h-fit text-xl px-4 py-2 rounded-md shadow-md shadow-green-800">
            {successMessages[messageIndex]}
          </p>
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={gameStatus === 'fail' ? { opacity: 1, y: 0 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute top-40"
      >
        {gameStatus === 'fail' && (
          <button
            onClick={() => {
              setSequenceLength(1);
              setMessageIndex(0);
              setGameStatus('idle');
              setRoundKey((prev) => prev + 1);
            }}
            className="px-4 py-2 bg-[#ee4848] h-fit text-white rounded-md shadow-md shadow-red-800 font-bold"
          >
            Fail - Restart Game
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
