/* Start Setting */
let setting = document.querySelector(".setting");
let spanSetting = document.querySelector(".setting > .gear-span");

// Function to change some property
spanSetting.addEventListener("click", () => {
  // Add And Remove Active Setting Which --> Right = 0; 
  setting.classList.toggle("active-setting");
  // Add And Remove (fa-spin) Class From Gear Span Icon svg -> make it rotate
  document.querySelector(".setting > .gear-span > svg").classList.toggle("fa-spin");

})

// Start Colors In Setting
let colors = document.querySelectorAll(".setting .colors ul li");

// 
if (window.localStorage.getItem("color")) {
  removeActiveClass(colors);
  document.querySelector(`[data-color = "${window.localStorage.getItem("color")}"]`).classList.add("active");
  document.documentElement.style.setProperty("--colorTheme", window.localStorage.getItem("color"));
}

// Function To Remove Active Class 
function removeActiveClass(list) {
  list.forEach((elementOfList) => {
    elementOfList.classList.remove("active");
  })
}

// forEach On list colors
colors.forEach((color) => {
  color.addEventListener("click", (event) => {
    // Remove Active Class
    removeActiveClass(colors)
    event.currentTarget.classList.add("active");
    window.localStorage.setItem("color", event.currentTarget.dataset.color);
    document.documentElement.style.setProperty("--colorTheme", window.localStorage.getItem("color"));
  })
})
// End Colors In Setting 

// Start Mode In Setting
let modeSpanRound = document.querySelector(".mode-theme > .round");

if (window.localStorage.getItem("mode") == "light") {
  changeDarkToLight();
  // Remove Class Active On Span Theme
  (modeSpanRound.classList.contains("active"))? modeSpanRound.classList.remove("active") : false;
}

else {
  changeLightToDark();
  // Add Class Active On Span Theme
  (!modeSpanRound.classList.contains("active"))? modeSpanRound.classList.add("active") : false;
}
  // Function To Change Dark Mode To Light Mode
  function changeDarkToLight() {
    // Reset The Value In Scss
      // Reset The White Color To #fff
      document.documentElement.style.setProperty("--whiteColor", "#fff");
      // Change The Quran Dark Color
      document.documentElement.style.setProperty("--quranLightColor", "#fcfcfc");
      // Reset The Dark Color To #333
      document.documentElement.style.setProperty("--darkColor", "#333");
      // Reset The Nav Background In Light Mode To (Dark Background)
      document.documentElement.style.setProperty("--navBackgroundInLightMode", "linear-gradient(to right, #333, #111, #333)");
      // Reset The Setting To Light Mode
      document.documentElement.style.setProperty("--settingLightMode", "linear-gradient(to right, #fcfcfc, #ffffff)");
  }

  // Function To Change Light Mode To Dark Mode
function changeLightToDark() {  
  // Change The Value In Scss
  // Change The White Color To #333
  document.documentElement.style.setProperty("--whiteColor", "#333");
  // Change The Quran Dark Color
    document.documentElement.style.setProperty("--quranLightColor", "#1f2125");
    // Change The Dark Color To #fff
    document.documentElement.style.setProperty("--darkColor", "#fff");
    // Change The Nav Background To (Background Light) In Dark Mode
    document.documentElement.style.setProperty("--navBackgroundInLightMode", "linear-gradient(to right, #74ebd5, #acb6e5)");
    // Change The Setting Background To Dark Mode
    document.documentElement.style.setProperty("--settingLightMode", "linear-gradient(to right, #232526, #414345)");
}

modeSpanRound.addEventListener("click", (event) => {
  event.currentTarget.classList.toggle("active");
  if (modeSpanRound.classList.contains("active")) {
    // Add Dark Mode To LocalStorage
    window.localStorage.setItem("mode", "dark");
    // Set Property White To Dark
    // Function To Change Light Mode To Dark Mode
    changeLightToDark();
  }
  else {
    // Add Light Mode To LocalStorage
    window.localStorage.setItem("mode", "light");
    // Set Property Dark To White
    // Function To Change Dark Mode To Light Mode
    changeDarkToLight();
  }
})

// End Mode In Setting 
/* End Setting */


// Start Surah

let surahText = document.querySelector(".surah p");

if (window.localStorage.getItem("surahIndex")) {
  fetch(`https://api.alquran.cloud/v1/surah/${window.localStorage.getItem("surahIndex")}`)
  .then((request) => {
    let surahData = request.json();
    return surahData;
  })
  .then((surah) => {
    for(let counter = 0; counter < surah.data.ayahs.length; counter++) {
      // console.log(surah.data.ayahs[counter].text);
      surahText.innerHTML += surah.data.ayahs[counter].text + `<span>(${counter + 1})</span> `;
    }
  })
}

// End Surah