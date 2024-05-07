// Canvas要素と2Dコンテキストの取得
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// ポイントの初期化
let score = 0;

// プレイヤーの設定
const Player = getTemplate("Player");

//画像の取得
const PlayerImage=getImage("Player");
// プレイヤーの弾丸配列の初期化
const MyBulletArray = new Array(100).fill(null);

// 敵の設定
// 敵情報の初期化
const enemyInformation = getTemplate("enemyArray");
const enemyImage=getImage("enemy");
// プレイヤーの描画関数
function drawPlayer() {
    if (Player.HP <= 0) {
        return; // プレイヤーの体力が0以下の場合は描画しない
    }
    // 無敵時間中は一定間隔で点滅させる
    if (Player.invincibilityTime > 0 && (Player.invincibilityTime % 5 == 1 || Player.invincibilityTime % 5 == 2)) {
        return; //特定の条件内では描画しない
    }
    ctx.drawImage(PlayerImage, Player.position.x - 15, Player.position.y - 15, Player.size * 2, Player.size * 2);
}

function drawBullet(bullet) {//弾の描画
    ctx.beginPath();
    ctx.fillStyle = "yellow";//好きな色にして、ドゾ
    ctx.arc(bullet.position.x, bullet.position.y, bullet.size, 0, Math.PI * 2);
    ctx.fill();//塗りつぶし　stroke()で枠線のみの描画も可能
    //https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D/arc　詳しくはこれ見て
}


function clearCanvas() {// キャンバスのクリア(塗りつぶし)
    ctx.clearRect(0, 0, canvas.width, canvas.height); // キャンバスをクリア
}

// プレイヤーの操作関数
function PlayerControl() {
    if (Player.invincibilityTime > 30) {
        Player.position.x -= 0.5; // 敵にぶつかった際にノックバックする
        return;//操作は受け付けない
    }
    if (keySituation.d && Player.position.x + Player.size < canvas.width) {
        Player.position.x += Player.speed; // 右キーが押されている場合は右に移動
    } else if (keySituation.a && Player.position.x - Player.size> 0) {
        Player.position.x -= Player.speed; // 左キーが押されている場合は左に移動
    }
    if (keySituation.s && Player.position.y + Player.size < canvas.height) {
        Player.position.y += Player.speed; // 下キーが押されている場合は下に移動
    } else if (keySituation.w && Player.position.y - Player.size> 0) {
        Player.position.y -= Player.speed; // 上キーが押されている場合は上に移動
    }
}

// メイン更新関数
function update() {
    PlayerControl(); // プレイヤーの操作を更新
    clearCanvas(); // キャンバスをクリア

    // Enterキーでの弾の発射
    if (keySituation.Enter && Player.bulletInterval <= 0) {
        Player.bulletInterval = Player.bulletFixedInterval; // 弾の発射間隔の設定
        const bullet = getTemplate("MyBullet");//data.jsのbulletを複製
        bullet.position.x = Player.position.x;
        bullet.position.y = Player.position.y;//弾の位置をプレイヤーの位置に変更
        const index = MyBulletArray.indexOf(null);//nullの位置を探す　なければ-1を返す　
        if (index !== -1) {
            MyBulletArray[index] = bullet; // 空いている弾丸スロットに新しい弾を追加
        }
    }
    // プレイヤーの弾丸の更新と描画
    MyBulletArray.forEach((bullet, bIndex) => {
        if (bullet) {
            drawBullet(bullet);
            bullet.position.x += bullet.speed.Vx;
            if (bullet && bullet.position.x > canvas.width) {
                MyBulletArray[bIndex] = null; // 画面外に出た弾丸を削除
            }
            // 弾丸と敵の当たり判定
            enemyInformation.enemyArray.forEach((enemy) => {//敵全てを調べる
                if (enemy&&bullet) {//enemyかbulletが存在しない(null)時を省く
                    if (serchHit(enemy,bullet)) {
                        enemy.HP--; // 敵の体力を減らす
                        MyBulletArray[bIndex] = null; // 弾丸を削除
                    }
                }
            });//enemyArrayの繰り返し終了
        }
    });//

    // 敵の生成
    if (enemyInformation.interbal <= 0) {
        enemyInformation.interbal = enemyInformation.fixedInterval; // 敵の生成間隔の設定
        const preEnemy = getTemplate("enemy");//data.js内のenemyTemplateの取得
        preEnemy.speed.Vx = -(Math.random());//スピードをランダムに設定(-1~0の間でランダム)
        preEnemy.speed.Vy = (Math.random() - 0.5) * 2 - ((preEnemy.position.y - 240) / 240);
        const index = enemyInformation.enemyArray.indexOf(null);//nullの場所を探す。　なければ-1を返す
        if (index !== -1) {
            enemyInformation.enemyArray[index] = preEnemy; // 空いている敵スロットに新しい敵を追加
        }
    }

    // 敵の更新と描画
    enemyInformation.enemyArray.forEach((enemy, index) => {//enemyInformation.enemyArray内の全てのenemyに対して繰り返される文
        if (enemy) {//nullでないことの確認
            ctx.drawImage(enemyImage, enemy.position.x - enemy.size, enemy.position.y - enemy.size, enemy.size * 2, enemy.size * 2);//描画
            enemy.position.x += enemy.speed.Vx;
            enemy.position.y += enemy.speed.Vy;//位置をスピード分動かす
            enemy.speed.Vx -= (Math.random() - 0.4) * 0.1;//加速
            enemy.speed.Vy += ((Math.random() - 0.5) * 0.1 )//- ((enemy.position.y - 240) / 4800) * 0.05);真ん中に寄せたいならこんな感じ
            if (enemy.position.y > canvas.height || enemy.position.x < 0 || enemy.position.y < 0) {
                enemyInformation.enemyArray[index] = null; // 画面外に出た敵を削除
            } else if (serchHit(enemy,Player) && Player.invincibilityTime <= 0) {//プレイヤーと敵が当たっていてかつプレイヤーが無敵時間ではない時
                Player.invincibilityTime = Player.Hitstun; // プレイヤーが敵に当たった場合の処理
                Player.HP--;//HPを減らす
                enemyInformation.enemyArray[index] = null; // 当たった敵を削除
            } else if (enemy.HP <= 0) {
                enemyInformation.enemyArray[index] = null; // 倒された敵を削除
                score++; // ポイントを増やす
            }//elseを除くと途中でenemyがnullになってenemy.HPが存在しないからエラーになったりする。
        }
    });

    drawPlayer(); // プレイヤーを描画
    interval(); // インターバルの更新
    if (Player.HP <= 0) {//HPが0になった際
        finishGame(); // ゲーム終了時の処理
        return;//終わり
    }
    drawHPAndScore();
    window.requestAnimationFrame(update); // 次のフレームを要求
}

// インターバルの更新関数　ぶっちゃけupdate内に書いてもいい
function interval() {
    Player.bulletInterval--; // 弾の発射間隔のカウントダウン
    enemyInformation.interbal--; // 敵の生成間隔のカウントダウン
    Player.invincibilityTime--; // 無敵時間のカウントダウン
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

// ゲーム終了時の処理
function finishGame() {
    drawHPAndScore();
    ctx.textAlign="center";//
    ctx.font = '80px Roboto medium';
    ctx.fillStyle='green';
    ctx.fillText("GAMEOVER", 320, 280);//真ん中下が(320,280)
}