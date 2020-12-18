import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { fetchWord } from './requests';
import Input from './components/input';
import './App.css';

function App() {
  const [word, setWord] = useState('')
  const [translation, setTranslation] = useState('')
  const [points, setPoints] = useState(10)

  function getWord() {
    fetchWord()
    .then(( { wordToFind, answer } ) => {
      setWord(wordToFind)
      setTranslation(answer)
    })
    .catch(() => {
      swal('Oops...', 'Impossible de jouer pour le moment', 'error')
    })
  }

  function checkAnswer(answer) {
    if (answer.toLowerCase() === translation.toLowerCase()) {
      setPoints(points + 1)

      if (points === 20) {
        swal('Vous avez gagné !', 'Une partie va recommencer', 'success')
        setPoints(10)
      }
      else {
        swal('Bravo !', 'Vous avez gagné un point. À 20 points, vous aurez gagné !', 'success')
      }
    }
    else {
      setPoints(points - 1)

      if (points === 0) {
        swal('Vous avez perdu...', 'Une partie va recommencer', 'error')
        setPoints(10)
      }
      else {
        swal(`La réponse était "${translation}"`, 'Vous avez perdu un point. À 0 point, vous aurez perdu...', 'error')
      }
    }

    getWord()
  }

  useEffect(() => {
    getWord()
  }, [])

  return (
    <div className="App">
      {(word && word !== '') && <>
        <strong>Trouvez la traduction du mot :</strong>
        <strong className="wordToFind">{word}</strong>
        <strong>en Anglais :</strong>
        <Input translation={translation} checkAnswer={(answer) => checkAnswer(answer)} />
        <p className="card points">
          Points : {points}
        </p>
      </>}
    </div>
  );
}

export default App;
