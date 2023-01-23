import Input from "./components/Input";
import { useState, useEffect } from "react";
import Display from "./components/Display";
import axios from "axios";
import DetailedView from "./components/Detailed";

const App = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(
      res => setCountries(res.data)
    )
  }, []);

  const handleValue = (e) => {
    setValue(e.target.value);
  };

  const handleShow = (name) => {
    <DetailedView name={name.name}/>
    // setShowAll(!showAll)
  }
  return (
    <>
      <Input title={"Search a country"} value={value} onChange={handleValue} />
      <Display filt={value} country={countries} onClick={handleShow} />
      
    </>
  );
};

export default App;
