

function parseCard(view,webEle){
    webEle["headerText1"]=view.getElementsByClassName("headerText1")[0].innerHTML;
    webEle["headerText2"]=view.getElementsByClassName("headerText2")[0].innerHTML;
    webEle["backRoundColor"]=view.getElementsByClassName("child")[0].style.backgroundColor;
    webEle["backRoundImg"]=view.style.backgroundImage;
    webEle["card-title"]=[];
    webEle["card-text"]=[];
    webEle["card-backround"]=[];
    webEle["card-title-color"]=[];
    webEle["card-text-color"]=[];
    webEle["card-img-top"]=[];
    webEle["cardImg"]=[];
    
    
    
        for(let i=0;i<view.getElementsByClassName("card-title").length;i++){
            webEle["card-title"][i]=view.getElementsByClassName("card-title")[i].innerHTML;
            webEle["card-text"][i]=view.getElementsByClassName("card-text")[i].innerHTML;      
            webEle["card-backround"][i]=view.getElementsByClassName("card")[i].style.backgroundColor==""?"#FFFFFF":view.getElementsByClassName("card")[i].style.backgroundColor
            webEle["card-title-color"][i]=view.getElementsByClassName("card-title")[i].style.color==""?"#000000":view.getElementsByClassName("card-title")[i].style.color
            webEle["card-text-color"][i]=view.getElementsByClassName("card-text")[i].style.color==""?"#000000":view.getElementsByClassName("card-text")[i].style.color
             if(view.getElementsByClassName("card-img-top")[i]!=undefined){
                webEle["card-img-top"][i]=view.getElementsByClassName("card-img-top")[i].src;
             }
             if(view.getElementsByClassName("cardImg")[i]!=undefined){
                webEle["cardImg"][i]=view.getElementsByClassName("cardImg")[i].src;
             }
        }
   console.log(webEle);
    return webEle;
}
function parseCarousel(view,webEle){
    webEle["carouselImg"]=[]
    let imgDiv= view.getElementsByClassName("carousel-item");
      for(let i=0;i<imgDiv.length;i++) {

        webEle["carouselImg"][i]= imgDiv[i].getElementsByTagName("img")[0].src;
      }  
     
    return webEle;                                                                                                                                                                                  

}

function pareseForm(view,webEle){
    webEle["headerText1"]=view.getElementsByClassName("headerText1")[0].innerHTML;
    if(view.getElementsByClassName("headerText2").length!=0){
		webEle["headerText2"]=view.getElementsByClassName("headerText2")[0].innerHTML;
	}
    webEle["childBackroundColor"]=view.getElementsByClassName("child")[0].style.backgroundColor==""?"#dedede":view.getElementsByClassName("child")[0].style.backgroundColor
    webEle["childBackroundImg"]=view.style.backgroundImage;
    if(view.getElementsByClassName("imageArea02").length!=0){
		webEle["formImg"]=view.getElementsByClassName("imageArea02")[0].getElementsByTagName("img")[0].src
	}

    return webEle;
}

function parseImgEle(view, webEle, elemrntType) {
	if (elemrntType != "圖片04元件") {
		webEle["headerText1"] = view.getElementsByClassName("headerText1")[0].innerHTML;
		webEle["headerText2"] = view.getElementsByClassName("headerText2")[0].innerHTML;
		webEle["childBackroundColor"] = view.getElementsByClassName("child")[0].style.backgroundColor == "" ? "#dedede" : view.getElementsByClassName("child")[0].style.backgroundColor
		webEle["childBackroundImg"] = view.style.backgroundImage;
		webEle["img"] = []
		for (let i = 0; i < view.getElementsByClassName("img").length; i++) {
			webEle["img"][i] = view.getElementsByClassName("img")[i].getElementsByTagName("img")[0].src
		}
	}else{
		webEle["childBackroundColor"] = view.getElementsByClassName("child")[0].style.backgroundColor == "" ? "#dedede" : view.getElementsByClassName("child")[0].style.backgroundColor
		webEle["childBackroundImg"] = view.style.backgroundImage;
	}
	return webEle;
}

function parseProduct(view,webEle){
    
    webEle["headerText1"]=view.getElementsByClassName("headerText1")[0].innerHTML;
    webEle["headerText2"]=view.getElementsByClassName("headerText2")[0].innerHTML;
    webEle["childBackroundColor"]=view.getElementsByClassName("child")[0].style.backgroundColor==""?"#dedede":view.getElementsByClassName("child")[0].style.backgroundColor
    webEle["childBackroundImg"]=view.style.backgroundImage;
    webEle["productAreaBackround"]=[]
    // webEle["productTitle"]=[]
    webEle["productTitleColor"]=[]
    webEle["buttonBorder"]=[]
    webEle["buttonColor"]=[]
    webEle["buttonTextColor"]=[]
    for(let i=0;i<view.getElementsByClassName("productArea").length;i++){
        webEle["productAreaBackround"][i]=view.getElementsByClassName("productArea")[i].style.backgroundColor;
        
        webEle["productTitleColor"][i]=view.getElementsByClassName("product-title")[i].style.color;
        webEle["buttonBorder"][i]=view.getElementsByClassName("pButton")[i].style.borderColor;
        webEle["buttonColor"][i]=view.getElementsByClassName("pButton")[i].style.backgroundColor;
        webEle["buttonTextColor"][i]=view.getElementsByClassName("pButton")[i].style.color;
    }
    
    return webEle;
}

function parseTextEle(view,webEle){
    
    webEle["textHead"]=view.getElementsByTagName("h1")[0].innerHTML;
    webEle["textBody"]=view.getElementsByTagName("h4")[0].innerHTML
    webEle["BackroundColor"]=view.getElementsByClassName("child")[0].getElementsByTagName("div")[0].style.backgroundColor==""?"#dedede":view.getElementsByClassName("child")[0].getElementsByTagName("div")[0].style.backgroundColor
    webEle["childBackroundImg"]=view.style.backgroundImage;
    
    
    return webEle
}

function parseVideo(view,webEle){
    
    webEle["youtubeUrl"]=view.getElementsByTagName("iframe")[0].src
    webEle["headerText1"]=view.getElementsByClassName("headerText1")[0].innerHTML;  
    webEle["backroundColor"]=view.getElementsByClassName("child")[0].style.backgroundColor
    webEle["backroundImg"]=view.style.backgroundImage;
    
    return webEle
}

//index => 第幾個元件
function webelementToObj(view,index){
    
    let webEle={
        "elementType":view.getElementsByTagName("title")[index].innerHTML
    }
    
    if(webEle.elementType.slice(0, 2)=="卡片"){
        webEle= parseCard(view.getElementsByClassName("gridblock")[index],webEle);
    }else if(webEle.elementType.slice(0, 2)=="輪播"){
        
        webEle=parseCarousel(view.getElementsByClassName("gridblock")[index],webEle);
    }else if(webEle.elementType.slice(0, 2)=="表單"){
        webEle=pareseForm(view.getElementsByClassName("gridblock")[index],webEle);
    }else if(webEle.elementType.slice(0, 2)=="圖片"){
        webEle=parseImgEle(view.getElementsByClassName("gridblock")[index],webEle,webEle.elementType);
    }else if(webEle.elementType.slice(0, 2)=="商品"){
        webEle=parseProduct(view.getElementsByClassName("gridblock")[index],webEle);
    }else if(webEle.elementType.slice(0, 2)=="文字"){
        webEle=parseTextEle(view.getElementsByClassName("gridblock")[index],webEle);
    }else if(webEle.elementType.slice(0, 2)=="影片"){
        webEle=parseVideo(view.getElementsByClassName("gridblock")[index],webEle);
    }

    return webEle
}



function viewToObj(view){
    let data={
        "templateType":"",
        "webelements":[]
    }
    
    
    console.log(view.getElementsByClassName('container')[0].classList[1])
    
    data.templateType=view.getElementsByClassName('container')[0].classList[1]
    let eleLength=view.getElementsByClassName("gridblock").length;
    // let temp=webelementToObj(view,0) 
    // let temp1=webelementToObj(view,1) 
    
    if(eleLength>view.getElementsByTagName("title").length){
        alert("未完整選擇樣式")
        return
    }
    
    
    for(let i =0;i<eleLength;i++){
            
            let temp=webelementToObj(view,i) 
            
            data["webelements"][i]= temp
        
        
        }
    // }
    
    return data
}

document.getElementById("publishDesign").addEventListener('click',async()=>{
    let data=[]
    let views= document.getElementsByClassName("view");
    //  let title= views[0].getElementsByTagName("title")[0].innerHTML //元件種類
    let grids=views[0].getElementsByClassName("gridblock")
    for(let i=0;i<views.length;i++){
        data[i]= viewToObj(views[i])
    }
    // let viewObj= viewToObj(views[0])
    console.log( JSON.stringify(data));
    try {
        let res=await fetch("/FrontStageSet/update", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                
            },
            body: JSON.stringify(data) // 將 JSON 字串作為請求主體
        })
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let resTxt=await res.json()
        
        
        if(resTxt=="ok"){
            alert("上傳成功")
        }else{
            alert("上傳失敗1")  
        }
    } catch (error) {
		
        alert("上傳失敗2")
    }
})