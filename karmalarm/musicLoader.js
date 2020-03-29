class MusicLoader {
  run(soundContainer) {
    const allSound = soundContainer.querySelectorAll("audio");

    const tracks = [];

    allSound.forEach(sound => {
      sound.setAttribute("preload", "auto");
      sound.setAttribute("controls", "none");
      tracks.push(new Audio(sound.src));
    });

    return tracks;
  }
}
