import Input from "./components/Input";
import { useState, useEffect } from "react";
import Display from "./components/Display";
import axios from "axios";

const App = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setCountries(res.data));
  }, []);

  const handleValue = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Input title={"Search a country"} value={value} onChange={handleValue} />

      <Display filt={value} country={countries} />
    </>
  );
};

export default App;
