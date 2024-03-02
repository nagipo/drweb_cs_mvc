$(document).ready(function() {
	$("#navSignout").click(() => {
		localStorage.clear();
		$.ajax({
			url: '/shop/logout',
			method: 'POST',
			success: function(response) {
				location.reload()
				alert("已登出")
			},
			error: function() {
				console.log("err")
			}
		})
	})
})