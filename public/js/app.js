console.log('app is running!');

const form = document.querySelector('form');
const search = document.querySelector('input');
const place = document.querySelector('#place');
const result = document.querySelector('#result');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    search.value = '';
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                place.textContent = 'Error';
                result.textContent = data.error;
            } else {
                place.textContent = data.Location;
                result.textContent = data.forecast;
            }
        })
    })
})