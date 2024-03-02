// product頁面 + - 商品按鈕
$(function () {
    // This button will increment the value
    $('.qtyplus').click(function (e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('field');
        // Get its current value
        var currentVal = parseInt($('input[name=' + fieldName + ']').val());
        // If is not undefined
        if (!isNaN(currentVal)) {
            // Increment
            $('input[name=' + fieldName + ']').val(currentVal + 1);
        } else {
            // Otherwise put a 0 there
            $('input[name=' + fieldName + ']').val(0);
        }
    });
    // This button will decrement the value till 0
    $(".qtyminus").click(function (e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('field');
        // Get its current value
        var currentVal = parseInt($('input[name=' + fieldName + ']').val());
        // If it isn't undefined or its greater than 0
        if (!isNaN(currentVal) && currentVal > 0) {
            // Decrement one
            $('input[name=' + fieldName + ']').val(currentVal - 1);
        } else {
            // Otherwise put a 0 there
            $('input[name=' + fieldName + ']').val(0);
        }
    });
});

// 點擊"加入購物車"時，將商品信息保存到localStorage。
$(document).ready(function () {
	
	
    $('.add-to-cart').click(function (event) {
		console.log(logInorNot)
		if(logInorNot){
	        event.preventDefault();
			var id = $(this).data('id')
	        var name = $(this).data('name');
	        var price = $(this).data('price');
	        var image = $(this).data('image');
			var discountprice = $(this).data('discountprice');
	        var quantitySelector, quantity;
	
	        // 检查是否在模态窗口中
	        if ($(this).closest('.modal').length) {
	            // 如果是模态窗口，通过模态窗口的 ID 获取数量
	            var modalId = $(this).closest('.modal').attr('id');
	            quantitySelector = $('#' + modalId + ' .qty');
	        } else {
	            // 如果不是模态窗口，从较近的上级元素获取数量
	            quantitySelector = $(this).closest('.cart-full-quantity').find('.qty');
	        }
	
	        quantity = parseInt(quantitySelector.val()) || 1; // 如果获取的数量无效，则默认为 1
	
	        var product = {id:id, name: name, price: price, image: image, quantity: quantity, discountprice:discountprice };
	
	        var cart = JSON.parse(localStorage.getItem('cart')) || [];
	        var existingProductIndex = cart.findIndex(p => p.name === name);
	        if (existingProductIndex !== -1) {
	            cart[existingProductIndex].quantity += quantity;
	        } else {
	            cart.push(product);
	        }
	
	        localStorage.setItem('cart', JSON.stringify(cart));}
	        else{
				
				window.location.href="/shop/"+shopId+"/login"}
    });
});


// 購物車畫面顯示
$(document).ready(function () {

    // 更新購物車顯示和總計
    function updateCartDisplayAndTotal() {
        
        $('.cart-body').empty(); // 清空購物車顯示
        var cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length > 0) {
            cart.forEach(function (item) {
                 // 添加每個商品行到 cart-body
                var row = $('<div class="row cart-box rounded"></div>');
                row.append($('<div class="col-2 d-flex align-items-center"></div>').append($('<img>').attr('src', item.image).addClass('cart-img')).append($('<span>').text(item.name).addClass('inline-block product-name')));
                row.append($('<div class="col-2 d-flex align-items-center"></div>').text(item.quantity));
                var totalPrice = item.price * item.quantity;
                row.append($('<div class="col-2 d-flex align-items-center"></div>').text(item.price));
                var totaldiscountPrice = item.discountprice * item.quantity;
                row.append($('<div class="col-2 d-flex align-items-center"></div>').text(item.discountprice)); // 如果有折扣，應該這裡計算折扣後的價格
                row.append($('<div class="col-2 d-flex align-items-center"></div>').append($('<button class="delete-box" type="button"></button>').append($('<img>').attr('src', '/frontstage/icon/white/delete.png').addClass('delete-img'))));
                row.append($('<div class="col-2 d-flex align-items-center"></div>').text(totaldiscountPrice)); // 這裡應該計算總計
                $('.shopping-cart').append(row);
            });

             // 計算並添加總計行到 cart-body
            var totalSum = cart.reduce(function (sum, item) {
                return sum + (item.discountprice * item.quantity);
            }, 0);

            // 創建總計行
            var totalRow = $('<div class="row cart-box rounded total-price"></div>');
            // 添加五個空白列
            for (var i = 0; i < 5; i++) {
                totalRow.append($('<div class="col-2"></div>'));
            }
            // 添加包含總計價格的列
            totalRow.append($('<div class="col-2"></div>').text(totalSum));

            // 將總計行添加到購物車中
            $('.shopping-cart').append(totalRow);

        }else {
            // 購物車為空時顯示空購物車訊息
            var emptyCartHtml = `
                <div class="cart-body text-center rounded">
                    <img src="/frontstage/icon/grey/cart.png" alt="空購物車icon" class="product-cart">
                    <p class="mb-0" style="height: 8em; font-size: 1.5rem;">空購物車</p>
                </div>`;
            $('.cart-body').html(emptyCartHtml);
        }
    }
    // 初始化頁面
    updateCartDisplayAndTotal();
    
    // 刪除按鈕的事件處理器
    $(document).on('click', '.delete-box', function () {
        var productName = $(this).closest('.cart-box').find('.product-name').text();
        var cart = JSON.parse(localStorage.getItem('cart')) || [];

        // 只刪除該行對應的商品
        var newCart = cart.filter(item => item.name !== productName);
        localStorage.setItem('cart', JSON.stringify(newCart));
        
        // 直接移除該商品的 HTML 元素，不重新渲染整個購物車
        $(this).closest('.cart-box').remove();

        
        // 更新總計
        var totalSum = newCart.reduce(function (sum, item) {
        return sum + (item.discountprice * item.quantity);
        }, 0);
         $('.total-price').empty(); // 假設您有一個顯示總計的元素
         for (var i = 0; i < 5; i++) {
                $('.total-price').append($('<div class="col-2"></div>'));
            }
            // 添加包含總計價格的列
           $('.total-price').append($('<div class="col-2"></div>').text(totalSum));

         // 假設您有一個顯示總計的元素
        
        // 如果購物車為空，跳轉到空購物車頁面
        if (newCart.length === 0) {
            localStorage.removeItem("cart")
            window.location.reload()
        }
    });

    $('.add-to-cart').click(function (e) {
				e.preventDefault();
				$('#successAddToCartModal').modal('show');
			});
			
	

});

function clearLocalStorage(){
	localStorage.clear();
	 location.reload();
}
	
// $(document).ready(function () {
//     // 刪除按鈕的事件處理器
//     $(document).on('click', '.delete-box', function () {
//         var productName = $(this).closest('.cart-box').find('.product-name').text();
//         var cart = JSON.parse(localStorage.getItem('cart')) || [];

//         // 只刪除該行對應的商品
//         var newCart = cart.filter(item => item.name !== productName);
//         localStorage.setItem('cart', JSON.stringify(newCart));
        

//         // 移除該商品的HTML元素
//         $(this).closest('.cart-box').remove();

//         // 如果購物車為空，跳轉到空購物車頁面

//     });
// });






