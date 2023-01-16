import Part from "./Part";

const Content = ({ parts }) => (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part.name} num={part.exercises} />
      ))}
    </>
  );

export default Content