const countryList = {
    Afghanistan: 'AF',
    'Aland Islands': 'AX',
    Albania: 'AL',
    Algeria: 'DZ',
    'American Samoa': 'AS',
    Andorra: 'AD',
    Angola: 'AO',
    Anguilla: 'AI',
    Antarctica: 'AQ',
    'Antigua And Barbuda': 'AG',
    Argentina: 'AR',
    Armenia: 'AM',
    Aruba: 'AW',
    Australia: 'AU',
    Austria: 'AT',
    Azerbaijan: 'AZ',
    Bahamas: 'BS',
    Bahrain: 'BH',
    Bangladesh: 'BD',
    Barbados: 'BB',
    Belarus: 'BY',
    Belgium: 'BE',
    Belize: 'BZ',
    Benin: 'BJ',
    Bermuda: 'BM',
    Bhutan: 'BT',
    Bolivia: 'BO',
    'Bosnia And Herzegovina': 'BA',
    Botswana: 'BW',
    'Bouvet Island': 'BV',
    Brazil: 'BR',
    'British Indian Ocean Territory': 'IO',
    'Brunei Darussalam': 'BN',
    Bulgaria: 'BG',
    'Burkina Faso': 'BF',
    Burundi: 'BI',
    Cambodia: 'KH',
    Cameroon: 'CM',
    Canada: 'CA',
    'Cape Verde': 'CV',
    'Cayman Islands': 'KY',
    'Central African Republic': 'CF',
    Chad: 'TD',
    Chile: 'CL',
    China: 'CN',
    'Christmas Island': 'CX',
    'Cocos (Keeling) Islands': 'CC',
    Colombia: 'CO',
    Comoros: 'KM',
    Congo: 'CG',
    'Congo, Democratic Republic': 'CD',
    'Cook Islands': 'CK',
    'Costa Rica': 'CR',
    "Cote D'Ivoire": 'CI',
    Croatia: 'HR',
    Cuba: 'CU',
    Cyprus: 'CY',
    'Czech Republic': 'CZ',
    Denmark: 'DK',
    Djibouti: 'DJ',
    Dominica: 'DM',
    'Dominican Republic': 'DO',
    Ecuador: 'EC',
    Egypt: 'EG',
    'El Salvador': 'SV',
    'Equatorial Guinea': 'GQ',
    Eritrea: 'ER',
    Estonia: 'EE',
    Ethiopia: 'ET',
    'Falkland Islands (Malvinas)': 'FK',
    'Faroe Islands': 'FO',
    Fiji: 'FJ',
    Finland: 'FI',
    France: 'FR',
    'French Guiana': 'GF',
    'French Polynesia': 'PF',
    'French Southern Territories': 'TF',
    Gabon: 'GA',
    Gambia: 'GM',
    Georgia: 'GE',
    Germany: 'DE',
    Ghana: 'GH',
    Gibraltar: 'GI',
    Greece: 'GR',
    Greenland: 'GL',
    Grenada: 'GD',
    Guadeloupe: 'GP',
    Guam: 'GU',
    Guatemala: 'GT',
    Guernsey: 'GG',
    Guinea: 'GN',
    'Guinea-Bissau': 'GW',
    Guyana: 'GY',
    Haiti: 'HT',
    'Heard Island & Mcdonald Islands': 'HM',
    'Holy See (Vatican City State)': 'VA',
    Honduras: 'HN',
    'Hong Kong': 'HK',
    Hungary: 'HU',
    Iceland: 'IS',
    India: 'IN',
    Indonesia: 'ID',
    'Iran, Islamic Republic Of': 'IR',
    Iraq: 'IQ',
    Ireland: 'IE',
    'Isle Of Man': 'IM',
    Israel: 'IL',
    Italy: 'IT',
    Jamaica: 'JM',
    Japan: 'JP',
    Jersey: 'JE',
    Jordan: 'JO',
    Kazakhstan: 'KZ',
    Kenya: 'KE',
    Kiribati: 'KI',
    Korea: 'KR',
    Kuwait: 'KW',
    Kyrgyzstan: 'KG',
    "Lao People's Democratic Republic": 'LA',
    Latvia: 'LV',
    Lebanon: 'LB',
    Lesotho: 'LS',
    Liberia: 'LR',
    'Libyan Arab Jamahiriya': 'LY',
    Liechtenstein: 'LI',
    Lithuania: 'LT',
    Luxembourg: 'LU',
    Macao: 'MO',
    Macedonia: 'MK',
    Madagascar: 'MG',
    Malawi: 'MW',
    Malaysia: 'MY',
    Maldives: 'MV',
    Mali: 'ML',
    Malta: 'MT',
    'Marshall Islands': 'MH',
    Martinique: 'MQ',
    Mauritania: 'MR',
    Mauritius: 'MU',
    Mayotte: 'YT',
    Mexico: 'MX',
    'Micronesia, Federated States Of': 'FM',
    Moldova: 'MD',
    Monaco: 'MC',
    Mongolia: 'MN',
    Montenegro: 'ME',
    Montserrat: 'MS',
    Morocco: 'MA',
    Mozambique: 'MZ',
    Myanmar: 'MM',
    Namibia: 'NA',
    Nauru: 'NR',
    Nepal: 'NP',
    Netherlands: 'NL',
    'Netherlands Antilles': 'AN',
    'New Caledonia': 'NC',
    'New Zealand': 'NZ',
    Nicaragua: 'NI',
    Niger: 'NE',
    Nigeria: 'NG',
    Niue: 'NU',
    'Norfolk Island': 'NF',
    'Northern Mariana Islands': 'MP',
    Norway: 'NO',
    Oman: 'OM',
    Pakistan: 'PK',
    Palau: 'PW',
    'Palestinian Territory, Occupied': 'PS',
    Panama: 'PA',
    'Papua New Guinea': 'PG',
    Paraguay: 'PY',
    Peru: 'PE',
    Philippines: 'PH',
    Pitcairn: 'PN',
    Poland: 'PL',
    Portugal: 'PT',
    'Puerto Rico': 'PR',
    Qatar: 'QA',
    Reunion: 'RE',
    Romania: 'RO',
    'Russian Federation': 'RU',
    Rwanda: 'RW',
    'Saint Barthelemy': 'BL',
    'Saint Helena': 'SH',
    'Saint Kitts And Nevis': 'KN',
    'Saint Lucia': 'LC',
    'Saint Martin': 'MF',
    'Saint Pierre And Miquelon': 'PM',
    'Saint Vincent And Grenadines': 'VC',
    Samoa: 'WS',
    'San Marino': 'SM',
    'Sao Tome And Principe': 'ST',
    'Saudi Arabia': 'SA',
    Senegal: 'SN',
    Serbia: 'RS',
    Seychelles: 'SC',
    'Sierra Leone': 'SL',
    Singapore: 'SG',
    Slovakia: 'SK',
    Slovenia: 'SI',
    'Solomon Islands': 'SB',
    Somalia: 'SO',
    'South Africa': 'ZA',
    'South Georgia And Sandwich Isl.': 'GS',
    Spain: 'ES',
    'Sri Lanka': 'LK',
    Sudan: 'SD',
    Suriname: 'SR',
    'Svalbard And Jan Mayen': 'SJ',
    Swaziland: 'SZ',
    Sweden: 'SE',
    Switzerland: 'CH',
    'Syrian Arab Republic': 'SY',
    Taiwan: 'TW',
    Tajikistan: 'TJ',
    Tanzania: 'TZ',
    Thailand: 'TH',
    'Timor-Leste': 'TL',
    Togo: 'TG',
    Tokelau: 'TK',
    Tonga: 'TO',
    'Trinidad And Tobago': 'TT',
    Tunisia: 'TN',
    Turkey: 'TR',
    Turkmenistan: 'TM',
    'Turks And Caicos Islands': 'TC',
    Tuvalu: 'TV',
    Uganda: 'UG',
    Ukraine: 'UA',
    'United Arab Emirates': 'AE',
    'United Kingdom': 'GB',
    'United States': 'US',
    'United States Outlying Islands': 'UM',
    Uruguay: 'UY',
    Uzbekistan: 'UZ',
    Vanuatu: 'VU',
    Venezuela: 'VE',
    'Viet Nam': 'VN',
    'Virgin Islands, British': 'VG',
    'Virgin Islands, U.S.': 'VI',
    'Wallis And Futuna': 'WF',
    'Western Sahara': 'EH',
    Yemen: 'YE',
    Zambia: 'ZM',
    Zimbabwe: 'ZW',
    'North Macedonia': 'MK',
    Češka: 'CZ'
}


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
});


// dropdown-menu
topMenu.addEventListener('click', () => {


    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = 'block';
    }
});


if (xIcon) {
    xIcon.addEventListener('click', () => {
        dropdown.style.display = 'none';
    })
};




searchButton.addEventListener('click', () => {
    searchFunction();
    dropdown.style.display = 'none';
});


searchbar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === 'Search' || event.keyCode === 13) {
        dropdown.style.display = 'none';
        searchFunction();
    };
});




//fetching and deploying the information gotten to the app
const runNewFetch = () => {
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
                currentTemperature.innerHTML = `
            ${temp}°C
            `
                city.innerHTML = `
            ${data.name}
            `
                const weatherType = data.weather.map(typeWeather => typeWeather.main).join(', ')

                weather.innerHTML = `
        ${weatherType}
        `
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
                    weather.innerHTML = `
        ${weatherType}        `
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
            const fiveDayForecast = [];

            //create converted time for each day
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
                    // Find the correct image from swapIcons
                    const originalWeatherIconCode = item.weather[0].icon;
                    const fallbackIcon = `https://openweathermap.org/img/wn/${originalWeatherIconCode}@2x.png`;
                    const forecastIcon = swapIcons[originalWeatherIconCode] || fallbackIcon;
                    console.log('it is', originalWeatherIconCode, fallbackIcon);

                    fiveDayForecast.push({
                        day: dayName,
                        icon: forecastIcon
                    });
                }
                if (fiveDayForecast.length === 4) break; // Stop once we have 5 unique days
            }

            console.log("Unique first five days:", fiveDayForecast);

            weatherTable.innerHTML = fiveDayForecast.map(day => `
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
    console.log('current forecast Api is', forecastApi);
    fetch(forecastApi)
        .then((respons) => {
            return respons.json()
        })
        .then((data) => {
            const tempsByDay = {};
            const todayDate = new Date().getDate();

            data.list.forEach(item => {
                const date = new Date(item.dt * 1000);
                const dayKey = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
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
            const fiveDayTemps = Object.entries(tempsByDay).slice(0, 5);
            const tempRows = document.querySelectorAll('.row');

            fiveDayTemps.forEach(([date, temps], index) => {
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

}


// next button and content swap
nextButton.addEventListener('click', () => {
    weatherTable.style.display = 'none';
    weatherToday.style.display = 'flex';

    previousButton.style.visibility = 'visible';
    nextButton.style.visibility = 'hidden';
});


previousButton.addEventListener('click', () => {
    weatherToday.style.display = 'none';
    weatherTable.style.display = 'flex';

    previousButton.style.visibility = 'hidden';
    nextButton.style.visibility = 'visible';
});



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

            weatherToday.innerHTML += hourlyForecast.map(interval => `
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

fetchTodayHourlyForecast();