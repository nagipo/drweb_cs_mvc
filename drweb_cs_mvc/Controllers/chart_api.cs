using drweb_cs_mvc.interfaceForDI;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace drweb_cs_mvc.Controllers
{
	[Route("dayRevenue")]
	[ApiController]
	public class chart_api_dayRevenue : ControllerBase
	{
		chartService service;
		private IHttpContextAccessor context;
		public chart_api_dayRevenue(chartService service, IHttpContextAccessor context) { 
			this.service = service;
			this.context = context;
			
		}

		[HttpPost]
		public ActionResult<object> post()

		{
			int shopid= context.HttpContext.Session.GetInt32("shopid").Value;
			var data = new { 
				todayRevenue = service.getTodayRevenue( shopid),
				monthRevenue= service.getMonthRevenue( shopid),
				ordersQuantity=service.ordersSum( shopid),
				membersQuantity=service.getMemberSum( shopid),
			};

			return Ok(data);
		}
	}


	[Route("bestsell")]
	[ApiController]
	public class chart_api_bestsell : ControllerBase
	{
		chartService service;
		private IHttpContextAccessor context;
		public chart_api_bestsell(chartService service, IHttpContextAccessor context)
		{
			this.service = service;
			this.context = context;

		}

		[HttpGet]
		public ActionResult<object> get()

		{
			int shopid = context.HttpContext.Session.GetInt32("shopid").Value;
			var data = service.getBestSelling( shopid);
			Console.WriteLine(data);

			return Ok(data);
		}
	}
}
