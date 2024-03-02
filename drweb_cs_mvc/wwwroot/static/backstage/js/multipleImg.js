// 多張-上傳圖片//
// 拖移上傳圖片
let uploadedFilesArray = [];
function clearArray(){
	uploadedFilesArray = []
	console.log("clearArray", uploadedFilesArray);
}

function handleDragOver(event) {
	event.preventDefault();
	event.dataTransfer.dropEffect = 'copy';
}

function handleDrop(event, dropAreaId) {
	event.preventDefault();
	uploadImage(event.dataTransfer.files, dropAreaId);
}
// 點擊上傳圖片
function clickUpload(dropAreaId) {
	let input = document.createElement('input');
	input.type = 'file';
	input.accept = 'image/*';
	input.multiple = 'multiple'; // 允許多張圖片
	input.onchange = function() {
		uploadImage(input.files, dropAreaId);
	};
	input.click();
}

// 在全域範圍內定義原始內容（預設文字）
let originalContent = "拖曳或點選<br>此處上傳圖片";

// 在頁面載入完成後顯示預設文字
function insideMutipleImg() {
	let dropArea = document.getElementById("shopLogo");
	showPlaceholderText(dropArea, originalContent);
};

function uploadImage(files, dropAreaId) {
	let dropArea = document.getElementById(dropAreaId);

	// 檢查 dropArea 是否為 null
	if (!dropArea) {
		console.error('Drop area not found:', dropAreaId);
		return;
	}

	// 檢查是否超過上傳數量限制
	if (dropArea.children.length + files.length > 5) {
		setTimeout(function() {
			alert('最多只能上傳5張圖片');
		}, 0);
		return;
	}

	for (let i = 0; i < files.length; i++) {
		let file = files[i];
		let reader = new FileReader();

		reader.onload = function(e) {
			// 創建預覽區域
			let previewDiv = document.createElement('div');
			previewDiv.className = 'previewM';

			// 創建圖片元素
			let img = new Image();
			img.src = e.target.result;

			// 轉換原始檔案為 BASE64 字符串
			let base64Data = e.target.result;
			uploadedFilesArray.push(base64Data);

			// 添加圖片和刪除按鈕
			previewDiv.appendChild(img);
			previewDiv.appendChild(createDeleteButton(dropArea, previewDiv, base64Data));
			dropArea.appendChild(previewDiv);

			// 在控制台上印出更新後的陣列
			console.log("Updated uploadedFilesArray:", uploadedFilesArray);
			imgArray(uploadedFilesArray);
		};

		reader.readAsDataURL(file);
	}

	showPlaceholderText(dropArea, ''); // 清除預設文字
}


// 創建刪除按鈕
function createDeleteButton(dropArea, previewDiv, base64Data) {
	let deleteButton = document.createElement('button');
	deleteButton.className = 'deleteButton';
	deleteButton.innerHTML = 'X';
	deleteButton.onclick = function(event) {
		event.stopPropagation();

		// 找到 base64Data 在陣列中的索引
		let index = uploadedFilesArray.indexOf(base64Data);

		// 如果找到，從陣列中刪除
		if (index !== -1) {
			uploadedFilesArray.splice(index, 1);
		}

		dropArea.removeChild(previewDiv);
		showPlaceholderText(dropArea, originalContent);

		// 在控制台上印出更新後的陣列
		console.log("Updated uploadedFilesArray:", uploadedFilesArray);
		imgArray(uploadedFilesArray);
	};

	return deleteButton;
}


// 顯示預設文字的函數
function showPlaceholderText(dropArea, text) {
	// 檢查 dropArea 是否為 null
	if (!dropArea) {
		console.error('Drop area not found');
		return;
	}

	// 如果沒有上傳圖片，則顯示預設文字
	if (dropArea.children.length === 0) {
		// 檢查是否已經有預設文字元素，如果有，不再添加
		let placeholderText = dropArea.querySelector('.placeholder-text');
		if (text && !placeholderText) {
			placeholderText = document.createElement('div');
			placeholderText.className = 'placeholder-text';
			placeholderText.innerHTML = text;
			dropArea.appendChild(placeholderText);
		}
	} else {
		// 如果有上傳圖片，則清除預設文字元素
		let placeholderText = dropArea.querySelector('.placeholder-text');
		if (placeholderText) {
			dropArea.removeChild(placeholderText);
		}
	}
}

