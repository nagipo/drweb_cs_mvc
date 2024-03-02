function readURL(input,whichImg) {
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
          if(whichImg==0){
            $("#logoPreview").attr('src', e.target.result);
          }else{
            $("#coverPreview").attr('src', e.target.result);
          }
          
        }
        reader.readAsDataURL(input.files[0]);
      }
    }

    function shopInfoEvent(){
		console.log("b")
		document.getElementById("logoUpdate").addEventListener("change", function () {
      
      if(event.target.files[0].size>5000000){
        alert("logo圖片過大")
        return
      }
      readURL(event.target,0)

    })

    document.getElementById("coverImg").addEventListener("change",function(){
      if(event.target.files[0].size>5000000){
        alert("封面圖片過大")
        return
      }
      readURL(event.target,1)
    })
	$("#upload").on("click",async function(){
		
      let data={
        "shopName":document.getElementById("shopNameInput").value,
        "name":document.getElementById("nameInput").value,
        "tel":document.getElementById("phoneInput").value,
        "address":document.getElementById("addresInput").value,
        "logo":document.getElementById("logoPreview").src.includes("base64")?document.getElementById("logoPreview").src:"",
        "cover":document.getElementById("coverPreview").src.includes("base64")?document.getElementById("coverPreview").src:"",
        "intro":document.getElementById("shopItro").value,
        "bankAccount":document.getElementById("bankAccountInput").value,
        "email":document.getElementById("emailInput").value,
      }
      
      try {
        let toServer= await $.ajax({
		type:"POST",
        url:"/setShopInfo",
        data:JSON.stringify(data),
        contentType: "application/json"
      	});
      	
      	if(toServer=="ok"){
       	 alert("更新成功")
     	 }else if(toServer=="!cover"){
       	 alert("封面更新失敗，其餘成功")
      	}else{
		 	 alert("更新失敗")
	  	}
      
      } catch (error) {
        alert("更新失敗")
      }
      
      // toServer.then(
      //   function(){
      //     alert("更新成功")
      //   }
      // ).catch(function(){
        
      // })

      

    })
   
	}