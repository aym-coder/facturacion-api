const express = require ('express');
const bodyParser = require('body-parser');
const auth = require('./routes/auth');
const collections = require('./routes/collections');

const app = express();
const port = process.env.PORT || 3000;

app.use( (req,res,next) =>{
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept, Acces-Control-Request-Method");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
})

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/auth', auth);
app.use('/collections', collections);

app.listen(port, function () {
  console.log(`sever running on ${port} port`);
});
