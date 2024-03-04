using drweb_cs_mvc.DTO;
using drweb_cs_mvc.interfaceForDI;

namespace drweb_cs_mvc.Models
{
	public class signUpserviceImpl : signUpService
	{
		loginDao dao;
		public signUpserviceImpl(loginDao dao)
		{
			this.dao = dao;
		}
		public int create(signUp_dto dto)
		{
			int result = dao.create(dto);
			return result;
		}
	}
}
