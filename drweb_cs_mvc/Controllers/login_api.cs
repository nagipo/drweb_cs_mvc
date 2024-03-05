using drweb_cs_mvc.DTO;
using drweb_cs_mvc.internal_interface;
using Microsoft.AspNetCore.Mvc;

namespace drweb_cs_mvc.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class login_api:ControllerBase
    {
        private login_service service;
        private IHttpContextAccessor context;

		public login_api(login_service service, IHttpContextAccessor context)
        {
            this.service = service;
            this.context = context;
        }
        [HttpPost]
        public string Post([FromBody] login_dto data)
        {
            
            int? check=service.checkAccount(data.account, data.password);
            if (check.HasValue)
            {   
                context.HttpContext.Session.SetString("account",data.account);
                context.HttpContext.Session.SetInt32("shopid", check.Value);
				return "login_success";
            }else
            {
                return "false";
            }
            
        }
    }

    
	

}
