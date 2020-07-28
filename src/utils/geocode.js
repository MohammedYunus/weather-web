const request = require('request');

const geocode = (address, callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibXl1bnVzOTYiLCJhIjoiY2tkMGpobmI1MGhjYzJ1cW1vb3JtaHkwaiJ9.JrXmS_k5J8WrfxtySFN4DQ&limit=1`;
    request({url, json: true}, (error , {body})=>{
        if(error){
            callback('Cannot connect to network!', undefined);
        }else if(body.features.length === 0){
            callback('Location not found!', undefined);
        }else{
            const value1 = body.features[0];
            callback(undefined,{
                Location: value1.place_name,
                Latitude: value1.center[1],
                Longitude: value1.center[0]
            })
        }
    })
};

module.exports = geocode;