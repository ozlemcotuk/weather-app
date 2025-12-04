
const form = document.querySelector("form");
const searchInput = document.querySelector("#searchInput");
const row = document.querySelector(".row");

const apiKey = "2833d555dee3517850f7e12386dc9f3f";

const weatherColors = {
    Clear: "#FFD93D",         // Parlak güneş sarısı
    Clouds: "#7DA0B1",        // Yumuşak bulut mavisi-gri
    Rain: "#4A90E2",          // Yağmur mavisi
    Snow: "#E8F0F2",          // Çok açık kar beyazı-mavisi
    Mist: "#CFCFCF",          // Sisli gri
    Thunderstorm: "#5A3E8C",  // Sert mor (fırtına elektriği hissi)
    Drizzle: "#76B5C5",       // Hafif yağmur için açık mavi
}

// ! Hava durumu verilerini almak için;
form.addEventListener("submit", function(e){
    e.preventDefault();
    
    const city = searchInput.value;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=tr`;

    fetch(url)
    .then(response => response.json())
    .then((data)=>{
        console.log(data);

        // şehir ismi için;
        const cityName = data.city.name;
        const countryName = data.city.country;
        
        // Saat 12:00:00'daki verileri almak için;
        const forecasts = data.list.filter((forecast)=>{
            return forecast.dt_txt.includes("12:00:00");
        })
        console.log(forecasts);

        row.innerHTML = "";

        forecasts.forEach((veri)=>{
            console.log(veri);

            // ! Tarihi Düzenlemek için;
            const date = new Date(veri.dt_txt);
            // console.log(date);

            const formattedDate = date.toLocaleDateString("tr-TR",{
                day : "numeric",
                month : "long",
                year : "numeric",
                weekday : "long",
            })
            // console.log(formattedDate);

            // ! Havanın derecesini almak için;
            const weatherTemprature = Math.round(veri.main.temp);
            console.log(weatherTemprature);

            // ! Havanın durumunu almak için;
            const weatherDescription = (veri.weather[0].description)[0].toLocaleUpperCase("tr-TR") + (veri.weather[0].description).slice(1);
            console.log(weatherDescription);

            // ! Hava durumuna uygun iconu getirmek için;
            const weatherIconUrl = `https://openweathermap.org/img/wn/${veri.weather[0].icon}@2x.png`;

            // ! Havanın durumuna göre arkaplan rengi getirmek için;
            const weatherBackgroundColor = weatherColors[veri.weather[0].main];
            console.log(weatherBackgroundColor);

            row.innerHTML += `
            <div class="col-4 mb-3">
                <div class="card rounded-5" style="background-color : ${weatherBackgroundColor}">
                    <img src=${weatherIconUrl} class="card-img-top weather-icon" alt="...">
                    <div class="card-body">
                        <h5 class="card-title fs-1 fw-bold">${cityName},${countryName}</h5>
                        <p class="card-text mb-0 fs-4">${formattedDate}</p>
                        <p class="card-text mb-0 fs-4">${weatherTemprature}°C</p>
                        <p class="card-text fs-4 mb-0">${weatherDescription}</p>
                    </div>
                </div>
            </div>
            ` 
        })
    });

    searchInput.value = "";
})


