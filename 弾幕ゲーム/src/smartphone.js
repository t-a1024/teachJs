function isSmartPhone() {
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
      keySituation.Enter=true;
      
      console.log("smartPhone");
      return true;
    } else {
      console.log("PC");
      return false;
    }
}
const smartPhoneData={
start:{x:0,y:0},
now:{x:0,y:0},
end:true,
}
const app=document.getElementById("app");
isSmartPhone();
document.addEventListener("touchstart",function (event) {
  keySituation.d=true
    smartPhoneData.end=false;
    smartPhoneData.start={x:event.touches[0].clientX,y:event.touches[0].clientY}
})
document.addEventListener("touchmove", function(event) {
    drawpuniControler()
    smartPhoneData.now={x:event.touches[0].pageX,y:event.touches[0].pageY}
});

document.addEventListener("touchend", function(event){
    app.innerHTML="";
    smartPhoneData.end=true
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
      }
      if (smartPhoneData.start.y+60<smartPhoneData.now.y) {
        keySituation.s=true;
        keySituation.w=false;
    }else if(smartPhoneData.start.y-60>smartPhoneData.now.y){
        keySituation.w=true;
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
    preBox.style.backgroundColor='gray';
    const top=smartPhoneData.start.y-60;
    preBox.style.top=top.toString()+"px";
    const left=smartPhoneData.start.x-60;
    preBox.style.left=left.toString()+"px";
    app.appendChild(preBox);
}
