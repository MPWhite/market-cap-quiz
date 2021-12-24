import React, {useState} from "react";
import './QuizFrame.scss'
import {companyInfo} from "../data/company_info";

type QuizTile = {
  ticker: string
}


const KnownQuizTile = ({ticker}: QuizTile) => {
  return (
    <div className="KnownQuizTile">
      <div className="KnownQuizTile__Text">
        <h2>{companyInfo[ticker].name}</h2>
        <p><b>${ticker}</b> has a market cap of <b>{(companyInfo[ticker].market_cap/10**9).toFixed(1)}Billion</b></p>
      </div>
    </div>
  )
}

type QuestionQuizTileArgs = {
  knownTicker: string;
  unknownTicker: string;
  setGameOver: any;
  incrementIndex: any;
}

type ActionType = "HIGHER" | "LOWER";

const QuestionQuizTile = ({knownTicker, unknownTicker, incrementIndex, setGameOver}: QuestionQuizTileArgs) => {
  const knownInfo = companyInfo[knownTicker]
  const unknownInfo = companyInfo[unknownTicker]

  const onCLick = (action: ActionType) => () => {
    if ((action === "HIGHER" && unknownInfo.market_cap > knownInfo.market_cap)
      || (action === "LOWER" && unknownInfo.market_cap < knownInfo.market_cap)) {
      incrementIndex();
    } else {
      setGameOver(true);
    }
  }

  return (
    <div className="QuestionQuizTile">
      <div className="QuestionQuizTile__Text">
        <h2>{companyInfo[unknownTicker].name}</h2>
        <p>Is the <b>${unknownTicker}</b> market cap higher or lower than <b>${knownTicker}</b>?</p>
        <button onClick={onCLick("HIGHER")}>Higher</button>
        <button onClick={onCLick("LOWER")}>Lower</button>
      </div>
    </div>
  )
}

const AnswerQuizTile = ({unknownTicker, incrementIndex, setGameOver}: QuestionQuizTileArgs) => {
  const unknownInfo = companyInfo[unknownTicker]

  return (
    <div className="QuestionQuizTile">
      <div className="QuestionQuizTile__Text">
        <h2>{companyInfo[unknownTicker].name}</h2>
        <p>Correct! <b>${unknownTicker}</b> has a market cap of <b>${(unknownInfo.market_cap / 10**9).toFixed(1)}B</b></p>
      </div>
    </div>
  )
}

type GameOverParams = {
  score: number;
}

const gameOverPhrases = [
  "I can't believe people let you invest their money...",
  "Wow that was bad...",
  "Study up and maybe one day you'll be able to land a job better than Wells Fargo...",
  "Study up and maybe one day you'll be able to land a job better than Wells Fargo...",
  "Study up and maybe one day you'll be able to land a job better than Wells Fargo...",
  "Some people just weren't cut out for Goldman.",
  "No real firm will take you after that but you could always go work for your uncle's wealth management company...",
  "Seriously that was garbage.",
]

const GameOver = ({ score }: GameOverParams) => {
  const phrase = gameOverPhrases[Math.floor(Math.random() * gameOverPhrases.length)];

  return (
    <div className="GameOver">
      <div className="GameOver__Modal">
        <h1>Game Over</h1>
        <h2>Score: {score}</h2>
        <div className="GameOver__Share">
          <p>{phrase}</p>
        </div>
        <button onClick={() => {window.location.reload()}}>
          Play Again
        </button>
      </div>
    </div>
  )
}

type QuizFrameParams = {
  quizOrder: any;
}

const QuizFrame = ({quizOrder}: QuizFrameParams) => {
  const [index, updateIndex] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  const incrementIndex = () => {
    setShowAnswer(true)
    setTimeout(() => {
      setShowAnswer(false)
      updateIndex(index + 1)
    }, 1700)
  }

  if (gameOver) {
    return (
      <GameOver score={index} />
    )
  }

  return (
    <div className="QuizFrame">
      <div className='Score'>
        <span>{index}</span>
      </div>
      <KnownQuizTile ticker={quizOrder[index]} />
      <div className="Versus">
        <span>VS</span>
      </div>
      { showAnswer ? (
        <AnswerQuizTile
          knownTicker={quizOrder[index]}
          unknownTicker={quizOrder[index+1]}
          incrementIndex={incrementIndex}
          setGameOver={setGameOver}
        />
      ) : (
        <QuestionQuizTile
          knownTicker={quizOrder[index]}
          unknownTicker={quizOrder[index+1]}
          incrementIndex={incrementIndex}
          setGameOver={setGameOver}
        />
      )
      }

    </div>
  );
}

export default QuizFrame;
