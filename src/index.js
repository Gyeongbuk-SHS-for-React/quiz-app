import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import QuizContext from 'Contexts/QuizContext'
import QuizEdit from 'Components/QuizEdit';
import 'antd/dist/antd.css';

const quizzes = [
	{
		id: 1,
		question: "일론 머스크의 우주 탐사 기업 이름은?",
		answers: [
			{ text: "스페이스 엑스", isCorrect: true },
			{ text: "테슬라", isCorrect: false },
			{ text: "보링 컴퍼니", isCorrect: false },
			{ text: "솔라시티", isCorrect: false },
		],
	},
	{
		id: 2,
		question: "일론 머스크의 고향은 어디일까요?",
		answers: [
			{ text: "미국 캘리포니아", isCorrect: false },
			{ text: "남아프리카 공화국 프리토리아", isCorrect: true },
			{ text: "캐나다 벤쿠버", isCorrect: false },
			{ text: "호주 시드니", isCorrect: false },
		],
	},
	{
		id: 3,
		question: "일론 머스크가 창업한 페이팔 전신 기업의 이름은?",
		answers: [
			{ text: "Zip2 Corporation", isCorrect: false },
			{ text: "Alpha Exploration co.", isCorrect: false },
			{ text: "X.com", isCorrect: true },
			{ text: "Everything CO.", isCorrect: false },
		],
	},
];

const initialState = {
  quizzes
}

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_QUIZ":
      const generatedId = state.quizzes.reduce((prev, { id }) => Math.max(prev, id), 0) + 1
      console.log('generatedId', generatedId)

      return {
        ...state,
        quizzes: [
          ...state.quizzes,
          { ...action.value, id: generatedId }
        ],
      };
    case "EDIT_QUIZ":
      return {
        ...state,
        quizzes: state.quizzes.map(quiz => {
          if (quiz.id === action.value.id) {
            return action.value;
          }
          return quiz;
        })
      }
    case "REMOVE_QUIZ":
      return {
        ...state,
        quizzes: state.quizzes.filter((_, i) => i !== action.value),
      };
    default:
      throw new Error();
  }
};

function RoutingComp() {
  const [state, dispatch] = useReducer(reducer, initialState)
  
  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<App />} />
          <Route path="/edit" exact element={<QuizEdit />} />
        </Routes>
      </BrowserRouter>
    </QuizContext.Provider>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <RoutingComp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
