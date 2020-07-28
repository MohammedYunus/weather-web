const request = require('request');

const forecast = (lat, lon, callback) =>{
    const url=`http://api.weatherstack.com/current?access_key=82091315d31db63b05de92d03d56f5ef&query=${lat},${lon}&units=m`;

    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Cannot connect to weather stack!',undefined);
        }else if(body.error){
            callback('Location not found', undefined);
        }else{
            const value = body.current;
            callback(undefined,(`${value.weather_descriptions[0]} in ${body.location.region}.It is currently ${value.temperature} degrees out and it feels like ${value.feelslike} degrees out.`));    
        } 
    })
};

module.exports = forecast;