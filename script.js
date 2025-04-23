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
const homeLink = document.getElementById('favorited');

const favoriteIcon = document.getElementById('favorite-icon');
const topMenu = document.getElementById('top-menu');
const dropdown = document.getElementById('dropdown-menu');
const xIcon = document.getElementById('x-icon');

const searchButton = document.getElementById('searchButton');
const searchbar = document.getElementById('searchbar');

const nextButton = document.getElementById('next-button');
const previousButton = document.getElementById('previous-button');

let convertedRiseTime = "";
let convertedSetTime = "";

let currentWeatherApi = 'https://api.openweathermap.org/data/2.5/weather?q=stockholm&units=metric&limit=5&appid=6c71178607e75ed602e9cd6bb057db1b';
let forecastApi = 'https://api.openweathermap.org/data/2.5/forecast?q=stockholm&units=metric&limit=5&appid=6c71178607e75ed602e9cd6bb057db1b';

const savedApi = localStorage.getItem('favoriteApi');

if (savedApi) {
    currentWeatherApi = savedApi;

    const cityName = new URL(savedApi).searchParams.get("q");
    forecastApi = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=6c71178607e75ed602e9cd6bb057db1b`;
}

document.addEventListener('DOMContentLoaded', () => {
    runNewFetch();
    forecastFetch();
    fetchTodayHourlyForecast();
    loadDocumentCloseListener();
    toggleDropdown();
    searching();
    arrowButtons();
    changeBackground();
    updateFavoriteImage(savedApi === currentWeatherApi);
})


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
        currentWeatherApi = favoriteApi;

        const cityName = new URL(favoriteApi).searchParams.get("q");
        forecastApi = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=6c71178607e75ed602e9cd6bb057db1b`;

        runNewFetch();
        forecastFetch();
        fetchTodayHourlyForecast();
        refreshFavoriteIcon();
    } else {
        alert("You haven't set a favorite location yet!");
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
    let words = searchbar.value.split(' ');

    let searchValue = searchbar.value.trim();

    //if no search words
    if (!searchValue) {
        alert('Please enter a city name');
        return;

        // no city found
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
    refreshFavoriteIcon();
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
                ('City not found. Please check the spelling and try again.');

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

                let weatherIcon = getNewIcon();

                if (weatherIcon) {
                    icon.innerHTML = `<img alt="icon" src="${weatherIcon}" />`;
                } else {
                    weather.innerHTML = weatherType;
                }

                //deploy to forecast table
                //converting to HH:MM, and logging the time  
                const convertTime = (timestamp, timezoneOffset) => {
                    const date = new Date((timestamp + timezoneOffset) * 1000);
                    const options = {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    };
                    return date.toLocaleTimeString('en-GB', options);
                };

                // getting the local actual times in HH:MM format
                const timezoneOffset = data.timezone;

                convertedRiseTime = convertTime(data.sys.sunrise, timezoneOffset);
                convertedSetTime = convertTime(data.sys.sunset, timezoneOffset);

                sunriseTime.innerHTML = `${convertedRiseTime}`
                sunsetTime.innerHTML = `${convertedSetTime}`;
                changeBackground();
            };
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

            const convertTimestampToDay = (timestamp, timezoneOffset) => {
                const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                const date = new Date((timestamp + timezoneOffset) * 1000); // Convert Unix timestamp to JS date
                return days[date.getDay()];
            };

            const now = new Date(Date.now() + timezoneOffset * 1000);
            const todayKey = now.toISOString().split('T')[0];

            const eachNewDay = new Set();
            const fourDayForecast = [];

            //create converted time for each day and get an icon to insert onto web site
            for (let i = 0; i < data.list.length; i++) {
                const item = data.list[i];
                const date = new Date(item.dt * 1000);
                const dayKey = date.toISOString().split('T')[0];

                const hour = date.getHours(); // local time
                const dayName = convertTimestampToDay(item.dt, timezoneOffset);

                //adging today and four day forecast
                if (!eachNewDay.has(dayKey)) {
                    if (dayKey === todayKey || (hour >= 11 && hour <= 13)) {
                        eachNewDay.add(dayKey);
                        const originalWeatherIconCode = item.weather[0].icon;
                        const fallbackIcon = `https://openweathermap.org/img/wn/${originalWeatherIconCode}@2x.png`;
                        const forecastIcon = swapIcons[originalWeatherIconCode] || fallbackIcon;

                        fourDayForecast.push({
                            day: dayName,
                            icon: forecastIcon
                        });
                    }
                }
                if (fourDayForecast.length === 5) break; // Stop once we have 4 unique days
            }


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
    fetch(forecastApi)
        .then((respons) => {
            return respons.json()
        })
        .then((data) => {
            const timezoneOffset = data.city.timezone;
            const tempsByDay = {};

            data.list.forEach(item => {
                const date = new Date((item.dt + timezoneOffset) * 1000);
                const dayKey = date.toISOString().split('T')[0]; // make YYYY-MM-DD

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

            const fourDayTemps = Object.entries(tempsByDay).slice(0, 5);
            const tempRows = document.querySelectorAll('.row');

            fourDayTemps.forEach(([date, temps], index) => {
                if (tempRows[index]) {
                    let tempDiv = tempRows[index].querySelector('.temperature');

                    if (tempDiv) {
                        // If a .temperature div already exists, just update it
                        tempDiv.innerText = `${Math.round(temps.max)}°C / ${Math.round(temps.min)}°C`;
                    } else {
                        // If not, create it and append it
                        tempDiv = document.createElement('div');
                        tempDiv.className = 'temperature';
                        tempDiv.innerText = `${Math.round(temps.max)}°C / ${Math.round(temps.min)}°C`;
                        tempRows[index].appendChild(tempDiv);
                    }
                }
            });
        })
        .catch((error) => console.error("Error fetching forecast:", error));
}


// fetch for current days weather in 3h intervals
const fetchTodayHourlyForecast = () => {
    fetch(forecastApi)
        .then((res) => res.json())
        .then((data) => {
            const timezoneOffset = data.city.timezone;
            changeBackground(timezoneOffset);

            const now = new Date(Date.now() + timezoneOffset * 1000);
            const todayYear = now.getFullYear();
            const todayMonth = now.getMonth();
            const todayDate = now.getDate();

            const hourlyForecast = [];

            const todayForecasts = data.list.filter(item => {
                const forecastDate = new Date((item.dt + timezoneOffset) * 1000);
                return (
                    forecastDate.getFullYear() === todayYear &&
                    forecastDate.getMonth() === todayMonth &&
                    forecastDate.getDate() === todayDate
                );
            });


            todayForecasts.forEach(item => {
                const time = new Date((item.dt + timezoneOffset) * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
                const temp = item.main.temp;
                const originalIcon = item.weather[0].icon;
                const fallbackIcon = `https://openweathermap.org/img/wn/${originalIcon}@2x.png`;
                const forecastIcon = swapIcons[originalIcon] || fallbackIcon;

                hourlyForecast.push({
                    time,
                    icon: forecastIcon,
                    temp
                });
            });

            weatherToday.innerHTML = hourlyForecast.map(interval => `
                    <div class="forecast-row">                    
                        <div class="time">${interval.time}</div>
                        <div class="icon" id="icon-today">
                            <img class="icon-img" id="img-today" src="${interval.icon}">
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
        console.log("Current Hour:", hour); // Debug log
        const timeOfDay = hour >= 6 && hour < 19.5 ? 'daytime' : 'night';
        console.log("Background Class (Fallback):", timeOfDay); // Debug log
        document.getElementById('top-half').className = timeOfDay;
        return;
    }
    console.log("Converted Rise Time:", convertedRiseTime);
    console.log("Converted Set Time:", convertedSetTime);
    console.log("Timezone Offset:", timezoneOffset);
    const now = new Date(Date.now() + timezoneOffset * 1000);
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const [riseHour, riseMinute] = convertedRiseTime.split(':').map(Number);
    const [setHour, setMinute] = convertedSetTime.split(':').map(Number);

    const afterSunrise = currentHour > riseHour || (currentHour === riseHour && currentMinute >= riseMinute);
    const beforeSunset = currentHour < setHour || (currentHour === setHour && currentMinute < setMinute);

    const isDaytime = afterSunrise && beforeSunset;
    console.log("Is Daytime:", isDaytime); // Debug log

    document.getElementById('top-half').className = isDaytime ? 'daytime' : 'night';
};

const refreshFavoriteIcon = () => {
    const favoriteApi = localStorage.getItem('favoriteApi');
    updateFavoriteImage(favoriteApi === currentWeatherApi);
};

const updateFavoriteImage = (isFavorite) => {
    favoriteIcon.src = isFavorite ? './images/heart-filled.png' : './images/heart-outline.png';
};
