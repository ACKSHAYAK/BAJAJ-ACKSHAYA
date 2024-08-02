import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [showSections, setShowSections] = useState({
    numbers: true,
    alphabets: true,
    highestAlphabet: true
  });

  const handleSubmit = async () => {
    try {
      const res = await fetch('https://your-api-url.herokuapp.com/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: input
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCheckboxChange = (e) => {
    setShowSections({
      ...showSections,
      [e.target.name]: e.target.checked
    });
  };

  return (
    <div className="App">
      <h1>ABCD123</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Enter JSON'
      />
      <button onClick={handleSubmit}>Submit</button>
      {response && (
        <div>
          <div>
            <label>
              <input
                type="checkbox"
                name="numbers"
                checked={showSections.numbers}
                onChange={handleCheckboxChange}
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                name="alphabets"
                checked={showSections.alphabets}
                onChange={handleCheckboxChange}
              />
              Alphabets
            </label>
            <label>
              <input
                type="checkbox"
                name="highestAlphabet"
                checked={showSections.highestAlphabet}
                onChange={handleCheckboxChange}
              />
              Highest Alphabet
            </label>
          </div>
          {showSections.numbers && (
            <div>
              <h3>Numbers</h3>
              <pre>{JSON.stringify(response.numbers, null, 2)}</pre>
            </div>
          )}
          {showSections.alphabets && (
            <div>
              <h3>Alphabets</h3>
              <pre>{JSON.stringify(response.alphabets, null, 2)}</pre>
            </div>
          )}
          {showSections.highestAlphabet && (
            <div>
              <h3>Highest Alphabet</h3>
              <pre>{JSON.stringify(response.highest_alphabet, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
