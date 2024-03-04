let input=document.querySelector(".text_box");
let info=document.querySelector(".info");
let locationbtn=document.querySelector(".btn");

input.addEventListener("keyup",function(e)
{

  if(e.key=='Enter' && input.value!='')
  {
    
    requestApi(input.value);
  }
  
})

function requestApi(city)
{
  info.classList.add("pending");
  info.innerHTML="Getting weather information...";

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3b50db04d3c54f16bc31b10eb676b7cd`)
  .then((res)=>{
    return res.json();
  })
  .then((data)=>
  {
    console.log(data);
    if(data.cod=='404')
    {
      info.classList.add("error");
      info.innerHTML=data.message;
    }
    else
    {
      info.classList.remove("pending","error");
      info.innerHTML="";

      let temperature=data.main.temp;
      let feel_like=data.main.feels_like;
      let humidity=data.main.humidity;
      let city=data.name;
      let country=data.sys.country;
      let weather_condition=data.weather[0].main;
      let weathor_icon=weather_condition.toLowerCase();
      

      let input_box=document.querySelector(".input_box");
      let element=document.createElement("div");
      element.classList.add("main");
      input_box.append(element);
      element.innerHTML=`
      
      <div class="weather_box weather_box_active">
        <img src="./images/${weathor_icon}.svg" alt="">
        <div class="temp">
          <img src="./images/weather.png" alt="">
          <p>${temperature}</p>
        </div>
      </div>
      <div class="cond cond_active">${weather_condition}</div>
      <div class="location location_active"><img src="./images/location.png" alt=""> ${city} , ${country}</div>
      
      <div class="buttom_part buttom_part_active">

        <div class="part1">
          <img src="./images/celsius.png" class="celsius" alt="">
          <div class="fill_like">
            <div class="feel">${feel_like}<img src="./images/weather.png" alt=""> </div>
            <div class="text1">Feels like</div>
          </div>
        </div>
          
        
        <div class="part2">
          <img src="./images/humidity.png" class="celsius" alt="">
          <div class="humidity">
            <div class="humid">${humidity}%</div>
            <div class="text2">Humidity</div>
          </div>
        </div>         


      </div>
      
      `
     

    }

  })

  
}

locationbtn.addEventListener("click",function(){
  if(navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(onSuccess,onError);
  }
  else
  {
    alert("Your browser does not support geolocation API");
  }
})

function onError(err)
{
  info.classList.add("error");
  info.innerHTML=err.message;
}

function onSuccess(position)
{
  let coordinates=position.coords;
  let lat=coordinates.latitude;
  let long=coordinates.longitude;
  
  API_KEY="8deb412534dc453c94d6ec04b9dc78f7";
  fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${API_KEY}`)
  .then((response)=>{
    return response.json();
  })
  .then((data)=>
  {
    let city=data.results[0].components.city;


    requestApi(city);
    
    
  })

}
