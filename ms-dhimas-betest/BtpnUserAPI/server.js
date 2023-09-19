require('dotenv').config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const userDataRoutes = require('./routes/userDataRoutes')
const errorMiddleware = require('./middleware/errorMiddleware')
const cors = require("cors")

const app = express();

const PORT = process.env.PORT || 2000
const MONGO_URL = process.env.MONGO_URL

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(errorMiddleware)

app.use('/api/users', userDataRoutes)

mongoose.connect(MONGO_URL).then(() => {
    console.log("Connected");
    app.listen(PORT, () => {
        console.log("Btpn Api in port", PORT);
    });
}).catch((err) => {
    console.log(err);
});;

console.log(mongoose.connection);
