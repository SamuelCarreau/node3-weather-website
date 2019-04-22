const request = require('request')
const util = require('util')

const geocode = (address, callback) => {
    const url = util.format('https://api.mapbox.com/geocoding/v5/mapbox.places/%s.json?access_token=pk.eyJ1Ijoic2FtdWVsY2FycmVhdSIsImEiOiJjanVuMzhsdXgxYXpyNDRxdnZwdWgwMWVlIn0.uXTXjBhBhc1icBCEH5i6Mg&limit=1', encodeURIComponent(address))

    request({url,json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location service!', undefined)
        } else if (body.message || body.features.length === 0) {
            (body.message) ? callback(textDanger(body.message), undefined): callback('Location not found', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = geocode