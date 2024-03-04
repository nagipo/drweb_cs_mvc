using drweb_cs_mvc.DTO;
using drweb_cs_mvc.interfaceForDI;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace drweb_cs_mvc.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class signUp_api : ControllerBase
	{
		private signUpService service;

		public signUp_api(signUpService service)
		{
			this.service = service;
		}

		[HttpPost]
		public string Post([FromBody] signUp_dto dto)
		{
			int result = service.create(dto);
			Console.WriteLine(result);

			if(result == 0) { return "ok"; }
			else if(result == 1) { return "account_repeat"; }
			else { return "error"; }
		}
	}
}
