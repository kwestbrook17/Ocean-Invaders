// Function to handle the "Play Music" button click
function playMusicButtonClick() {
  // Your YouTube Data API key
  const youtubeApiKey = "AIzaSyDE_8nd4N4DB2dA1FfewMtIckL7C0rC1vY";

  const playMusicButton = document.getElementById("Music");

  playMusicButton.addEventListener("click", async () => {
    try {
      // Search on youtube
      const searchQuery = "retro arcade music";

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&q=${searchQuery}&type=video&part=snippet&maxResults=1`
      );

      const data = await response.json();

      if (data && data.items && data.items.length > 0) {
        const videoId = data.items[0].id.videoId;

        const playerContainer = document.getElementById("playerContainer");

        // Need to Create a YouTube iFrame player inside the player container
        const player = new YT.Player(playerContainer, {
          height: "1", // makes the iframe invisable
          width: "1",
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            loop: 1,
            controls: 0,
            showinfo: 0,
            modestbranding: 1,
            fs: 0,
            cc_load_policy: 0,
            iv_load_policy: 3,
          },
          events: {
            onReady: (event) => {
              // Unmute the video on start to enable audio
              event.target.unMute();
              event.target.play();
            },
          },
        });
      } else {
        console.log("Song not found.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
}

document.addEventListener("DOMContentLoaded", playMusicButtonClick);
