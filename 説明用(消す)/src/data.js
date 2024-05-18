//JSON型の変数についての説明が必須っぽい

let number=0;
let string="";
let booleam=false;
let array=[];
let img=new Image();
const PlayerTemplate={
    HP: 5, // プレイヤーの体力
    speed: 2, // プレイヤーの移動速度
    bulletFixedInterval: 20, // 弾の発射間隔
    size: 15, // プレイヤーのサイズ
    position: { x: 50, y: 240 }, // プレイヤーの初期位置
    bulletInterval: 0, // 弾の発射間隔カウンタ
    Hitstun: 60, // ヒットスタン時間
    invincibilityTime: 0, // 無敵時間
}
const MyBulletTemplate={
    "speed":{"Vx":4,"Vy":0},
    "position":{"x":number,"y":number},
    "size":15,
}
const enemyTemplate={
    "HP":2,
    "position":{"x":700,"y":480 * Math.random()},
    "size":15,
    "speed":{"Vx":number,Vy:number},
}

const enemyInformationTemplate = {
    "enemyArray": new Array(300).fill(null), // 敵の配列
    "interbal": 120, // 敵の生成間隔カウンタ
    "fixedInterval": 5 // 敵の生成間隔
};
function getTemplate(type) {
    switch (type) {
        case "Player":
            return JSON.parse(JSON.stringify(PlayerTemplate));
        case "MyBullet":
            return JSON.parse(JSON.stringify(MyBulletTemplate));
        case "enemy":
            var returnData=JSON.parse(JSON.stringify(enemyTemplate));
            returnData.position.y=480 * Math.random();
            returnData.speed.Vx=-(Math.random());
            returnData.speed.Vy=(Math.random() - 0.5) * 2 - ((returnData.position.y - 240) / 240);
            return returnData;
        case "enemyArray":
            var returnData=JSON.parse(JSON.stringify(enemyInformationTemplate));
            returnData.enemyArray=new Array(300).fill(null);
            return returnData;
        default:
            break;
    }
}
function serchHit(a,b) {//当たり判定を調べるためのfunction
    const distanceSquared = Math.pow(a.position.x - b.position.x, 2) + Math.pow(a.position.y - b.position.y, 2);
    const collisionDistanceSquared = Math.pow(a.size + b.size, 2);
    return distanceSquared <= collisionDistanceSquared;//三平方の定理で距離を調べてお互いのsizeを足したものより距離が短ければtrueを返す。
}
let imageArray=[]
//プレイヤーの画像の設定
imageArray[0]=new Image()
imageArray[0].src = "./img/魔理沙right.png"; // プレイヤー画像のパス
imageArray[0].onload = function () {
    checkAllImagesLoaded();
};


imageArray[1] = new Image();// 敵の画像
imageArray[1].src = "./img/youseiGreen.png"; // 敵の画像のパス
imageArray[1].onload = function () {
    checkAllImagesLoaded();
};
// すべての画像の読み込みが完了したかをチェックする関数
function checkAllImagesLoaded() {
    for (const imageObj of imageArray) {
        if (!imageObj.onload) {
            return; // すべての画像がロードされていない場合は関数を終了
        }
    }
    // すべての画像がロードされた場合は、ゲームを開始
    gameStart();
}
function gameStart(){
    window.requestAnimationFrame(update);//updateを呼び出す
}//この辺は本格的にゲームを作る時に覚えたらいいと思う。

function getImage(type) {
    switch (type) {
        case "Player":
            return imageArray[0];
        case "enemy":
            return imageArray[1];
    }
}

const image = new Image();//画像のオブジェクト(空)
image.src="./img/imagePath.png";//画像のパス(pngじゃなくてもいいよ)