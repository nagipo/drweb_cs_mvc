$(document).ready(function() {
	var orderinfo = JSON.parse(localStorage.getItem('orderinfo'));
	var payStorage = JSON.parse(localStorage.getItem('payStorage'));
	
	console.log(payStorage.payment)
	$('#payment').text(payStorage.payment);
	$('#shipMethod').text(payStorage.shippingMethod)
	$('#orderName').text(orderinfo.orderName)
	$('#orderEmail').text(orderinfo.orderEmail)
	$('#orderPhone').text(orderinfo.orderPhone)
	$('#orderAddress').text(orderinfo.orderAddress)
	console.log(auth);

})
var shipPrice=60;
function timeid() {									//時間戳記產生id
	var timestamp = new Date().getTime();
	var randomNum = Math.random().toString().slice(2, 8);
	return timestamp + randomNum;
}
function sendOrder() {
	
	var detail = {}
	var i = 0;
	var bigtaltalAmount = 0;
	var orderid = timeid();
	var cart = JSON.parse(localStorage.getItem('cart')) || [];
	var oderStorage = JSON.parse(localStorage.getItem('orderinfo'));
	var payStorage = JSON.parse(localStorage.getItem('payStorage'));
	localStorage.removeItem('orderinfo');
	localStorage.removeItem('payStorage');
	localStorage.removeItem('cart');
	if (cart.length > 0) {
		cart.forEach(function(item) {
			detail[`${i}`] = {
				productId: item.id,
				quantity: item.quantity,
				price: item.price,
				amount: item.discountprice * item.quantity,
				orderId: orderid

			}
			bigtaltalAmount += item.discountprice * item.quantity;
			console.log(detail[`${i}`])
			i += 1;
		});

	}
	var order = {
		id: orderid,
		memberId: memberId,
		shipMethod: payStorage.shippingMethod,
		receiverName: oderStorage.orderName,
		receiverPhone: oderStorage.orderPhone,
		receiverMail: oderStorage.orderEmail,
		receiverAddress: oderStorage.orderAddress,
		amount: bigtaltalAmount+shipPrice,
		orderDate: new Date(),
		shopId:shopId
	}

	var ecpayData = {
		itemName: "訂單",
		totalAmount: bigtaltalAmount+shipPrice,
		tradeTime: getTime(),
		orderId: orderid
	}


	async function getMemberAndPostOrder(order, detail, ecpayData) {
		try {
			// 取得會員資訊
			const memberResponse = await $.ajax({
				type: 'POST',
				url: "/getMember",
				contentType: 'application/json; charset=UTF-8',
				data: order.memberId
			});

			// 下單
			const orderResponse = await $.ajax({
				type: 'POST',
				url: "/postOrder",
				contentType: 'application/json; charset=UTF-8',
				data: JSON.stringify(order)
			});

			// 訂單詳細資訊
			const orderDetailResponse = await $.ajax({
				type: 'POST',
				url: "/orderdetail",
				contentType: 'application/json; charset=UTF-8',
				data: JSON.stringify(detail)
			});
			localStorage.setItem("shopId",shopId);
			
			localStorage.setItem("auth",JSON.stringify(auth));
			// 處理 ECPay
			ajax('/ecpayCheckout', JSON.stringify(ecpayData), 1);
		} catch (error) {
			// 處理錯誤
			console.log(error);
		}
	}

	// 使用方式
	getMemberAndPostOrder(order, detail, ecpayData);



}
function ajax(url, formData, ecpay) {
		$.ajax({
			type: 'POST',
			url: url,
			contentType: 'application/json; charset=UTF-8',
			data: formData,
			success: function (response) {
				if (ecpay == 1) {
					var newWindow = window.open("", "_self");
					
					newWindow.document.write(response);
					newWindow.document.close();
				}

			},
			error: function (error) {
				// 处理错误响应

				console.log(error)
			}
		});
		console.log(formData);
	}
	function getTime() {
		// 取得現在的日期時間
		var currentDate = new Date();

		// 取得年、月、日、時、分、秒
		var year = currentDate.getFullYear();
		var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // 月份從0開始，需要加1
		var day = ('0' + currentDate.getDate()).slice(-2);
		var hours = ('0' + currentDate.getHours()).slice(-2);
		var minutes = ('0' + currentDate.getMinutes()).slice(-2);
		var seconds = ('0' + currentDate.getSeconds()).slice(-2);

		// 格式化日期時間字串
		var formattedDateTime = year + '/' + month + '/' + day + ' ' + hours + ':' + minutes + ':' + seconds;

		return formattedDateTime;
	}