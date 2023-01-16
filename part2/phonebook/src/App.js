import { useState } from "react";
import Form from "./components/Form";
import Header from "./components/Header";
import Input from "./components/Input";
import { Person } from "./components/Person";

const App = () => {
  const [person, setPerson] = useState([
    {
      name: "Artios Cambell",
      number: "083 217 3223",
    },
  ]);

  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handlePerson = (e) => {
    e.preventDefault();
    console.log("button click...", e.target);
    const newPerson = {
      name: newName,
      number: number,
    };
    exist
      ? alert(`${newName} already exist`)
      : setPerson(person.concat(newPerson));
    setNewName("");
    setNumber("");
  };

  const handleNewName = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  };

  const handleNumber = (e) => {
    setNumber(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const exist = person.find((name) => name.name === newName);

  return (
    <>
      <Header title={"PhoneBook"} />

      <Input value={filter} onChange={handleFilter} title={"filter by name"} />

      <Header title={"Add New"} />
      <Form
        onSubmit={handlePerson}
        handleNewName={handleNewName}
        handleNumber={handleNumber}
        newName={newName}
        number={number}
      />
      <Header title={"Numbers"} />
      <Person person={person} filter={filter} />
    </>
  );
};

export default App;
