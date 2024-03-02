function chart() {

	var today = new Date();
	var formattedDate = today.toISOString();
	$.ajax({
		url: `/dayRevenue`,
		method: 'POST',
		contentType: 'application/json',
		data: formattedDate,
		success: function(response) {
			$("#todayRevenue").text("$" + response.todayRevenue);
			$("#monthRevenue").text("$" + response.monthRevenue);
			$("#ordersQuantity").text(response.ordersQuantity + "筆");
			$("#membersQuantity").text(response.membersQuantity + "人");

		},
		error: function(error) {
			console.error("更新失敗: ", error);
		}
	});

	$.ajax({
		url: `/bestsell`,
		method: 'POST',
		success: function(response) {
			drawBar(response);
			console.log(response)
			response.forEach(productData => {
				productName = productData[0];
				totalQuantitySold = productData[1]
				$("#tbody").append(`
    					<tr>
                      <td>${productName}</td>
                      <td>${totalQuantitySold}</td>
                      
                    </tr>
    				`)
			})
		},
		error: function(error) {
			console.error("更新失敗: ", error);
		}
	});

	$.ajax({
		url: `/lastFewMonthRevenue`,
		method: 'POST',
		contentType: 'application/json',
		data: formattedDate,
		success: function(response) {
			console.log(response)
			revenueLine(response)

		},
		error: function(error) {
			console.error("更新失敗: ", error);
		}
	});




	// 商品銷售-重直圖//
	function drawBar(bestsellData) {
		const ctx = document.getElementById('pdtSalesRank');
		const psrLabels = [bestsellData[0][0], bestsellData[1][0], bestsellData[2][0]];  // 设置 X 轴上对应的标签
		const psrData = {
			labels: psrLabels,
			datasets: [{
				label: '銷售數量',
				data: [bestsellData[0][1], bestsellData[1][1], bestsellData[2][1]],
				backgroundColor: [      // 设置每个柱形图的背景颜色
					'rgba(54, 108, 241, 0.3)',
					'rgba(136, 170, 255, 0.3)',
					'rgba(211, 224, 255, 0.3)'
				],
				borderColor: [     //设置每个柱形图边框线条颜色
					'rgba(54, 108, 241, 1)',
					'rgba(136, 170, 255, 1)',
					'rgba(211, 224, 255, 1)'
				],
				borderWidth: 1     // 设置线条宽度
			}]
		};
		const psrConfig = {
			type: 'bar', // 设置图表类型
			data: psrData,  // 设置数据集
			options: {
				scales: {
					y: {
						beginAtZero: true // 设置 y 轴从 0 开始
					}
				}
			},
		};
		const pdtSalesRank = new Chart(ctx, psrConfig);
	}

	function revenueLine(response) {
		var revenueData=[];
		var dateData=[];
		for (const key in response) {
			if (response.hasOwnProperty(key)) {
				revenueData.unshift(response[key])
				dateData.unshift(key)
				const value = response[key];
				console.log(`Key: ${key}, Value: ${value}`);
			}
		}
		// 營收圖表-折線圖//
		const revenueCtx = document.getElementById('revenueReport');
		const revenueLabels = dateData;  // 设置 X 轴上对应的标签
		const revenuedata = {
			labels: revenueLabels,
			datasets: [{
				label: '每月營收',
				data: revenueData,
				fill: true,
				borderColor: 'rgba(54, 108, 241, 1)', // 设置线的颜色
				backgroundColor: 'rgba(54, 108, 241, 0.2)',
				tension: 0.1
			}]
		};
		const revenueConfig = {
			type: 'line', // 设置图表类型
			data: revenuedata,
		};
		const revenueReport = new Chart(revenueCtx, revenueConfig);
	}

	// 客流圖表-折線圖//
	const passengerFlowCtx = document.getElementById('passengerFlowReport');
	const passengerFlowLabels = ['23/09', '23/10', '23/11', '23/12', '23/01', '23/02'];  // 设置 X 轴上对应的标签
	const passengerFlowdata = {
		labels: passengerFlowLabels,
		datasets: [
			{
				label: '今日客流',
				data: [25, 3, 17, 24, 43, 55],
				fill: false,
				borderColor: 'rgba(54, 108, 241, 1)', // 设置线的颜色
				tension: 0.1
			},
			{
				label: '昨日客流',
				data: [15, 22, 16, 37, 33, 42],
				fill: false,
				borderColor: 'rgba(255, 99, 132, 1)', // 设置第二條线的颜色
				tension: 0.1
			}
		]
	};
	const passengerFlowConfig = {
		type: 'line', // 设置图表类型
		data: passengerFlowdata,
	};
	const passengerFlowReport = new Chart(passengerFlowCtx, passengerFlowConfig);

	// 訂單圖表-出貨-圓餅圖
	const oSCtx = document.getElementById('orderShipChart');
	const oSData = {
		labels: [
			'已出貨',
			'未出貨'
		],
		datasets: [{
			label: '訂單量',
			data: [1, 10],
			backgroundColor: [
				'rgba(54, 108, 241, 1)',
				'rgba(200, 200, 200, 1)'
			],
			hoverOffset: 4
		}]
	};
	const oSConfig = {
		type: 'pie',
		data: oSData,
		options: {
			responsive: true, // 设置图表为响应式，根据屏幕窗口变化而变化
			maintainAspectRatio: false,// 保持图表原有比例
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	};
	const ordeShiprChart = new Chart(oSCtx, oSConfig);

	// 訂單圖表-付款-圓餅圖
	const oPCtx = document.getElementById('orderPaymentChart');
	const oPData = {
		labels: [
			'信用卡',
			'貨到付款'
		],
		datasets: [{
			label: '訂單量',
			data: [1, 10],
			backgroundColor: [
				'rgba(54, 108, 241, 1)',
				'rgba(200, 200, 200, 1)'
			],
			hoverOffset: 4
		}]
	};
	const oPConfig = {
		type: 'pie',
		data: oPData,
		options: {
			responsive: true, // 设置图表为响应式，根据屏幕窗口变化而变化
			maintainAspectRatio: false,// 保持图表原有比例
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	};
	const orderPaymentChart = new Chart(oPCtx, oPConfig);
}