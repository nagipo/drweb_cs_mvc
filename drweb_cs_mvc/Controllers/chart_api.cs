using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace drweb_cs_mvc.Controllers
{
	[Route("dayRevenue")]
	[ApiController]
	public class chart_api : ControllerBase
	{
		[HttpPost]
		public string post([FromBody]string today)
		{
			DateTimeOffset now = DateTimeOffset.Now;
			string formattedDate = now.ToString("yyyy-MM-dd'T'HH:mm:ss.fffK");
		}
	}
}
