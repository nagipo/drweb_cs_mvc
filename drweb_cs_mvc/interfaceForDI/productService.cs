using drweb_cs_mvc.DTO;

namespace drweb_cs_mvc.interfaceForDI
{
	public interface productService
	{
		public List<Dictionary<string, object>> queryAll(int shopid);
		public int addprouduct(productDto dto, int shopid);
		public int updateprouduct(productDto dto, int shopid);
		public int? UpdateDiscontinued(int id, int discontinued);

		public byte[] getexcel(int shopid);
		public byte[] getpdf(int id);
	}
}
