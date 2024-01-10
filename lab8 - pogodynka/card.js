const removeBtnStyle =
  "rounded-b-lg bg-red-400 text-white font-bold border-4 border-red-500 hover:bg-red-600 hover:border-red-800  h-[40px] w-[300px]";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function createCityCardElement(city) {
  const cityCard = `<div class="max-h-[460px] w-[300px] rounded-t-lg border-t-4 border-x-4 mx-auto border-zinc-400 shadow-inner shadow-zinc-600 bg-zinc-50">
        <div class="min-h-96 flex items-center justify-center">
          <div class="flex flex-col rounded py-4 px-2 w-full max-w-xs">
                      <div class="font-bold text-xl">${city.name}</div>
                      <div class="text-sm text-gray-500">${city.date.formattedDate}</div>
                      <div class="text-sm text-gray-500">${city.date.formattedTime}</div>
                      <div class="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                     <img src="${city.icon}"/>
                      </div>
                      <div class="flex flex-row items-center justify-center mt-6 ">
                        <div class="font-medium text-3xl md:text-4xl lg:text-5xl mr-4">${city.temperature}°</div>
                        <div class="flex flex-col items-center">
                          <div class="font-bold text-xl">${city.main}</div>
                          <div class=" ">${city.description}</div>
                          <div class="mt-1">
                            <span class="text-sm"><i class="far fa-long-arrow-up"></i></span>
                            <span class="text-sm font-light text-gray-500">${city.temperatureMax}°C</span>
                          </div>
                          <div>
                            <span class="text-sm"><i class="far fa-long-arrow-down"></i></span>
                            <span class="text-sm font-light text-gray-500">${city.temperatureMin}°C</span>
                          </div>
                        </div>
                      </div>
                      <div class="flex flex-row justify-between mt-6">
                        <div class="flex flex-col items-center">
                          <div class="font-medium text-sm">Wind</div>
                          <div class="text-sm text-gray-500">${city.wind}km/h</div>
                        </div>
                        <div class="flex flex-col items-center">
                          <div class="font-medium text-sm">Humidity</div>
                          <div class="text-sm text-gray-500">${city.humidity}%</div>
                        </div>
                        <div class="flex flex-col items-center">
                          <div class="font-medium text-sm">Visibility</div>
                          <div class="text-sm text-gray-500">${city.visibility}km</div>
                        </div>
                      </div>
                    </div>
          </div>
          </div>`;
  return cityCard;
}
