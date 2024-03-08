using drweb_cs_mvc.DTO;

namespace drweb_cs_mvc.interfaceForDI
{
	public interface productDao
	{
		public List<Dictionary<string, object>> query(int shopid);
		public int addproduct(productDto dto);
		public int updateproduct(productDto dto);

		public int? UpdateDiscontinued(int id, int discontinued);
	}
}
