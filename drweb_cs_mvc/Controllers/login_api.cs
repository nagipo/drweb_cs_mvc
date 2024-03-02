using drweb_cs_mvc.DTO;
using Microsoft.AspNetCore.Mvc;

namespace drweb_cs_mvc.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class login_api:ControllerBase
    {
        [HttpPost]
        public string Post([FromBody] login_dto data)
        {
            return "ok";
        }
    }
}
