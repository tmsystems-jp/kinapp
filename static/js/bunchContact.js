
 /// 各optionのテキストとvalue値の配列
 const classList = [
  { text: '全員', value: 0 },
  { text: '年長', value: 1 },
  { text: '年中', value: 2 },
  { text: '年少', value: 3 },
  { text: 'ぞう組', value: 4 },
  { text: 'いぬ組', value: 5 },
  { text: 'りす組', value: 6 },
]

const infoLists= [
  { '区分': '緊急(休校)', 'タイトル': '〇〇のため休校します' },
  { '区分': 'お知らせ', 'タイトル': '明日の予定について' },
  { '区分': 'お知らせ', 'タイトル': 'XX日の終園時刻について' },
  { '区分': '園での生活', 'タイトル': '今週の活動報告' },
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

  // TABLEの値設定
    var table = document.getElementById('infoList');

    // ヘッダを作成
    var tr = document.createElement('tr');

    for (key in infoLists[0]) {
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
    for (var i = 0; i < infoLists.length; i++) {
      // tr要素を生成
      var tr = document.createElement('tr');
      // th・td部分のループ
      for (key in infoLists[i]) {
        // td要素を生成
        var td = document.createElement('td');
        // td要素内にテキストを追加
        td.textContent = infoLists[i][key];
        // td要素をtr要素の子要素に追加
        tr.appendChild(td);
      }
      // tr要素をtable要素の子要素に追加
      table.appendChild(tr);
    }
}

function classChange(){


}