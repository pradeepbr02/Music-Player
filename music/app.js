const playbtn = document.getElementById("play");
const prevbtn = document.getElementById("prev");
const nextbtn = document.getElementById("next");
const music = document.querySelector("audio");
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById("progress");
const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const start = document.getElementById("start");
const end = document.getElementById("end");


const songs =[
    {
        name : "jacinto-1",
        displayName: "Electric Chill Machine",
        artist: "Jacinto Design",
    },

    {
        name : "jacinto-2",
        displayName: "Seven Nation Army",
        artist: "Jacinto Design",
    },
    {
        name : "jacinto-3",
        displayName: "Electric Chill Machine",
        artist: "Jacinto Design",

    },
    {
        name : "metric-1",
        displayName:"Metric",
        artist:"James shaw",
    }
 
]
  

let isSongplaying = false;

function playMusic(){
    isSongplaying = true;
    playbtn.classList.replace("fa-play","fa-pause");
    music.play();
}

function pauseMusic(){
    isSongplaying = false;
    playbtn.classList.replace("fa-pause","fa-play");
    music.pause();
   
}

function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src =`music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

let songIndex =0;


function onNext(){
    songIndex++;
    if(songIndex > songs.length-1){
        songIndex = 0
        
    }
    loadSong(songs[songIndex])
   
    playMusic();
   


}
function onPrev(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length-1;
    }
    loadSong(songs[songIndex]);
    playMusic();
}

function progressBar(event){
    if(isSongplaying){
        const {duration , currentTime} = event.srcElement;

        const progressTime = (currentTime/duration)*100;
        progress.style.width =`${progressTime}%`;
        
        const totalTime = Math.floor(duration/60);
        let totalSeconds = Math.floor(duration % 60);

        if(totalSeconds < 10){
            totalSeconds = `0${totalSeconds}`;
        }
        end.textContent = `${totalTime}:${totalSeconds}`;
        if(totalSeconds){
            end.textContent = `${totalTime}:${totalSeconds}`;
        }

        const currentMin = Math.floor(currentTime / 60);
        const currentSeconds = Math.floor(currentTime % 60);

        if(currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`;

        }
        start.textContent = `${currentMin}:${currentSeconds}`;
    }
}

function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX/width)*duration;
}



playbtn.addEventListener("click",()=>(isSongplaying ? pauseMusic() : playMusic()))
nextbtn.addEventListener("click", onNext);
prevbtn.addEventListener("click" , onPrev);
progressContainer.addEventListener("click" , setProgressBar);
music.addEventListener("timeupdate" , progressBar);
music.addEventListener("ended" , onNext)