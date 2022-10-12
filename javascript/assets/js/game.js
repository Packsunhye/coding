const allMusic = [
    {
        name : "01. Good In Goodbye",
        artist : "Madison Beer",
        img : "music_view01",
        audio : "music_audio01"
    },
    {
        name : "02. just for me",
        artist : "pinkpantheress",
        img : "music_view02",
        audio : "music_audio02"
    },
    {
        name : "03. 신기루",
        artist : "HeMeets",
        img : "music_view03",
        audio : "music_audio03"
    },
    {
        name : "04. Dead Man Walking",
        artist : "City Wolf",
        img : "music_view04",
        audio : "music_audio04"
    },
    {
        name : "05. Brad pitt",
        artist : "coin",
        img : "music_view05",
        audio : "music_audio05"
    },
    {
        name : "06. American Cliche",
        artist : "Finneas",
        img : "music_view06",
        audio : "music_audio06"
    },
    {
        name : "07. Hate me",
        artist : "Nico Colins",
        img : "music_view07",
        audio : "music_audio07"
    },
    {
        name : "08. In the Balancewith Lyrics",
        artist : "FF14",
        img : "music_view08",
        audio : "music_audio08"
    },
    {
        name : "09. SPOILERS To the Edgewith Lyrics",
        artist : "FF14",
        img : "music_view09",
        audio : "music_audio09"
    },
    {
        name : "10. Suzakus",
        artist : "FF14",
        img : "music_view10",
        audio : "music_audio10"
    }
]

const musicWrap = document.querySelector(".music__wrap");
const musicView = musicWrap.querySelector(".music__view .img img");
const musicName = musicWrap.querySelector(".music__view .title h3");
const musicArtist = musicWrap.querySelector(".music__view .title p");
const musicAudio = musicWrap.querySelector("#main-audio");

const musicProgress = musicWrap.querySelector(".progress");
const musicProgressBar = musicWrap.querySelector(".progress .bar");
const musicProgressCurrent = musicWrap.querySelector(".progress .timer .current");
const musicProgressDuration = musicWrap.querySelector(".progress .timer .duraition");

const musicPlay = musicWrap.querySelector("#control-play");
const musicPrevBtn = musicWrap.querySelector("#control-prev");
const musicNextBtn = musicWrap.querySelector("#control-next");
const musicRepeat = musicWrap.querySelector("#control-repeat");

const musicListBtn = musicWrap.querySelector("#control-list");
const musicList = musicWrap.querySelector(".music__list");
const musicListUl = musicWrap.querySelector(".music__list ul");

let musicIndex = 1;

//음악 재생

function LoadMusic(num){
    // musicView.stc = `../assets/img/artwork.pic.png`;
    musicName.innerText = allMusic[num-1].name;
    musicArtist.innerText = allMusic[num-1].artist;
    musicView.src = `../assets/music_img/${allMusic[num-1].img}.png`;
    musicView.alt = allMusic[num-1].name;
    musicAudio.src = `../assets/music/${allMusic[num-1].audio}.mp3`;
}
//재생버튼
function playMusic(){
    musicWrap.classList.add("pause");
    musicPlay.setAttribute("title","정지");
    musicPlay.setAttribute("class","stop");
    musicAudio.play();
}

//정지버튼
function pauseMusic(){
    musicWrap.classList.remove("pause");
    musicPlay.setAttribute("title","재생");
    musicPlay.setAttribute("class","play");
    musicAudio.pause();
}

//이전곡 듣기
function prevMusic(){
    musicIndex == 1 ? musicIndex = allMusic.length : musicIndex--;
    LoadMusic(musicIndex);
    playMusic();
}

//다음곡 듣기
function nextMusic(){
    musicIndex == allMusic.length ? musicIndex = 1 : musicIndex++;
    LoadMusic(musicIndex);
    playMusic();
}

//뮤직 진행바 
musicAudio.addEventListener("timeupdate", e => {
    // console.log(e);
    const currentTime = e.target.currentTime;
    // console.log(currentTime); 시간이 지날 수록 증가(현재 진행되는 시간)
    const duration = e.target.duration;
    // console.log(duration); 전체 갯수(오디오의 총 길이)

    let progressWidth = (currentTime/duration) * 100 //전체 길이에서 현재 진행되는 시간을 백분위로 나눔

    musicProgressBar.style.width = `${progressWidth}%`

    //전체 시간
    musicAudio.addEventListener("loadeddata", ()=>{
        let audioDuration = musicAudio.duration;
        let totalMin = Math.floor(audioDuration / 60); //전체 시간을 분단위로 쪼개줌
        let totalSec = Math.floor(audioDuration % 60); //남은 초를 저장

        if(totalSec < 10) totalSec = `0${totalSec}`; //초가 한 자릿수일때 앞에 0을 붙임

        musicProgressDuration.textContent = `${totalMin}:${totalSec}`; //완성된 시간 문자열을 출력
    })

    //진행중인 시간
    let currentMin = Math.floor(currentTime / 60); //전체 시간을 분단위로 쪼개줌
    let currentSec = Math.floor(currentTime % 60); //남은 초를 저장

    if(currentSec < 10) currentSec = `0${currentSec}`; //초가 한 자릿수일때 앞에 0을 붙임

    musicProgressCurrent.textContent = `${currentMin}:${currentSec}`; //완성된 시간 문자열을 출력
    
    
})

//진행버튼 클릭
musicProgress.addEventListener("click", (e) => {
    let progressWidth = musicProgress.clientWidth; //진행바의 전체 길이
    let clickdeOffsetX = e.offsetX; //진행바 기준으로 측정되는 X 좌표
    let songDuration = musicAudio.duration; //오디오의 전체길이

    musicAudio.currentTime = (clickdeOffsetX / progressWidth) * songDuration; //백분위로 나눈 숫자에 다시 전체 길이를 곱해 현재 재생값으로 바뀜
})

//반복버튼 클릭
musicRepeat.addEventListener("click", ()=>{
    let getAttr = musicRepeat.getAttribute("class")
    // console.log(getAttr);

    switch(getAttr){
        case "repeat" : 
            musicRepeat.setAttribute("class","repeat_one");
            musicRepeat.setAttribute("title","한곡 반복");
        break;
        case "repeat_one" : 
            musicRepeat.setAttribute("class","shuffle");
            musicRepeat.setAttribute("title","랜덤 반복");
        break;
        case "shuffle" : 
            musicRepeat.setAttribute("class","repeat");
            musicRepeat.setAttribute("title","전체 반복");
        break;
    }
})

//오디오가 끝나면 재생
musicAudio.addEventListener("ended", ()=>{
    let getAttr = musicRepeat.getAttribute("class");
    // alert(getAttr);

    switch(getAttr){
        case "repeat" : 
            nextMusic()
        break;
        case "repeat_one" : 
            playMusic()
        break;
        case "shuffle" : 
            let randomIndex = Math.floor(Math.random() * allMusic.length + 1) //랜덤 인덱스를 생성

            do {
                randomIndex = Math.floor(Math.random() * allMusic.length + 1)
            } while( musicIndex == randomIndex )
            musicIndex = randomIndex;   //  현재 인덱스를 랜덤 인덱스로 변경
            LoadMusic(musicIndex);      //  랜덤인덱스가 반영된 현재 인덱스 값으로 음악을 다시 로드
            playMusic();                //  로드한 음악을 재생 
        break;
    }
})



// 뮤직 리스트
musicListBtn.addEventListener("click", ()=> {
    musicList.classList.add("show");
})
// 뮤직 리스트 구현하기
for(let i =0; i < allMusic.length; i++){
    let li =  ` 
        <li>
            <strong>${allMusic[i].name}</strong>
            <em>${allMusic[i].artist}</em>
            <span>재생시간</span>
        </li>
    `;

    musicListUl.innerHTML += li;
}


//플레이 버튼
// let i = 0;
// musicPlay.addEventListener("click", ()=>{
//     if(i==0){
//         playMusic();
//         document.querySelector(".play").setAttribute("title", "정지")
//         document.querySelector(".play").classList.add("stop");
//         document.querySelector(".play").classList.remove("play");
//         i++;
//     } else {
//         pauseMusic();
//         document.querySelector(".stop").setAttribute("title", "재생")
//         document.querySelector(".stop").classList.add("play");
//         document.querySelector(".stop").classList.remove("stop");
//         i--;
//     }
// })

musicPlay.addEventListener("click", ()=>{
    const isMusicPauesd = musicWrap.classList.contains("pause"); //음악 재생중
    isMusicPauesd ? pauseMusic() : playMusic();
})

musicPrevBtn.addEventListener("click", ()=>{
    prevMusic();
})
musicNextBtn.addEventListener("click", ()=>{
    nextMusic();
})

// 마지막
window.addEventListener("load", ()=>{
    LoadMusic(musicIndex);

})