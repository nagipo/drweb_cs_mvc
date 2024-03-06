using drweb_cs_mvc.interfaceForDI;
using drweb_cs_mvc.Models.dao;

namespace drweb_cs_mvc.Models
{
	public class chartServiceImpl:chartService
	{
		chartDao dao;
		public chartServiceImpl(chartDao dao)
		{
			this.dao = dao;
		}
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

		public List<List<string>> getBestSelling(int id)
		{
			List<List<string>> result = dao.getBestSelling(id);


			return result;
		}

		public Dictionary<string,int> getLastFewMonth(int id)
		{
			Dictionary<string, int> result=dao.getLastFewMonth(id);
			return result ;

		}
	}
}
