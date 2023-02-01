require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const Contact = require("./model/contacts");

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformed id" });
  }else if(error.name === "ValidationError"){
    return res.status(400).json({error: error.message})
  }
  next(error);
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "Unknown endpoint" });
};

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :sent")
);
morgan.token("sent", (req, res) => JSON.stringify(req.body));
app.use(cors());
app.use(express.static("build"));

app.get("/api/people", (req, res) => {
  Contact.find({}).then((people) => {
    res.json(people);
  });
});

app.get("/info", (req, res) => {
  res.send(
    `<p>They are ${phonebook.length} people in the phone</p> <p>${new Date(
      Date.now()
    )} </p>`
  );
});

app.get("/api/people/:id", (req, res, next) => {
  Contact.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.delete("/api/people/:id", (req, res,next) => {
  // const id = Number(req.params.id);
  // phonebook = phonebook.filter((person) => person.id !== id);
  Contact.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.put('/api/people/:id', (req,res,next) => {
  const {name, number} = req.body

  // const person = {
    // name: body.name,
    // number: body.number
  // }

  Contact.findByIdAndUpdate(req.params.id, {
    name, number
  }, {new: true, runValidators: true, context: 'query'}).then(
    updatedContact => {
      res.json(updatedContact)
    }
  ).catch(err => next(err))
})

app.post("/api/people", (req, res, next) => {
  const body = req.body;

  // console.log(generateId())
  // console.log(body.name)
  // const names = phonebook.map((name) => name.name);

  // if (body.number === undefined) {
    // return res.status(400).json({
      // error: "missing number",
    // });
  // } else if (body.name === undefined) {
    // return res.status(400).json({
      // error: "missing name",
    // });
  // }
  // else if (names.includes(body.name)) {
  // return res.status(400).json({
  // error: "name must be unique",
  // });
  // }

  const person = new Contact({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedContact) => res.json(savedContact)).catch(err => next(err));

  // console.log(person)

  // phonebook = phonebook.concat(person);
  // res.json(person);
});

app.use(errorHandler);
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// const generateId = () => {
// return Math.floor(Math.random() * 10000);
// };
