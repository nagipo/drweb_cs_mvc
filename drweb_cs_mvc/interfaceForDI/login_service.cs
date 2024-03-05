namespace drweb_cs_mvc.internal_interface
{
    public interface login_service
    {
        int? checkAccount(string clientAccount, string clientPassword);
    }
}