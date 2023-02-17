/** @format */

import React from 'react';
import './index.scss';

function App() {
  const [count, setCount] = React.useState(0);
  const onClickMinus = () => {
    setCount((prev) => prev - 1);
  };
  const onClickPlus = () => {
    setCount((prev) => prev + 1);
  };
  return (
    <div className="App">
      <div>
        <h2>Сounter:</h2>
        <h1>{count}</h1>
        <button disabled={!count} onClick={onClickMinus} className="minus">
          - Minus
        </button>
        <button onClick={onClickPlus} className="plus">
          Plus +
        </button>
      </div>
    </div>
  );
}

export default App;
