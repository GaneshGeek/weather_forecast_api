
// beginning

const cityname= async()=>{

    let name = document.getElementById('input-location').value;
    document.getElementById('input-location').value='';
    console.log(name);
    let url=`https://api.api-ninjas.com/v1/city?name=${name}`
   
    fetch(url, {
        method: 'GET',
        headers: {
          'X-Api-Key': '1jCouDFDSc1wLKP+RAY2Yw==s5CtJqLNbE97Cbc7',
          'Content-Type': 'application/json'
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(json => {
            // console.log(json)
            if(json.name == name)
            {
                // console.name(json.name)
                 getdata(name);
            }
            else if(json.length==0)
            {
                 alert("that is not a city name,try with other one");
            }
            else if(json.name !==name)
            {
                alert("the accurate location name is taken ");
                // console.log(json[0].name)
                getdata(json[0].name)
            }
        })
        .catch(error => {
          console.error('Error:', error);
        });

}


function getdata(cityname){
    console.log(cityname);
   let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=409119e7cb64b59e7936dbac63506fbc`;
   fetch(url).then(response=>response.json())
   .then(json=>{
    //  console.log(json);
      showdata(json);
   })
   .catch(error=>{
    console.error('Error:',error);
   })
}
function showdata(data)
{
    let cloudimages={
        Clear:'clear.png',
        Clouds:'clouds.png',
        Drizzle:'drizzle.png',
        Mist:'mist.png',
        Rain:'rain.png',
        Snow:'snow.png'
    }
   console.log(data)
   let name=data.name;
   document.getElementById('location').innerHTML=`${name}`;
   let weather=data.weather[0].main;
   let descript=data.weather[0].description;
   console.log(weather);
   document.getElementById('weather').innerHTML=`${weather}`
   document.getElementById('description').innerHTML=`${descript}`
    Object.keys(cloudimages).forEach(image=>{
    if(weather==image)
    {
        // console.log(cloudimages[image]);
        document.getElementById('image').src=`images/${cloudimages[image]}`;
    }
   })
   let temperature=data.main.temp;
   celsius(temperature)
   let humidity=data.main.humidity;
   console.log(humidity);
   document.getElementById('humidity').innerHTML=`${humidity}%`
   
   let windspeed=data.wind.speed
   kilometer(windspeed)
}

function celsius(temp)
{
    let kelvin=273.15;
    let celsius=temp-kelvin;
    // console.log(celsius);
    document.getElementById('temperature').innerHTML=`${celsius.toFixed(2)}&#8451;`
}
function kilometer(speed)
{
    let kilo=3.6;
    let result=speed * kilo;
    document.getElementById('wind').innerHTML=`${result.toFixed(2)}km/h`;

}

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      // Perform the desired action when "Enter" key is pressed
      cityname();
    }
  });
    

