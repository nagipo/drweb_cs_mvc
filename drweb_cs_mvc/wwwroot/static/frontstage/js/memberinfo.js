$(document).ready(function () {getMemberinfo()})



function getMemberinfo(){
	 $.ajax({
                type: 'POST',
                url: '/getMemberInfo',
                contentType: 'application/json; charset=UTF-8',
                data: memberId,
                success: function (response) {
                    // 处理成功的响应
					$('#memberName').val(response.name)
					$('#memberEmail').val(response.mail)
					$('#memberPhone').val(response.phone)
					$('#memberAddress').val(response.address)
                    console.log(response);
                },
                error: function (error) {
                    // 处理错误响应

                    console.error(error);
                }
            });
     
}
document.addEventListener('DOMContentLoaded', function () {
   // 獲取複選框元素
   var checkbox = document.getElementById('sameAsorder');

   // 為複選框添加點擊事件監聽器
   checkbox.addEventListener('change', function () {
    if (this.checked) {
     // 如果複選框被選中，複製訂購人資訊到收件人資訊
     document.getElementById('orderName').value = document.getElementById('memberName').value;
     document.getElementById('orderEmail').value = document.getElementById('memberEmail').value;
     document.getElementById('orderPhone').value = document.getElementById('memberPhone').value;
     document.getElementById('orderAddress').value = document.getElementById('memberAddress').value;
    } else {
     // 如果複選框未被選中，清空收件人資訊
     document.getElementById('orderName').value = '';
     document.getElementById('orderEmail').value = '';
     document.getElementById('orderPhone').value = '';
     document.getElementById('orderAddress').value = '';
    }
   });
  });
  
function saveinfo() {
   var orderName = $('#orderName').val();
   var orderEmail = $('#orderEmail').val();
   var orderPhone = $('#orderPhone').val();
   var orderAddress = $('#orderAddress').val();

   console.log($('#orderName').val())
   var data = { orderName: orderName, orderEmail: orderEmail, orderPhone: orderPhone, orderAddress: orderAddress };
   localStorage.setItem('orderinfo', JSON.stringify(data));

   // 防止表單提交
   event.preventDefault();

   // 獲取各欄位的值
   var name = document.getElementById('orderName').value;
   var email = document.getElementById('orderEmail').value;
   var phone = document.getElementById('orderPhone').value;
   var address = document.getElementById('orderAddress').value;

   // 檢查欄位是否為空
   if (!name || !email || !phone || !address) {
    // 如果有空欄位，顯示警告對話框
    alert('請填寫所有必填資料！');
    return false;
   }else{
	   window.location.href="/shop/"+shopId+"/confirmOrder";
   }

   // 如果所有欄位都已填寫，可以在這裡執行後續操作
   // 例如提交表單或其他處理

   return true;
  }
  