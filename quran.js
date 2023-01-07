  // Data About The Surah
// http://api.alquran.cloud/v1/surah

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
      // Reset The Background To Light Mode
      document.documentElement.style.setProperty("--lightModeBackground", "linear-gradient(90deg, #FFDEE9 0%, #B5FFFC 100%)");
      // Reset The Setting To Light Mode
      document.documentElement.style.setProperty("--settingLightMode", "linear-gradient(to right, #fcfcfc, #ffffff)");
  }

  // Function To Change Light Mode To Dark Mode
function changeLightToDark() {  
  // Change The Value In Scss
    // Change The Quran Dark Color
    document.documentElement.style.setProperty("--quranLightColor", "#1f2125");
    // Change The White Color To #333
    document.documentElement.style.setProperty("--whiteColor", "#333");
    // Change The Dark Color To #fff
    document.documentElement.style.setProperty("--darkColor", "#fff");
    // Change The Nav Background To (Background Light) In Dark Mode
    document.documentElement.style.setProperty("--navBackgroundInLightMode", "linear-gradient(to right, #74ebd5, #acb6e5)");
    // Change The Background To Dark Mode 
    document.documentElement.style.setProperty("--lightModeBackground", "linear-gradient(to right, #000000, #434343)");
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

// Start Surah Of Quran
let surahs = document.querySelector(".surahs");
fetch("http://api.alquran.cloud/v1/surah")
.then((response) => {
  let mySurahs = response.json();
  return mySurahs;
})

.then((dataOfSurahs) => {
  for(let counter = 0; counter < dataOfSurahs.data.length; counter++) {
    // Create Div Surah
    let surah = document.createElement("div");
    surah.className = "surah";
    surahs.appendChild(surah);
    // Create Main Div From Arabic Name Of Surah
    let arabicNameOfSurah = document.createElement("div");
    arabicNameOfSurah.className = "arabic-name";
    surah.appendChild(arabicNameOfSurah)
    // Create Name Arabic
    let nameArabic = document.createElement("div");
    nameArabic.className = "name";
    let txtSurahArabic = document.createTextNode(dataOfSurahs.data[counter].name);
    nameArabic.appendChild(txtSurahArabic);
    arabicNameOfSurah.appendChild(nameArabic);
    // Create Number Of Ayahs Of Surah
    let numberAyahs = document.createElement("div");
    numberAyahs.className = "number-ayahs";
    arabicNameOfSurah.appendChild(numberAyahs);
    let txtNumberOfAyahs = document.createTextNode(`Ayahs ${dataOfSurahs.data[counter].numberOfAyahs}`);
    numberAyahs.appendChild(txtNumberOfAyahs);
    // Create English Div Name Of Surah
    let englishNameDiv = document.createElement("div");
    englishNameDiv.className = "english-name";
    surah.appendChild(englishNameDiv);
    // Create English Name Of Surah
    let englishName = document.createElement("div");
    englishName.className = "en-name";
    let textEnglishName = document.createTextNode(dataOfSurahs.data[counter].englishName);
    englishName.appendChild(textEnglishName);
    englishNameDiv.appendChild(englishName);
    // Create Meaning Of Name Of Surah
    let meaningName = document.createElement("div");
    meaningName.className = "mean-name";
    let meanText = document.createTextNode(dataOfSurahs.data[counter].englishNameTranslation);
    meaningName.appendChild(meanText);
    englishNameDiv.appendChild(meaningName);
    // Create Over Surah 
    let overSurah = document.createElement("div");
    overSurah.className = "overlay";
    overSurah.setAttribute("data-id", dataOfSurahs.data[counter].number);
    surah.appendChild(overSurah);
  }
})

// When Click On OverLay From Surah
let popupAyahs = document.querySelector(".popup-ayahs");
let closeDiv = document.querySelector(".popup-ayahs > .icon");
let quranText = document.querySelector(".popup-ayahs > .quran-text");

window.addEventListener("click", (event) => {
  if (event.target.classList == "overlay") {
    surahIndex = event.target.dataset.id;
    window.localStorage.setItem("surahIndex", surahIndex);
    window.location.href = "surah.html";
  }
  // Close PopupAyahs
})

// End Surah Of Quran