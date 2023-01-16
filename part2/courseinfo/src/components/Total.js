const Total = ({ part }) => (
    <p>Number of {part.reduce((a, c) => a + c.exercises, 0)} exercises</p>
  );
export default Total  