import React, { useState, useEffect } from 'react';

function App() {
  const [val, set] = useState('');
  const [phrase, setPhrase] = useState('example phrase');
  
  const createPhrase = () => {
    setPhrase(val);
    set('');
  }

  useEffect(() => {
    console.log(`type "${val}`);
  }, [val]);
  useEffect(() => {
    console.log(`save phrase: ${phrase}`);
  }, [phrase]);
  useEffect(() => {
    console.log('just one call');
  }, [])

  return (
    <>
      <label>FAVORITE PHRASE: </label>
      <input
        value={val}
        placeholder={phrase}
        onChange={e => set(e.target.value)}
      />
      <button onClick={createPhrase}>send</button>
    </>
  )
}

export default App;