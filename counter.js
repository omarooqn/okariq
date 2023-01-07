
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
      // Reset The Dark Color To #333
      document.documentElement.style.setProperty("--darkColor", "#333");
      // Reset The Dark Color Of Span Count To #333
      document.documentElement.style.setProperty("--darkCount", "#9e9e9e5e");
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
    // Change The White Color To #33
    document.documentElement.style.setProperty("--whiteColor", "#333");
    // Change The Dark Color To #fff
    document.documentElement.style.setProperty("--darkColor", "#fff");
    // Change The Dark Color Of Span Count To #fff
    document.documentElement.style.setProperty("--darkCount", "#fff");
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

// Start Tasbeh Page
let layer = document.querySelector(".layer");
let closeSpan = document.querySelector(".close");
let talkingOfHaddes = document.querySelector(".talking");
let counter = document.querySelector(".parent");
let screen = document.querySelector(".screen");
let numberScreen = document.querySelector(".screen > span");
let reset = document.querySelector(".reset");
let led = document.querySelector(".dark");
let count = document.querySelector(".count");

let arrayOfHaddes = [
  `من قرأ حرفاً من كتاب الله فله به حسنة و الحسنة بعشر أمثالها لا أقول -الم- حرف ولكن ألف حرف و لام حرف و ميم حرف
  من قرأ حرفاً من كتاب الله فله به حسنة و الحسنة بعشر أمثالها لا أقول -الم- حرف ولكن ألف حرف و لام حرف و ميم حرف`,

  `مثل الذي يذكر ربه و الذي لا يذكر ربه مثل الحي و الميت`,

  `ألا انبئكم بخير اعمالكم و ازكاها عند مليككم و أرفعها في درجاتكم و خير لكم من انفاق الذهب و الورق و خير لكم من أن تلقو عدوكم`,
  
  `ما جلس قوم مجلساً لم يذكر الله فيه ولم يصلوا علي نبيهم إلا كان عليهم ترة, فإن شاء عذبهم و إن شاء غفر لهم`,
  
  `ما من قوم يقومون من مجلس لا يذكرون الله فيه إلا قاموا عن مثل جيفة حمار وكان لهم حسرة`,

  "شسياشساسششبيسلامةشو لانكشمتل سنميل ةىشسنخياىنخلمةثىصقل خحصةحمصث ر",
  "لسيلشسيلشساقتا شسبتيلارؤلاسبشيلص ثقضصثفبلص رسؤ شسياشسبتبة يلسيلارءؤىلا ثصثق",
  "ؤءلاشس لانكشمتلللاشسيل شسيلاشسيالا سلا يشسل س شسيلبش سيلثصقبلف  ثقبثبقثص",
  "لشسلصثبصشثقب شسيلصثصقصالا بلاؤ سيل ي ؤشلارشس يل صثل سيرئ ء سي شسيلشيالاالاصشق خحصةحمصث ل"
]

// Start Layer To Haddes
// Function To Remove Layer
closeSpan.addEventListener("click", () => {
    layer.style.display = "none";
})

// Random Haddes To Show In talkingOfHaddes
talkingOfHaddes.innerHTML = arrayOfHaddes[Math.floor(Math.random() * arrayOfHaddes.length)];
// End Layer To Haddes



// Start Counter
// Start Zkr 
let arrayOfZkr = [
  "سبحان الله",
  "سبحان الله و بحمده",
  "الله لا إله إلا هو يحيي و يميت و هو علي كل شئ قدير",
  "الحمد لله",
  "الله أكبر",
  "اللهم صلي علي نبينا محمد",
  "أستغفر الله وأتوب إليه",
  "أستغفر الله",
  "لا إله إلا الله و حده لا شريك له له الملك و له الحمد و هو علي كل شئ قدير"
]

// I Use It Under When User Click On Led
let zkr = document.querySelector(".zkr");
let zkrClose = document.querySelector(".zkr > .close");
let zkrParagraph = document.querySelector(".zkr > p");

// Function To Remove The Zkr
zkrClose.addEventListener("click", () => {
  zkr.style.display = "none";
})

// End Zkr 

if (window.localStorage.getItem("number")) {
  numberScreen.innerHTML = window.localStorage.getItem("number"); 
}

count.addEventListener("click", () => {
  let number = numberScreen.innerHTML++;
  window.localStorage.setItem("number", number+1);
})

reset.addEventListener("click", () => {
  window.localStorage.setItem("number", 0);
  numberScreen.innerHTML = 0; 
})

led.addEventListener("click", () => {
  zkr.style.display = "flex";
  zkrParagraph.innerHTML = arrayOfZkr[Math.floor(Math.random() * arrayOfHaddes.length)];
})
// End Counter
// End Tasbeh Page
