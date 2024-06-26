const app=document.getElementById("app");
function isSmartPhone() {
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
      keySituation.Enter=true;
      return true;
    } else {
        app.style.display='none';
      return false;
    }
}
const smartPhoneData={
start:{x:0,y:0},
now:{x:0,y:0},
end:true,
}
isSmartPhone();
document.addEventListener("touchstart",function (event) {
    smartPhoneData.end=false;
    smartPhoneData.start={x:event.touches[0].pageX,y:event.touches[0].pageY};
})
document.addEventListener("touchmove", function(event) {
    smartPhoneData.now={x:event.touches[0].pageX,y:event.touches[0].pageY};
    drawpuniControler();
});

document.addEventListener("touchend", function(event){
    smartPhoneData.end=true;
    app.innerHTML=""
})
function AllKeyControl(tf) {
    keySituation.a=tf;
    keySituation.s=tf;
    keySituation.d=tf;
    keySituation.w=tf;
    //keySituation.Enter=tf;
}
function controlBySmartPhone() {
    if (smartPhoneData.end) {
        AllKeyControl(false);
    }else{
      if (smartPhoneData.start.x+60<smartPhoneData.now.x) {
          keySituation.d=true;
          keySituation.a=false;
      }else if(smartPhoneData.start.x-60>smartPhoneData.now.x){
          keySituation.a=true;
          keySituation.d=false;
      }else{
          keySituation.a=false;
          keySituation.d=false;
      }
      if (smartPhoneData.start.y+60<smartPhoneData.now.y) {
        keySituation.s=true;
        keySituation.w=false;
      }else if(smartPhoneData.start.y-60>smartPhoneData.now.y){
        keySituation.w=true;
        keySituation.s=false;
      }else{
        keySituation.w=false;
        keySituation.s=false;
      }
    }
}
function drawpuniControler(){
    app.innerHTML="";
    const preBox=document.createElement("div");
    preBox.style.width='120px';
    preBox.style.height='120px';
    preBox.style.position='fixed';
    preBox.style.backgroundColor='rgba(128, 128, 128, 0.5)';
    var top=smartPhoneData.start.y-60;
    preBox.style.top=top.toString()+"px";
    var left=smartPhoneData.start.x-60;
    preBox.style.left=left.toString()+"px";
    app.appendChild(preBox);
    const preBox2=document.createElement("div");
    preBox2.style.width='30px';
    preBox2.style.height='30px';
    preBox2.style.position='fixed';
    preBox2.style.backgroundColor='rgba(128, 0, 0, 0.5)';
    var top=smartPhoneData.now.y-15;
    preBox2.style.top=top.toString()+"px";
    var left=smartPhoneData.now.x-15;
    preBox2.style.left=left.toString()+"px";
    app.appendChild(preBox2);
}
