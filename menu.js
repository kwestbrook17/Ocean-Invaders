fetch(
  "https://api.unsplash.com/photos/random?client_id=_4&query=underwater"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    //document.getElementById("ocean").setAttribute("src",data.urls.full)
    document;
    const arcadeMenu = document.getElementById("arcade-menu");
    arcadeMenu.style.backgroundImage = `url('${data.urls.full}')`;
    arcadeMenu.style.backgroundSize = "cover";
    arcadeMenu.style.backgroundPosition = "center";
    arcadeMenu.style.backgroundRepeat = "no-repeat";
  });
