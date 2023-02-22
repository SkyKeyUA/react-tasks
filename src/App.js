/** @format */

import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('UAH');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(1);
  //const [rates, setRates] = React.useState({});
  const ratesRef = React.useRef({});
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(
          'https://openexchangerates.org/api/latest.json?app_id=a50bc55e86ad45118c30a5a00a0baa4e',
        )
          .then((res) => res.json())
          .then((json) => {
            //setRates(json.rates);
            ratesRef.current = json.rates;
            onChangeToPrice(1);
          });
      } catch (error) {
        alert('error when requesting data');
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const onChangeFromPrice = (value) => {
    if (ratesRef.current[fromCurrency] && ratesRef.current[toCurrency]) {
      const price = value / ratesRef.current[fromCurrency];
      const result = price * ratesRef.current[toCurrency];
      setToPrice(result.toFixed(3));
      setFromPrice(value);
    }
  };
  const onChangeToPrice = (value) => {
    if (ratesRef.current[fromCurrency] && ratesRef.current[toCurrency]) {
      const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
      setFromPrice(result.toFixed(3));
      setToPrice(value);
    }
  };
  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);
  React.useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);
  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
