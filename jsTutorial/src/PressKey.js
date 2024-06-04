let keySituation = {
    "a": false,
    "b": false,
    "c": false,
    "d": false,
    "e": false,
    "f": false,
    "g": false,
    "h": false,
    "i": false,
    "j": false,
    "k": false,
    "l": false,
    "m": false,
    "n": false,
    "o": false,
    "p": false,
    "q": false,
    "r": false,
    "s": false,
    "t": false,
    "u": false,
    "v": false,
    "w": false,
    "x": false,
    "y": false,
    "z": false,
    "0": false,
    "1": false,
    "2": false,
    "3": false,
    "4": false,
    "5": false,
    "6": false,
    "7": false,
    "8": false,
    "9": false,
    "Escape": false,
    "F1": false,
    "F2": false,
    "F3": false,
    "F4": false,
    "F5": false,
    "F6": false,
    "F7": false,
    "F8": false,
    "F9": false,
    "F10": false,
    "F11": false,
    "F12": false,
    "PrintScreen": false,
    "ScrollLock": false,
    "Pause": false,
    "Insert": false,
    "Home": false,
    "PageUp": false,
    "Delete": false,
    "End": false,
    "PageDown": false,
    "ArrowUp": false,
    "ArrowDown": false,
    "ArrowLeft": false,
    "ArrowRight": false,
    "Backspace": false,
    "Tab": false,
    "Enter": false,
    "Shift": false,
    "Control": false,
    "Alt": false,
    "CapsLock": false,
    "ContextMenu": false,
    "Meta": false,
    "ContextMenu": false,
    "NumLock": false,
    " ": false,
    "-": false,
    "=": false,
    "[": false,
    "]": false,
    "\\": false,
    ";": false,
    "'": false,
    ",": false,
    ".": false,
    "/": false,
    "`": false
};
//対応するkeyがなければlogに書かれたkeyを追加してください。　#Chatgptを信用すな

document.addEventListener("keydown", (e) => {//eventの略  e=キーボードがどれかが押されたイベント
    const key = e.key;//押されたkey
    if (keySituation.hasOwnProperty(key)) {//もしkeySituation[key]があれば
        keySituation[key] = true;//keySituation[key]をtrueにする
    }else{
        console.log(key);//なかったときはlogに出るようにする(デバッグ用)
    }
});

document.addEventListener("keyup", (e) => {
    const key = e.key;//押されたkey
    if (keySituation.hasOwnProperty(key)) {//もしkeySituation[key]があれば
        keySituation[key] = false;//keySituation[key]をtrueにする
    }else{
        console.log(key);//なかったときはlogに出るようにする(デバッグ用)
    }
});
/* 
キーが押された際にkeySituationをtrueにして離された際にfalseにするプログラム
これにより(keySituation.key)がキーを押されているかの判別に使える
https://developer.mozilla.org/ja/docs/Web/API/Element/keydown_event
*/