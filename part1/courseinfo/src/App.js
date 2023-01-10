const App = () => {
  const course = {
    name:"Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises:10,
       },
       {
        name:"Using props to pass data",
        exercises:7,},
        {
          name: "State of a component",
          exercises:14
         }
    ]
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  





 
 
 
 
 
 
 
  
  
  

  return (
    <div>
      <Header course={course.name} />
      <Content  part={course.parts}/>
      <Total part={course.parts} />
    </div>
  );
};

export default App;

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => (
<>
<Part part = {props.part[0].name} num = {props.part[0].exercises} />
<Part part = {props.part[1].name} num = {props.part[1].exercises} />
<Part part =  {props.part[2].name} num = {props.part[2].exercises} />
</>
 
 
);

const Total = (props) => <p>Number of exercises {props.part[0].exercises +props.part[1].exercises+props.part[2].exercises}</p>;

const Part =  (props) => (
  <p>{props.part} {props.num}</p>
)