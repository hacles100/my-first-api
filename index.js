const express = require('express')
const bodyParser = require('body-parser')

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
    const lastPerson = listOfPersons[listOfPersons.length-1];
    return lastPerson.id+1;
}

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

app.post('/persons', (req, res) => {

    const newPerson = req.body;
    listOfPersons.push(newPerson);
    res.send(listOfPersons);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})