using drweb_cs_mvc.Models.dao;

namespace drweb_cs_mvc.Models
{
	public class chartService
	{
		chartDao dao = new chartDao();
		public int getTodayRevenue(int id ) {
			int result = dao.TodayRevenue(id);

			
			return result;	
		}

		public int getMonthRevenue( int id )
		{
			int result = dao.monthRevenue(id);


			return result;
		}
		public int? ordersSum(int id) {
			int? result=dao.ordersSum(id);
			return result;
		}

		public int? getMemberSum(int id)
		{
			int? result = dao.membersSum(id);
			return result;
		}

		public Dictionary<string,int> getBestSelling(int id)
		{
			Dictionary<string,int>result= new Dictionary<string,int>();


			return result;
		}
	}
}
