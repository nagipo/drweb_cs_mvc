//按鈕綁定ajax，請求成功後在sessionStorage存放登入資訊並跳轉頁面
document.getElementById("submit").addEventListener("click", function () {
    let data = {
        "account": document.getElementById("account").value,
        "password": document.getElementById("password").value
    }
    
    $.ajax({
        type: "POST",
        url: "/login",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function (response) {
            if (response === 'login_success') {
                // 在這裡處理登入成功的情況
                
                sessionStorage.setItem("account",data.account);
                window.location.href="/main";
            } else {
                // 登入失敗
                alert('帳號或密碼錯誤');
            }
        },
        error: function (xhr, status, error) {
            // 請求失敗
            console.error('請求失敗:', error);
        }
    });
})