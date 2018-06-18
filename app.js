const express = require('express'),
    hdfs = require('express-handlebars'),
    bodyParser = require('body-parser');

const app = express();
app.engine('handlebars',hdfs({defaultLayout:'main'}));
app.set('view engine','handlebars');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}));

app.use(express.static(`${__dirname}/public`))

//Mount other routes
const linkedIn = require('./routes/linkedin');
const stripeRoutes = require('./routes/stripe');
app.use('/auth', linkedIn);
app.use('/stripe', stripeRoutes);

app.get('/products',(req,res)=>{
    res.render('index');
});

app.get('/login', (req,res) => {
    res.render('login', { layout: false });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on PORT ${port}`)
});
