const path = require('path') //to get into different directories
const express = require('express') //to work with framework
const hbs = require('hbs'); //handlebars for using front end process
const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express(); //using express frame work.
const publicDirectoryPath = path.join(__dirname, '../public'); //moving from current file to public folder
const viewsPath = path.join(__dirname, '../templates/views'); //moving from current file to views folder
const partialsPath = path.join(__dirname, '../templates/partials'); //moving from current file to partials folder


app.set('views', viewsPath); //setting the destination to views directory
hbs.registerPartials(partialsPath); //using and linking handlebar files in partial folder
app.set('view engine', 'hbs'); //specifying .hbs extension file to be used.
app.use(express.static(publicDirectoryPath)); //using HTML files in public directory for static websites


//handling requests and responses for different paths.

app.get('', (req, res) => {
	res.render('index', {	
        title: 'Weather app', 
        text:'Use this site to get weather around you.',
        name: 'yunus'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'yunus'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        helpText: 'This is some helpful text.',
        name: 'yunus'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'please provide the location.'
        })
    }
    geocode(req.query.address, (error,{Latitude, Longitude, Location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(Latitude, Longitude, (error,dataForecast)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: dataForecast,
                Location: Location,
                Address: req.query.address
            })
        })
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title: 404,
        error:'Help article not found!'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title: 404,
        error:'Page not found!'
    })
})

//listening or displaying file on port 3000.
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})