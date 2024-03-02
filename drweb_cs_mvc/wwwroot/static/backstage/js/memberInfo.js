/*function MemberInfo(){
var trlist = [
	{ order: "#1", code: "25896314", m_name: "Brad_chao", m_mail: "Brad@gmail.com", amount: "9,994", count: "6點" },
	{ order: "#2", code: "25896314", m_name: "Amy0258", m_mail: "amy@gmail.com", amount: "9,999", count: "1點" },
	{ order: "#3", code: "25896314", m_name: "Tony11_11", m_mail: "tony@gmail.com", amount: "9,999", count: "1點" },
	{ order: "#4", code: "25896314", m_name: "Jenny39", m_mail: "jenny@gmail.com", amount: "9,999", count: "1點" },
	{ order: "#5", code: "25896314", m_name: "maRk_8", m_mail: "mark@gmail.com", amount: "9,999", count: "1點" },
	// { order: "#6", code: "25896314", m_name: "ivy", m_mail: "ivy@gmail.com", amount: "0", count: "0點" },
	// { order: "#7", code: "25896314", m_name: "jason_96", m_mail: "jsaon@gmail.com", amount: "0", count: "0點" },
	// { order: "#8", code: "25896314", m_name: "irene741", m_mail: "irene@gmail.com", amount: "0", count: "0點" }
  ]*/

//-------------------------------------------------------------後端抓資料

// 使用 JavaScript 發送 HTTP POST 請求獲取會員資料
// 使用 JavaScript 發送 HTTP POST 請求獲取會員資料
function MemberInfoqueryAll(choosepage) {
	var trlist;
	var page = choosepage;
	console.log(choosepage+"test")
	// 移除多次事件綁定
	$("#prepage").off("click");
	$("#nextpage").off("click");

	$("#prepage").on("click", function() {
		MemberInfoqueryAll(page - 1);
	});
	$("#nextpage").on("click", function() {
		MemberInfoqueryAll(page + 1);
	});

	// 使用 JavaScript 發送 HTTP POST 請求獲取包含總消費金額的會員資料
	fetch('/getAllMemberInfoWithTotalSpent', {
		method: 'POST',
	})
		.then(response => response.json())
		.then(data => {
			// 處理返回的數據，將 Object[] 轉換為會員物件，並附加總消費金額
			trlist = data.map(item => ({
				id: item[0].id, // 假設這是 Member 物件的id
				name: item[0].name, // 假設這是 Member 物件的name
				mail: item[0].mail, // 假設這是 Member 物件的mail
				totalSpent: item[1], // totalSpent 是單獨的一個值
				count: item[0].count,
			}));
			// 然後調用 displayMembers 來更新頁面
			displayMembers(page, trlist);
			
			var allpage = data.length === 0 ? 1 : data.length;
			console.log(allpage)
			if (page + 1 > (allpage % 5 === 0 ? Math.floor(allpage / 5) : Math.floor(allpage / 5) + 1)) {
				MemberInfoqueryAll(page - 1);
			} else if (page + 1 < 1) {
				MemberInfoqueryAll(page + 1);
			} else {
				displayMembers(page, trlist);
			}
		})
		.catch(error => console.error('Error:', error));

	// 定義顯示會員資料的函數
	function displayMembers(page, trlist) {
		$("#bodyContext").empty();
		var allpage = trlist.length === 0 ? 1 : trlist.length;

		if (allpage % 5 === 0) {
			$("#page").html(`${page + 1}/${Math.floor(allpage / 5)}`);
		} else {
			$("#page").html(`${page + 1}/${Math.floor(allpage / 5) + 1}`);
		}

		// 計算顯示的範圍
		var start = page * 5;
		var end = (page + 1) * 5;
		for (var i = start; i < end; i++) {
			if (i < trlist.length) {
				var morder = i + 1;
				var mcode = trlist[i].id; // 會員編號
				var mname = trlist[i].name; // 會員姓名
				var mmail = trlist[i].mail; // 會員郵件
				var mamount = trlist[i].totalSpent + '元'; // 會員總消費金額
				var mcount = trlist[i].count; // 會員消費次數

				// 動態添加會員資料至表格
				$("#bodyContext").append(`
                    <tr style="height:80px;">
                        <td scope="row">${morder}</td>
                        <td>${mcode}</td>
                        <td>${mname}</td>
                        <td>${mmail}</td>
                        <td>${mamount}</td>
                        <td>${mcount}</td>
                    </tr>
                `);
			}
		}
	}
}
