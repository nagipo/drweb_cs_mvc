namespace drweb_cs_mvc.interfaceForDI
{
	public interface chartService
	{
		int getTodayRevenue(int id);
		int getMonthRevenue(int id);
		int? ordersSum(int id);
		int? getMemberSum(int id);
		List<List<string>> getBestSelling(int id);
	}
}
