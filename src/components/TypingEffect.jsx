import React, { useState, useEffect } from 'react';

const TypingEffect = ({ phrases, typingSpeed = 100, deletingSpeed = 50, delay = 1500 }) => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timeout;

    const handleTyping = () => {
      if (isDeleting) {
        // Deleting
        setText(currentText => currentPhrase.substring(0, currentText.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setPhraseIndex(prevIndex => (prevIndex + 1) % phrases.length);
        }
      } else {
        // Typing
        setText(currentText => currentPhrase.substring(0, currentText.length + 1));
        if (text === currentPhrase) {
          setIsDeleting(true);
          timeout = setTimeout(handleTyping, delay); // Pause before deleting
          return;
        }
      }

      const speed = isDeleting ? deletingSpeed : typingSpeed;
      timeout = setTimeout(handleTyping, speed);
    };

    timeout = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, delay]);

  return (
    <span className="font-medium">
      {text}
      <span className="inline-block w-0.5 h-full bg-gray-600 dark:bg-gray-400 ml-1 animate-blink"></span>
    </span>
  );
};

export default TypingEffect;
