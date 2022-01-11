"use strict";

// 0. HTML結構設計
// 1. 新增
var inputText = document.querySelector("#inputText");
var addBtn = document.querySelector("#addBtn");
var todoData = [];
addBtn.addEventListener("click", addTodo);

function addTodo() {
  var todo = {
    //txt 用來裝輸入資料用的
    txt: inputText.value,
    //id 用來做資料操作的，例如 刪除、切換狀態
    id: new Date().getTime(),
    //用來判別已完成或是待完成的功能
    checked: ''
  };

  if (todo !== "") {
    todoData.unshift(todo); // console.log(todoData) - 檢查自料是否有成功放入陣列裡

    inputText.value = "";
  } // render(todoData)


  updateList();
}

; // 2. 渲染

var todoList = document.querySelector("#todoList");

function render(arr) {
  var str = "";
  arr.forEach(function (item) {
    str += "\n    <li data-id=\"".concat(item.id, "\">\n            <label class=\"checkbox\" for=\"\">\n              <input type=\"checkbox\" ").concat(item.checked, "/>\n              <span>").concat(item.txt, "</span>\n            </label>\n            <a href=\"#\" class=\"delete\"></a>\n          </li>");
  });
  todoList.innerHTML = str;
} // 3. tab active 切換 （CSS樣式）


var tab = document.querySelector("#tab");
tab.addEventListener("click", changeTab);
var toggleStatus = "all"; // data-tab = all 全部狀態，也就是目前tab顯示狀態

function changeTab(e) {
  //根據點到的data而去做切換toggleStatus
  // 也可以這樣寫，toggleStatus = e.target.dataset.tab
  toggleStatus = e.target.getAttribute("data-tab");
  var tabs = document.querySelectorAll("#tab li");
  tabs.forEach(function (item) {
    item.classList.remove("active");
  }); //active加在點到的位置

  e.target.classList.add("active");
  updateList();
}

; // 4. 刪除 ＆ 切換 checked 狀態功能

todoList.addEventListener("click", deleteAndChecked); //要做刪除切換都要先get到id

function deleteAndChecked(e) {
  //離點到部分，最靠近的li，並取得這個距離最近li裡的id值
  var id = e.target.closest("li").dataset.id; //這個id的值是由`new Date().getTime()`產出

  console.log(id);

  if (e.target.getAttribute("class") === "delete") {
    // 由於delete是 a 標籤，我們先它的預設取消
    e.preventDefault();
    todoData = todoData.filter(function (item) {
      return item.id != id;
    }); // console.log(todoData);
    //篩選條件： todoData裡的 id 不能等於 點到的id，那就留下，因為符合篩選條件
    //篩選的條件 為 `item.id ! == id`，只要 `item.id == id`，就會被過濾（刪除)，只留下 `item.id ! == id`
    //我們點到的東西是 i.id == id (被點到的，並被覆值的) ，就等於是被過濾掉（刪除了）
  } else {
    //來做切換checked狀態功能
    todoData.forEach(function (item, index) {
      //if (item.id === id) 是為了要取到index的值 (艾拉版)
      // specificity -如果沒有下面這段if (item.id === id)，只要勾選一個，其他也一並被同步勾選，就無法特別指定到底是哪一個需要被checked 還是 unchecked
      if (item.id == id) {
        //如果取得的index裡的checked 等於 checked的話
        // 也可以這樣寫: 
        //替換todoData[index].checked v.s. item.checked
        //if (todoData[index].checked == 'checked')
        if (item.checked === "checked") {
          //我們就把他的狀態拿掉，也就是無狀態的值
          item.checked = "";
          console.log(todoData);
        } else {
          //如果現在是沒有被checked，我們就幫它加上checked
          item.checked = "checked";
          console.log(todoData);
        }
      }
    });
  } // render(todoData);


  updateList();
}

; // 5. 更新代辦清單
// **（會與第三點 tab 切換，做合併動作）**

function updateList() {
  var showData = [];

  if (toggleStatus == "all") {
    showData = todoData;
  } else if (toggleStatus === "work") {
    //由於work裡面的事項是還沒有被打勾，所以裡面checked屬性會是空的
    showData = todoData.filter(function (item) {
      return item.checked === "";
    });
  } else {
    showData = todoData.filter(function (item) {
      return item.checked === "checked";
    });
  } //footer部分，顯示待完成項目，也在這裡同時一起完成


  var workNum = document.querySelector("#workNum");
  var todoLength = todoData.filter(function (item) {
    return item.checked === "";
  });
  workNum.textContent = todoLength.length;
  render(showData);
} //初始


updateList(); // 6. 刪除已完成 todo

var deleteBtn = document.querySelector('#deleteBtn');
deleteBtn.addEventListener("click", function (e) {
  e.preventDefault(); //篩選出 沒有checked的資料，並存留。

  todoData = todoData.filter(function (item) {
    item.checked !== "checked";
  });
  updateList();
}); // 7. 優化（keypress)
//可以用enter直接新增

inputText.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    // console.log(e)
    addTodo();
  }
});
//# sourceMappingURL=all.js.map
