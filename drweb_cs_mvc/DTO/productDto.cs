using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;

namespace drweb_cs_mvc.DTO
{
	public class productDto
	{
		public string? id { get; set; }
		public string? name { get; set; }
		public string? price { get; set; }
		public string? cost { get; set; }
		public string? discription { get; set; }
		public string? shelves { get; set; }
		public string? stock { get; set; }
		public string? discontinued { get; set; }
		public string? shopId { get; set; }
		
		public string? picjson { get; set; }
		public string? pictext_0 { get; set; }

	}
}
