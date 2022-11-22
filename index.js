const express = require('express')
const bodyParser = require('body-parser')
const { response } = require('express')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let listOfPersons = [
    {
        id: 11,
        name: "Joana",
        phone: 5802943
    },
    {
        id: 12,
        name: "Alvinho",
        phone: 5638290
    },
    {
        id: 13,
        name: "Vera",
        phone: 5638290
    },
    {
        id: 14,
        name: "Domingo",
        phone: 8987344
    }
];

function generateId() {
    const lastPerson = listOfPersons[listOfPersons.length - 1];
    return lastPerson.id + 1;
}

app.get('/persons/:id', (req, res) => {
    const searchId = req.params.id;
    
    for (let person of listOfPersons) {
        if (person.id == searchId) {
            res.send(person);
            return;
        }
    }

    res.status(404);
    res.send({message: `Person with id ${searchId} not found!`});
})

app.get('/persons', (req, res) => {
    const searchName = req.query.name;

    if (searchName != undefined) {
        let result = [];

        for (let person of listOfPersons) {
            if (person.name == searchName) {
                result.push(person);
            }
        }

        res.send(result);
    } else {
        res.send(listOfPersons);
    }

})


app.get('/calculate', (req, res) => {

     let calculate;
     const a = req.query.a
     const b = req.query.b
     const op = req.query.op

    if(op === '+'){
        calculate = a + b
        res.send(calculate.toString());
    }else if(op === '-'){
        calculate = a - b
        res.send(calculate.toString());
    }else if(op === '*'){
        calculate = a * b
        res.send(calculate.toString());
    }else{
        calculate = a / b
        res.send(calculate.toString());
    }

})

app.post('/persons', (req, res) => {

    let newPerson = req.body;
    newPerson.id = generateId();

    listOfPersons.push(newPerson);

    res.status(201);
    res.send(listOfPersons);
})

app.put('/persons/:id', (req, res) => {

    const searchId = req.params.id;
    const dataToUpdate = req.body;

    for (let person of listOfPersons){
        if(searchId == person.id){
            person.name = dataToUpdate.name;
            person.phone = dataToUpdate.phone;
            res.send(person);
            return;
        }
    }

    res.status(404);
    res.send({message: `Person with id ${searchId} not found!`});
   
})



app.delete('/persons/:id', (req, res) => {

    const searchId = req.params.id;
 
    for (let pos in listOfPersons){
        
        const personId = listOfPersons[pos].id;

        if(personId == searchId){
            listOfPersons.splice(pos, 1);
            res.status(204);
            res.send();
            return;
        }
    }

    res.status(404);
    res.send({message: `Person with id ${searchId} not found!`});
   
   
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})