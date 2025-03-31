const currentTemperature = document.getElementById('current-temperature');
const city = document.getElementById('city');
const weather = document.getElementById('weather-condition');
const sunriseTime = document.getElementById('sunrise-time');
const sunsetTime = document.getElementById('sunset-time');
const icon = document.getElementById('big-symbol');
const smallIcon = document.getElementById('icon');

const apiCitySearch = ""; //get the api for specific cioy after a search, then use this variable in the fetch

fetch('https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&units=metric&appid=6c71178607e75ed602e9cd6bb057db1b')
    .then((respons) => {
        return respons.json()
    })
    .then((data) => {

        const tempWithComma = data.main.temp;
        const temp = Math.round(tempWithComma);
        currentTemperature.innerHTML = `
        ${temp}°C
        `

        city.innerHTML = `
        ${data.name}
        `
        const weatherType = data.weather.map(typeWeather => typeWeather.main).join(', ')
        console.log(weatherType)
        weather.innerHTML = `
        ${weatherType}
        `
        const weatherCode = data.weather.map(iconCode => iconCode.icon).join(', ');


        console.log(weatherCode);
        const weatherIcon = `https://openweathermap.org/img/wn/${weatherCode}@2x.png`;


        icon.innerHTML = `
        <img alt="icon" src="${weatherIcon}" />
        `



        sunriseTime.innerHTML = `
        ${data.sys.sunrise}
        `

        const sunriseTimestamp = data.sys.sunrise;
        const sunsetTimestamp = data.sys.sunset;

        const convertTime = (timestamp) => {
            const date = new Date(timestamp * 1000); // Multiply by 1000 to convert to milliseconds
            const options = {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            };
            return date.toLocaleTimeString('en-GB', options);
        };

        sunriseTime.textContent = convertTime(sunriseTimestamp);
        sunsetTime.textContent = convertTime(sunsetTimestamp);



        console.log(data)
    })


let checkForBrightImages = document.getElementById('icon-img');
let expectedSrc = 'https://openweathermap.org/img/wn/03n@2x.png';

// Compare the image's src to the desired URL

//make switch with all weather icons, and if clouds = this img and so on

data.daily.map.map(iconCode => iconCode.icon).join(', ');


//forecast
