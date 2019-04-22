const request = require('request')
const util = require('util')

const forecast = (latitude, longitude, callback) => {
    const url = util.format(
        //  ex : https://api.darksky.net/forecast/7902226b1004bb9045d9414a1fe5f724/46,-71?units=si
        'https://api.darksky.net/forecast/7902226b1004bb9045d9414a1fe5f724/%d,%d?units=si',
        latitude,
        longitude,
    )
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            callback(undefined, util.format('%s It is currently %s degrees out. There is a %s% chance of rain. The highest temperature for the day is %s dregrees and the lowest is %s degrees',
                body.daily.data[0].summary,
                body.currently.temperature,
                body.currently.precipProbability*100,
                body.daily.data[0].temperatureMax,
                body.daily.data[0].temperatureMin))
        }
    })
}

module.exports = forecast