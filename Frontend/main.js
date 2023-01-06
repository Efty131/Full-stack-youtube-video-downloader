const video = document.getElementById("my-video");
const download = document.querySelector(".download");
const message = document.getElementById("messageFromServer");

download.style.display = 'none';

let socket = io();

socket.on('Downloading', msg =>{
  message.innerHTML = msg;
})
socket.on('downloadCompleted', msg =>{
  console.log(msg)
  download.style.display = 'block';
  message.innerHTML = msg;
  setTimeout(()=>{
    message.innerHTML = '';
  }, 5000);
});



document.getElementById("btn").addEventListener("click", () =>{
    let link = { link: document.getElementById("link").value };

    console.log(link);
    fetch('http://localhost:3000/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(link),
      })
        .then((response) => response.json())
        .then((response) => console.log(response))
    link = "link";
});
//     fetch video

document.getElementById("play").addEventListener("click", () =>{
    fetch('http://localhost:3000/video')
    .then((response) => response.blob())
    .then((videoBlob) => {
    video.src = URL.createObjectURL(videoBlob);
    download.href = URL.createObjectURL(videoBlob);
    });
});