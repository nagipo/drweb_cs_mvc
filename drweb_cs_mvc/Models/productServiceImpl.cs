using drweb_cs_mvc.DTO;
using drweb_cs_mvc.interfaceForDI;
using OfficeOpenXml.Style;
using OfficeOpenXml;
using System.IO;

using Newtonsoft.Json;
using QuickChart;
using OfficeOpenXml.Drawing;
using Aspose.Pdf;
using GemBox.Spreadsheet;

namespace drweb_cs_mvc.Models
{
	public class productServiceImpl:productService
	{
		private productDao dao;
		public productServiceImpl(productDao dao)
		{
			this.dao = dao;
		}

		public List<Dictionary<string, object>> queryAll(int shopid) {
			List<Dictionary<string, object>> result = dao.query(shopid);
			return result;
		}

		public int addprouduct(productDto dto,int shopid)
		{
			dto.shopId = shopid.ToString();
			dto.discontinued = "1";


			return dao.addproduct(dto); ;
		}

		public int updateprouduct(productDto dto, int shopid)
		{
			dto.shopId = shopid.ToString();
			dto.discontinued = "1";


			return dao.updateproduct(dto); ;
		}

		public int? UpdateDiscontinued(int id,int discontinued)
		{
			return dao.UpdateDiscontinued(id, discontinued);
		}

		public byte[] getexcel(int shopid)
		{

			string templatePath = @"C:\Users\User\Documents\template.xlsx";
			List<Dictionary<string, object>> table = dao.query(shopid);
			// 将内存流转换为 byte[] 数组
			//byte[] excelBytes = memoryStream.ToArray();
			ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
			using (ExcelPackage excelPackage = new ExcelPackage(new System.IO.FileInfo(templatePath)))
			{

				// 添加一个工作表
				OfficeOpenXml.ExcelWorksheet worksheet = excelPackage.Workbook.Worksheets["Sheet1"];

				

				


				int row = 2;
				int totalPrice = 0;
				int totalShelves = 0;
				int totalDiscontinuted = 0;
				foreach (var kvp in table)
				{
					foreach(var k in kvp)
					{
						Console.WriteLine(k);
					}
					
					if (row > 2)
					{
						var sourceRange = worksheet.Cells[2, 1, 2, 6];
						var destinationRange = worksheet.Cells[row, 1, row, 4];
						sourceRange.Copy(destinationRange);
					}
					worksheet.Cells[row, 1].Value = row-1;
					worksheet.Cells[row, 2].Value = kvp["id"];
					worksheet.Cells[row, 3].Value = kvp["name"];
					worksheet.Cells[row, 4].Value = kvp["price"];
					worksheet.Cells[row, 5].Value = kvp["shelves"];
					worksheet.Cells[row, 6].Value = kvp["discontinued"].ToString()=="1"?"已上架":"未上架";
					totalPrice += int.Parse(kvp["price"].ToString());
					totalShelves+= int.Parse(kvp["shelves"].ToString());
					if (kvp["discontinued"].ToString() == "1")
					{
						totalDiscontinuted += 1;
					}
					
					row++;
				}
				worksheet.Cells[row, 1].Value = "總計";
				worksheet.Cells[row, 4].Value = totalPrice;
				worksheet.Cells[row, 5].Value = totalShelves;
				worksheet.Cells[row, 6].Value = totalDiscontinuted;
				worksheet.Cells[row, 1,row,6].Style.Border.Top.Style = ExcelBorderStyle.DashDot;

				QuickChart.Chart qc = new QuickChart.Chart();
				var data = new
				{
					type = "bar",
					data = new
					{
						labels = new[] { "總價", "總庫存", "總上架數"  },
						datasets = new[]
					{
					new
					{
						
						data = new[] { totalPrice, totalShelves, totalDiscontinuted }
					}
				}
					}
				};

				string json = JsonConvert.SerializeObject(data, Formatting.Indented);

				qc.Width = 500;
				qc.Height = 300;
				qc.Version = "2.9.4";
				qc.Config = json;
				byte[] imageBytes = qc.ToByteArray();
				qc.ToByteArray();
				string imagePath = @"C:\Users\User\Pictures\your_image.jpg";



				OfficeOpenXml.Drawing.ExcelPicture picture = worksheet.Drawings.AddPicture("Image", new MemoryStream(imageBytes));
				picture.SetPosition(row+3, 1, 0, 0);


				//string filePath = @"C:\Users\User\Pictures\your_sheet.xlsx";
				//File.WriteAllBytes(filePath, excelPackage.GetAsByteArray());
				return excelPackage.GetAsByteArray();
				
			}
		}

		public byte[] getpdf(int id)
		{
			byte[] excel=getexcel(id);
			SpreadsheetInfo.SetLicense("FREE-LIMITED-KEY");
			using (MemoryStream excelStream = new MemoryStream(excel))
			{
				var workbook = ExcelFile.Load(excelStream);

				// Save the Excel file to PDF.
				using (MemoryStream pdfStream = new MemoryStream())
				{
					workbook.Save(pdfStream, GemBox.Spreadsheet.SaveOptions.PdfDefault);

					// Save the PDF stream to a file or further process as needed.
					//File.WriteAllBytes("YourOutputFile.pdf", pdfStream.ToArray());
					return pdfStream.ToArray();
				}
			}

		}
	}
}
