var el=null,
    p1=null,
    p2=null;
var ball_x=500,
    ball_y=300,
    p1_y=300,
    p2_y=300,
    count_y=1,
    count_x=false;

function move_player(){
  p1=document.getElementById("palyer1");
  p2=document.getElementById("palyer2");

  function key_thing(e){
     if(e && e.keyCode==38){                  
      p1_y+=50;
      p2_y-=50;
    }
    if(e && e.keyCode==40){                  
      p1_y-=50;
      p2_y+=50;
    }            
    if (p1_y<25) {
      p1_y=25;
    }
    if (p2_y<25) {
      p2_y=25;
    }
    if (p1_y>550) {
      p1_y=550;
    }
    if (p2_y>550) {
      p2_y=550;
    }
  }

  document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    key_thing(e);
  }
  document.onkeyup=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    key_thing(e);
  }
  p1.style.top=p1_y+"px";
  p2.style.top=p2_y+"px";

  this.getp1_y= function(){
    return p1_y;
  }
  this.getp2_y= function(){
    return p2_y;
  }
}

function move_ball(){
  var el=document.getElementById("ball");
  var body_x=document.body.scrollWidth;
  var palyer=new move_player();
  var palyer1_y=palyer.getp1_y(),
      palyer2_y=palyer.getp2_y();
  var sou_p=document.createElement("audio");
      sou_p.preload="auto";
      sou_p.src="sound_ping.wav"

  if (ball_y<25||ball_y>575) {
    count_y++;
  }
  if (count_y%2!=0) {
    ball_y+=15;
  }
  else if(count_y%2==0){
    ball_y-=15;
  }

  if (count_x==false){
    ball_x+=10;
  }
  else if(count_x==true){
    ball_x-=10;
  }
  if (ball_x<body_x*0.08&&(ball_y<=(palyer1_y+110)&&ball_y+10>=palyer1_y)){
    count_x=false;
    console.log("pengzhuang1");
    sou_p.play();
  }
  else if (ball_x>body_x*0.91&&(ball_y<=(palyer2_y+110)&&ball_y+10>=palyer2_y)){
    count_x=true;
    console.log("pengzhuang2");
    sou_p.play();
  }
  else if (ball_x>body_x*0.95||ball_x<body_x*0.05){
    window.location.href="lose.html?backurl="+window.location.href;
  }

  el.style.top=ball_y+'px';
  el.style.left=ball_x+'px';
  this.getx=function(){
    return ball_x;
  }
  this.gety=function(){
    return ball_y;
  }
}
window.onload=function(){
  setInterval(move_ball,20);
}