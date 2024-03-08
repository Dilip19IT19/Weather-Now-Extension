let input=document.querySelector(".text_box");
let info=document.querySelector(".info");
let locationbtn=document.querySelector(".btn");


input.addEventListener("keydown",function(e)
{
  

  if(e.key=='Enter' && input.value!='' )
  {
    
    requestApi(input.value);
  
  }
  else if(e.key=='Backspace' && input.value!='')
  {
    let element=document.querySelector(".main");
    
    element.innerHTML=""
    
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
      

     
      let element=document.querySelector(".main");
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

locationbtn.addEventListener("click",async function(){
  
  const res=await fetch(`https://api.ipify.org/?format=json`);
  const data=await res.json();
  const ip=data.ip;
  const res2=await fetch(`https://ipinfo.io/${ip}/geo`);
  const data2=await res2.json();
  const city=data2.city;
  requestApi(city);
})


