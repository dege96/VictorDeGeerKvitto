const portfolio = document.querySelector(".portfolio");
const KognitivetLink = document.getElementById("KognitivetLink");
const VideosKognitivet = document.getElementById("VideosKognitivet");

KognitivetLink.addEventListener('click', (event) => {
  console.log("KognitivetLink clicked");
  portfolio.style.display = "none";
  VideosKognitivet.style.display = "flex";
});

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