const stage = document.getElementById("stage");
const squareTemplate = document.getElementById("square-template");
const form = document.getElementById('addForm');

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
    //既存ボード削除
    console.log(stage);
    while(stage.firstChild){
        stage.removeChild(stage.firstChild)
    }

    //ボードの最大幅変更
    const boardSizePx = 50*boardSize + 'px';
    console.log(boardSizePx);
    document.documentElement.style.setProperty('--boardSizePx',boardSizePx);

    //cssの更新
    document.getElementsByTagName("head")[0].appendChild(css);

    //ボード作成
    createSquares();


    // Create new li element
    var li = document.createElement('li');
    // Add class
    //li.className = 'list-group-item';
    // Add text node with input value
    //li.appendChild(document.createTextNode(newItem));
    // Create del button element
    //var deleteBtn = document.createElement('button');
    // Add classes to del button
    //deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    // Append text node
    //deleteBtn.appendChild(document.createTextNode('X'));
    // Append button to li
    //li.appendChild(deleteBtn);
    // Append li to list
    //itemList.appendChild(li);
} 
    
//createSquaresの上に、関数を新しく作る
const onClickSquare = (index) => {
    console.log(index);
}



const createSquares = () => {
  for (let i = 0; i < boardSize*boardSize; i++) {
    const square = squareTemplate.cloneNode(true); //テンプレートから要素をクローン
    square.removeAttribute("id"); //テンプレート用のid属性を削除
    stage.appendChild(square); //マス目のHTML要素を盤に追加
    
    //const stone = square.querySelector('.stone');

    //
    square.addEventListener('click', () => {
        onClickSquare(i);
    })
  }


};


/*window.onload = () => {
  createSquares();
};*/