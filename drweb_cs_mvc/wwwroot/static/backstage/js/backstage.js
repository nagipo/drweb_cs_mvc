//左側功能列JSP滑鼠觸碰變顏色
// 按下後變藍字
$(".nav-link").on("click", function () {

    let nav_text = document.getElementsByClassName("nav-link")
    for (i = 0; i < nav_text.length; i++) {
        nav_text[i].style.color = ""
    }

    this.style.color = '#0074d9'
})

$("#btnGp .btn").on("click", function () {

    let btn = document.getElementsByClassName("sideBtn")
    let btnimg = $(".sideBtn img")

    for (i = 0; i < btn.length; i++) {
        btnimg[i].src = btnimg[i].src.replace("_blue.png", ".png")
        btn[i].style.borderColor = "";
        btn[i].style.borderWidth = "";
        btn[i].style.color = ""
    }

    this.getElementsByTagName("img")[0].src = this.getElementsByTagName("img")[0].src.replace(".png", "_blue.png")
    this.style.color = " #0074d9"
    this.style.borderColor = " #0074d9"
    this.style.borderWidth = "4px"
    //border-color: #0074d9;
    //border-width: 4px;
})



// 載入畫面時預設 
$(document).ready(function () {
  
  // 點擊菜單事件並切換顯示上面清單
  // 隱藏所有元素方法
  function hideAll() {
    $('#Nav_ShopInfo, #Nav_OrderInfo, #Nav_ActionInfo, #Nav_MemberInfo,#Nav_ProductInfo').css('display', 'none');
  }
  // 菜單設定按鈕事件
  $("#buttonShop").click(function () {
    
    $("#shopInfo").click();
    hideAll();
    $("#Nav_ShopInfo").css("display", "flex");
  });

  $("#buttonProduct").click(function(){
    $("#productInfo").click();
    hideAll();
    $("#Nav_ProductInfo").css("display", "flex");
  })
  
  $("#buttonOrder").click(function () {
    $("#orderInfo").click();
    hideAll();
    $("#Nav_OrderInfo").css("display", "flex");
  });
  $("#buttonAction").click(function () {
    $("#activityInfo").click();
    hideAll();
    $("#Nav_ActionInfo").css("display", "flex");
  });
  $("#buttonMember").click(function () {
    $("#memberInfo").click();
    hideAll();
    $("#Nav_MemberInfo").css("display", "flex");
  });

  $("#buttonShop").click();
  //$("#shopInfo").click();
})

$("#upload").on("click", function () {
    $("#upTxt").html("儲存成功");

})



$("#formSpace").on("click", function () {
    $("#upTxt").html("儲存資訊")//點表單時
})


// 點選按鈕轉換網站僅限同層
function goto(x) {
  window.location.href = x +'.html'; // 將這裡的URL替換為您要導航到的頁面地址
}

