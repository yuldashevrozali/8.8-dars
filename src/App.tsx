import React, { useState, useRef } from 'react';
import './App.css';

function App(): JSX.Element {
  const [method, setMethod] = useState<string>('GET');
  const [inputValue, setInputValue] = useState<string>('');
  const [apiUrl, setApiUrl] = useState<string>('');
  const [res, setRes] = useState<any[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setMethod(e.target.value);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
    setApiUrl(e.target.value);
  };

  const handleSendRequest = (): void => {
    if (inputValue.length) {
      const requestOptions: RequestInit = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (method !== 'GET') {
        requestOptions.body = JSON.stringify({ data: inputValue });
      }

      fetch(apiUrl, requestOptions)
        .then((response) => {
          if (method === 'DELETE') {
            return response.text();
          } else {
            return response.json();
          }
        })
        .then((responseData) => {
          setRes(responseData);
        })
        .catch((error) => console.error('Error:', error));
    } else {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleSaveToLocal = (): void => {
    localStorage.setItem(apiUrl, JSON.stringify(res));
  };

  return (
    <div>
      <div className='main'>
        <div className='block'>
          <select value={method} onChange={handleMethodChange}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
          <input
            type="text"
            value={inputValue}
            onChange={handleInput}
            placeholder="Enter API URL"
            ref={inputRef}
          />
        </div>
        <button onClick={handleSendRequest}>Send</button>
        <button onClick={handleSaveToLocal}>Save</button>
      </div>
      <div className='main2'>
        
        {method == 'GET' ? (
          <div>
            {res.length === 0 && <p>No data</p>}
            <h1>Data:</h1>
            <pre>{JSON.stringify(res, null, 2)}</pre>
          </div>
        ) : (
          <div></div>
        )}

      </div>
    </div>
  );
}

export default App;
