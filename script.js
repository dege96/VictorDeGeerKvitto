const portfolio = document.querySelector(".portfolio");
const KognitivetVideoLink = document.getElementsByClassName("KognitivetVideoLink");
const KognitivetMusicLink = document.getElementsByClassName("KognitivetMusicLink");
const Kognitivet_Video_and_Music_Link = document.getElementsByClassName("Kognitivet_Video_and_Music_Link");
const VideosKognitivetContainer = document.getElementById("VideosKognitivetContainer");
const MusicKognitivetContainer = document.getElementById("MusicKognitivetContainer");
const BackArrows = document.querySelectorAll(".back_arrow");

BackArrows.forEach((BackArrow) => {
  BackArrow.addEventListener('click', (event) => {
    console.log("BackArrow clicked");
    VideosKognitivetContainer.style.display = "none";
    MusicKognitivetContainer.style.display = "none";
    portfolio.style.display = "block";
  });
});

for (let i = 0; i < KognitivetVideoLink.length; i++) {
  KognitivetVideoLink[i].addEventListener('click', (event) => {
    console.log("KognitivetVideoLink clicked");
    portfolio.style.display = "none";
    VideosKognitivetContainer.style.display = "flex";
  });
}

for (let i = 0; i < KognitivetMusicLink.length; i++) {
  KognitivetMusicLink[i].addEventListener('click', (event) => {
    console.log("KognitivetMusicLink clicked");
    portfolio.style.display = "none";
    MusicKognitivetContainer.style.display = "flex";
  });
}

for (let i = 0; i < Kognitivet_Video_and_Music_Link.length; i++) {
  Kognitivet_Video_and_Music_Link[i].addEventListener('click', (event) => {
    console.log("Kognitivet_Video_and_Music_Link clicked");
    portfolio.style.display = "none";
    MusicKognitivetContainer.style.display = "flex";
    VideosKognitivetContainer.style.display = "flex";
  });
}


function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    const messageElement = document.getElementById('copied-message');
    messageElement.style.display = 'block'; // Show the copied message

    // Hide the message after 2 seconds
    setTimeout(() => {
      messageElement.style.display = 'none';
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
}



