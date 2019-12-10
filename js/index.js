var musicList = []
var currentIndex = 0
var clock
var audio = new Audio()
audio.autoplay = true

getMusicList(function(list){
    musicList = list
    loadMusic(list[currentIndex])
})
    


audio.ontimeupdate = function(){
    $('.musicbox .progress-now').style.width = (this.currentTime/this.duration)*100 + '%'
    
}

audio.onplay = function(){
   clock = setInterval(function(){
    var min = Math.floor(audio.currentTime/60)
    var sec = Math.floor(audio.currentTime)%60 + ''
    sec = sec.length === 2? sec : '0' + sec
    $('.musicbox .time').innerText = min + ':' + sec
   }, 1000) 
}
audio.onpause = function(){
    clearInterval(clock)
}

audio.onended = function(){
    currentIndex = (++currentIndex)%musicList.length
    loadMusic(musicList[currentIndex])
}

$('.musicbox .play').onclick = function(){
    if(audio.paused){
    audio.play()
    this.querySelector('.iconfont').classList.remove('icon-BF')
    this.querySelector('.iconfont').classList.add('icon-ZT')
    }else{
    audio.pause()
    this.querySelector('.iconfont').classList.add('icon-BF')
    this.querySelector('.iconfont').classList.remove('icon-ZT')
    }
}



    $('.musicbox .forward').onclick = function(){
    currentIndex = (++currentIndex)%musicList.length
    loadMusic(musicList[currentIndex])
}

$('.musicbox .back').onclick = function(){
    currentIndex = (musicList.length + --currentIndex) %musicList.length
    loadMusic(musicList[currentIndex])
}

$('.musicbox .bar').onclick = function(e){
    var percent = e.offsetX / parseInt(getComputedStyle(this).width)
    audio.currentTime = audio.duration * percent
}


function $(selector){
    return document.querySelector(selector)
}



function getMusicList(callback){
    var xhr = new XMLHttpRequest()
    xhr.open('GET','./json/json.json',true)
    xhr.onload = function(){
        if((xhr.status >=200 && xhr.status < 300) || xhr.status === 304){
            callback(JSON.parse(this.responseText))
        }else {
            console.log('获取数据失败')
        }
    }
    xhr.onerror = function(){
        console.log('网络异常')
    }
    xhr.send()
}

function loadMusic(musicObj){
    console.log('begin play', musicObj)
    $('.musicbox .title').innerText = musicObj.title
    $('.musicbox .auther').innerText = musicObj.auther
    audio.src = musicObj.src
}




