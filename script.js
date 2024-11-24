const portfolio = document.querySelector(".portfolio");
const KognitivetLink = document.getElementsByClassName("KognitivetLink");
const VideosKognitivet = document.getElementById("VideosKognitivet");
const BackArrow = document.querySelector(".back_arrow");

BackArrow.addEventListener('click', (event) => {
  console.log("BackArrow clicked");
  VideosKognitivet.style.display = "none";
  portfolio.style.display = "block";
}); 

for (let i = 0; i < KognitivetLink.length; i++) {
  KognitivetLink[i].addEventListener('click', (event) => {
    console.log("KognitivetLink clicked");
    portfolio.style.display = "none";
    VideosKognitivet.style.display = "flex";
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



