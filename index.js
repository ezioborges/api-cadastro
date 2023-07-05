const fs = require("fs/promises");
const express = require("express");
const _ = require("lodash");
const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());


app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    let content;

    try {
        content = await fs.readFile(`data/comments/${id}.txt`, "utf-8")
        const finalContent = JSON.parse(content)
        res.status(200).json(finalContent)
    } catch (err) {
        return err;
    }
})

app.post('/users', async (req, res) => {
    const createdId = uuid()
    const { name, email, password, passwordConfirmation } = req.body;


    const newUser = {
        id: createdId,
        name,
        email,
        password,
        passwordConfirmation
    }

    await fs.mkdir("data/comments", { recursive: true });
    const testUser = JSON.stringify(newUser)
    await fs.writeFile(`data/comments/${createdId}.txt`, testUser)

    res.status(201).send(newUser);
})

app.listen(3002, () => console.log('running...'))