(function(){"use strict";
var d=document.documentElement,btn=document.getElementById("theme");
function paint(){var l=d.getAttribute("data-theme")==="light";btn.textContent="Theme: "+(l?"light":"dark");btn.setAttribute("aria-pressed",l?"true":"false")}
btn.addEventListener("click",function(){var n=d.getAttribute("data-theme")==="light"?"dark":"light";d.setAttribute("data-theme",n);try{localStorage.setItem("toffler-theme",n)}catch(e){}paint()});paint();
var a=document.getElementById("a"),rows=[].slice.call(document.querySelectorAll(".track")),cur=null;
function reset(r){r.classList.remove("on");r.querySelector(".play").innerHTML="&#9654;";r.querySelector(".bar i").style.width="0"}
rows.forEach(function(r){
  var p=r.querySelector(".play"),bar=r.querySelector(".bar");
  p.addEventListener("click",function(){
    if(cur===r){if(a.paused){a.play();p.innerHTML="&#10074;&#10074;"}else{a.pause();p.innerHTML="&#9654;"}return}
    if(cur)reset(cur);cur=r;a.src=r.getAttribute("data-src");r.classList.add("on");a.play();p.innerHTML="&#10074;&#10074;"});
  function seek(f){if(cur===r&&a.duration)a.currentTime=f*a.duration}
  bar.addEventListener("click",function(e){var b=bar.getBoundingClientRect();seek((e.clientX-b.left)/b.width)});
  bar.addEventListener("keydown",function(e){if(cur!==r)return;if(e.key==="ArrowRight")a.currentTime+=5;if(e.key==="ArrowLeft")a.currentTime-=5});
});
a.addEventListener("timeupdate",function(){if(!cur||!a.duration)return;var v=a.currentTime/a.duration*100;cur.querySelector(".bar i").style.width=v+"%";cur.querySelector(".bar").setAttribute("aria-valuenow",Math.round(v))});
a.addEventListener("ended",function(){var i=rows.indexOf(cur);reset(cur);cur=null;if(rows[i+1])rows[i+1].querySelector(".play").click()});
})();
