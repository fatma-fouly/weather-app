// 1-  Select The location  elments and city
let search         = document.getElementById('search');
let findBtn        = document.getElementById('find');
let city           = document.getElementById('city');
let todayName      = document.getElementById('today');
let todayDate      = document.getElementById('today-dt');
let todayDg        = document.getElementById('today-dg');
let weaterDesc     = document.getElementById('type')  
let todayImg       = document.getElementById('weater-img');
let humidty        = document.getElementById('humidty');
let wind           = document.getElementById('wind')
let windDirection  = document.getElementById('direction');
let nextDayDate    = document.getElementsByClassName('next-dates');
let nextDayImg     = document.getElementsByClassName('next-img');
let nextDayDg      = document.getElementsByClassName('next-day-dg');
let nextDayDg2     = document.getElementsByClassName('next-day-dg2');
let nextDayType    = document.getElementsByClassName('next-day-type');
let date           = new Date();

search.addEventListener('keyup' , function(){
   startApp(search.value)
})
//Return    data     function
async function getData(location){
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=a14e6a0175ea4102b79214723242701&q=${location}&days=3`);
    let weatherData = await response.json();
    return weatherData;
}

//Start    app     function 
async function startApp(city='Cairo'){
    let startData =await getData(city);
    // console.log(startData);
    displayToday(startData);
    displayForecast(startData);                         
}
startApp()

// Display    Today    Function 
function  displayToday(data){
todayName.innerHTML = date.toLocaleDateString('en-us' ,{weekday:'long'});
todayDate.innerHTML = date.getDate() +' ' + date.toLocaleDateString('en-US' , {month:'long'});
city.innerHTML = data.location.name;
todayDg.innerHTML =`${ data.current.temp_c} ℃`;
weaterDesc.innerHTML = data.current.condition.text;
todayImg.setAttribute('src', data.current.condition.icon);
humidty.innerHTML =data.current.humidity +' %'; 
wind.innerHTML = data.current.wind_kph +' km/h';
windDirection.innerHTML=data.current.wind_dir;
}


//Display   Next   Days

 function  displayForecast(data){
for(let i =0; i<nextDayDg.length ;i++){
    let nextDate = new Date(data.forecast.forecastday[i+1].date);
    nextDayDate[i].innerHTML = nextDate.toLocaleDateString('en-us' ,{weekday:'long'});
    nextDayImg[i].setAttribute('src',data.forecast.forecastday[i+1].day.condition.icon);
    nextDayDg[i].innerHTML = data.forecast.forecastday[i+1].day.maxtemp_c;
    nextDayDg2[i].innerHTML =data.forecast.forecastday[i+1].day.mintemp_c;
    nextDayType[i].innerHTML = data.forecast.forecastday[i+1].day.condition.text;
}

}