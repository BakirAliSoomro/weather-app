const container = document.querySelector(".container");
const searchbox = document.querySelector(".searchbox");
const weatherbox = document.querySelector(".weatherbox");
const weatherdetails = document.querySelector(".weatherdetails");
const input = document.querySelector(".searchbox input");
const searchboxbtn = document.querySelector(".searchbox button");
const hide = document.querySelector(".hide");
const loader = document.querySelector(".loader");
const weatherimg = document.querySelector(".weatherbox img");

searchboxbtn.addEventListener("click", async () => {
  try {
    const API_KEY = "3bda1e51d3107003c3ee62646ab1a1b2";
    const location = input.value.trim();
    if (location === "") {
      alert("Enter the city");
      return;
    }
    weatherimg.src = "";
    loader.classList.remove("hide");
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`,
    );
    const data = await response.json();
    if (data.cod === "404") {
      alert("City not found");
      loader.classList.add("hide");
      return;
    } else {
      updateweatherdataui(data);
    }
  } catch (error) {
    console.log("Error", error);
  }
});
const updateweatherdataui = (data) => {
  const temp = document.querySelector(".temperature");
  const description = document.querySelector(".description");
  const humidity = document.querySelector(".weatherdetails .humidity span");
  const wind = document.querySelector(".weatherdetails .wind span");

  switch (data.weather[0].main) {
    case "Rain":
      weatherimg.src = `/assest/rain-removebg-preview.png`;
      break;
    case "Clouds":
      weatherimg.src = `/assest/cloud-removebg-preview.png`;
      break;
    case "Clear":
      weatherimg.src = `/assest/clear-removebg-preview.png`;
      break;
    case "Smoke":
      weatherimg.src = `/assest/smoke-removebg-preview.png`;
      break;
    case "Snow":
      weatherimg.src = `/assest/snow-removebg-preview.png`;
      break;
    case "Stormy":
      weatherimg.src = `/assest/stormy-removebg-preview.png`;
      break;
    case "Haze":
      weatherimg.src = `/assest/mist-removebg-preview.png`;
      break;
    default:
      weatherimg.src = ``;
  }

  temp.innerHTML = `${parseInt(data.main.temp)}<span>*C</span>`;
  description.innerHTML = `${data.weather[0].main}`;
  humidity.innerHTML = `${data.main.humidity}%`;
  wind.innerHTML = `${parseInt(data.wind.speed)}Kmh`;
  weatherbox.classList.add("fadeIn");
  weatherdetails.classList.add("fadeIn");
  loader.classList.add("hide");
  container.style.height = "510px";
};
input.addEventListener("keypress", (evt) => {
  if (evt.key === "Enter") {
    searchboxbtn.click();
  }
});
