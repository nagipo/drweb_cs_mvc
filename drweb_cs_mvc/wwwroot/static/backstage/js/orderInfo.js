//-------------------------------------------------------------------------------顯示訂單
var globalOrderDetails;//全域變數

function updateOrderDetailsForm(orderDetails) {
	$('#EditOrderId').val(orderDetails.order.id);
	$('#EditOrderTime').val(moment(orderDetails.order.orderDate).add(8, 'hours').format('YYYY-MM-DD HH:mm'));
	console.log(orderDetails.order.orderDate)
	if (orderDetails.order.orderState == "已成立") {
		$('#EditOrderState').val(orderDetails.order.orderState);
		$('#EditOrdersPaymentStatus').val("已付款");
		
		
	} else {
		$('#EditOrderState').val("尚未處理");
		$('#EditOrdersPaymentStatus').val("尚未付款");
		
	}
	$('#EditOrdersName').val(orderDetails.order.member.name);
	$('#EditOrdersPhone').val(orderDetails.order.member.phone);
	$('#EditOrdersMail').val(orderDetails.order.member.mail);
	$('#EditOrdersRecipientName').val(orderDetails.order.receiverName);
	$('#EditOrdersRecipientPhone').val(orderDetails.order.receiverPhone);
	$('#EditOrdersRecipientMail').val(orderDetails.order.receiverMail);
	$('#EditOrdersRecipientAddress').val(orderDetails.order.receiverAddress);
	$('#EditOrdersPayment').val(orderDetails.order.paymentMethod);
	//$('#EditOrdersPaymentStatus').val(orderDetails.orderState);
	$('#EditOrdersShipment').val(orderDetails.order.shipMethod);
	$('#EditOrdersShipmentStatus').val(orderDetails.order.shipState);
	// 清空訂單詳情表格並填充新數據
	var detailsTableBody = $('#EditOrdersTable tbody');
	detailsTableBody.empty()
	var totalQuantity = 0;
	var totalPrice = 0;
	//				處理訂單細節
	var orderDetailsList = orderDetails.details;

	orderDetailsList.forEach(function(detail, index) {
		var row = `<tr>
                    <td>#${index + 1}</td>
                    <td>${detail.product.id}</td>
                    <td><img src="${detail.product.picjson}" alt="${detail.product.name}" style="width: 50px; height: 50px;"></td>
                    <td>${detail.product.name}</td>
                    
                    <td>${detail.quantity}</td>
                    <td>${detail.price}</td>
                    <td>${detail.amount/detail.quantity}</td>
                </tr>`;
		detailsTableBody.append(row);
		totalQuantity += detail.quantity;
		totalPrice += detail.amount;
	});

	// 更新tfoot的總計
	var tfoot = $('#EditOrdersTable tfoot tr');
	tfoot.find('td:eq(1)').text(`總品項: ${orderDetails.details.length}`);
	tfoot.find('td:eq(2)').text(`總件數: ${totalQuantity}`);
	tfoot.find('td:eq(3)').text(`總金額: ${totalPrice}`);
}



function queryAllOrderInfo(choosepage) {
	$("#upload").off("click");
	$("#upload").on("click", function() {
		//修改方法
		EditOrderSetting();

	})
	var trlist;
	var page = choosepage;
	//移除多次事件綁定
	$("#prepage").off("click");
	$("#nextpage").off("click");

	$("#prepage").on("click", function() {
		queryAllOrderInfo(page - 1);
	});
	$("#nextpage").on("click", function() {
		queryAllOrderInfo(page + 1);
	});
	fetch('/findAllOrder', { method: 'POST' })
		.then(response => response.json())
		.then(orders => {
			trlist = orders;
			var allpage = trlist.length == 0 ? 1 : trlist.length;
			if (page + 1 > (allpage % 5 == 0 ? Math.floor(allpage / 5) : Math.floor(allpage / 5) + 1)) {			//判斷是否超出頁數
				queryAllOrderInfo(page - 1);
			} else if (page + 1 < 1) {
				queryAllOrderInfo(page + 1);
			} else { query(allpage) }

		})
		.catch(error => console.error('Error fetching order data:', error))

	function query(allpage) {

		$("#bodyContext").empty();
		if (allpage % 5 == 0) {
			$("#page").html(`${page + 1}/${Math.floor(allpage / 5)}`)
		}
		else { $("#page").html(`${page + 1}/${Math.floor(allpage / 5) + 1}`) }


		for (i = page * 5; i < (page + 1) * 5; i++) {

			console.log(trlist[i])
			var oorder = i + 1;

			var ocode = trlist[i].id;
			var odate = moment(trlist[i].orderDate).add(8, 'hours').format('YYYY-MM-DD HH:mm');			//利用moment.js Date
			var osituation = trlist[i].orderState;
			var oname = trlist[i].member.name;
			var omail = trlist[i].member.mail;
			var omount = trlist[i].amount;
			var opayment = "ecpay";

			$("#bodyContext").append(`
    <tr style="height:80px;">
        <td scope="row">#${oorder}</td>
        <td>${ocode}</td>
        <td>${odate}</td>
        <td class="tdColor">${osituation}</td>
        <td>${oname}</td>
        <td>${omail}</td>
        <td>${omount}</td>
        <td>${opayment}</td>
        <td>
            <a href="#" class="btn btn-light edit-button" data-id="${ocode}"><img src="/backstage/icon/revise.png" style="width: 15px;"></a>
        </td>
    </tr>

    `);
		}
	}
	$("#bodyContext").off("click", ".edit-button");
	//亨+ 超連結裡面的屬性   edit-button 
	$("#bodyContext").on("click", ".edit-button", function() {
		var orderId = $(this).data("id");
		$("#orderSetting").trigger("click");

		$.ajax({
			url: `/Edit/orders/${orderId}/fullDetails`,
			method: 'GET',
			success: function(orderDetails) {
				console.log("成功了", orderDetails); // 顯示從後端回傳的資訊
				globalOrderDetails = orderDetails; // 保存訂單
				updateOrderDetailsForm(orderDetails)//方法執行

			},
			error: function(error) {
				console.error('Error fetching order details:', error);
			}
		});
	});
}



//先解除綁定再榜定(當返回編輯訂單時保留資料)
$("#orderSetting").off("click").on("click", function() {
	if (globalOrderDetails) {
		setTimeout(function() {
			console.log("方法成了", globalOrderDetails); // 顯示從後端回傳的資訊
			updateOrderDetailsForm(globalOrderDetails)//方法執行
		}, 100); // 等0.1秒
	}
});






//亨+的 修改方法
function EditOrderSetting() {
	function collectOrderUpdateData() {
		return {
			name: $("#EditOrdersName").val(),
			phone: $("#EditOrdersPhone").val(),
			mail: $("#EditOrdersMail").val(),
			orderState: $('#EditOrderState').val(),
			paymentMethod: $('#EditOrdersPayment').val(),
			receiverName: $('#EditOrdersRecipientName').val(),
			receiverPhone: $('#EditOrdersRecipientPhone').val(),
			receiverMail: $('#EditOrdersRecipientMail').val(),
			receiverAddress: $('#EditOrdersRecipientAddress').val(),
			shipMethod: $('#EditOrdersShipment').val(),
			shipState: $('#EditOrdersShipmentStatus').val()
			// 可根據需要添加其他欄位
		};
	}

	function updateOrder(orderId, updatedData) {
		$.ajax({
			url: `/Edit/orders/updateOrder/${orderId}`,
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(updatedData),
			success: function(response) {
				console.log("更新成功: ", response);
				// 可以在這裡添加後續處理邏輯
			},
			error: function(error) {
				console.error("更新失敗: ", error);
			}
		});
	}

	var orderId = $('#EditOrderId').val(); // 訂單ID
	if (!orderId) {
		console.error("訂單ID未设置");
		return;
	}

	var updatedData = collectOrderUpdateData();
	updateOrder(orderId, updatedData);
}
