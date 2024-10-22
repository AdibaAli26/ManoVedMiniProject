// frontend/src/components/QuestionGenerator.js
import React, { useState } from 'react';
import axios from 'axios';

const QuestionGenerator = () => {
    const [ageGroup, setAgeGroup] = useState('');
    const [questions, setQuestions] = useState([]);

    const handleGenerateQuestions = async () => {
        try {
            const response = await axios.post('http://localhost:3000/generate-questions', { ageGroup });
            setQuestions(response.data.questions);
        } catch (error) {
            console.error('Error generating questions', error);
        }
    };

    return (
        <div>
            <h1>Generate Mental Health Questions</h1>
            <label>
                Select Age Group:
                <select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)}>
                    <option value="">--Select Age Group--</option>
                    <option value="5-8">5-8 years</option>
                    <option value="9-12">9-12 years</option>
                    <option value="13-18">13-18 years</option>
                </select>
            </label>
            <button onClick={handleGenerateQuestions}>Generate Questions</button>
            <ul>
                {questions.map((question, index) => (
                    <li key={index}>{question}</li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionGenerator;
