let currentMusic = 0;

const songs = [
    {
        name: 'All Left Behind',
        path: 'alb2024.wav',
        artist: 'Santiago Mianoe',
        cover: '../img/img-cont.png'
    }
]

const music = document.querySelector('#audio');

const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-btn');

playBtn.addEventListener('click', () => {
    if(playBtn.className.includes('pause')){
        music.play();
    }else{
        music.pause();
    }
    playBtn.classList.toggle('pause');
    disk.classList.toggle('play');
});

const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;

    currentTime.innerHTML = '00:00';
    setTimeout(() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    }, 1000);
};

setMusic(0);

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if(min < 10){
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if(sec < 10){
        sec = `0${sec}`;
    }
    return `${min} : ${sec}`;
};

// sek bar //

setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime)
}, 400);

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
})

music.addEventListener('ended', () => {
    // Volta para o início da música
    music.currentTime = 0;
    // Pausa a reprodução
    music.pause();
    // Atualiza o botão de reprodução para o estado de pausa
    playBtn.classList.add('pause');
    // Atualiza a classe do disco para parar a animação
    disk.classList.remove('play');
});