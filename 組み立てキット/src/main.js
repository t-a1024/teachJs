// Canvas要素と2Dコンテキストの取得
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// プレイヤーの設定
const Player = {
    HP: 5, // プレイヤーの体力
    speed: 2, // プレイヤーの移動速度
    bulletFixedInterval: 20, // 弾の発射間隔
    size: 15, // プレイヤーのサイズ
    position: { x: 50, y: 240 }, // プレイヤーの位置
    bulletInterval: 0, // 弾の発射間隔カウンタ
    Hitstun: 60, // ヒットスタン時間
    invincibilityTime: 0, // 無敵時間
}
/* この辺の数字は好きにいじってください */
//プレイヤーの画像の取得
const PlayerImage=getImage("Player");

// プレイヤーの弾丸配列の初期化
const MyBulletArray = new Array(100).fill(null);

// プレイヤーの操作関数
function PlayerControl() {
    if (keySituation.d && Player.position.x + Player.size < canvas.width) {
        Player.position.x += Player.speed; // 右キーが押されている場合は右に移動
    } else if (keySituation.a && Player.position.x - Player.size> 0) {
        Player.position.x -= Player.speed; // 左キーが押されている場合は左に移動
    }
    if (keySituation.s && Player.position.y + Player.size < canvas.height) {
        //上を参考に、sが押されている時に下に動くようなコードを書いてください
    } else if (keySituation.w && Player.position.y - Player.size> 0) {
        //上を参考に、wが押されている時に上に動くようなコードを書いてください
    }
}
// 敵の設定
// 敵情報の初期化
const enemyInformation = getTemplate("enemyArray");//data.js内のenemyInformationTemplateの取得
/* 
 */
const enemyImage=getImage("enemy");

function drawPlayer() {//画像を描画する例
    ctx.drawImage(PlayerImage, Player.position.x - 15, Player.position.y - 15, Player.size * 2, Player.size * 2);//(画像データ,x(左上),y(左上),大きさ(x方向),大きさ(y方向))
}

function drawBullet(bullet) {//弾の描画
    /* 
    bulletは以下の形連想配列です
    {
    "speed":{"Vx":number,"Vy":number},
    "position":{"x":number,"y":number},
    "size":number,
    }
    */
    ctx.beginPath();
    ctx.fillStyle = "yellow";//好きな色にして、ドゾ
    ctx.arc(bullet.position.x, bullet.position.y, bullet.size, 0, Math.PI * 2/* π*2 */);//(中心x,中心y,半径,円弧の始まりの角度(ラジアン),円弧の終わりの角度(ラジアン))
    //https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D/arc　詳しくはこれ見て
    ctx.fill();//塗りつぶし　stroke()で枠線のみの描画も可能
}

function update(){
    //ctx.clearRect(0, 0, canvas.width, canvas.height);後で外して
    //PlayerControl();
    //drawPlayer();

    // Enterキーでの弾の発射
    if (keySituation.Enter && Player.bulletInterval <= 0) {
        Player.bulletInterval = Player.bulletFixedInterval; // 弾の発射間隔の設定
        const bullet = getTemplate("MyBulletInformation");
        //バレットの位置をplayerの位置にしてください。
        const index = MyBulletArray.indexOf(null);
        if (index !== -1) {
            MyBulletArray[index] = bullet; // 空いている弾丸スロットに新しい弾を追加
        }
    }
    
    window.requestAnimationFrame(update);//次の描画がされるタイミングにupdateを予約する
}