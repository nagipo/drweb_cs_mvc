
$(document).ready(function() {
	$("#cardSpace").empty();
	queryProduct()
	

})

function queryProduct() {

	var productName;
	var id;
	var price;
	var pddiscount;
	var discountprice;
	var productslist;
	
	fetch('/queryProductdiscount', {
		method: 'POST',
		body: shopId
	})
		.then(response => response.json())
		.then(products => {
			productslist = products;
			console.log(productslist);
			showProduct(products.length)

		})
		.catch(error => console.error( error))

	function showProduct(length) {
		for (i = 0; i < length; i++) {
			oneproduct = productslist[i];
	
			id = oneproduct[0].id;
			pimg = oneproduct[0].picjson;
			productName = oneproduct[0].name;
			price = oneproduct[0].price;
			pddiscount = oneproduct[1];
			if (pddiscount!= null){
				discountp = pddiscount*price;
			}else{
				discountp=price;
			}
			
			discountprice = Math.floor(discountp);
			console.log(productslist[i]);
	
			var cardHTML = `<div class="col-md-3 rounded">
<a data-id="${id}" class="productPage">
    <div class="card mb-3 shopping01Card " style="border-color:#b9b8b8 ;">
        <div class="product-image">

            <img src="${pimg}" alt="商品圖片1" class="img-fluid rounded-top" style="cursor: pointer;">
            <a>
                <button href="#" type="button" class="shopping-cart-icon m-0 "
                    data-bs-toggle="modal" data-bs-target="#product${id}Modal">
                    <img src="/frontstage/icon/white/cart.png" alt="" class="shoppingProducticon">
                </button>
                <!-- modal-header標題：${productName} -->
                <div class="modal fade" id="product${id}Modal" tabindex="-1"
                    aria-labelledby="${id}ModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered"
                        style="display: flex;justify-content: center;">
                        <div class="modal-content w-75">
                            <div class="modal-header">
                                <h5 class="modal-title flex-grow-1 text-center m-2"
                                    id="${id}ModalLabel">${productName}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <!-- modal-body：價格及下拉選單 -->
                            <div class="modal-body cart-full-quantity">
                                <form id="myform" method="POST" action="#">
                                    <p class="card-text text-end product-price">${discountprice}</p>
                                    <select class="form-select qty qty-greentea"
                                        aria-label="Default select example" id="myform">
                                        
                                        <option value="1" selected>1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </form>
                            </div>
                            <!-- modal-footer：加入購物車、立即購買 -->
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-secondary add-to-cart"
                                    data-name="${productName}" data-price="${price}" data-id="${id}"
                                    data-image="/frontstage/product/新增資料夾/greentea-3.png"
                                    data-discountprice="${discountprice}" data-bs-dismiss="modal">加入購物車</button>
                                <button type="button" class="btn btn-secondary buy-it-now" data-name="${productName}" data-price="${price}" data-id="${id}"
                                    data-discountprice="${discountprice}" data-image="/frontstage/product/新增資料夾/greentea-3.png">立即購買</button>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        <div class="card-body shopping01Cardbody rounded-bottom">
            <h4 class="card-title">${productName}</h4>
            <p class="card-text product-price">$${price}</p>
            <p class="card-text">優惠價$${discountprice}</p>

        </div>
    </div>
</a>
</div>
`

			$("#cardSpace").append(cardHTML);



		}
	/*
	fetch('/frontqueryProduct', {
		method: 'POST',
		body: shopId
	})
		.then(response => response.json())
		.then(products => {
			productslist = products;
			console.log(productslist)
			showProduct(products.length)

		})
		.catch(error => console.error('Error fetching product data:', error))

	function showProduct(length) {
		for (i = 0; i < length; i++) {
			name = productslist[i].name
			id = productslist[i].id;
			pimg = productslist[i].picjson;
			productName = productslist[i].name;

			price = productslist[i].price;
			console.log(productslist[i])
			var cardHTML = `<div class="col-md-3 rounded">
<a data-id="${id}" class="productPage">
    <div class="card mb-3 shopping01Card " style="border-color:#b9b8b8 ;">
        <div class="product-image">

            <img src="${pimg}" alt="商品圖片1" class="img-fluid rounded-top" style="cursor: pointer;">
            <a>
                <button href="#" type="button" class="shopping-cart-icon m-0 "
                    data-bs-toggle="modal" data-bs-target="#product${id}Modal">
                    <img src="/frontstage/icon/white/cart.png" alt="" class="shoppingProducticon">
                </button>
                <!-- modal-header標題：${productName} -->
                <div class="modal fade" id="product${id}Modal" tabindex="-1"
                    aria-labelledby="${id}ModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered"
                        style="display: flex;justify-content: center;">
                        <div class="modal-content w-75">
                            <div class="modal-header">
                                <h5 class="modal-title flex-grow-1 text-center m-2"
                                    id="${id}ModalLabel">${productName}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <!-- modal-body：價格及下拉選單 -->
                            <div class="modal-body cart-full-quantity">
                                <form id="myform" method="POST" action="#">
                                    <p class="card-text text-end product-price">${price}</p>
                                    <select class="form-select qty qty-greentea w-100"
                                        aria-label="Default select example" id="myform">
                                        
                                        <option value="1" selected>1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </form>
                            </div>
                            <!-- modal-footer：加入購物車、立即購買 -->
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-secondary add-to-cart"
                                    data-name="${name}" data-price="${price}" data-id="${id}"
                                    data-image="/frontstage/product/新增資料夾/greentea-3.png"
                                    data-bs-dismiss="modal">加入購物車</button>
                                <button type="button" class="btn btn-secondary buy-it-now" data-name="${name}" data-price="${price}" data-id="${id}"
                                    data-image="/frontstage/product/新增資料夾/greentea-3.png">立即購買</button>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        <div class="card-body shopping01Cardbody rounded-bottom">
            <h4 class="card-title">${productName}</h4>
            <p class="card-text product-price">$${price}</p>

        </div>
    </div>
</a>
</div>
`

			$("#cardSpace").append(cardHTML);



		}

*/

		//綁定購物車事件
		$('.add-to-cart').off("click");
		$('.add-to-cart').click(function(event) {
			console.log("click")
			event.preventDefault();
			var id = $(this).data('id');
			var name = $(this).data('name');
			var price = $(this).data('price');
			var image = $(this).data('image');
			var discountprice = $(this).data('discountprice');

			var quantitySelector, quantity;
			console.log(logInorNot)
			if(logInorNot){
			
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
	
				var product = { id: id, name: name, price: price, image: image, quantity: quantity, discountprice:discountprice };
	
				var cart = JSON.parse(localStorage.getItem('cart')) || [];
				var existingProductIndex = cart.findIndex(p => p.name === name);
				if (existingProductIndex !== -1) {
					cart[existingProductIndex].quantity += quantity;
				} else {
					cart.push(product);
				}
	
				localStorage.setItem('cart', JSON.stringify(cart));}
			else{
				
				window.location.href="/shop/"+shopId+"/login"
			}
		});

		//提示視窗顯示
		$('.add-to-cart').click(function(e) {
			e.preventDefault();
			$('#successAddToCartModal').modal('show');
		});


		//商品業跳轉
		productPage()

		//立即購買
		$('.buy-it-now').click(function(event) {
			event.preventDefault();
			
			var productId = $(this).data('id');
			var name = $(this).data('name');
			var price = $(this).data('price');
			var image = $(this).data('image');
			var discountprice =  $(this).data('discountprice');

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

			var product = {id:productId, name: name, price: price, image: image, quantity: quantity, discountprice: discountprice };

			var cart = JSON.parse(localStorage.getItem('cart')) || [];
			var existingProductIndex = cart.findIndex(p => p.name === name);
			if (existingProductIndex !== -1) {
				cart[existingProductIndex].quantity += quantity;
			} else {
				cart.push(product);
			}

			localStorage.setItem('cart', JSON.stringify(cart));

			// 跳轉到 cart01 頁面
			window.location.href = "/shop/"+shopId+"/shoppingCart";
		});
	}
}


function productPage() {
	$('.productPage').click(function() {
		var productId = $(this).data('id');
		console.log(productId)
		location.href = `/shop/${shopId}/productPage?productId=${productId}`
		/*		$.ajax({
						type: 'GET',
						url: '/productPage',
						contentType: 'application/json; charset=UTF-8',
						data: productId,
						success: function (response) {
							// 处理成功的响应
							var newWindow = window.open("/productPage", "_self");
							newWindow.document.write(response);
							newWindow.document.close();
							console.log(response);
						},
						error: function (error) {
							// 处理错误响应
		
							console.error(error);
						}
					});*/
	}

	)

}




