import React from "react";
import "./App.css";
import Quiz from "Components/Quiz";
import { Button } from "antd";
import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

function App() {
	const navigate = useNavigate();
	
	return (
		<div>
			<Quiz />
			<Button type="primary" style={{ marginTop: 10 }} onClick={() => navigate('/edit')} icon={<EditOutlined />}>
				Edit Quiz
			</Button>
		</div>
	);
}

export default App;
