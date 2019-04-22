const request = require('request')

const forecast = (latitude, longitude, callback) => {
    //  ex : https://api.darksky.net/forecast/7902226b1004bb9045d9414a1fe5f724/46,-71?units=si
    const url = `https://api.darksky.net/forecast/7902226b1004bb9045d9414a1fe5f724/${latitude},${longitude}?units=si`
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            callback(undefined,`${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability*100}% chance of rain. The highest temperature for the day is ${body.daily.data[0].temperatureMax} dregrees and the lowest is ${body.daily.data[0].temperatureMin} degrees`)
        }
    })
}

module.exports = forecast