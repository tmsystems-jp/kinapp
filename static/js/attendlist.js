
 /// 各optionのテキストとvalue値の配列
 const classList = [
  { text: 'ぞう組', value: 0 },
  { text: 'いぬ組', value: 1 },
  { text: 'りす組', value: 2 },
]

const childLists= [[
  { '名前': 'うさた', '出欠': '', '登退園時刻':'' , 'コメント':'' },
  { '名前': 'うさっち', '出欠': '早退', '登退園時刻':'13:00' , 'コメント':'' },
  { '名前': 'チューた', '出欠': '', '登退園時刻':'' , 'コメント':'' },
  { '名前': 'りすみ', '出欠': '', '登退園時刻':'' , 'コメント':'' },
  { '名前': 'めーすけ', '出欠': '遅刻', '登退園時刻':'10:30' , 'コメント':'' },
],
[
  { '名前': '亀吉', '出欠': '', '登退園時刻':'' , 'コメント':'' },
  { '名前': '亀之助', '出欠': '欠席', '登退園時刻':'' , 'コメント':'かぜのため' },
  { '名前': 'ポンタ', '出欠': '', '登退園時刻':'' , 'コメント':'' },
  { '名前': 'ワン助', '出欠': '遅刻', '登退園時刻':'11:30' , 'コメント':'' },
],
[
  { '名前': 'ぞう太郎', '出欠': '', '登退園時刻':'' , 'コメント':'' },
  { '名前': 'にゃんた', '出欠': '早退', '登退園時刻':'13:00' , 'コメント':'' },
  { '名前': 'チュー吉', '出欠': '', '登退園時刻':'' , 'コメント':'' },
  { '名前': 'ワニ子', '出欠': '', '登退園時刻':'' , 'コメント':'' },
  { '名前': 'コアラん', '出欠': '欠席', '登退園時刻':'' , 'コメント':'おうちの用事' },
  { '名前': 'コンタ', '出欠': '', '登退園時刻':'' , 'コメント':'' },
],
]

function loadList(){
  /// jQueryによるセレクトボックス初期化
  let selectClassList = document.getElementById('classList');

  document.createElement('option')
  for(let i = 0; i < classList.length; i++){
    const selectClass = classList[i];
    let option = document.createElement('option');
    option.setAttribute('value', selectClass.value);
    option.innerHTML = selectClass.text;
    selectClassList.appendChild(option);
  };

  const str = document.getElementById("classList").value;

  // TABLEの値設定
    var table = document.getElementById('childList');

    // ヘッダを作成
    var tr = document.createElement('tr');
    var list = childLists[str];

    for (key in list[0]) {
          // th要素を生成
          var th = document.createElement('th');
          // th要素内にテキストを追加
          th.textContent = key;
          // th要素をtr要素の子要素に追加
          tr.appendChild(th);
          }
      // tr要素をtable要素の子要素に追加
      table.appendChild(tr);

    // テーブル本体を作成
    for (var i = 0; i < list.length; i++) {
      // tr要素を生成
      var tr = document.createElement('tr');
      // th・td部分のループ
      for (key in list[0]) {
            // td要素を生成
            var td = document.createElement('td');
            // td要素内にテキストを追加
            td.textContent = list[i][key];
            // td要素をtr要素の子要素に追加
            tr.appendChild(td);
          }
      // tr要素をtable要素の子要素に追加
      table.appendChild(tr);
      }
}

function classChange(){

  var table = document.getElementById("childList");

  // データ行削除
  while( table.rows[ 1 ] ){
    table.deleteRow( 1 );
  } 

  const str = document.getElementById("classList").value;
  var list = childLists[str];

  // テーブル本体を作成
    for (var i = 0; i < list.length; i++) {
      // tr要素を生成
      var tr = document.createElement('tr');
      // th・td部分のループ
      for (key in list[0]) {
            // td要素を生成
            var td = document.createElement('td');
            // td要素内にテキストを追加
            td.textContent = list[i][key];
            // td要素をtr要素の子要素に追加
            tr.appendChild(td);
          }
      // tr要素をtable要素の子要素に追加
      table.appendChild(tr);
      }
}