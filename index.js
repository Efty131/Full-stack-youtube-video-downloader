const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");
const ytdl = require('ytdl-core');
const fs = require('fs');
const color = require('colour');

app.use(cors({ origin: "*", }));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('Frontend'));

const expressServer = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(expressServer);

io.on('connection', function(socket){
    console.log ("Connected".blue.italic)
    socket.on('disconnect', function(){
      console.log("Disconnected".red)
    })
})

app.get("/", (req, res) =>{
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(__dirname + "/Frontend/index.html")
});
app.get ("/video", (req, res) =>{
  res.sendFile(__dirname + '/video.mp4');
});
app.post("/data", (req, res) =>{
  const VIDEO_ID = req.body.link;
  console.log(VIDEO_ID);
  io.emit("Downloading", "Video is downloading on the server")

 ytdl(VIDEO_ID)
.pipe(fs.createWriteStream(`video.mp4`))
.on('error', error => console.error(error))
.on('finish', () => {
  console.log('Download complete'.blue)
  io.emit('downloadCompleted', "Download Complete from server side")
})
});

expressServer.listen(3000, () =>{
  console.log("Server is running at http://localhost:3000".rainbow)
});