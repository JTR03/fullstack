import { useState } from "react";

const Headings = ({ title }) => <h1>{title}</h1>;

const Button = ({ onClick, text }) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  );
};

const AllStats = ({ good, neutral, bad, total }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No FeedBack given</p>;
  }

  return (
    <table>
      <tbody>
        
          <Stats text={"Good"} score={good} />
          <Stats text={"Neutral"} score={neutral} />
          <Stats text={"Bad"} score={bad} />
          <Stats text={"All"} score={total} />
          <Stats text={"Average"} score={(good - bad)/total } />
          <Stats text={"Positives"} score={(good / total) * 100 + ' %'} />
        
      </tbody>
    </table>
  );
};

const Stats = ({ text, score }) => (
  <tr>
    <td>{text}</td>
    <td>{score}</td>
  </tr>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => setNeutral(neutral + 1);

  const handleBad = () => setBad(bad + 1);

  let total = bad + good + neutral;

  return (
    <div>
      <Headings title="FeedBack Collection" />
      <Button text="Good" onClick={handleGood} />
      <Button text="Neutral" onClick={handleNeutral} />
      <Button text="Bad" onClick={handleBad} />
      <Headings title={"Statistics"} />
      <AllStats good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  );
};

export default App;
