// 新增商品的js
let a;
function addProduct() {
	$("#upload").off("click");
	$("#upload").on("click", function() {
		uploadData();
		clearArray();
	});
}

// 上傳圖片
function imgArray(uploadedFilesArray) {
	console.log("addProductUploadedFilesArray---" + uploadedFilesArray);
	var imagesData = {};
		imagesData['pictext_' + 0] = uploadedFilesArray[0];	
	a = imagesData;
}

function uploadData() {
	var productIdPOST = $('#addProductID').val();
	var newProductData = catchProductData();
	let base64ImgArray = a;
	console.log(newProductData);
	newProductData.picjson = base64ImgArray['pictext_0'];
	
	var productData = { ...newProductData, ...base64ImgArray };
	addNewProduct(productIdPOST, productData);
}

// 抓資料
function catchProductData() {
	//	判斷錯誤跳錯誤訊息
	if ($("#addProductID").val() === "") {
		alert("請填寫商品編號");
		return;
	}
	if ($("#addProductName").val() === "") {
		alert("請填寫商品名稱");
		return;
	}
	var quantity = parseInt($('#addProductQuantity').val());
	if (isNaN(quantity) || quantity < 0) {
		alert("庫存數量應為非負整數");
		return;
	}
	var shelves = parseInt($('#addProductShelves').val());
	if (isNaN(shelves) || shelves < 0) {
		alert("上架數量應為非負整數");
		return;
	}
	var price = parseFloat($('#addProductPrice').val());
	if (isNaN(price) || price <= 0) {
		alert("販售價格應為有效且大於零的數字");
		return;
	}
	var cost = parseFloat($('#addProductCost').val());
	if (isNaN(cost) || cost <= 0) {
		alert("成本價格應為有效且大於零的數字");
		return;
	}

	// 使用一個空對象來存放圖片數據
		var imagesData = {};

	// 獲取 addProductImgs 區域的子元素，即上傳的圖片預覽區域
		var imagePreviews = document.getElementById("addProductImgs").children;

	// 遍歷每個圖片預覽區域，將其 base64 編碼的數據存入對應的 pictext 字段
		for (var i = 1; i < imagePreviews.length; i++) {
			var imagePreview = imagePreviews[i];
			var base64Data = getImageBase64Data(imagePreview);
			imagesData['pictext_' + i] = base64Data;
			console.log("imagesData['pictext_' + i----]"+imagesData['pictext_' + i]);
		}

	// 其餘商品數據
	var otherProductData = {
		id: $("#addProductID").val(),
		name: $("#addProductName").val(),
		stock: $('#addProductQuantity').val(),
		shelves: $('#addProductShelves').val(),
		price: $('#addProductPrice').val(),
		cost: $('#addProductCost').val(),
		discription: $('#addProductIntro').val(),
		shopId: "shop01"
	};

	// 將圖片數據和其他商品數據合併
		var productData = { ...imagesData, ...otherProductData };

	return productData;
}

// 獲取圖片 base64 編碼的函數
function getImageBase64Data(imagePreview) {
	var image = imagePreview.querySelector('img');
	if (image) {
		var canvas = document.createElement('canvas');
		canvas.width = image.width;
		canvas.height = image.height;
		var context = canvas.getContext('2d');
		context.drawImage(image, 0, 0, image.width, image.height);
		return canvas.toDataURL('image/png');
	}
	return null;
}


// 更新資料
function addNewProduct(productIdPOST, newProductData) {
	if (isNaN(newProductData.price) || isNaN(newProductData.stock) || isNaN(newProductData.shelves) || isNaN(newProductData.cost)) {
		alert("商品庫存、上架數量、價格及成本請填入數字")
		return
	}
	if (newProductData.stock < newProductData.shelves) {
		alert("上架數量不可高於商品庫存")
		return
	}
	console.log(JSON.stringify(newProductData))
	$.ajax({
		url: `api/addProduct_api`,
		method: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(newProductData),
		success: function(response) {
			alert("新增商品成功");
			console.log("新增商品成功: ", response);
			$("#buttonProduct").trigger("click");
		},
		error: function(error) {
			alert("新增商品失敗" + error);
			console.error("新增商品失敗: ", error);
		}
	});
}