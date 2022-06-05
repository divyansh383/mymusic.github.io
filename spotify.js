console.log("Welcome To My Music");
//variables
let songindex=0;
let playb=document.getElementsByClassName('playb');
let n=0;

let songitem=Array.from(document.getElementsByClassName('songitem'));
let title=document.getElementById('title');
let pic=document.getElementById('pic');
//buttons
let masterplay=document.getElementById('masterplay');
let masterpause=document.getElementById('masterpause');
let prev=document.getElementById('previous');
let next=document.getElementById('next');
let naam=document.getElementById('naam');
let dura=document.getElementById('dura');
let gif=document.getElementById('gif');
let songlist=document.getElementsByClassName('songlist');
let lyrics=document.getElementsByClassName('lyrics');
let lyc=document.getElementsByClassName('lyc');
//
lyc[0].addEventListener('click',()=>{
    if(lyc[0].style.height!="100%"){
        lyc[0].style.height="100%";
        pic.style.display="none";
    }
})
title.addEventListener('click',()=>{
    if(lyc[0].style.height=="100%"){
        lyc[0].style.height="10%";
        pic.style.display="block";
    }
})
gif.addEventListener('click',()=>{
    // if(gif.style.opacity==1){
        console.log("view");
        if(songlist[0].style.display!="none"){
            songlist[0].style.display="none";
            lyrics[0].style.display="flex";
            lyrics[0].style.transition="all 1s";
            title.innerHTML=songs[n].songname;
            // pic.src='file:///D:/python/frontend/spotify%20clone/'+songs[n].coverpath;
            pic.src=songs[n].coverpath;
        }
        else{
            songlist[0].style.display="block";
            lyrics[0].style.display="none";}
        }
);

masterpause.style.display='none';
let progressbar=document.getElementById('progressbar');
let songs=[
    {songname:"Puhsing Me Away",filepath:"0.mp3",coverpath:"covers/hybridtheory.jpg"},
    {songname:"In The End",filepath:"1.mp3",coverpath:"covers/ite.jpg"},
    {songname:"With You",filepath:"2.mp3",coverpath:"covers/hybridtheory.jpg"},
    {songname:"My December",filepath:"3.mp3",coverpath:"covers/hybridtheory.jpg"},
    {songname:"Papercut",filepath:"4.mp3",coverpath:"covers/hybridtheory.jpg"},
    {songname:"One Step Closer",filepath:"5.mp3",coverpath:"covers/hybridtheory.jpg"},
    {songname:"Crawling",filepath:"6.mp3",coverpath:"covers/crawing_cover.jpg"},
    {songname:"Runaway",filepath:"7.mp3",coverpath:"covers/hybridtheory.jpg"},
]
let audioelement=new Audio(songs[n].filepath);
let nm=songs[n].songname;
naam.innerHTML=nm;
songitem.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverpath;
    k=element.getElementsByTagName("span")[0].innerText;
    console.log(k);
    element.getElementsByTagName("span")[0].innerText=songs[i].songname;
})
//events


function plays(){
    if(audioelement.paused|| audioelement.currentTime<=0){
        audioelement.play();
        masterplay.style.display='none';
        masterpause.style.display='inline-block';
        gif.style.opacity=1;
        playb[n].src="pause.png";
    }
}
masterplay.addEventListener('click',plays);
document.addEventListener('keydown', event => {
  if (event.code === 'Space') {
    console.log("space");
    if(gif.style.opacity==0){
        plays();}
    else{
        paused();
    }
  }
})

function paused(){
    audioelement.pause();
    masterpause.style.display='none';
    masterplay.style.display='inline-block';
    gif.style.opacity=0;
    for(i=0;i<playb.length;i++){
            playb[i].src="play.png";
      }
}
masterpause.addEventListener('click',paused);
next.addEventListener('click',nextsong);
function nextsong(){
    n=Number(n); 
    if(Number(n)<7){
        n=n+1;
    }
    else{
        n=0;
    }
    console.log(n);
    playb[Number(n)].click();
      
    nm=songs[Number(n)].songname;
    title.innerHTML=songs[n].songname;
    // pic.src='file:///D:/python/frontend/spotify%20clone/'+songs[n].coverpath;
    pic.src=songs[n].coverpath;
    naam.innerHTML=nm;
}
prev.addEventListener('click',prevsong);
function prevsong(){
    n=Number(n);  
    if(Number(n)>0){
        n=n-1;
    }
    else{
        n=7;
    }
    console.log(n);
    playb[Number(n)].click();
    nm=songs[Number(n)].songname;
    title.innerHTML=songs[n].songname;
    // pic.src='file:///D:/python/frontend/spotify%20clone/'+songs[n].coverpath;
    pic.src=songs[n].coverpath;
    naam.innerHTML=nm; 
}
audioelement.addEventListener('timeupdate',()=>{
    progress=parseInt((audioelement.currentTime/audioelement.duration)*100)
    progressbar.value=Number(progress);
    var mins=Math.floor(Math.trunc(audioelement.currentTime)/60);
    var secs=Math.trunc(audioelement.currentTime)-mins*60;
    document.getElementById('dura').innerHTML=("0"+mins).slice(-2)+":"+("0"+secs).slice(-2);
    if(progress>=100){
        console.log("end");
        paused();
    }
});
progressbar.addEventListener('change',()=>{
    audioelement.currentTime=(progressbar.value*audioelement.duration)/100;
    
})
Array.from(document.getElementsByClassName('playb')).forEach((element)=>{
    element.addEventListener('click',(e)=>{ 
        if(playb[element.id].src=="file:///D:/python/frontend/spotify%20clone/play.png"){
            audioelement.pause();
            playb[element.id].src="pause.png";
            // audioelement=new Audio(playb[element.id].id+".mp3");
            audioelement=new Audio(songs[element.id].filepath)
            audioelement.addEventListener('timeupdate',()=>{
                progress=parseInt((audioelement.currentTime/audioelement.duration)*100)
                progressbar.value=Number(progress);
                var mins=Math.floor(Math.trunc(audioelement.currentTime)/60);
                var secs=Math.trunc(audioelement.currentTime)-mins*60;
                document.getElementById('dura').innerHTML=("0"+mins).slice(-2)+":"+("0"+secs).slice(-2);
            });
            n=element.id;
            nm=songs[n].songname;
            naam.innerHTML=nm;
            plays();
        }
        else{
            playb[element.id].src="play.png";
            audioelement.pause();
            paused();
        }
        for(i=0;i<playb.length;i++){
          if(i!=element.id)
              playb[i].src="play.png";
        }
    })
    })

