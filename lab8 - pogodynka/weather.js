const apiKey = "8c1e045c377ea44eb367b3d984b7c36f";
let link;
let storedCities = [];
// const interval = setInterval(updateCitiesInfoAsync, 60*5*1000)   <------------------ UPDATES ALL CITIES INFO EVERY 5 MINUTES

// --------------------------- GET CITY INFO FROM API ---------------------------
async function getCityInfoAsync(
  city = document.getElementById("city-input").value
) {
  if (storedCities.length < 10) {
    link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const response = await fetch(link);
    if(response.ok){
      fetch(link)
      .then((response) => response.json())
      .then((data) => {
        const cityInfo = {
          name: data.name, // eg. Krakow
          main: data.weather[0].main, // eg. Clouds
          date: getCurrentDate(), // returns date object with formatted strings
          icon: getWeatherIconById(data.weather[0].icon),
          description: data.weather[0].description, // eg. overcast clouds
          temperature: data.main.temp.toFixed(1), // eg. -3.71 (*C)
          temperatureMax: data.main.temp_max.toFixed(1),
          temperatureMin: data.main.temp_min.toFixed(1),
          wind: formatWindSpeed(data.wind.speed), // eg 12.3 (converted to km/h)
          humidity: data.main.humidity, // eg. 87 (%)
          visibility: (data.visibility / 1000).toFixed(1), // eg. 9874 (meters) ->> converted to km]
        };
        storedCities.push(cityInfo);
        saveCitiesToLocalStorage();
        updateDOM(); // updates list of displayed cities
      });
    }
   else if (!response.ok){
    alert(`Could not fetch data. Error 404 (not found)`)
   }
    
  } else {
    alert("You've reached the maximum limit of city cards (10).");
  }
}

// --------------------------- REMOVE CITY FROM LOCAL STORAGE ---------------------------
function removeCity(cityToRemove) {
  const cityIndex = storedCities.findIndex((city) => city === cityToRemove);
  storedCities.splice(cityIndex, 1);
  saveCitiesToLocalStorage();
  updateDOM();
}
// --------------------------------------------------------------- CLEAR CACHE ------------------------------
function testFunc() {
  console.log(storedCities);
}

function clearFunc() {
  clearLocalStorage();
  updateDOM();
}


// --------------------------- UPDATES CITIES INFO ---------------------------
async function updateCitiesInfoAsync() {
  const tempCityArr = storedCities;
  clearLocalStorage();
  for (const city of tempCityArr) {
    await getCityInfoAsync(city.name);
  }
}

// ---------------------------  ---------------------------

// --------------------------- WEATHER INFO FORMAT FUNCTIONS ---------------------------
function getWeatherIconById(iconId) {
  return `https://openweathermap.org/img/wn/${iconId}@2x.png`;
}

function formatTime(timeToFormat) {
  return (timeToFormat = timeToFormat < 10 ? "0" + timeToFormat : timeToFormat);
}

function formatWindSpeed(windSpeedRaw) {
  return (windSpeedRaw * 3.6).toFixed(1); // converts speed from m/s to km/h and rounds to 1 decimal place
}

function getCurrentDate() {
  let currentDate = new Date();
  const dateTime = {
    year: currentDate.getFullYear(),
    monthName: monthNames[currentDate.getMonth()],
    day: currentDate.getDate(),
    dayName: dayNames[currentDate.getDay()],
    hour: formatTime(currentDate.getHours()),
    minutes: formatTime(currentDate.getMinutes()),
  };
  const formattedDate = `${dateTime.dayName} ${dateTime.day} ${dateTime.monthName} ${dateTime.year}`;
  const formattedTime = `${dateTime.hour}:${dateTime.minutes}`;
  const date = {
    rawDate: currentDate,
    formattedDate: formattedDate,
    formattedTime: formattedTime,
  };
  return date;
}

// --------------------------- CITIES CARDS DISPLAY RELATED FUNCTIONS ---------------------------
function expandDOM() {
  const section = document.getElementById("list-of-cities");
  storedCities.map((city) => {
    const containerDivElement = document.createElement("div");
    containerDivElement.className = "mx-auto";

    const cityCardElement = document.createElement("div");
    cityCardElement.innerHTML = createCityCardElement(city);
    // ----    remove button  ----  
    const buttonRemoveElement = document.createElement("button");
    buttonRemoveElement.textContent = "remove";
    buttonRemoveElement.className = removeBtnStyle;
    buttonRemoveElement.addEventListener("click", function () {
      removeCity(city);
    });
    // ----  ----  ----  ----  ----  ----  
    containerDivElement.appendChild(cityCardElement);
    containerDivElement.appendChild(buttonRemoveElement);

    section.appendChild(containerDivElement);
  });
}

function clearDOM() {
  const parent = document.getElementById("list-of-cities");
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
}

function updateDOM() {
  clearDOM();
  expandDOM();
}

// --------------------------- LOCAL STORAGE RELATED FUNCTIONS ---------------------------

function saveCitiesToLocalStorage() {
  localStorage.setItem("storedCities", JSON.stringify(storedCities));
}

function getCitiesFromLocalStorage() {
  return JSON.parse(localStorage.getItem("storedCities")) || [];
}

function loadCitiesFromLocalStorage() {
  storedCities = getCitiesFromLocalStorage();
  expandDOM();
}
function clearLocalStorage() {
  localStorage.clear();
  loadCitiesFromLocalStorage();
}

function firstLoadCitiesFromLocalStorage() {
  storedCities = getCitiesFromLocalStorage();
  updateCitiesInfoAsync();
}

firstLoadCitiesFromLocalStorage();
