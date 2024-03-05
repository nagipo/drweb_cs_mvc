using drweb_cs_mvc.interfaceForDI;
using drweb_cs_mvc.internal_interface;

namespace drweb_cs_mvc.Models
{
    public class loginServiceImpl : login_service
    {
        private loginDao dao;
        public loginServiceImpl(loginDao dao)
        {
            this.dao = dao;
        }
        public int? checkAccount(string clientAccount, string clientPassword)
        {
            string[] query= dao.findPasswordByAccount(clientAccount);
            
            if (query[0] == null )
            {
                return null;
            }
            if (query[0] == clientPassword)
            {
                return int.Parse(query[1]) ;
            }else
            {
                return null;
            }
        }
    }
}
