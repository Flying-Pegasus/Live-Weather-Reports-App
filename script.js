const loc = prompt("Enter your city");
// const loc= "mumbai";

const getData = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=0dad96422d88b41c0ddb0e5684709925`;
    let data = await fetch(url);
    let parsedData = await data.json();
    let urlDes = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${parsedData.coord.lat},${parsedData.coord.lon}?key=3LS66EGSDE5VEEFDXZQMUY9DP`;
    let dataDes = await fetch(urlDes);
    let parsedDataDes = await dataDes.json();
    document.querySelector(".cityname").innerText = parsedData.name.toUpperCase();
    document.querySelector(".card-text").innerText = parsedData.weather[0].description.toUpperCase();
    document.querySelector('.spann').innerText = Math.floor(parsedData.main.temp_min - 273.15) + "° /" + Math.ceil(parsedData.main.temp_max - 273.15) + "°";
    document.querySelector(".card-title").innerText = Math.round(parsedData.main.temp - 273.15) + "°";
    document.querySelector(".card-title-1").innerText = Math.round(parsedData.main.feels_like - 273) + " °C";
    document.querySelector(".card-title-2").innerText = parsedData.main.pressure * 0.750 + " mmHg"; //1 hectopascals = 0.75006157584566 millimeters
    document.querySelector(".card-title-3").innerText = parsedData.main.humidity + "%";
    document.querySelector(".card-title-4").innerText = parsedDataDes.currentConditions.visibility + " km";
    document.querySelector(".card-title-5").innerText = parsedDataDes.currentConditions.windspeed + " km/h";
    document.querySelector(".card-title-6").innerText = parsedDataDes.currentConditions.uvindex;
    document.querySelector("#sunrise").innerText = parsedDataDes.days[0].sunrise.slice(0,5);
    document.querySelector("#sunset").innerText = parsedDataDes.days[0].sunset.slice(0,5);
    document.querySelector(".card-text-prec").innerText = parsedDataDes.days[0].description;
    document.querySelector(".card-title-Prec").innerText = parsedDataDes.currentConditions.precipprob +"% chance of percipitation now";
    let urlAQ = `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${parsedData.coord.lat}&lon=${parsedData.coord.lon}&appid=0dad96422d88b41c0ddb0e5684709925`;
    let dataAQ = await fetch(urlAQ);
    let parsedDataAQ = await dataAQ.json();
    const aqi = parsedDataAQ.list[0].main.aqi;
    let navi = parsedDataDes.currentConditions.visibility;
    console.log(navi);
    


    switch (aqi) {
        case 1:
            document.querySelector(".card-title-AQ").innerText = aqi+ "-Good";
            document.querySelector(".AirQ").style.backgroundColor = "rgb(34, 181, 74)";
            document.querySelector(".card-text-AQ").innerText = "Air quality is very good for outdoor activity";
            break;
        case 2: 
            document.querySelector(".card-title-AQ").innerText = aqi+ "-Fair";
            document.querySelector(".AirQ").style.backgroundColor = "rgb(94, 204, 255)";
            document.querySelector(".card-text-AQ").innerText = "Air quality is acceptable. However unhealthy for sensitive groups";
            break;
        case 3:
            document.querySelector(".card-title-AQ").innerText = aqi+ "-Moderate";
            document.querySelector(".AirQ").style.backgroundColor = "orange";
            document.querySelector(".card-text-AQ").innerText = "Air quality is not acceptable. Use public vehicles for travelling for less pollution";
            break;
        case 4:
            document.querySelector(".card-title-AQ").innerText = aqi+ "-Poor";
            document.querySelector(".AirQ").style.backgroundColor = "red";
            document.querySelector(".card-text-AQ").innerText = "Air quality is very poor, go outside wearing a pollution mask, sensitive people stay at home";

            break;
        case 5:
            document.querySelector(".card-title-AQ").innerText = aqi+ "-Worst";
            document.querySelector(".card-text-AQ").innerText = "Air quality is worst in your area, please stay at home, go outside only if urgent and with mask only";
            document.querySelector(".AirQ").style.backgroundColor = "rgb(115, 115, 115)";
            break;

        default:
            break;
    }

}


getData();

    




