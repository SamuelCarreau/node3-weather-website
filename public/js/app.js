const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
var messageOne = document.querySelector('#message-1')
var messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then(({error,forecast,location}) => {
            if (error) {
                messageOne.textContent = error
                messageTwo.textContent = ''
            } else {
                messageOne.textContent = location
                messageTwo.textContent = forecast
            }
        })
    })
})