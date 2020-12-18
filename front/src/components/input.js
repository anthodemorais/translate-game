import React, { useEffect, useState } from 'react';
import './styles/Input.css';

function Input(props) {
  const [answer, setAnswer] = useState('')

  useEffect(() => {
    setAnswer(props.translation.charAt(0))
  }, [props])

  function answerSubmited(e) {
    e.preventDefault()
    props.checkAnswer(answer)
  }

  return (
    <div className="Input">
      <form onSubmit={(e) => answerSubmited(e)}>
        <div>
            <label for="answer">Votre réponse : </label>
            <input 
                type="text"
                name="answer"
                value={answer}
                maxLength={props.translation.length}
                onChange={(e) => setAnswer(e.target.value)}
            />
        </div>
        <span>Aide : le mot commence par {props.translation.charAt(0)} et fait {props.translation.length} caractères de long</span>
        <span>{answer.length} / {props.translation.length} caractères utilisés</span>
        <input type="submit" value="Valider ma réponse" />
      </form>
    </div>
  );
}

export default Input;
