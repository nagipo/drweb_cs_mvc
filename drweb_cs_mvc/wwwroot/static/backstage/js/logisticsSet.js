let whichTd;
	
	
	
	
	async function updateLogistics(){
		 let data={
            "isp_cod":"",
            "isp_ref":"",
             "del_cod":"",
             "del_ref":""

           }
		
		let table=document.getElementById("beWrite");
		
		let tr=table.getElementsByTagName("tr");
		for(let i=0;i<tr.length;i++){
			if(tr[i].getElementsByTagName("td")[0].innerHTML=="賣家宅配"&&tr[i].getElementsByTagName("td")[1].innerHTML=="一般宅配"){
				data.del_cod=tr[i].getElementsByTagName("td")[2].innerHTML.replace("元","")
			}else if(tr[i].getElementsByTagName("td")[0].innerHTML=="賣家宅配"&&tr[i].getElementsByTagName("td")[1].innerHTML=="冷藏宅配"){
				data.del_ref=tr[i].getElementsByTagName("td")[2].innerHTML.replace("元","")
			}else if(tr[i].getElementsByTagName("td")[0].innerHTML=="超商店到店"&&tr[i].getElementsByTagName("td")[1].innerHTML=="一般宅配"){
				data.isp_cod=tr[i].getElementsByTagName("td")[2].innerHTML.replace("元","")
			}else if(tr[i].getElementsByTagName("td")[0].innerHTML=="超商店到店"&&tr[i].getElementsByTagName("td")[1].innerHTML=="冷藏宅配"){
				data.isp_ref=tr[i].getElementsByTagName("td")[2].innerHTML.replace("元","")
			}
		}
		
		try{
			let res=await $.ajax({
				type:"POST",
            	url:"/logisticsSet/update",
            	 data:JSON.stringify(data),
        		contentType: "application/json"
            	
			})
			
			if(res=="ok"){alert("上傳成功")}else{alert("上傳失敗")};
			
		}catch{
			alert("上傳失敗")
		}
	}
	
	function updateLogisticsBTN(){
		$("#upload").off("click");
	//	document.getElementById("upload").addEventListener("click",updateLogistics());
	
		$("#upload").on("click",updateLogistics)
	}
	
      async function getLogisticsData(){
        try {
          let res= await $.ajax({
            type:"GET",
            url:"/logisticsSet/Table",
            
          })

          let data=JSON.parse(res);
          
          // let data={
          //   "isp_cod":"60",
          //   "isp_ref":"120",
          //   "del_cod":"",
          //   "del_ref":"150"

          // }
          if(Object.values(data).every(value => value === '')){
			  return
		  }

          if((data.del_cod||data.del_ref)!=""){
            let delData=[1];
            if(data.del_cod==""){
              delData[1]=""
            }else{
              delData[1]=parseInt(data.del_cod)
            }

            if(data.del_ref==""){
              delData[2]=""
            }else{
              delData[2]=parseInt(data.del_rfi)
            }

            writeTable(delData)
          }

          if((data.isp_cod||data.isp_ref)!=""){
            let ispData=[2];
            if(data.isp_cod==""){
              ispData[1]=""
            }else{
              ispData[1]=parseInt(data.isp_cod)
            }

            if(data.isp_ref==""){
              ispData[2]=""
              
            }else{
              ispData[2]=parseInt(data.isp_rfi)
            }
            console.log(ispData)
            writeTable(ispData);
			
          }

          



        } catch (error) {
          
        }
      }
      
      function selected(){
        if (document.getElementById("logisticsPlatform").value!=0){
          document.getElementById("logisticsPlatform").style.backgroundColor=""
          document.getElementById("beDisable").disabled=true

        }
      }

      function clean(){
        document.getElementById("beDisable").disabled=false;
        document.getElementById("beDisable").selected=true;
        document.getElementById("setCOD").value="";
        document.getElementById("setRefriger").value=""

      }

      function writeTable(data){
        //data=[平台,貨到價格,冷藏價格]
        
        
        let count= $("#beWrite tr").length
        
        let a=data[0]==1?"賣家宅配":"超商店到店"
        let tr=
        `<tr id="tr_${count+1}"><th scope="row">${count+1}</th><td>${a}</td><td>一般宅配</td><td>${data[1]}元</td><td><button  onclick="set(${count+1})" class="btn btn-light" style="padding: 0px;"><img style="height: 16px; width: 16px;" src="./icon/revise.png" alt=""></button></td><td><button onclick="deleteTD(${count+1})" class="btn btn-light" style="padding: 0px;"><img style="height: 16px; width: 16px;" src="./icon/cancel_grey.png" alt=""></button></td></tr>`
        let tr_f=
        `<tr id="tr_${count+1}"><th scope="row">${count+1}</th><td>${a}</td><td>冷藏宅配</td><td>${data[2]}元</td><td><button  onclick="set(${count+2})" class="btn btn-light" style="padding: 0px;"><img style="height: 16px; width: 16px;" src="./icon/revise.png" alt=""></button></td><td><button onclick="deleteTD(${count+2})" class="btn btn-light" style="padding: 0px;"><img style="height: 16px; width: 16px;" src="./icon/cancel_grey.png" alt=""></button></td></tr>`

        if (data[2]==""||isNaN(data[2])){
          document.getElementById("beWrite").innerHTML=(
          document.getElementById("beWrite").innerHTML+tr
        )
        }else if(data[1]==""||isNaN(data[1])){
          
          document.getElementById("beWrite").innerHTML=(
            document.getElementById("beWrite").innerHTML+tr_f
          )
        }
        else{
          document.getElementById("beWrite").innerHTML=(
          document.getElementById("beWrite").innerHTML+tr
          )
          count=count+2;
          tr_f=
          `<tr id="tr_${count}"><th scope="row">${count}</th><td>${a}</td><td>冷藏宅配</td><td>${data[2]}元</td><td><button  onclick="set(${count+2})" class="btn btn-light" style="padding: 0px;"><img style="height: 16px; width: 16px;" src="./icon/revise.png" alt=""></button></td><td><button onclick="deleteTD(${count+2})" class="btn btn-light" style="padding: 0px;"><img style="height: 16px; width: 16px;" src="./icon/cancel_grey.png" alt=""></button></td></tr>`

          
          document.getElementById("beWrite").innerHTML=(
          document.getElementById("beWrite").innerHTML+tr_f
          )
        }
        
      }

      function add(){
        //data=[平台,貨到價格,冷藏價格]
        let data=[]
        if (document.getElementById("logisticsPlatform").value==0){
          
          document.getElementById("logisticsPlatform").style.borderStyle="solid"
          document.getElementById("logisticsPlatform").style.borderColor="red"
          return
        }else{
          data.push(document.getElementById("logisticsPlatform").value)
        }
        
        
        if(document.getElementById("setCOD").value.match(/[0-9]+/)){
          data.push(document.getElementById("setCOD").value)
        }else if(document.getElementById("setCOD").value==""){
          data.push(60)
        } else{
          alert("請填數字")
          return
        }
        
        
        if(document.getElementById("setRefriger").value.match(/[0-9]+/)){
          data.push(document.getElementById("setRefriger").value)
        } else if (document.getElementById("setRefriger").value==""){
          data.push("")
        } else{
          alert("請填數字")
          
          return
        }

        

        writeTable(data);


      }

      function set(info){
        //info==第幾個tr
        document.getElementById("logisticsTable").style.display="none";
        document.getElementById("logisticsReset").style.display="inline-block"
        
        
        let a= document.getElementById(`tr_${info}`)
        let td= a.getElementsByTagName("td")
        // console.log(td[0].innerHTML)
        if(td[0].innerHTML=="賣家宅配"){
          document.getElementById("logisticsPlatformReset").value=1
          document.getElementById("logisticsPlatformReset").getElementsByTagName("option")[1].disabled=true
        }else{
          document.getElementById("logisticsPlatformReset").value=2
          document.getElementById("logisticsPlatformReset").getElementsByTagName("option")[0].disabled=true

        }
        if(td[1].innerHTML=="一般宅配"){
          document.getElementById("resetCOD").value=td[2].innerHTML.replace("元","")
          document.getElementById("resetRefri").disabled=true
        } else{
          document.getElementById("resetCOD").disabled=true
          document.getElementById("resetRefri").value=td[2].innerHTML.replace("元","")
        }
        whichTd=info
        
        


      }

      function cancel(){
        document.getElementById("logisticsTable").style.display="inline-block";
        document.getElementById("logisticsReset").style.display="none"
      }

      function save(){
        //info==第幾個tr
        a= document.getElementById(`tr_${whichTd}`)
        td= a.getElementsByTagName("td")
        

        if(document.getElementById("resetCOD").disabled==true){
          if(document.getElementById("resetRefri").value.match(/[0-9]+/)){
            td[2].innerHTML= document.getElementById("resetRefri").value+"元"
          }else{
            alert("請輸入數字")
            return
          }
          
        } else{
          if(document.getElementById("resetCOD").value.match(/[0-9]+/)){
            td[2].innerHTML= document.getElementById("resetCOD").value+"元"
          }else{
            alert("請輸入數字")
            return
          }
          cancel()
        }
      }

      function deleteTD(info){
        //info==第幾個tr
        console.log(info);
       let tr= document.getElementById(`tr_${info}`);
       tr.remove();
      }

      getLogisticsData()