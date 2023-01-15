const express = require('express');

const app = express();
let port = process.env.PORT || 5500

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res) => {
    res.json({ status: "success" })
} )

app.listen(port, () => {
    console.log(`Sever Running on port ${port}`)
});