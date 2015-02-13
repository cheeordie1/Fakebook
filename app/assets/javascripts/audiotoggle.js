// this function simply toggles the audio on and off when called
function toggleplay(){
  audiotrack=document.getElementById("audiolink");
  if(audiotrack.paused){
    audiotrack.play();
  } else {
    audiotrack.pause();
  }
}
