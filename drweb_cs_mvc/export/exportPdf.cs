﻿
using drweb_cs_mvc.interfaceForDI;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Newtonsoft.Json;
using OfficeOpenXml;
using OfficeOpenXml.Drawing;
using OfficeOpenXml.Style;
using QuickChart;
using System.Collections;
using System.Reflection.Metadata;

namespace drweb_cs_mvc.export
{
	public class exportPdf
	{	
		
		Dictionary<string, int>? lastFewMonth;
		List<List<string>>? bestsell;
		public exportPdf(Dictionary<string, int>? lastFewMonth, List<List<string>>? bestsell) {
			this.lastFewMonth = lastFewMonth;
			this.bestsell =bestsell;
		}

		public byte[] export() {

			Chart qc = new Chart();
			var data = new
			{
				type = "bar",
				data = new
				{
					labels = new[] { bestsell[0][0], bestsell[1][0], bestsell[2][0], bestsell[3][0] },
					datasets = new[]
				{
					new
					{
						label = "銷售數量",
						data = new[] { bestsell[0][1], bestsell[1][1], bestsell[2][1], bestsell[3][1] }
					}
				}
				}
			};

			string json = JsonConvert.SerializeObject(data, Formatting.Indented);

			qc.Width = 500;
			qc.Height = 300;
			qc.Version = "2.9.4";
			qc.Config =json;
			byte[] imageBytes = [];
			qc.ToByteArray();
			string imagePath = @"C:\Users\User\Pictures\your_image.jpg";
			

			FileStream fileStream = new FileStream(imagePath, FileMode.Open);
			fileStream.Close();


			iTextSharp.text.Document document = new iTextSharp.text.Document();
			MemoryStream memoryStream = new MemoryStream();

			PdfWriter writer = PdfWriter.GetInstance(document, memoryStream);

			// 打开文档
			document.Open();
			Image image = Image.GetInstance(imagePath);
			document.Add(image);

			


			document.Close();

			string templatePath = @"C:\Users\User\Pictures\template.xlsx";
			// 将内存流转换为 byte[] 数组
			byte[] pdfBytes = memoryStream.ToArray();
			ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
			using (ExcelPackage excelPackage = new ExcelPackage(new System.IO.FileInfo(templatePath)))
			{

				// 添加一个工作表
				ExcelWorksheet worksheet = excelPackage.Workbook.Worksheets["Sheet1"];

				// 写入标题行
				worksheet.Cells[1, 1].Value = "商品名稱";
				worksheet.Cells[1, 2].Value = "售出數量";
				worksheet.Cells[1, 3].Value = "單價";
				worksheet.Cells[1, 4].Value = "小計";

				worksheet.Cells[1, 1,1,4].Style.Border.Bottom.Style= ExcelBorderStyle.DashDot;


				int row = 2;
				int total = 0;
				foreach (var kvp in bestsell)
				{
					if (row>2)
					{
						var sourceRange = worksheet.Cells[2, 1, 2, 4];
						var destinationRange = worksheet.Cells[row,1,row,4];
						sourceRange.Copy(destinationRange);
					}
					worksheet.Cells[row, 1].Value = kvp[0];
					worksheet.Cells[row, 2].Value = kvp[1];
					worksheet.Cells[row, 3].Value = kvp[2];
					worksheet.Cells[row, 4].Value = int.Parse(kvp[1]) * int.Parse(kvp[2]);
					total+= int.Parse(kvp[1]) * int.Parse(kvp[2]);
					row++;
				}
				worksheet.Cells[row, 4].Value=total;
				worksheet.Cells[row, 1].Value = "總計";
				worksheet.Cells[row, 1,row,4].Style.Border.Top.Style= ExcelBorderStyle.DashDot;
				

				//ExcelPicture picture = worksheet.Drawings.AddPicture("Image", new MemoryStream(imageBytes));
				//picture.SetPosition(5, 5, 2, 0);


				string filePath = @"C:\Users\User\Pictures\your_sheet.xlsx";
				File.WriteAllBytes(filePath, excelPackage.GetAsByteArray());

				Console.WriteLine("Excel文件已生成：" + filePath);
			}


			return pdfBytes;
		}
	}
}
