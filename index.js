const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/say-something', (req, res) => {
    console.log(req.query);
    const {name, age} = req.query;
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

app.get('/', (req, res) => {
    res.send('GET Method called CC')
})

app.put('/', (req, res) => {
    res.send('PUT Method called')
})

app.post('/', (req, res) => {
    res.send('POST Method called')
})

app.delete('/', (req, res) => {
    res.send('DELETE Method called')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})