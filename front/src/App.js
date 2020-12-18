import React, { useEffect, useState } from 'react';
import { fetchWord } from './requests';
import './App.css';
import Input from './components/input';

function App() {
  const [word, setWord] = useState('')
  const [translation, setTranslation] = useState('')
  const [points, setPoints] = useState(10)

  function getWord() {
    fetchWord()
    .then(( { wordToFind, answer, rand } ) => {
      setWord(wordToFind)
      setTranslation(answer)
    })
    .catch(console.log)
  }

  function checkAnswer(answer) {
    if (answer.toLowerCase() === translation.toLowerCase()) {
      setPoints(points + 1)
    }
    else {
      setPoints(points - 1)
    }
  }

  useEffect(() => {
    getWord()
  }, [])

  return (
    <div className="App">
      {word !== '' && <>
        <strong>Trouvez la traduction du mot :</strong>
        <strong className="wordToFind">{word}</strong>
        <strong>en Anglais :</strong>
        <Input translation={translation} checkAnswer={(answer) => checkAnswer(answer)} />
        <p className="points">
          Points : {points}
        </p>
      </>}
    </div>
  );
}

export default App;
