import React, { useContext, useState } from 'react'
import QuizContext from 'Contexts/QuizContext';

export default function Quiz() {
  const [currentNo, setCurrentNo] = useState(0);

	const { state } = useContext(QuizContext)

  const { quizzes } = state

  const handleClick = (isCorrect) => {
    if (isCorrect) {
        alert("정답 👏👏👏");
    } else {
        alert("오답 😣😣😣");
    }
    setCurrentNo(currentNo + 1);
  };

	return (
		<div>
			<b>
        <span>{quizzes[currentNo].id}</span>/{quizzes.length}
      </b>
			<div className="question-text">{quizzes[currentNo].question}</div>
			{quizzes[currentNo].answers.map((answer) => (
				<button
					value={answer.text}
					onClick={() => handleClick(answer.isCorrect)}
				>
					{answer.text}
				</button>
			))}
		</div>
	);
}
