using drweb_cs_mvc.export;
using drweb_cs_mvc.interfaceForDI;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;

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
			
			var data=new Dictionary<string, int?>();
			data.Add("todayRevenue", service.getTodayRevenue(shopid));
			data.Add("monthRevenue", service.getMonthRevenue(shopid));
			data.Add("ordersQuantity", service.ordersSum(shopid));
			data.Add("membersQuantity", service.getMemberSum(shopid));

			context.HttpContext.Session.SetString("revenue", JsonConvert.SerializeObject(data));

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

			context.HttpContext.Session.SetString("bestsell", JsonConvert.SerializeObject(data));
			return Ok(data);
		}
	}


	[Route("lastFewMonthRevenue")]
	[ApiController]
	public class chart_api_lastFewMonthRevenue : ControllerBase
	{
		chartService service;
		private IHttpContextAccessor context;
		public chart_api_lastFewMonthRevenue(chartService service, IHttpContextAccessor context)
		{
			this.service = service;
			this.context = context;

		}

		[HttpPost]
		public ActionResult<object> post()

		{
			int shopid = context.HttpContext.Session.GetInt32("shopid").Value;
			var data = service.getLastFewMonth(shopid);

			context.HttpContext.Session.SetString("lastFewMonth", JsonConvert.SerializeObject(data));

			return Ok(data);
		}
	}

	[Route("exportChart")]
	[ApiController]
	public class chart_api_exportChart : ControllerBase
	{
		chartService service;
		private IHttpContextAccessor context;
		public chart_api_exportChart(chartService service, IHttpContextAccessor context)
		{
			this.service = service;
			this.context = context;

		}

		[HttpGet]
		public ActionResult<object> get()

		{
			
			int shopid = context.HttpContext.Session.GetInt32("shopid").Value;
			string? bestSell = context.HttpContext.Session.GetString("bestsell");
			string? lastFewMonth = context.HttpContext.Session.GetString("lastFewMonth");

			exportPdf export =new exportPdf(lastFewMonth, bestSell);
			var data = export.export();



			return File(data, "application/pdf", "output.pdf"); ;
		}
	}
}
