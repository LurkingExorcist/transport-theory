const express = require('express');
const axios = require('axios');
const ejs = require('ejs');
const cors = require('cors');
const qs = require('querystring');

const app = express();

app.use(cors());
app.set("view engine", "ejs");
app.use(express.static('public'));

app.get('/', (req, res) => 
  res.render('index'));

app.get('/solve', async (req, res) => {
  try{
    const query = qs.stringify(req.query);
  
    let { data } = await axios.get(`https://elegantgrippingforms--hope410.repl.co/?${query}`)
    
    res.json(JSON.parse(data.replace(/NaN/g, 'null')));
  }catch(e){
    console.log(e);
    res.status(500).json({error: e})
  }
});

app.listen(3000, () => 
  console.log('server started'));