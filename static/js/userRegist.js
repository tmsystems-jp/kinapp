function pageLoad() {
  document.getElementsByName("birthday")[0].setAttribute("value", "2021-01-01");
  const busList = [
    { name: "ウサギコース", value: "usagi", checked: "true" },
    { name: "クマコース", value: "kuma", checked: "false" },
    { name: "パンダコース", value: "panda", checked: "false" },
    { name: "ライオンコース", value: "raion", checked: "false" },
    { name: "クジラコース", value: "kuzira", checked: "false" }
  ];
  const familyList = [
    ["うさパパ", "父", "H01/01/01", "アニマル株式会社", ""],
    ["ウサママ", "母", "H02/02/02", "", ""],
    ["うさミニ", "妹", "R01/10/10", "", ""]
  ];
  const growList = [
    ["記録日", "身長", "体重"],
    ["2020/05/15", "100cm", "15kg"],
    ["2020/10/20", "100.5cm", "14.2kg"],
    ["2021/02/01", "102cm", "16.5kg"]
  ];
  var bEs = document.getElementById("bus");
  for (var i = 0; i < busList.length; i++) {
    var content = busList[i];
    var iEs = document.createElement("input");
    iEs.type = "radio";
    iEs.name = "busroot";
    iEs.value = content.value;
    iEs.id = content.value;
    if (content.checked == "true") {
      iEs.checked = true;
    }
    var lEs = document.createElement("label");
    lEs.id = content.value;
    lEs.innerHTML = content.name;
    lEs.prepend(iEs);
    bEs.appendChild(lEs);
  }
  var fEs = document.getElementById("familyList").getElementsByTagName("dd")[0];
  for (var i = 0; i < familyList.length; i++) {
    var dEs = document.createElement("div");
    var content = familyList[i];
    for (var is = 0; is < content.length; is++) {
      var sEs = document.createElement("span");
      sEs.innerHTML = content[is];
      dEs.appendChild(sEs);
    }
    fEs.appendChild(dEs);
  }
  var pList = prefecturesList();
  var spEs = document.getElementsByName("ken")[0];
  for (var i = 0; i < pList.length; i++) {
    var oEs = document.createElement("option");
    oEs.value = pList[i].code;
    oEs.innerHTML = pList[i].name;
    spEs.appendChild(oEs);
  }
  //   // TABLEの値設定
  //   var table = document.createElement('table');
  //   // tr部分のループ
  //   for (var i = 0; i < familyList.length; i++) {
  //   // tr要素を生成
  //   var tr = document.createElement('tr');
  //   var content = familyList[i];
  //  // th・td部分のループ
  //   for (var j = 0; j < 5; j++) {
  //       // 1行目のtr要素の時
  //       if(i === 0) {
  //           // th要素を生成
  //           var th = document.createElement('th');
  //           // th要素内にテキストを追加
  //           th.textContent = content[j];
  //           // th要素をtr要素の子要素に追加
  //           tr.appendChild(th);
  //       } else {
  //           // td要素を生成
  //           var td = document.createElement('td');
  //           // td要素内にテキストを追加
  //           td.textContent = content[j];
  //           // td要素をtr要素の子要素に追加
  //           tr.appendChild(td);
  //       }
  //   }
  //   // tr要素をtable要素の子要素に追加
  //   table.appendChild(tr);
  //   }
  //   // 生成したtable要素を追加する
  //   document.getElementById('familyList').appendChild(table);
}
