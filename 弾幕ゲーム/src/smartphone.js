function isSmartPhone() {
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
      var smartPhoneData={
        start:{x:0,y:0},
        now:{x:0,y:0},
        end:true,
      }
      return true;
    } else {
      return false;
    }
}

document.addEventListener("touchstart",function (event) {
    canvas.style.display='none';
    smartPhoneData.end=false;
    smartPhoneData.start={x:event.touches[0].pageX,y:event.touches[0].pageY}
})
document.addEventListener("touchmove", function(event) {
    smartPhoneData.now={x:event.touches[0].pageX,y:event.touches[0].pageY}
});
document.addEventListener("touchend", function(event){
    smartPhoneData.end=true
})