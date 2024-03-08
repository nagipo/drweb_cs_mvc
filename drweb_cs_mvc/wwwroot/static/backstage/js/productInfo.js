//	每次進到介面的時候就查詢所有資料出來
function ProductInfoqueryAll(choosepage) {
	$("#productSetting").off("click");


	var trlist;
	var page = choosepage;

	//移除多次事件綁定
	$("#prepage").off("click");
	$("#nextpage").off("click");

	$("#prepage").on("click", function() {
		ProductInfoqueryAll(page - 1);
	});
	$("#nextpage").on("click", function() {
		ProductInfoqueryAll(page + 1);
	});

	// 使用JavaScript發送HTTP POST請求獲取產品資料
	fetch('/queryProduct', {
		method: 'POST',
		body: "shop01"
	})
		.then(response => response.json())
		.then(products => {
			trlist = products;
			var allpage = trlist.length == 0 ? 1 : trlist.length;

			if (page + 1 > (allpage % 5 == 0 ? Math.floor(allpage / 5) : Math.floor(allpage / 5) + 1)) {			//判斷是否超出頁數
				ProductInfoqueryAll(page - 1);
			} else if (page + 1 < 1) {
				ProductInfoqueryAll(page + 1);
			} else { firstquery(allpage) }

		})
		.catch(error => console.error('Error fetching product data:', error))

	//	把查出來的資料append到畫面中
	function firstquery(allpage) {
		$("#bodyContext").empty();
		if (allpage % 5 == 0) {
			$("#page").html(`${page + 1}/${Math.floor(allpage / 5)}`)
		}
		else { $("#page").html(`${page + 1}/${Math.floor(allpage / 5) + 1}`) }

		for (i = page * 5; i < (page + 1) * 5; i++) {
			var porder = i + 1;
			var pcode = trlist[i].id;
			var pimg = trlist[i].picjson;
			var pname = trlist[i].name;
			var pprice = trlist[i].price;
			var pstock = trlist[i].stock;
			var discontinued = trlist[i].discontinued;

			$("#bodyContext").append(`
		        <tr style="height:80px;">
		            <td scope="row">#${porder}</td>
		            <td>${pcode}</td>
		            <td><img src="${pimg}" style="width: 70px; height: 50px;"></td>
		            <td>${pname}</td>            
		            <td>${pprice}</td>
		            <td>${pstock}</td>
		            <td>
		            <div class="switch">
		                <input class="switch-checkbox" id="switchID${i}" type="checkbox" name="switch-checkbox" ${discontinued==1 ? 'checked=true' : ''}">
		                <label class="switch-label" for="switchID${i}">
		                    <span class="switch-txt" turnOn="已上架" turnOff="未上架"></span>
		                    <span class="switch-Round-btn"></span>
		                </label>
		            </div>
		            </td>
		
		            <td>
		                <a href="#" class="btn btn-light editBtn" data-id="${pcode}"><img src="/backstage/icon/revise.png" style="width: 15px;"></a>
		            </td>
		        </tr>
		    `);
			//只拿掉按鈕，原本的方法都沒有刪掉；<a href="#" class="btn btn-light removeBtn" data-id="${pcode}"><img src="../icon/btn_remove.png" style="width: 15px;"></a>

			//修改商品GET
			$("#bodyContext").off("click", ".editBtn");
			$("#bodyContext").on("click", ".editBtn", function() {
				
				let productId = $(this).data("id");
				editPage(productId);
				$('#editProductID').prop('readonly', true);
				$("#upload").off("click");
				$("#upload").on("click", function() {
					editProduct();
				})
				$.ajax({
					url: `/products/${productId}`,
					method: 'GET',
					success: function(productDatas) {
						console.log("成功了", productDatas);
						// 從資料庫抓商品資料

						$('#editProductID').val(productDatas.product.id);
						$('#editProductName').val(productDatas.product.name);
						$('#editProductQuantity').val(productDatas.product.stock);
						$('#editProductShelves').val(productDatas.product.shelves);
						$('#editProductPrice').val(productDatas.product.price);
						$('#editProductCost').val(productDatas.product.cost);
						$('#editProductIntro').val(productDatas.product.discription);

						// 清空圖片預覽區域
						$("#editProductImgs").empty();

						// 遍歷每個圖片資料
						for (let i = 0; i < 10; i++) {
							// 構造圖片預覽的HTML
							let pictextKey = 'pictext_' + i;
							let imageData = productDatas.product[pictextKey];

							if (imageData) {
								// 創建預覽區域
								let previewDiv = document.createElement('div');
								previewDiv.className = 'previewM';

								// 創建圖片
								let img = new Image();
								img.src = imageData;
								previewDiv.appendChild(img);

								// 創建刪除按鈕
								let deleteButton = document.createElement('button');
								deleteButton.className = 'deleteButton';
								deleteButton.innerHTML = 'X';
								deleteButton.onclick = function(event) {
									event.stopPropagation();
									previewDiv.parentNode.removeChild(previewDiv);
									showPlaceholderText(dropArea, originalContent);
								};

								previewDiv.appendChild(deleteButton);

								// 將圖片預覽加入到 editProductImgs 區域
								$("#editProductImgs").append(previewDiv);
							}
						}

					},
					error: function(error) {
						console.error('Error products:', error);
					}

				})

				function editPage(productId) {
					$("#formSpace").load("static/backstage/html/" + "productSetting" + ".html #formSpace>*", () => {
						document.getElementById("editProductID").value = productId

					})
				}
			});

			//刪除商品GET
			$("#bodyContext").off("click", ".removeBtn");
			$("#bodyContext").on("click", ".removeBtn", function() {
				let productId = $(this).data("id");
				deleteProduct(productId)
			});


			//更新商品上架狀態的處理事件
			$("#bodyContext").off("click", ".switch-checkbox");
			$("#bodyContext").on("click", ".switch-checkbox", function() {
				let productId = trlist[$(this).attr('id').replace('switchID', '')].id;
				let isChecked = $(this).prop("checked");
				let status = isChecked ? '已上架' : '未上架';
				console.log(`商品ID: ${productId}, 現在狀態: ${status}`);

				// 發送 AJAX POST 請求更新商品的 discontinued 狀態
				$.ajax({
					url: `api/updateDiscontinued/${productId}`,
					method: 'POST',
					contentType: 'application/json',
					data: JSON.stringify({ discontinued: isChecked ? 1 : 0 }),
					success: function(response) {
						// 請根據實際情況處理成功後的操作
						console.log(`商品ID: ${productId} 的 discontinued 狀態已更新為: ${isChecked ? '已上架' : '未上架'}`);
					},
					error: function(error) {
						console.error("更新 discontinued 狀態失敗: ", error);
					}
				});
			});


		}
	}

	//刪除商品POST
	function deleteProduct(productId) {
		console.log("要刪除的商品UD" + productId);

		// 返回Promise對象
		return new Promise(function(resolve, reject) {
			$.ajax({
				url: `/delProduct/${productId}`,
				method: 'POST',
				contentType: 'application/json',
				success: function(response) {
					alert("商品刪除成功");
					console.log("刪除成功: ", response);
					resolve(response);  // 成功時呼叫resolve
					$("#buttonProduct").trigger("click");
				},
				error: function(error) {
					console.error("刪除失敗: ", error);
					console.error("伺服器端錯誤:", error.responseText);
					alert("此商品有綁活動，無法刪除");
					reject(error);  // 失敗時呼叫reject
				}
			});
		});
	}

	//修改商品POST
	function editProduct() {

		//	判斷錯誤跳錯誤訊息
		if ($("#editProductID").val() === "") {
			alert("請填寫商品編號");
			return;
		}
		if ($("#editProductName").val() === "") {
			alert("請填寫商品名稱");
			return;
		}
		var quantity = parseInt($('#editProductQuantity').val());
		if (isNaN(quantity) || quantity < 0) {
			alert("庫存數量應為非負整數");
			return;
		}
		var shelves = parseInt($('#editProductShelves').val());
		if (isNaN(shelves) || shelves < 0) {
			alert("上架數量應為非負整數");
			return;
		}
		var price = parseFloat($('#editProductPrice').val());
		if (isNaN(price) || price <= 0) {
			alert("販售價格應為有效且大於零的數字");
			return;
		}
		var cost = parseFloat($('#editProductCost').val());
		if (isNaN(cost) || cost <= 0) {
			alert("成本價格應為有效且大於零的數字");
			return;
		}

		var productIdPOST = $('#editProductID').val();
		var updatedData = productUpdateData();
		console.log("畫面上的商品ID:" + productIdPOST);
		console.log("要更新的所有畫面上的商品資訊:" + updatedData);
		updateProduct(productIdPOST, updatedData);

		//抓畫面上的資料

		function productUpdateData() {
			// 使用一個空對象來存放圖片數據
			var imagesData = {};

			// 獲取 editProductImgs 區域的子元素，即上傳的圖片預覽區域
			var imagePreviews = document.getElementById("editProductImgs").children;

			// 遍歷每個圖片預覽區域，將其 base64 編碼的數據存入對應的 pictext 字段
			for (var i = 0; i < imagePreviews.length; i++) {
				var imagePreview = imagePreviews[i];
				var base64Data = getImageBase64Data(imagePreview);
				imagesData['pictext_' + i] = base64Data;
			}

			// 其餘商品數據
			var otherProductData = {
				picjson: imagesData['pictext_0'],
				id: $("#editProductID").val(),
				name: $("#editProductName").val(),
				stock: $('#editProductQuantity').val(),
				shelves: $('#editProductShelves').val(),
				price: $('#editProductPrice').val(),
				cost: $('#editProductCost').val(),
				discription: $('#editProductIntro').val()
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

		//更新資料
		function updateProduct(productIdPOST, updatedData) {
			if (isNaN(updatedData.price) || isNaN(updatedData.stock) || isNaN(updatedData.shelves) || isNaN(updatedData.cost)) {
				alert("商品庫存、上架數量、價格及成本請填入數字")
				return
			}
			if (updatedData.stock < updatedData.shelves) {
				alert("上架數量不可高於商品庫存")
				return
			}
			$.ajax({
				url: `api/updateProduct_api`,
				method: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(updatedData),
				success: function(response) {
					alert("商品資料更新成功");
					console.log("更新成功: ", response);
					$("#buttonProduct").trigger("click");
				},
				error: function(error) {
					console.error("更新失敗: ", error);
				}
			});
		}



	}
}