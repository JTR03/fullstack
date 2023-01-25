const express = require("express");
const app = express();

app.use(express.json());

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/people", (req, res) => {
  res.json(phonebook);
});

app.get("/info", (req, res) => {
  res.send(
    `<p>They are ${phonebook.length} people in the phone</p> <p>${new Date(
      Date.now()
    )} </p>`
  );
});

app.get("/api/people/:id", (req, res) => {
  const id = Number(req.params.id);
  person = phonebook.find((person) => {
    return person.id == id;
  });

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/people/:id", (req, res) => {
  const id = Number(req.params.id);
  phonebook = phonebook.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/people", (req, res) => {
  const body = req.body;

  // console.log(generateId())
  // console.log(body.name)
  const names = phonebook.map((name) => name.name);

  if (!body.number) {
    return res.status(400).json({
      error: "missing number",
    });
  } else if (!body.name) {
    return res.status(400).json({
      error: "missing name",
    });
  } else if (names.includes(body.name)) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  // console.log(person)

  phonebook = phonebook.concat(person);
  res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

const generateId = () => {
  return Math.floor(Math.random() * 10000);
};
