import React, { useContext } from 'react'
import QuizContext from 'Contexts/QuizContext'
import { Button, Input, Select } from 'antd';
import { DeleteOutlined, SaveOutlined, PlusOutlined, RollbackOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const QuestionEditor = ({ quiz }) => {
  const { id, question, answers } = quiz
  return <div style={{ border: '1px solid black', margin: 1, padding: 2 }}>
    <div>
      <b>문제 수정</b>
    </div>
    <div style={{ marginTop: 3 }}>
      <b>질문</b>
    </div>
    <Input.Group compact>
      <Input
        style={{ width: "calc(100% - 31px)" }}
        value={question}
      />
      <Button icon={<DeleteOutlined />} />
    </Input.Group>
    <div style={{ marginTop: 5, padding: 5, border: '1px solid lightgrey' }}>
      <b>답변 수정</b>
      {
        answers.map((answer, index) => (
          <AnswerEditor key={index} answer={answer} />
        ))
      }
      <Button type="primary" icon={<PlusOutlined />}>추가</Button>
    </div>
    <div>
      <Button type="primary" icon={<SaveOutlined />}>업데이트</Button>
    </div>
  </div>
}

const AnswerEditor = ({ answer }) => {
  const { text, isCorrect } = answer

  const correctorValue = isCorrect ? "correct" : "not_correct"

  const corrector = (
    <Select defaultValue={correctorValue} style={{ width: '115px' }} className="select-after">
      <Option value="correct">correct</Option>
      <Option value="not_correct">not correct</Option>
    </Select>
  );

  return (
		<div>
			<Input.Group compact>
				<Input
					style={{ width: "calc(100% - 31px)" }}
          addonAfter={corrector}
          value={text}
				/>
        <Button icon={<DeleteOutlined />} />
			</Input.Group>
		</div>
	);
}

export default function QuizEdit() {
  const { state, dispatch } = useContext(QuizContext)
  const navigate = useNavigate();

  const { quizzes } = state

  const addQuiz = () => {
    dispatch({
      type: 'ADD_QUIZ',
      value: {
        question: "",
        answers: [
          { text: "test", isCorrect: false }
        ]
      }
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Button type="primary" style={{ width: 200 }} onClick={() => navigate(-1)} icon={<RollbackOutlined />}>
				Back Quiz
			</Button>
      <div style={{ height: '100%', overflow: 'auto' }}>
        {
          quizzes.map((quiz, index) => {
            const { id } = quiz
            return <div key={id}>
              <QuestionEditor quiz={quiz} />
            </div>
          })
        }
        <Button type="primary" icon={<PlusOutlined />} onClick={addQuiz}>추가</Button>
      </div>
    </div>
  )
}
