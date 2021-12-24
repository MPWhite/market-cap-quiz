import React from 'react';
import './App.css';
import QuizFrame from "./components/QuizFrame";
import {companyInfo} from "./data/company_info";


/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array: any) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}


function App() {
  const tickers = Object.keys(companyInfo).map((x: string) => {
    return x
  })
  shuffleArray(tickers)
  return (
    <>
      <QuizFrame quizOrder={tickers}/>
    </>
  );
}

export default App;
