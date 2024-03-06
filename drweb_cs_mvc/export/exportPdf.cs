using Aspose.Pdf;
using Newtonsoft.Json;
using QuickChart;
using System.Collections;
using System.Reflection.Metadata;

namespace drweb_cs_mvc.export
{
	public class exportPdf
	{
		Dictionary<string, int> lastFewMonth;
		List<List<int>> bestsell;
		public exportPdf(string lastFewMonth,string bestsell) {
			this.lastFewMonth = JsonConvert.DeserializeObject<Dictionary<string, int>>(lastFewMonth);
			this.bestsell = JsonConvert.DeserializeObject<List<List<int>>>(bestsell);
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
			byte[] imageBytes = qc.ToByteArray();
			MemoryStream memoryStream = new MemoryStream(imageBytes);


			int lowerLeftX = 100;
			int lowerLeftY = 100;
			int upperRightX = 200;
			int upperRightY = 200;

			var pdf = new Aspose.Pdf.Document();
			pdf.Pages.Add();

			Page page = pdf.Pages[0];
			page.Resources.Images.Add(memoryStream);
			page.Contents.Add(new Aspose.Pdf.Operators.GSave());

			// 創建矩形和矩陣對象
			Aspose.Pdf.Rectangle rectangle = new Aspose.Pdf.Rectangle(lowerLeftX, lowerLeftY, upperRightX, upperRightY);
			Matrix matrix = new Matrix(new double[] { rectangle.URX - rectangle.LLX, 0, 0, rectangle.URY - rectangle.LLY, rectangle.LLX, rectangle.LLY });

			// 使用 ConcatenateMatrix（連接矩陣）運算符：定義必須如何放置圖像
			page.Contents.Add(new Aspose.Pdf.Operators.ConcatenateMatrix(matrix));
			XImage ximage = page.Resources.Images[page.Resources.Images.Count];

			// 使用 Do 運算符：此運算符繪製圖像
			page.Contents.Add(new Aspose.Pdf.Operators.Do(ximage.Name));

			// 使用 GRestore 運算符：此運算符恢復圖形狀態
			page.Contents.Add(new Aspose.Pdf.Operators.GRestore());

			MemoryStream pdfStream = new MemoryStream();
			pdf.Save(pdfStream);
			byte[] pdfBytes = pdfStream.ToArray();
			pdfStream.Close();

			return pdfBytes;
		}
	}
}
