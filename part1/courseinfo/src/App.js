const App = () => {
  const course = "Half Stack application development";
  const exercise1 = 10;
  const exercise2 = 7;
  const exercise3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content  />
      

      

      <Total total={exercise1 + exercise2 + exercise3} />
    </div>
  );
};

export default App;

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = () => (
<>
<Part part = "Fundamentals of React" num = {10} />
<Part part = "Using props to pass data" num = {7} />
<Part part =  "State of a component" num = {14} />
</>
 
 
);

const Total = (props) => <p>Number of exercises {props.total}</p>;

const Part =  (props) => (
  <p>{props.part} {props.num}</p>
)