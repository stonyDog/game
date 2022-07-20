const stage = document.getElementById("stage");
const squareTemplate = document.getElementById("square-template");
const form = document.getElementById('addForm');

const stoneStateList = [];

const currentTurnText = document.getElementById("current-turn");

//css読み込み用
const css=document.createElement("link");
css.setAttribute("rel","stylesheet");
css.setAttribute("href","style.css");

//ボードサイズ
var boardSize;

// Form submit event
form.addEventListener('submit', addItem);

// Add item
function addItem(e){
    e.preventDefault();
    
    // Get input value
    boardSize = document.getElementById('number1').value;
    const winNumber = document.getElementById('number2').value;
    const whoFirst = document.getElementById('whoFirst').value;
    console.log(boardSize);
    console.log(winNumber);
    console.log(whoFirst);

    //不正値制約
    if(boardSize == '' || winNumber== '' || boardSize<winNumber){
        alert('設定値が不正です。ゲームを開始できません。');
        return 0;
    }
    //ボード削除
    deleteSquares();
    //cssの更新
    updateCSS();
    //ボード作成
    createSquares();

} 

//現在のターン
let currentColor = 1;

//createSquaresの上に、関数を新しく作る
const onClickSquare = (index) => {
    console.log(index);
    
    //勝敗判定
    checkStone();
    
    //他の石がある場合は置けないメッセージを出す
    if (stoneStateList[index] !== 0 ) {
        alert("ここには置けないよ！");
        return;
    }
    //自分の石を置く
    stoneStateList[index] = currentColor;
    //html上の石データを更新する
    document
    .querySelector(`[data-index='${index}']`)
    .setAttribute("data-state", currentColor);

    //勝敗判定
    if(checkStone(index,currentColor)==1){
        alert("おわり");
        return;
    }

    //ゲーム続行なら相手のターンにする
    currentColor = 3 - currentColor;
    if (currentColor === 1) {
        currentTurnText.textContent = "黒";
    } else {
        currentTurnText.textContent = "白";
    }
}

//現在の石のチェック
const checkStone = (index,currentColor) => {

    //チェック方向の単位
    const directVector = [1, boardSize+1, boardSize, boardSize-1];

    //8方向への走査のためのfor文
    for (let i = 0; i < 4; i++) {
        //連続する石の数をカウント
        let stoneCount = 1;
        
        //directVector方向の探索
        let checkStoneNumber = index + directVector[i];
        //if(0<=checkStoneNumber || checkStoneNumber<boardSize*boardSize){
        while(stoneStateList[checkStoneNumber]==currentColor){
            checkStoneNumber+=directVector[i];
            stoneCount++;    
        }
        //directVector逆方向の探索
        checkStoneNumber = index - directVector[i];
        while(stoneStateList[checkStoneNumber]==currentColor){
            checkStoneNumber-=directVector[i];
            stoneCount++;
        }
        //石が規定数以上連続
        if(stoneCount>=winNumber){
            //return 1;
        }
    }
    return 0;
};

//css更新
const updateCSS = () => {
    //ボードの最大幅変更
    const boardSizePx = 50*boardSize + 'px';
    console.log(boardSizePx);
    document.documentElement.style.setProperty('--boardSizePx',boardSizePx);

    //cssの更新
    document.getElementsByTagName("head")[0].appendChild(css);
};
//ボード削除
const deleteSquares = () => {
    while(stage.firstChild){
        stage.removeChild(stage.firstChild)
    }
};
//ボード作成
const createSquares = () => {
    for (let i = 0; i < boardSize*boardSize; i++) {
        const square = squareTemplate.cloneNode(true); //テンプレートから要素をクローン
        square.removeAttribute("id"); //テンプレート用のid属性を削除
        stage.appendChild(square); //マス目のHTML要素を盤に追加
    
        const stone = square.querySelector('.stone');
        stone.setAttribute("data-state", 0);
        stone.setAttribute("data-index", i); //インデックス番号をHTML要素に保持させる
        stoneStateList.push(0); //初期値を配列に格納

        square.addEventListener('click', () => {
            onClickSquare(i);
        })
    }
};
