import { useEffect, useState } from "react";
import Form from "./components/Form";
import Header from "./components/Header";
import Input from "./components/Input";
import Notification from "./components/Notification";
import { Person } from "./components/Person";
import phoneServices from "./services/phonebook";

const App = () => {
  const [person, setPerson] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null)
  const [err, setErr] = useState(false)

  const handlePerson = (e) => {
    e.preventDefault();
    console.log("button click...", e.target);
    const newPerson = {
      name: newName,
      number: number,
    };
    exist
      ? handleUpdate(exist.id)
      : phoneServices.create(newPerson).then((returnedContact) => {
          setPerson(person.concat(returnedContact));
          setNotification(`${newName} was added`)
          setTimeout(()=>{
            setNotification(null)
          },3000)
          setNewName("");
          setNumber("");
        }).catch(err => {
          setErr(true)
          setNotification(`${err.response.data.error}`)
          setTimeout(()=>{
            setNotification(null)
            setErr(false)
          },3000)
        });
  };

  const handleRemove = (id) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${
          person.find((ind) => ind.id === id).name
        }`
      )
    ) {
      phoneServices
        .remove(id)
        .then(() =>
          setPerson(person.filter((individual) => individual.id !== id))
        );
    }

    console.log(id);
  };

  const handleUpdate = (id) => {
    const ind = person.find((per) => per.id === id);
    const changeNum = { ...ind, number: number };

    if (
      window.confirm(`${newName} already exist,do you want to update number`)
    ) {
      phoneServices
        .update(id, changeNum)
        .then((returnedContact) =>
          setPerson(
            person.map((ind) => (ind.id !== id ? ind : returnedContact))
          )
        ).catch(er => {
          setErr(true)
          setNotification(`The details of ${ind.name} are already deleted`)
        });
        setNotification(`${newName}'s number was changed`)
        setTimeout(()=>{
          setNotification(null)
          setErr(false)
        },3000)
      setNewName("");
      setNumber("");
    }
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

  useEffect(() => {
    phoneServices.getAll().then((initContact) => {
      setPerson(initContact);
    });
  }, []);

  const exist = person.find((name) => name.name === newName);

  return (
    <>
      <Header title={"PhoneBook"} />
      <Notification name={notification} err={err}/>
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
      <Person person={person} filter={filter} remove={handleRemove} />
    </>
  );
};

export default App;
