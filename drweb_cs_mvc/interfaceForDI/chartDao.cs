namespace drweb_cs_mvc.interfaceForDI
{
	public interface chartDao
	{
		public int TodayRevenue(int shopid);
		public int monthRevenue(int shopid);
		public int? ordersSum(int shopid);
		public int? membersSum(int shopid);
		 public List<List<string>> getBestSelling(int shopid);
		public Dictionary<string, int> getLastFewMonth(int shopid);
	}
}
