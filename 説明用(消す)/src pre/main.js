// Canvas要素と2Dコンテキストの取得
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//スコアの宣言(最初は0)
let score=0;
// プレイヤーの設定
const Player = {
    HP: 5, // プレイヤーの体力
    speed: 2, // プレイヤーの移動速度
    bulletFixedInterval: 20, // 弾の発射間隔
    size: 15, // プレイヤーのサイズ
    position: { x: 50, y: 240 }, // プレイヤーの位置
    bulletInterval: 1, // 弾の発射間隔カウンタ
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
        Player.position.y += Player.speed; 
    } else if (keySituation.w && Player.position.y - Player.size> 0) {
        Player.position.y -= Player.speed; 
    }
}
// 敵の設定
// 敵情報の初期化
const enemyInformation = {
    "enemyArray": new Array(300).fill(null), // 敵の配列
    "interbal": 0, // 敵が出てくるインターバル
    "fixedInterval": 5 // 敵の生成間隔
};

const enemyImage=getImage("enemy");

function drawPlayer() {//画像を描画する例
    ctx.drawImage(PlayerImage, Player.position.x - 15, Player.position.y - 15, Player.size * 2, Player.size * 2);//(画像データ,x(左上),y(左上),大きさ(x方向),大きさ(y方向))
}

function drawBullet(bullet) {//弾の描画
    /* 
    bulletは以下の形連想配列です
    {
    "speed":{"Vx":number,"Vy":number},それぞれの方向への速度(px/s)
    "position":{"x":number,"y":number},弾の位置
    "size":number,弾の大きさ(半径)
    }
    */
    ctx.beginPath();
    ctx.fillStyle = "yellow";//好きな色にして、ドゾ
    ctx.arc(bullet.position.x, bullet.position.y, bullet.size, 0, Math.PI * 2/* π*2 */);//(中心x,中心y,半径,円弧の始まりの角度(ラジアン),円弧の終わりの角度(ラジアン))
    //https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D/arc　詳しくはこれ見て
    ctx.fill();//塗りつぶし　stroke()で枠線のみの描画も可能
}

function drawHPAndScore() {//スコアとHPの描画
    ctx.textAlign="start"
    ctx.font = '50px Roboto medium';//フォントと文字の大きさ
    ctx.fillStyle='black';
    ctx.fillText("❤️✖️"+Player.HP.toString(), 10, 50);//左下が(10,50)
    ctx.fillStyle='black';
    ctx.textAlign="end";
    ctx.fillText("Score:"+score.toString(), 640, 50);//右下が(640,50)
}
//updateを呼び出すメソッドはdata.jsの中にあるよ
function update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);//描画のリセット
    PlayerControl();
    drawPlayer();

    // 弾の発射
    if (Player.bulletInterval <= 0) {
        Player.bulletInterval = Player.bulletFixedInterval; // 弾の発射間隔の設定
        const bullet = {
            "speed":{"Vx":4,"Vy":0},
            "position":{"x":Player.position.x,"y":Player.position.y},
            "size":15,
        };
        const index = MyBulletArray.indexOf(null);
        if (index !== -1) {
            MyBulletArray[index] = bullet; // 空いている弾丸スロットに新しい弾を追加
        }
    }
    MyBulletArray.forEach((bullet, bIndex) => {//弾を一つずつ描画し、弾を動かす。
        if (bullet) {
            drawBullet(bullet);
            bullet.position.x += bullet.speed.Vx;
            bullet.position.y += bullet.speed.Vy;
            if (bullet && bullet.position.x > canvas.width) {
                MyBulletArray[bIndex] = null; // 画面外に出た弾丸を削除
            }
            
            enemyInformation.enemyArray.forEach((enemy) => {
                // 弾丸と敵が当たっているかの判別と、当たっていた時の動作をここに描く。
            });
        }
    });

    //Player.bulletInterval--;

    
    //敵のインターバルが0以下の場合、新しくenemyを作成してenemyInformation.enemyArrayに挿入する
    //0以上の場合、インターバルを１減らす。

    //敵を一体ずつ描画し、敵を動かす。

    drawHPAndScore();//体力とスコアの描画
    window.requestAnimationFrame(update);//次の描画がされるタイミングにupdateを予約する
}