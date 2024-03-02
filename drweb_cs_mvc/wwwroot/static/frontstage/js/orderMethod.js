// 購物車畫面顯示
$(document).ready(function () {

    // 更新購物車顯示和總計
    function updateCartDisplayAndTotal() {
        var shipPrice = 60;
        
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
                row.append($('<div class="col-2 d-flex align-items-center"></div>').append("-"));
                row.append($('<div class="col-2 d-flex align-items-center" </div>').text(totaldiscountPrice)); // 這裡應該計算總計
                $('.shopping-cart').append(row);
            });

             // 計算並添加總計行到 cart-body
            var totalSum = cart.reduce(function (sum, item) {
                return sum + (item.discountprice * item.quantity);
            }, 0);

            // 創建總計行
            var totalRow = $('<div class="row cart-box rounded total-price"></div>');
            // 添加五個空白列
            for (var i = 0; i < 4; i++) {
                totalRow.append($('<div class="col-2"></div>'));
            }
            totalRow.append($('<div class="col-2"></div>').text(shipPrice));
            // 添加包含總計價格的列
            totalRow.append($('<div class="col-2" id="totalPrice"></div>').text(totalSum+shipPrice));

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
            window.location.href = '/shoppingCart';
        }
    });

    $('.add-to-cart').click(function (e) {
				e.preventDefault();
				$('#successAddToCartModal').modal('show');
			});
			
	

});
