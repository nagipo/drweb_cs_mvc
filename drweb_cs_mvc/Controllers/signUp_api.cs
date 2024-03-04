using drweb_cs_mvc.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace drweb_cs_mvc.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class signUp_api : ControllerBase
	{
		[HttpPost]
		public string Post([FromBody] signUp_dto dto)
		{
	
		}
	}
}
