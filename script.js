const swapIcons = {
    '01d': './images/sunny.png',
    '02d': './images/sun-clouds.png',
    '03d': './images/cloudy.png',
    '04d': './images/darkclouds.png',
    '09d': './images/rain.png',
    '10d': './images/sun-rain.png',
    '11d': './images/lightning.png',
    '13d': './images/snow.png',
    '50d': './images/mist.png',
    '01n': './images/moon.png',
    '02n': './images/moon-cloud.png',
    '03n': './images/cloudy.png',
    '04n': './images/darkclouds.png',
    '09n': './images/rain.png',
    '10n': './images/moon-rain.png',
    '11n': './images/lightning.png',
    '13n': './images/snow.png',
    '50n': './images/mist.png'
}


const icon = document.getElementById('big-symbol');
const smallIcon = document.getElementById('icon');
const currentTemperature = document.getElementById('current-temperature');
const city = document.getElementById('city');
const weather = document.getElementById('weather-condition');
const sunriseTime = document.getElementById('sunrise-time');
const sunsetTime = document.getElementById('sunset-time');
const weatherTable = document.getElementById('weather-table');
const bottomHalf = document.getElementById('bottom-half');
const weatherToday = document.getElementById('weather-today');
const todaysContainer = document.getElementById('todays-weather');


const topMenu = document.getElementById('top-menu');
const dropdown = document.getElementById('dropdown-menu');
const xIcon = document.getElementById('x-icon');

const searchButton = document.getElementById('searchButton');
const searchbar = document.getElementById('searchbar');

const nextButton = document.getElementById('next-button');
const previousButton = document.getElementById('previous-button');

let currentWeatherApi = 'https://api.openweathermap.org/data/2.5/weather?q=helsingborg&units=metric&limit=5&appid=6c71178607e75ed602e9cd6bb057db1b';
let forecastApi = 'https://api.openweathermap.org/data/2.5/forecast?q=helsingborg&units=metric&limit=5&appid=6c71178607e75ed602e9cd6bb057db1b';


let searchValue = "";
let getFetchLink = "";
let weatherIcon = "";


document.addEventListener('DOMContentLoaded', () => {
    runNewFetch();
    forecastFetch();
    fetchTodayHourlyForecast();
    loadDocumentCloseListener();
    toggleDropdown();
    searching();
    arrowButtons();
    changeBackground();
});


// dropdown-menu
const toggleDropdown = () => {
    topMenu.addEventListener('click', () => {
        if (dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
        } else {
            dropdown.style.display = 'block';
        }
    });
}

const loadDocumentCloseListener = () => {
    document.addEventListener('click', e => {
        if (!dropdown.contains(e.target) && e.target !== topMenu) {
            dropdown.style.display = "none";
        };
    });
};


if (xIcon) {
    xIcon.addEventListener('click', () => {
        dropdown.style.display = 'none';
    })
};

const searching = () => {
    searchButton.addEventListener('click', () => {
        searchFunction();
        dropdown.style.display = 'none';
    });

    searchbar.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === 'Search' || event.keyCode === 13) {
            searchFunction();
            dropdown.style.display = 'none';
        };
    });
};


const arrowButtons = () => {
    // next button and content swap
    nextButton.addEventListener('click', () => {
        weatherTable.style.display = 'none';
        todaysContainer.style.display = 'block';

        previousButton.style.visibility = 'visible';
        nextButton.style.visibility = 'hidden';
    });

    previousButton.addEventListener('click', () => {
        todaysContainer.style.display = 'none';
        weatherTable.style.display = 'flex';

        previousButton.style.visibility = 'hidden';
        nextButton.style.visibility = 'visible';
    });
}



//fetching and deploying the information gotten to the app
const runNewFetch = () => {
    console.log('todays weather API', currentWeatherApi);
    fetch(currentWeatherApi)
        .then((respons) => {
            return respons.json()
        })
        .then((data) => {

            //if 404 error
            if (data.cod !== 200) {
                alert('City not found. Please check the spelling and try again.');

            } else {
                //deploy to upper half of app
                const tempWithComma = data.main.temp;
                const temp = Math.round(tempWithComma);
                currentTemperature.innerHTML = `${temp}°C`

                city.innerHTML = `${data.name}`

                const weatherType = data.weather.map(typeWeather => typeWeather.main).join(', ')
                weather.innerHTML = `${weatherType}`

                const weatherCode = data.weather.map(iconCode => iconCode.icon).join(', ');

                const getNewIcon = () => {
                    const iconKey = Object.keys(swapIcons).find((key) => key.toLowerCase() === weatherCode.toLowerCase());
                    if (iconKey) {
                        return swapIcons[iconKey];
                    }
                    return null;
                }

                weatherIcon = getNewIcon();

                if (weatherIcon) {
                    icon.innerHTML = `<img alt="icon" src="${weatherIcon}" />`;
                } else {
                    const weatherType = data.weather.map(typeWeather => typeWeather.main).join(', ')
                    weather.innerHTML = `${weatherType}`
                }

                //deploy to forecast table
                //converting to HH:MM, and logging the time  
                const convertTime = (timestamp) => {
                    const date = new Date(timestamp * 1000);
                    const options = {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    };
                    return date.toLocaleTimeString('en-GB', options);
                };

                // getting the actual times in HH:MM format
                const convertedRiseTime = convertTime(data.sys.sunrise);
                const convertedSetTime = convertTime(data.sys.sunset);

                sunriseTime.innerHTML = `${convertedRiseTime}`
                sunsetTime.innerHTML = `${convertedSetTime}`;
            };
        });
};


//forecast icon and day
const forecastFetch = () => {
    console.log('current forecast Api is', forecastApi);
    fetch(forecastApi)
        .then((respons) => {
            return respons.json()
        })
        .then((data) => {
            const convertTimestampToDay = (timestamp) => {
                const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                const date = new Date(timestamp * 1000); // Convert Unix timestamp to JS date
                return days[date.getDay()];
            };

            const todayDate = new Date().getDate();
            const eachNewDay = new Set();
            const fourDayForecast = [];

            //create converted time for each day and get an icon to insert onto web site
            for (let i = 0; i < data.list.length; i++) {
                const item = data.list[i];
                const date = new Date(item.dt * 1000);
                const calendarDate = date.getDate(); // Day of the month
                const hour = date.getHours(); // local time
                const dayName = convertTimestampToDay(item.dt);

                if (
                    calendarDate !== todayDate &&
                    !eachNewDay.has(calendarDate) &&
                    hour >= 11 && hour <= 13
                ) {
                    eachNewDay.add(calendarDate);
                    // Find the correct image from swapIcons array
                    const originalWeatherIconCode = item.weather[0].icon;
                    const fallbackIcon = `https://openweathermap.org/img/wn/${originalWeatherIconCode}@2x.png`;
                    const forecastIcon = swapIcons[originalWeatherIconCode] || fallbackIcon;
                    console.log('it is', originalWeatherIconCode, fallbackIcon);

                    fourDayForecast.push({
                        day: dayName,
                        icon: forecastIcon
                    });
                }
                if (fourDayForecast.length === 4) break; // Stop once we have 4 unique days
            }

            console.log("Unique first four days:", fourDayForecast);

            weatherTable.innerHTML = fourDayForecast.map(day => `
                <div class="row">
                    <div class="day">${day.day}</div>
                    <div class="icon">
                        <img class="icon-img" src="${day.icon}" />
                    </div>
                </div>
            `).join(''); // Joins all rows together

            fetchForecastTemp();
        })
        .catch((error) => console.error("Error fetching forecast:", error));
}


const fetchForecastTemp = () => {
    console.log('current forecast temp Api is', forecastApi);
    fetch(forecastApi)
        .then((respons) => {
            return respons.json()
        })
        .then((data) => {
            const tempsByDay = {};
            const todayDate = new Date().getDate();

            data.list.forEach(item => {
                const date = new Date(item.dt * 1000);
                const dayKey = date.toISOString().split('T')[0]; // make YYYY-MM-DD
                const calendarDate = date.getDate();

                // Skip today
                if (calendarDate === todayDate) return;

                // If not seen before, initialize
                if (!tempsByDay[dayKey]) {
                    tempsByDay[dayKey] = {
                        min: item.main.temp_min,
                        max: item.main.temp_max
                    };
                } else {
                    tempsByDay[dayKey].min = Math.min(tempsByDay[dayKey].min, item.main.temp_min);
                    tempsByDay[dayKey].max = Math.max(tempsByDay[dayKey].max, item.main.temp_max);
                }
            });

            console.log("Temps by day:", tempsByDay);
            const fourDayTemps = Object.entries(tempsByDay).slice(0, 4);
            const tempRows = document.querySelectorAll('.row');

            fourDayTemps.forEach(([date, temps], index) => {
                if (tempRows[index]) {
                    const tempDiv = document.createElement('div');
                    tempDiv.className = 'temperature';
                    tempDiv.innerText = `${Math.round(temps.max)}°C / ${Math.round(temps.min)}°C`;
                    tempRows[index].appendChild(tempDiv);
                }
            });

        })

        .catch((error) => console.error("Error fetching forecast:", error));
}


//searchbar eventListener
const searchFunction = () => {
    let words = searchbar.value.split(' ');

    let searchValue = searchbar.value.trim();

    //if no search words
    if (!searchValue) {
        alert('Please enter a city name');
        return;

        // no city found
    } else if (searchValue === undefined || searchValue === null || searchValue === '') {
        alert('Unable to find city. Check spelling and try again');
        return;

        // if one search word
    } else if (words.length === 1) {

        currentWeatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${words}&units=metric&appid=6c71178607e75ed602e9cd6bb057db1b`;
        forecastApi = `https://api.openweathermap.org/data/2.5/forecast?q=${words[0]}&units=metric&appid=6c71178607e75ed602e9cd6bb057db1b`;

        //if two search words, cities with double names
    } else if (words.length === 2) {

        currentWeatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${words[0]}+${words[1]}&units=metric&appid=6c71178607e75ed602e9cd6bb057db1b`;

        forecastApi = `https://api.openweathermap.org/data/2.5/forecast?q=${words[0]}+${words[1]}&units=metric&appid=6c71178607e75ed602e9cd6bb057db1b`;
    } else {
        alert('Please try again');
    }
    runNewFetch();
    forecastFetch();
    fetchTodayHourlyForecast();

}


// fetch for current days weather in 3h intervals
const fetchTodayHourlyForecast = () => {
    console.log('Fetching hourly forecast...', forecastApi);
    fetch(forecastApi)
        .then((res) => res.json())
        .then((data) => {
            const now = new Date();
            const todayYear = now.getFullYear();
            const todayMonth = now.getMonth();
            const todayDate = now.getDate();

            const hourlyForecast = [];

            const todayForecasts = data.list.filter(item => {
                const forecastDate = new Date(item.dt * 1000);
                return (
                    forecastDate.getFullYear() === todayYear &&
                    forecastDate.getMonth() === todayMonth &&
                    forecastDate.getDate() === todayDate
                );
            });


            console.log("Today's hourly forecast:");

            todayForecasts.forEach(item => {
                const time = new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const temp = item.main.temp;
                const description = item.weather[0].description;
                const originalIcon = item.weather[0].icon;
                const fallbackIcon = `https://openweathermap.org/img/wn/${originalIcon}@2x.png`;
                const forecastIcon = swapIcons[originalIcon] || fallbackIcon;

                console.log(`${time} — ${temp}°C — ${description} — ${originalIcon}`);

                hourlyForecast.push({
                    time,
                    icon: forecastIcon,
                    temp
                });
            });

            weatherToday.innerHTML = hourlyForecast.map(interval => `
                <div class="forecast-row">                    
                    <div class="day">${interval.time}</div>
                    <div class="icon">
                        <img id="icon-img" src="${interval.icon}">
                    </div>
                    <div class="temperature">${Math.round(interval.temp)}°C</div>
                </div>
            `).join('');
        })
        .catch((err) => console.error('Error fetching hourly forecast:', err));
};

//change background, day/night
const changeBackground = () => {
    const hour = new Date().getHours();
    let timeOfDay;

    if (hour >= 5 && hour < 19) {
        timeOfDay = 'daytime';
    } else {
        timeOfDay = 'night';
    }
    document.getElementById('top-half').className = timeOfDay;
};