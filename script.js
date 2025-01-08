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

document.addEventListener('DOMContentLoaded', function() {
    const infoBox = document.getElementById('video-info-box');
    const videos = document.querySelectorAll('#VideosKognitivet .video, .IphoneVideo');
    const container = document.getElementById('VideosKognitivet');

    videos.forEach(video => {
        video.addEventListener('mousemove', (e) => {
            const tasks = [];
            if (video.dataset.music === "true") tasks.push("Music");
            if (video.dataset.filming === "true") tasks.push("Filming");
            if (video.dataset.editing === "true") tasks.push("Editing");
            if (video.dataset.directing === "true") tasks.push("Directing");

            infoBox.querySelector('.info-content').innerHTML = `
                <h3 class="Contribution">Contribution</h3>
                <ul>
                    ${tasks.map(task => `<li>${task}</li>`).join('')}
                </ul>
            `;

            // Använd getBoundingClientRect för att få container position
            const containerRect = container.getBoundingClientRect();
            const x = e.clientX - containerRect.left;
            const y = e.clientY - containerRect.top;

            console.log({
                clientX: e.clientX,
                clientY: e.clientY,
                containerLeft: containerRect.left,
                containerTop: containerRect.top,
                calculatedX: x,
                calculatedY: y
            });

            infoBox.style.display = 'block';
            infoBox.style.left = (e.clientX + 15) + 'px';
            infoBox.style.top = (e.clientY + 15) + 'px';
        });

        video.addEventListener('mouseleave', () => {
            infoBox.style.display = 'none';
        });
    });
});



