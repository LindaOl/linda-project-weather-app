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
    '04n': './images/moon-darkcloud.png',
    '09n': './images/rain.png',
    '10n': './images/moon-rain.png',
    '11n': './images/lightning.png',
    '13n': './images/snow.png',
    '50n': './images/mist.png'
};

const getIconClass = (code) => {
    switch (code) {
        case '01d': return "sunny-icon";
        case '02d': return "partly-cloudy-icon";
        case '03d':
        case '03n': return "cloudy-icon";
        case '04d': return "darkclouds-icon";
        case '10n': 
        case '10d': 
        case '09d':
        case '09n': return "rain-icon";
        case '11d': 
        case '11n': return "lightning-icon";
        case '13d':
        case '13n': return "snow-icon";
        case '50d':
        case '50n': return "mist-icon";
        case '01n': 
        case '02n': 
        case '04n': return "moon-icon";
        default: return "";
      }
    };

const currentTemperature = document.getElementById('current-temperature');
const city = document.getElementById('city');
const weather = document.getElementById('weather-condition');
const sunriseTime = document.getElementById('sunrise-time');
const sunsetTime = document.getElementById('sunset-time');
const weatherTable = document.getElementById('weather-table');
const weatherToday = document.getElementById('weather-today');
const todaysContainer = document.getElementById('todays-weather');
const homeLink = document.getElementById('favorited');

const favoriteIcon = document.getElementById('favorite-icon');
const topMenu = document.getElementById('top-menu');
const dropdown = document.getElementById('dropdown-menu');
const xIcon = document.getElementById('x-icon');

const searchButton = document.getElementById('searchButton');
const searchbar = document.getElementById('searchbar');

const nextButton = document.getElementById('next-button');
const previousButton = document.getElementById('previous-button');

const errorMessage = document.getElementById('error-message');

let convertedRiseTime = "";
let convertedSetTime = "";

let currentWeatherApi = 'https://api.openweathermap.org/data/2.5/weather?q=stockholm&units=metric&limit=5&appid=6c71178607e75ed602e9cd6bb057db1b';
let forecastApi = 'https://api.openweathermap.org/data/2.5/forecast?q=stockholm&units=metric&limit=5&appid=6c71178607e75ed602e9cd6bb057db1b';

const setApiUrls = (cityName) => {
    currentWeatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=6c71178607e75ed602e9cd6bb057db1b`;
    forecastApi = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=6c71178607e75ed602e9cd6bb057db1b`;
};

const savedApi = localStorage.getItem('favoriteApi');

if (savedApi) {
    currentWeatherApi = savedApi;
    const cityName = new URL(savedApi).searchParams.get("q");
    setApiUrls(cityName);
}

document.addEventListener('DOMContentLoaded', () => {
    runNewFetch();
    forecastFetch();
    fetchTodayHourlyForecast();
    loadDocumentCloseListener();
    toggleDropdown();
    searching();
    arrowButtons();
    updateFavoriteImage(savedApi === currentWeatherApi);
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
};

const loadDocumentCloseListener = () => {
    document.addEventListener('click', e => {
        if (!dropdown.contains(e.target) && e.target !== topMenu) {
            dropdown.style.display = "none";
        }
    });
};


xIcon.addEventListener('click', () => {
    dropdown.style.display = 'none';
});

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

favoriteIcon.addEventListener('click', () => {
    const isFavorite = localStorage.getItem('favoriteApi') === currentWeatherApi;

    if (isFavorite) {
        localStorage.removeItem('favoriteApi');
    } else {
        localStorage.setItem('favoriteApi', currentWeatherApi);
    }
    updateFavoriteImage(!isFavorite);
});

homeLink.addEventListener('click', () => {
    const favoriteApi = localStorage.getItem('favoriteApi');

    if (favoriteApi) {
        const cityName = new URL(favoriteApi).searchParams.get("q");
        setApiUrls(cityName);
        runNewFetch();
        forecastFetch();
        fetchTodayHourlyForecast();
        refreshFavoriteIcon();
    } else {
        const message = `You haven't set a favorite yet.`;
        createErrorMessage(message);
    }
});

const arrowButtons = () => {
    // next button and content swap
    nextButton.addEventListener('click', () => {
        weatherTable.style.display = 'flex';
        todaysContainer.style.display = 'none';

        previousButton.style.visibility = 'visible';
        nextButton.style.visibility = 'hidden';
    });

    previousButton.addEventListener('click', () => {
        todaysContainer.style.display = 'block';
        weatherTable.style.display = 'none';

        previousButton.style.visibility = 'hidden';
        nextButton.style.visibility = 'visible';
    });
};

//searchbar eventListener
const searchFunction = () => {
    let words = searchbar.value.trim().split(' ');
    let cityname = words.join('+');

    //if no search words
    if (!searchbar.value.trim()) {
        const message = `Please enter a city name`;
        createErrorMessage(message);
        return;
    }

    setApiUrls(cityname);
    runNewFetch();
    forecastFetch();
    fetchTodayHourlyForecast();
    refreshFavoriteIcon();

    searchbar.value = '';
};

//fetching and deploying the information gotten to the app
const runNewFetch = () => {
    fetch(currentWeatherApi)
        .then((respons) => {
            return respons.json()
        })
        .then((data) => {

            //if 404 error
            if (data.cod !== 200) {
                const message = `City not found. Please check the spelling and try again.`;
                createErrorMessage(message);
            } else {
                //deploy to upper half of app
                updateCurrentWeather(data);
                updateSunTimes(data);
                changeBackground(data.timezone);
            }
        })
        .catch((error) => {
            console.error("Error fetching current weather:", error);
            const message = `There was an issue fetching the weather data. Please try again later.`;
            createErrorMessage(message);
        });
};

//forecast icon and day
const forecastFetch = () => {
    fetch(forecastApi)
        .then((respons) => {
            return respons.json()
        })
        .then((data) => {
            const timezoneOffset = data.city.timezone;

            const forecast = getMiddayForecast(data.list, timezoneOffset);
            getForecastIcons(forecast);
            getForecastTemps(data.list, timezoneOffset);
        })
        .catch(error => {
            console.error("Error fetching forecast:", error?.message || error);
        });
};

// fetch for current days weather in 3h intervals
const fetchTodayHourlyForecast = () => {
    fetch(forecastApi)
        .then((res) => res.json())
        .then((data) => {
            const timezoneOffset = data.city.timezone;

            const now = new Date(Date.now() + timezoneOffset * 1000);
            const todayYear = now.getFullYear();
            const todayMonth = now.getMonth();
            const todayDate = now.getDate();

            const todayForecasts = data.list.filter(item => {
                const forecastDate = new Date((item.dt + timezoneOffset) * 1000);
                return (
                    forecastDate.getFullYear() === todayYear &&
                    forecastDate.getMonth() === todayMonth &&
                    forecastDate.getDate() === todayDate
                );
            });

            const hourlyForecast = todayForecasts.map(item => {
                const localTime = new Date((item.dt + timezoneOffset) * 1000);
                return {
                    time: localTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
                    icon: getWeatherIcon(item.weather[0].icon),
                    temp: item.main.temp
                };
            });

            weatherToday.innerHTML = hourlyForecast.map(interval => `
                <div class="forecast-row">                    
                    <div class="time">${interval.time}</div>
                    <div class="icon today-icon">
                        <img class="icon-img" alt="weather-icon" src="${interval.icon}">
                    </div>
                    <div class="temperature" id="temp-today">${Math.round(interval.temp)}°C</div>
                </div>
            `).join('');
        })
        .catch((err) => console.error('Error fetching hourly forecast:', err));
};

//change background, day/night
const changeBackground = (timezoneOffset) => {
    if (!convertedRiseTime || !convertedSetTime) {
        // fallback
        const hour = new Date(Date.now() + timezoneOffset * 1000).getHours();
        const timeOfDay = hour >= 6 && hour < 19 ? 'daytime' : 'night';
        document.getElementById('top-half').className = timeOfDay;
        return;
    }

    const now = new Date(Date.now() + timezoneOffset * 1000);
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const [riseHour, riseMinute] = convertedRiseTime.split(':').map(Number);
    const [setHour, setMinute] = convertedSetTime.split(':').map(Number);

    const afterSunrise = currentHour > riseHour || (currentHour === riseHour && currentMinute >= riseMinute);
    const beforeSunset = currentHour < setHour || (currentHour === setHour && currentMinute < setMinute);

    const isDaytime = afterSunrise && beforeSunset;

    document.getElementById('top-half').className = isDaytime ? 'daytime' : 'night';
};

const refreshFavoriteIcon = () => {
    const favoriteApi = localStorage.getItem('favoriteApi');
    updateFavoriteImage(favoriteApi === currentWeatherApi);
};

const updateFavoriteImage = (isFavorite) => {
    favoriteIcon.src = isFavorite ? './images/heart-filled.png' : './images/heart-outline.png';
};

const createErrorMessage = (message) => {
    errorMessage.innerHTML = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        const errorMessage = document.getElementById('error-message');
        errorMessage.style.display = 'none';
    }, 4000);
};

//Current weather functions
const updateCurrentWeather = (data) => {
    const temp = data.main.temp.toFixed(1);
    currentTemperature.innerHTML = `${temp}°C`;

    city.innerHTML = `${data.name}`;

    const weatherType = data.weather.map(typeWeather => typeWeather.main).join(', ');
    weather.innerHTML = `${weatherType}`;

    const iconCode = data.weather[0].icon;
  updateWeatherIcon(iconCode);  
};

const updateWeatherIcon = (iconCode) => {  
  const iconContainer = document.getElementById("icon-wrap");
  const iconPath = swapIcons[iconCode] || `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  
  iconContainer.innerHTML = `<img alt="weather icon" id="mainIcon" src="${iconPath}" />`;
  iconContainer.className = getIconClass(iconCode);  
};
   
const getWeatherIcon = (code) => {
  return swapIcons[code] || `https://openweathermap.org/img/wn/${code}@2x.png`;
}

const updateSunTimes = (data) => {
    const timezoneOffset = data.timezone;
    sunriseTime.innerHTML = convertTime(data.sys.sunrise, timezoneOffset);
    sunsetTime.innerHTML = convertTime(data.sys.sunset, timezoneOffset);

    convertedRiseTime = convertTime(data.sys.sunrise, timezoneOffset);
    convertedSetTime = convertTime(data.sys.sunset, timezoneOffset);
};

const convertTime = (timestamp, timezoneOffset) => {
    const date = new Date((timestamp + timezoneOffset) * 1000);
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    return date.toLocaleTimeString('en-GB', options);
};

//forcast functions
//get day and icon for each day, and create an array with four day forecast
const getMiddayForecast = (list, timezoneOffset) => {
    const todayDate = new Date(Date.now() + timezoneOffset * 1000).getDate();
    const eachNewDay = new Set();
    const fourDayForecast = [];

    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const date = new Date((item.dt + timezoneOffset) * 1000); //makes it local time
        const calendarDate = date.getDate();
        const hour = date.getHours();


        if (calendarDate !== todayDate && !eachNewDay.has(calendarDate) && hour >= 11 && hour <= 13) {
            eachNewDay.add(calendarDate);
            const originalWeatherIconCode = item.weather[0].icon;

            fourDayForecast.push({
                day: date.toLocaleDateString('en-GB', { weekday: 'short' }),
                icon: getWeatherIcon(originalWeatherIconCode)
            });
        }
        if (fourDayForecast.length === 4) break;
    }
    return fourDayForecast;
};

//Generate the content, inserting midday icon and day name
const getForecastIcons = (forecast) => {
    weatherTable.innerHTML = forecast.map(day => `
        <div class="row">
            <div class="day">${day.day}</div>
            <div class="icon">
                <img class="icon-img" alt="weather-icon" src="${day.icon}" />
            </div>
        </div>
    `).join('');
};

const getForecastTemps = (list, timezoneOffset) => {
    const tempsByDate = combineTempsByDate(list, timezoneOffset);
    renderForecastTemps(tempsByDate, timezoneOffset);
};

//creating a list of temps for the four day forecast
const combineTempsByDate = (list, timezoneOffset) => {
    const tempsByDay = {};

    list.forEach(item => {
        const date = new Date((item.dt + timezoneOffset) * 1000);
        const dateAsString = date.toISOString().split('T')[0];

        if (!tempsByDay[dateAsString]) {
            tempsByDay[dateAsString] = {
                min: item.main.temp_min,
                max: item.main.temp_max
            };
        } else {
            tempsByDay[dateAsString].min = Math.min(tempsByDay[dateAsString].min, item.main.temp_min);
            tempsByDay[dateAsString].max = Math.max(tempsByDay[dateAsString].max, item.main.temp_max);
        }
    });
    return tempsByDay;
};

// make list of coming four days' min/max temps, create "temperature" div
const renderForecastTemps = (tempsByDay, timezoneOffset) => {
    const today = new Date(Date.now() + timezoneOffset * 1000).toISOString().split('T')[0];
    const rows = document.querySelectorAll('.row');

    const fourDayTemps = Object.entries(tempsByDay).filter(([date]) => date !== today).slice(0, 4);

    fourDayTemps.forEach(([date, temps], index) => {
        const row = rows[index];
        if (row) {
            let tempDiv = row.querySelector('.temperature');
            const tempText = `${Math.round(temps.max)}°C / ${Math.round(temps.min)}°C`;

            if (tempDiv) {
                tempDiv.innerText = tempText;
            } else {
                tempDiv = document.createElement('div');
                tempDiv.className = 'temperature';
                tempDiv.innerText = tempText;
                row.appendChild(tempDiv);
            }
        }
    });
};