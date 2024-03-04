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
        public int checkAccount(string clientAccount, string clientPassword)
        {
            string? password= dao.findPasswordByAccount(clientAccount);
            if (password == null )
            {
                return 1;
            }
            if (password == clientPassword)
            {
                return 0;
            }else
            {
                return 2;
            }
        }
    }
}
