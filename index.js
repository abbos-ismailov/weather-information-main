const api = {
      key: "4d63db9c73dd0c0f45db68186b126447",
      baseurl: "https://api.openweathermap.org/data/2.5/"
}

const weekDay = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
]

const monthArr = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
]

const siteName = document.getElementsByClassName('site-name')[0];
const country = document.getElementsByClassName('country')[0];
const dateHtml = document.getElementsByClassName('date')[0];
const temperature = document.getElementsByClassName('temp-value')[0];
const description = document.getElementsByClassName('description')[0];
const min = document.getElementsByClassName('min')[0];
const max = document.getElementsByClassName('max')[0];
const form = document.getElementsByClassName('form')[0];
const inpBox = document.getElementsByClassName('inp-box')[0];
const submitBtn = document.getElementsByClassName('submit-btn')[0];

form.addEventListener('submit', (e) => {
      e.preventDefault()
      getResults(inpBox.value).then((data) => {
            renderFunc(data)
      })
      inpBox.value = ""
})

async function getResults(query) {
      try {
            const response = await fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
            if (!response.ok) {
                  throw Error("serverda xatolik")
            }
            const result = await response.json();
            return result;
      } catch (error) {
            console.log('bunday malumot yoq');
      }
}

function renderFunc(weather) {
      const date = new Date();
      const day = date.getDay();
      const dayMonth = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      if (weather.cod == 400 || weather.cod == 404) {
            siteName.innerHTML = weather.message;
            country.innerHTML = "not found country";
            dateHtml.innerHTML = `*** *** ***`;
            description.innerHTML = `invalid town name`
      }
      else {
            siteName.innerHTML = `Weather Information`;
            country.innerHTML = weather.name;
            dateHtml.innerHTML = `${weekDay[day]} /${dayMonth}-${monthArr[month]} /${year}-year`;
            temperature.innerHTML = `${Math.round(weather.main.temp)}`;
            description.innerHTML = weather.weather[0].description;
            min.innerHTML = Math.round(weather.main.temp_min);
            max.innerHTML = Math.round(weather.main.temp_max);
      }
}