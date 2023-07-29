document.addEventListener("DOMContentLoaded", () => {
  // Retrieve the high scores from local storage
  const highScoresList = document.getElementById("highScoresList");
  const highScores = JSON.parse(localStorage.getItem("highScores") || "[]");

  // Sort the high scores in descending order
  highScores.sort((a, b) => b.score - a.score);

  // Display the high scores in the list
  highScores.forEach((entry) => {
    const listItem = document.createElement("li");
    listItem.innerText = `${entry.initials}: ${entry.score}`;
    highScoresList.appendChild(listItem);
  });
});

//clearing the list
function clearLocalStorage() {
    localStorage.clear();
    }

// Add event listener to the clear button
const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", clearLocalStorage);