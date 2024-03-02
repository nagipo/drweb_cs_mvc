function ActivityInfoqueryAll(choosepage) {
	$("#upload").off("click");

	var trlist;
	var page = choosepage;
	//移除多次事件綁定
	$("#prepage").off("click");
	$("#nextpage").off("click");

	$("#prepage").on("click", function() {
		ActivityInfoqueryAll(page - 1);
	});
	$("#nextpage").on("click", function() {
		ActivityInfoqueryAll(page + 1);
	});


	// 使用JavaScript發送HTTP POST請求獲取產品資料
	fetch('/queryActivitys', {
		method: "POST",
		body: "shop01"
	})
		.then(response => response.json())
		.then(data => {
			console.log('Data from server:', data);
			trlist = data;

			var allpage = trlist.length == 0 ? 1 : trlist.length;

			if (page + 1 > (allpage % 5 == 0 ? Math.floor(allpage / 5) : Math.floor(allpage / 5) + 1)) {			//判斷是否超出頁數
				ActivityInfoqueryAll(page - 1);
			} else if (page + 1 < 1) {
				ActivityInfoqueryAll(page + 1);
			} else { firstquery(allpage) }


		})
		.catch(error => console.error('Error fetching activity data:', error))


	function firstquery(allpage) {

		$("#bodyContext").empty();
		if (allpage % 5 == 0) {
			$("#page").html(`${page + 1}/${Math.floor(allpage / 5)}`)
		}
		else { $("#page").html(`${page + 1}/${Math.floor(allpage / 5) + 1}`) }

		for (let i = page * 5; i < (page + 1) * 5; i++) {


			var aid = trlist[i].id;
			var aorder = i + 1;
			var aname = trlist[i].name;
			var astartdate = moment(trlist[i].startDate).format('YYYY-MM-DD');
			var aenddate = moment(trlist[i].endDate).format('YYYY-MM-DD');
			var amethod = trlist[i].method;


			$("#bodyContext").append(`
        <tr style="height:80px;">
            <td scope="row">#${aorder}</td>
            <td>${aname}</td>
            <td>${astartdate} ~ ${aenddate}</td>
            <td>${amethod}</td>
            <td>
        		<a href="#"  class="btn btn-light editactivity" onclick="getActivity('${aid}')"><img src="/backstage/icon/revise.png" style="width: 15px;"></a>
        		<a href="#" class="btn btn-light delactivity" onclick="deleteActivity('${aid}',${aorder})"><img src="/backstage/icon/cancel.png" style="width: 15px;">刪除</a>
      		</td>
			</tr>
    		`);


		}

	}


}


function deleteActivity(activityId, i) {
	var acorder = i;
	var confirmation = window.confirm("確定要刪除第"+ acorder + "筆活動嗎？");
    if (confirmation) {
    
	fetch('/delActivity/' + activityId,  {
		method: 'POST'
	})
		.then(response => response.toString())
		.then(data => {
			console.log('刪除成功');
			$("#activityInfo").trigger("click");

		})
		.catch(error => {
			console.error('Error:', error);
		});
} else {
        console.log("取消刪除操作");
    }
}

function getActivity(id) {
	sessionStorage.setItem('activityid', id);
	var retrievedValue = sessionStorage.getItem('activityid');
		console.log(retrievedValue);
		$("#actionSetting").trigger("click");
}


