using drweb_cs_mvc.DTO;

namespace drweb_cs_mvc. interfaceForDI
{
    public interface loginDao
    {
        public string findPasswordByAccount(string account);

        public int create(signUp_dto dto);

    }
}
