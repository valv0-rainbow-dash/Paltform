const audioWrapper = document.querySelector("#audio-wrapper");
const playSound = (sound, volume, rate) => {
  let aud = document.createElement("audio");
  aud.autoplay = true;
  aud.src = "assets/audio/" + sound;
  aud.volume = (parseFloat(volume)>1?1:parseFloat(volume)||1);
  aud.playbackRate = rate||1;
  audioWrapper.appendChild(aud);
  setTimeout(function(){ aud.remove() }, 3000)
}