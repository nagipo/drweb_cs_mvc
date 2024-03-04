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
        public login_api(login_service service)
        {
            this.service = service;
        }
        [HttpPost]
        public string Post([FromBody] login_dto data)
        {
            int check=service.checkAccount(data.account, data.password);
            if (check == 0)
            {
                return "ok";
            }else
            {
                return "false";
            }
            
        }
    }
}
