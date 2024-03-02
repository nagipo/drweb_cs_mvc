function ActionSetting() {

	$("#upload").off("click");
	$("#upload").on("click", function() {
		editActivity();
	});

	//產生storeId資料
	var storedId = sessionStorage.getItem('activityid');
	fetch('/queryActivitys/' + storedId, {
		method: "GET"
	})
		.then(response => response.json())
		.then(data => {

			console.log('Data from server:', data);
			document.getElementById('activityName').value = data.activitys.name;
			document.getElementById('activityDiscription').value = data.activitys.discription;

			var startDate = moment(data.activitys.startDate).format('YYYY-MM-DD');
			document.getElementById('activityStartDate').value = startDate;
			var endDate = moment(data.activitys.endDate).format('YYYY-MM-DD');
			document.getElementById('activityEndDate').value = endDate;

			//判斷優惠主軸
			var activitymethod = data.activitys.method;
			if (activitymethod === "免運活動") {
				document.getElementById("freeshippingRadio").checked = true;
			} else if (activitymethod === "商品折扣") {
				document.getElementById("discountRadio").checked = true;
			}

			var dsradiocheck = document.getElementById("discountRadio").checked;

			if (dsradiocheck) {
				$('#sourceTable').off('click', '.moveItem');
				$('#sourceTable').on('click', '.moveItem', function() {
					var thisItem = $(this).closest('.moveItemMain'); // 獲取當下取得的項目
					var itemName = $(this).siblings('.itemName').text();
					var itemImageSrc = $(this).siblings('img').prop('src');
					var itemPdid = $(this).siblings('[data-pdid]').attr('data-pdid');


					var newRow = $('<div class=" moveItemMain rounded" style=" display:flex; align-items:center; margin-top: 10px;  margin-left: 20px; background: white; width: 320px; height: 48px;"><img style="margin-left: 5px; margin-top: 4px; background-color: #d9d9d9; width: 40px; height: 40px;" src="' + itemImageSrc + '" data-pdid="' + itemPdid + '"alt=""><span class="itemName" style="margin-left: 20px; margin-right:auto; font-size: 16px;">' + itemName + '</span><img class="backItem" style="margin-right: 20px;  width: 32px; height: 28px;" src="backstage/icon/goLeft.png" alt="">');
					$("#targetTable").append(newRow);
					thisItem.remove();
				});
				$('#targetTable').off('click', '.backItem');
				$('#targetTable').on('click', '.backItem', function() {
					var thisItem = $(this).closest('.moveItemMain');
					var itemName = $(this).siblings('.itemName').text();
					var itemImageSrc = $(this).siblings('img').prop('src');
					var itemPdid = $(this).siblings('[data-pdid]').attr('data-pdid');

					var newRow = $('<div class=" moveItemMain rounded" style="display:flex; align-items:center; margin-top: 10px;  margin-left: 20px; background: white; width: 320px; height: 48px;"><img style="margin-left: 5px; margin-top: 4px; background-color: #d9d9d9; width: 40px; height: 40px;" src="' + itemImageSrc + '" data-pdid="' + itemPdid + '" alt=""><span class="itemName" style="margin-left: 20px; margin-right:auto; font-size: 16px;">' + itemName + '</span><img class="moveItem" style="margin-right: 20px;  width: 32px; height: 28px;" src="backstage/icon/goRight.png" alt="">');
					$("#sourceTable").append(newRow);
					thisItem.remove();

				});

			}


			if (data.activitys.freeShipping != 0) {
				document.getElementById('activityFreeShipping').value = data.activitys.freeShipping;
			} else if (data.activitys.freeShipping = 0) {
				document.getElementById('activityFreeShipping').value = "";
			}

			if (data.activitydetailsList[0].discount != null) {
				document.getElementById('activityDiscount').value = (data.activitydetailsList[0].discount)*100;
			} else {
				document.getElementById('activityDiscount').value = "";
			}


			//折扣產品列表
			$("#targetTable").empty();
			for (let i = 0; i < data.activitydetailsList.length; i++) {


				var aid = data.activitydetailsList[i].products.id;
				var aname = data.activitydetailsList[i].products.name;
				var apic = data.activitydetailsList[i].products.picjson;

				$("#targetTable").append(`
	    
				<tr>
				  <td>
					<div class="rounded moveItemMain"
					  style=" display:flex; align-items:center; margin-top: 10px;  margin-left: 20px; background: white; width: 320px; height: 48px;"><img
						style="margin-left: 5px; margin-top: 4px; background-color: #d9d9d9; width: 40px; height: 40px;"
						src="${apic}" data-pdid="${aid}" alt=""><span class="itemName"
						style="margin-left: 20px; margin-right:auto; font-size: 16px;">${aname}</span><img class="backItem"
						style="margin-right: 20px;  width: 32px; height: 28px;" src="backstage/icon/goLeft.png" alt=""> </div>
				  </td>
				</tr>
			    
			`);

			}


		})

		.catch(error => console.error('Error fetching activity data:', error))


	//產生商品列表
	fetch('/findProducts', {
		method: "POST",
		body: "shop01"
	})
		.then(response => response.json())
		.then(data => {
			console.log('Product Data from server:', data);
			trlist = data;

			$("#sourceTable").empty();
			for (let i = 0; i < trlist.length; i++) {


				var aid = trlist[i].id;
				var aname = trlist[i].name;
				var apic = trlist[i].picjson;

				$("#sourceTable").append(`
        
        		<tr>
                  <td>
                    <div class="rounded moveItemMain"
                      style="display:flex; align-items:center; margin-top: 10px;  margin-left: 20px; background: white; width: 320px; height: 48px;"><img
                        style="margin-left: 5px; margin-top: 4px; background-color: #d9d9d9; width: 40px; height: 40px;"
                        src="${apic}" data-pdid="${aid}" alt=""><span class="itemName"
                        style="margin-left: 20px; margin-right:auto; font-size: 16px;">${aname}</span><img class="moveItem"
                        style="margin-right: 20px;  width: 32px; height: 28px;" src="backstage/icon/goRight.png" alt=""> </div>
                        
                  </td>
                </tr>
                
    		`);


			}



		})
		.catch(error => console.error('Error fetching activity data:', error))

	//優惠主軸判斷
	var fsradio = document.getElementById('freeshippingRadio');
	var fscontent = document.getElementById('activityFreeShipping');
	var dsradio = document.getElementById('discountRadio');
	var dscontent = document.getElementById('activityDiscount');


	fsradio.addEventListener('change', function() {
		if (fsradio.checked) {
			dscontent.value = "";
			$('#sourceTable').off('click', '.moveItem');
			$('#targetTable').off('click', '.backItem');
		}
	})
	dsradio.addEventListener('change', function() {
		if (dsradio.checked) {
			fscontent.value = "";
			$('#sourceTable').off('click', '.moveItem');

			$('#sourceTable').on('click', '.moveItem', function() {
				var thisItem = $(this).closest('.moveItemMain'); // 獲取當下取得的項目
				var itemName = $(this).siblings('.itemName').text();
				var itemImageSrc = $(this).siblings('img').prop('src');
				var itemPdid = $(this).siblings('[data-pdid]').attr('data-pdid');


				//創新的一排html(div格子)變數
				var newRow = $('<div class=" moveItemMain rounded" style=" display:flex; align-items:center; margin-top: 10px;  margin-left: 20px; background: white; width: 320px; height: 48px;"><img style="margin-left: 5px; margin-top: 4px; background-color: #d9d9d9; width: 40px; height: 40px;" src="' + itemImageSrc + '" data-pdid="' + itemPdid + '"alt=""><span class="itemName" style="margin-left: 20px; margin-right:auto; font-size: 16px;">' + itemName + '</span><img class="backItem" style="margin-right: 20px;  width: 32px; height: 28px;" src="backstage/icon/goLeft.png" alt="">');
				// 把這排變數移過去另一個表格
				$("#targetTable").append(newRow);
				thisItem.remove();
			});
			$('#targetTable').off('click', '.backItem');
			$('#targetTable').on('click', '.backItem', function() {
				var thisItem = $(this).closest('.moveItemMain');//獲取當下取得的項目
				var itemName = $(this).siblings('.itemName').text();
				var itemImageSrc = $(this).siblings('img').prop('src');
				var itemPdid = $(this).siblings('[data-pdid]').attr('data-pdid');
				//創新的一排html(div格子)變數
				var newRow = $('<div class=" moveItemMain rounded" style="display:flex; align-items:center; margin-top: 10px;  margin-left: 20px; background: white; width: 320px; height: 48px;"><img style="margin-left: 5px; margin-top: 4px; background-color: #d9d9d9; width: 40px; height: 40px;" src="' + itemImageSrc + '" data-pdid="' + itemPdid + '" alt=""><span class="itemName" style="margin-left: 20px; margin-right:auto; font-size: 16px;">' + itemName + '</span><img class="moveItem" style="margin-right: 20px;  width: 32px; height: 28px;" src="backstage/icon/goRight.png" alt="">');
				// 把這排變數移過去另一個表格
				$("#sourceTable").append(newRow);
				thisItem.remove();

			});

		}

	})


}



//儲存
function editActivity() {

	var storedId = sessionStorage.getItem('activityid');
	var activityName = document.getElementById('activityName').value;
	var activityDiscription = document.getElementById('activityDiscription').value;

	var activityStartDate = document.getElementById('activityStartDate').value;
	var startDate = moment(activityStartDate).format('YYYY-MM-DD');
	var activityEndDate = document.getElementById('activityEndDate').value;
	var endDate = moment(activityEndDate).format('YYYY-MM-DD');

	if (activityStartDate > activityEndDate) {
		alert("結束日期要在開始日期之後");
		return;
	}
	if (activityName.trim() === "") {
		alert("請填活動名稱");
		return;
	}

	var activityFreeShipping = document.getElementById('activityFreeShipping').value;
	var acdiscount = document.getElementById('activityDiscount').value;
	var activityDiscount = acdiscount / 100;
	if (acdiscount > 100 || acdiscount < 1) {
		alert("折扣數請在1到99之間");
		return;
	}

	//抓折扣產品id的陣列
	var elementsWithDataPdid = document.querySelectorAll('#targetTable [data-pdid]');
	var pdidArray = Array.from(elementsWithDataPdid).map(function(element) {
		return element.getAttribute('data-pdid');
	});
	
	if (pdidArray.length === 0){
		alert("請選擇需折扣商品");
		return;
	}

	//判斷優惠主軸
	var fsradio = document.getElementById('freeshippingRadio');
	var fscontent = document.getElementById('activityFreeShipping');
	var dsradio = document.getElementById('discountRadio');
	var dscontent = document.getElementById('activityDiscount');
	if (endDate == "Invalid date" || startDate == "Invalid date") {
		alert("請填寫日期")
	}

	if (fsradio.checked) {
		if (fscontent.value.trim() === "") {
			alert("請輸入免運門檻!");
			return;
		} else if (dscontent.value !== "") {
			alert('請勿輸入商品折扣!');
			return;
		} else if (pdidArray.length > 0) {
			alert('請勿選擇折扣商品!');
			return;
		}
	} else if (dsradio.checked) {
		if (dscontent.value.trim() === "") {
			alert("請輸入商品折數!");
			return;
		} else if (fscontent.value !== "") {
			alert('請勿輸入免運門檻!');
			return;
		}
	}

	var radioButtons = document.getElementsByName('discount');
	function getSelectedValue() {
		for (var i = 0; i < radioButtons.length; i++) {
			if (radioButtons[i].checked) {
				return radioButtons[i].value;
			}
		}
		// 如果沒有任何單選按鈕被選擇，返回空字符串或其他適當的默認值
		return '';
	}
	var activityMethod = getSelectedValue();


	var datatosave = {
		activitys: {
			id: storedId,
			shopId: "shop01",
			name: activityName,
			method: activityMethod,
			startDate: startDate,
			endDate: endDate,
			discription: activityDiscription,
			freeShipping: activityFreeShipping
		},

		activitydetailsList: []
	};

	var productIds = pdidArray;
	for (var i = 0; i < productIds.length; i++) {
		var productId = productIds[i];

		var activityDetails = {
			activitys: {
				id: storedId
			},
			products: {
				id: productId
			},
			discount: activityDiscount
		};

		datatosave.activitydetailsList.push(activityDetails);
	}

	console.log(datatosave);

	fetch('/updateActivity/' + storedId, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(datatosave)
	})
		.then(response => {
			if (!response.ok) {
				throw new Error(`Network response was not ok: ${response.status}`);
			}
			return response.text();
		})
		.then(message => {
			console.log(message);
			sessionStorage.removeItem('activityid');
			$("#activityInfo").trigger("click");

		})
		.catch(error => {
			console.error('Error editing activity:', error);
		})

}

