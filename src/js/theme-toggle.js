function getPreferredColorScheme(){

  let systemScheme = 'light';
  if(window.matchMedia('(prefers-color-scheme: dark)').matches){
    systemScheme = 'dark';
  }

  let chosenScheme = systemScheme;

  if(localStorage.getItem("scheme")){
    chosenScheme = localStorage.getItem("scheme");
  }

  if(systemScheme === chosenScheme){
    localStorage.removeItem("scheme");
  }

  console.log("chosenScheme = "+chosenScheme);

  return chosenScheme;
}

// Write chosen color scheme to local storage
// Unless the system scheme matches the the stored scheme, in which case... remove from local storage
function savePreferredColorScheme(scheme){
  let systemScheme = 'light';

  if(window.matchMedia('(prefers-color-scheme: dark)').matches){
    systemScheme = 'dark';
  }

  localStorage.setItem("scheme", scheme);

}

function applyPreferredColorScheme(scheme) {
  console.log("applying "+scheme+" color scheme");

  let bodyElement = document.body;

  if (scheme === "dark") {
    bodyElement.classList.add("dark-mode");
    bodyElement.classList.remove("light-mode");
    document.getElementById("on-switch").style.display = 'inline';
    document.getElementById("off-switch").style.display = 'none';
  } else if (scheme === "light") {
    bodyElement.classList.add("light-mode");
    bodyElement.classList.remove("dark-mode");
    document.getElementById("off-switch").style.display = 'inline';
    document.getElementById("on-switch").style.display = 'none';
  }

}

applyPreferredColorScheme(getPreferredColorScheme());

// Get the current scheme, and apply the opposite
function toggleColorScheme(){
  let newScheme = "light";
  let scheme = getPreferredColorScheme();
  if (scheme === "light"){
    newScheme = "dark";
  }

  applyPreferredColorScheme(newScheme);
  savePreferredColorScheme(newScheme);
}