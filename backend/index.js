const express = require('express')


const app = express()
const cors = require('cors');
const port = 5000

const mongoDB = require("./db")
app.use(cors());
app.use(express.json());

// app.use((req,res,next) => {
//   res.setHeader("Access-Control-Allow-Origin","https://bhilai-eats-nm.vercel.app/");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// })



app.get('/', (req, res) => {
  res.redirect('/user');
});

app.get('/user', (req, res) => {
  res.send('Hello World!');
});

mongoDB();

// Shop_Owner Part
app.use('/api', require("./Routes/Shop_Owner/CreateAdmin"));

app.use('/api', require("./Routes/Shop_Owner/Create_Food"));
app.use('/api', require("./Routes/Shop_Owner/Delete_Food"));
app.use('/api', require("./Routes/Shop_Owner/CreateAdmin"));

app.use('/api', require("./Routes/Shop_Owner/DisplayFoodsActoShop"));             
app.use('/api', require("./Routes/User/DisplayDataAcToShops"));              


// User part
app.use('/api', require("./Routes/User/CreateUser"));
app.use('/api', require("./Routes/User/OrderData"));
app.use('/api', require("./Routes/User/DisplayCanteen"));

// Super_Admin part

app.use('/api', require("./Routes/Super_Admin/Owners"));
app.use('/api', require("./Routes/Super_Admin/CreateSuperAdmin"));
app.use('/api', require("./Routes/Super_Admin/CreateShops"));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = { app }