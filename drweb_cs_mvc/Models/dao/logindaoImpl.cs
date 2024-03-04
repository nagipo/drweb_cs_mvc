using drweb_cs_mvc.interfaceForDI;
using MySql.Data.MySqlClient;

namespace drweb_cs_mvc.Models.dao
{
    public class logindaoImpl : loginDao
    {
        private string connectstring = "data source=localhost;database=book;user id=root;password=root;pooling=true;charset=utf8;";
        private MySqlConnection conn;
        public logindaoImpl() { 
          this.conn = new MySqlConnection(connectstring);
        }

        public string findByAccount(string account)
        {
            if (conn == null)
            {
                conn = new MySqlConnection(connectstring);
            }
            string sql = "select password from shop_info where account=@value1";
            try
            {
                conn.Open();
                MySqlCommand command = new MySqlCommand(sql, conn);
                command.Parameters.AddWithValue("@value1", account);
                MySqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    return reader["password"].ToString();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                
            }
            finally
            {
                if (conn.State == System.Data.ConnectionState.Open)
                {
                    conn.Close();
                }
            }
            return null;
        }
    }
}
