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
    console.log(this.currentTime)
    $('.musicbox .progress-now').style.width = (this.currentTime/this.duration)*100 + '%'
    var min = Math.floor(this.currentTime/60)
    var sec = Math.floor(this.currentTime)%60 + ''
    sec = sec.length === 2? sec : '0' + sec
    $('.musicbox .time').innerText = min + ':' + sec
}

audio.onplay = function(){
    
    
    
}
audio.onpause = function(){
    clearInterval(clock)
}


window.onload = function(){
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
}


    $('.musicbox .forward').onclick = function(){
    currentIndex = (++currentIndex)%musicList.length
    console.log(currentIndex)
    loadMusic(musicList[currentIndex])
}

$('.musicbox .back').onclick = function(){
    currentIndex = (musicList.length + (--currentIndex)) %musicList.length
    console.log(currentIndex)
    loadMusic(musicList[currentIndex])
}


function $(selector){
    return document.querySelector(selector)
}



function getMusicList(callback){
    var xhr = new XMLHttpRequest()
    xhr.open('GET','../json/json.json',true)
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
