function createMember(){
		userData={
			mail: mail,
			name: $("#memberName").val(),
			phone: $("#phone").val(),
			address: $("#address").val(),
			shopId: shopId
		}
		$.ajax({
				url: "/insertMember",
				method: 'POST',
				contentType: 'application/json; charset=UTF-8',
				data:JSON.stringify(userData),
				success: function (response) {
					console.log(response)
					window.location.href="/shop/"+shopId+"/shopindex"
				},
				error: function (err) {
					console.log(err)
				}

			})
	}