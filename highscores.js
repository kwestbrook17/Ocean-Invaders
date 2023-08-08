fetch(
  "https://api.unsplash.com/photos/random?client_id=_&query=underwater"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    //document.getElementById("ocean").setAttribute("src",data.urls.full)
    document;
    const arcadeMenu = document.getElementById("highscore-menu");
    arcadeMenu.style.backgroundImage = `url('${data.urls.full}')`;
    arcadeMenu.style.backgroundSize = "cover";
    arcadeMenu.style.backgroundPosition = "center";
    arcadeMenu.style.backgroundRepeat = "no-repeat";
  });

document.addEventListener("DOMContentLoaded", () => {
  // Retrieve the high scores from local storage
  const highScoresList = document.getElementById("highScoresList");
  const highScores = JSON.parse(localStorage.getItem("highScores") || "[]");

  // Sort the high scores in descending order
  highScores.sort((a, b) => b.score - a.score);

  // Display the high scores in the list
  highScores.forEach((entry) => {
    const listItem = document.createElement("li");
    listItem.innerText = `${entry.initials}`;
    highScoresList.appendChild(listItem);
  });
});

//clearing the list
function clearLocalStorage() {
  localStorage.clear();
  location.reload();
}

// Add event listener to the clear button
const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", clearLocalStorage);
