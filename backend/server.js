const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('./models/db');
const Authrouter = require('./Routes/Authrouter');
const Productrouter = require('./Routes/Productrouter');
const Servicerouter = require('./Routes/Servicerouter');


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(bodyParser.json());
app.use(cors()); 

app.use('/auth',Authrouter);
app.use('/products',Productrouter);
app.use('/service',Servicerouter)

const PORT = process.env.PORT||8080;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/`);
});


