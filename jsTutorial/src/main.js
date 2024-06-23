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
    if (getkeySituation("d") && Player.position.x + Player.size < canvas.width) {
        Player.position.x += Player.speed; // 右キーが押されている場合は右に移動
    } else if (getkeySituation("a") && Player.position.x - Player.size> 0) {
        Player.position.x -= Player.speed; // 左キーが押されている場合は左に移動
    }
    if (getkeySituation("s") && Player.position.y + Player.size < canvas.height) {
        Player.position.y += Player.speed; 
    } else if (getkeySituation("w") && Player.position.y - Player.size> 0) {
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

function serchHit(a,b) {//当たり判定を調べるメソッド
    const distanceSquared = Math.pow(a.position.x - b.position.x, 2) + Math.pow(a.position.y - b.position.y, 2);//Math.pow(x,2)=xの２乗
    const collisionDistanceSquared = Math.pow(a.size + b.size, 2);
    return distanceSquared <= collisionDistanceSquared;
    //
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
    if (Player.bulletInterval <= 0 && getkeySituation("Enter")) {
        Player.bulletInterval = Player.bulletFixedInterval; // 弾の発射間隔の設定
        const bullet = {
            "speed":{"Vx":4,"Vy":0},
            "position":{"x":Player.position.x,"y":Player.position.y},
            "size":15,
        };
        //バレットの位置をplayerの位置にしてください。
        const index = MyBulletArray.indexOf(null);
        if (index !== -1) {
            MyBulletArray[index] = bullet; // 空いている弾丸スロットに新しい弾を追加
        }
    }
    MyBulletArray.forEach((bullet, index) => {//弾を一つずつ描画し、弾を動かす。
        if (bullet) {
            drawBullet(bullet);
            bullet.position.x += bullet.speed.Vx;
            bullet.position.y += bullet.speed.Vy;
            if (bullet && bullet.position.x > canvas.width) {
                MyBulletArray[index] = null; // 画面外に出た弾丸を削除
            }
            
            enemyInformation.enemyArray.forEach((enemy) => {
                // 弾丸と敵が当たっているかの判別と、当たっていた時の動作をここに描く(最後)
                if (enemy&&bullet) {//enemyかbulletが存在しない(null)時を省く
                    if (serchHit(enemy,bullet)) {
                        enemy.HP--; // 敵の体力を減らす
                        MyBulletArray[index] = null; // 弾丸を削除
                    }
                }
            });
        }
    });

    //プレイヤーが連続でダメージを喰らわないための対策
    Player.invincibilityTime--;
    //プレイヤーが打つ弾の制御
    Player.bulletInterval--;
    //敵の出現頻度の制御
    enemyInformation.interbal--;
        // 敵の生成例
    if (enemyInformation.interbal <= 0) {
        enemyInformation.interbal = enemyInformation.fixedInterval;
        //敵のデータの生成
        const preEnemy = {
            HP: 2,
            position: { x: 700, y: 480 * Math.random() },
            size: 15,
            speed: { Vx: -(Math.random()), Vy: (Math.random() - 0.5) * 2 },
        };
        //データを配列に入れる
        const index = enemyInformation.enemyArray.indexOf(null);
        if (index !== -1) {
            enemyInformation.enemyArray[index] = preEnemy;
        }
    }
                        
    enemyInformation.enemyArray.forEach((enemy,index)=>{
        if (enemy){
            ctx.drawImage(enemyImage, enemy.position.x - 15, enemy.position.y - 15, enemy.size * 2, enemy.size * 2);
            enemy.position.x+=enemy.speed.Vx;
            enemy.position.y+=enemy.speed.Vy;
            //画面外に出た敵の削除
            if (enemy.position.y > canvas.height || enemy.position.x < 0 || enemy.position.y < 0) {
                enemyInformation.enemyArray[index] = null; // 画面外に出た敵を削除
            }else if (serchHit(enemy,Player) && Player.invincibilityTime <= 0) {//プレイヤーと敵が当たっていてかつプレイヤーが無敵時間ではない時
                Player.invincibilityTime = Player.Hitstun; // プレイヤーが敵に当たった場合の処理
                Player.HP--;//HPを減らす
                enemyInformation.enemyArray[index] = null; // 当たった敵を削除
            } else if (enemy.HP <= 0) {
                enemyInformation.enemyArray[index] = null; // 倒された敵を削除
                score++; // ポイントを増やす
            }//elseを除くと途中でenemyがnullになってenemyが存在しないからエラーになったりする。
        }
    })
    
    if (Player.HP==0) {
        return;
    }

    drawHPAndScore();//体力とスコアの描画
    window.requestAnimationFrame(update);//次の描画がされるタイミングにupdateを予約する
}