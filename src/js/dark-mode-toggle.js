function getPreferredColorScheme(){

  console.log("i am a script")
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

  return chosenScheme;
}

// Write chosen color scheme to local storage
// Unless the system scheme matches the the stored scheme, in which case... remove from local storage
function savePreferredColorScheme(scheme){
  let systemScheme = 'light';

  if(window.matchMedia('(prefers-color-scheme: dark)').matches){
    systemScheme = 'dark';
  }

  if(systemScheme === scheme){
    localStorage.removeItem("scheme");
  }
  else {
    localStorage.setItem("scheme", scheme);
  }

}

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

// Apply the chosen color scheme by traversing stylesheet rules, and applying a medium.
function applyPreferredColorScheme(scheme) {
    for (var s = 0; s < document.styleSheets.length; s++) {

        for (var i = 0; i < document.styleSheets[s].cssRules.length; i++) {
            rule = document.styleSheets[s].cssRules[i];


            if (rule && rule.media && rule.media.mediaText.includes("prefers-color-scheme")) {

                switch (scheme) {
                    case "light":
                        rule.media.appendMedium("original-prefers-color-scheme");
                        if (rule.media.mediaText.includes("light")) rule.media.deleteMedium("(prefers-color-scheme: light)");
                        if (rule.media.mediaText.includes("dark")) rule.media.deleteMedium("(prefers-color-scheme: dark)");
                        break;
                    case "dark":
                        rule.media.appendMedium("(prefers-color-scheme: light)");
                        rule.media.appendMedium("(prefers-color-scheme: dark)");
                        if (rule.media.mediaText.includes("original")) rule.media.deleteMedium("original-prefers-color-scheme");
                        break;
                    default:
                        rule.media.appendMedium("(prefers-color-scheme: dark)");
                        if (rule.media.mediaText.includes("light")) rule.media.deleteMedium("(prefers-color-scheme: light)");
                        if (rule.media.mediaText.includes("original")) rule.media.deleteMedium("original-prefers-color-scheme");
                        break;
                }
            }
        }


    }

    // Change the toggle button to be the opposite of the current scheme
    if (scheme === "dark") {
        document.getElementById("on-switch").style.display = 'inline';
        document.getElementById("off-switch").style.display = 'none';
    } else {
        document.getElementById("off-switch").style.display = 'inline';
        document.getElementById("on-switch").style.display = 'none';
    }
}

applyPreferredColorScheme(getPreferredColorScheme());