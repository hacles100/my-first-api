const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let listOfPersons = [
    {
        name: "Joana",
        phone: 5802943
    },
    {
        name: "Alvinho",
        phone: 5638290
    },
    {
        name: "Vera",
        phone: 5638290
    },
    {
        name: "Domingo",
        phone: 8987344
    }
];

app.get('/persons', (req, res) => {
    const searchName = req.query.name;
    
    if(searchName!=undefined) {
        let result = [];

        for(let person of listOfPersons) {
            if (person.name == searchName) {
                result.push(person);
            }
        }

        res.send(result);
    } else {
        res.send(listOfPersons);
    }

})

app.get('/say-something', (req, res) => {

    console.log(req.query);
    const { name, age } = req.query;
    const myResponse = {
        name: name,
        age: age
    }

    res.send(myResponse);
})

app.post('/say-something', (req, res) => {
    console.log(req.body);
    res.send(`The event name is ${req.body.eventName}`);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})