import React, { useState } from 'react';
import './App.css';
import logo from './logo.svg';
import axios from 'axios';
import OpenAI from 'openai';
// Replace this with your actual OpenAI API key
const API_KEY = '';

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

async function getChatGPTResponse(prompt) {
  const options = {
    method: 'POST',
    // url: 'https://api.openai.com/v1/chat',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    data: {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      // temperature: 0.7,
    },
  };

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
     
    });
    console.log(response)
    // return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('loi fetch', error);
    return 'fetech not value.';
  }
}

function App() {
  const [inputValue, setInputValue] = useState('');
  // const [response, setResponse] = useState('');

  const handleClick = async () => {
   

    const chatGptResponse = await getChatGPTResponse(inputValue);
    console.log(chatGptResponse)
    // setResponse(chatGptResponse);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input
          placeholder="Type in here…"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleClick}>
          Click
        </button>
        <div>
          <h2>Response:</h2>
          {/* <p>{response}</p> */}
        </div>
      </header>
    </div>
  );
}

export default App;
