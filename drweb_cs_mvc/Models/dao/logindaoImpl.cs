using drweb_cs_mvc.DTO;
using drweb_cs_mvc.interfaceForDI;
using MySql.Data.MySqlClient;
using System.Data.Common;
using System.Security.Principal;
using System.Transactions;

namespace drweb_cs_mvc.Models.dao
{
    public class logindaoImpl : loginDao
    {
        private string connectstring = "data source=localhost;database=book;user id=root;password=root;pooling=true;charset=utf8;";
        private MySqlConnection conn;
        public logindaoImpl() { 
          this.conn = new MySqlConnection(connectstring);
        }

        public string findPasswordByAccount(string account)
        {
            if (conn == null)
            {
                conn = new MySqlConnection(connectstring);
            }
            string sql = "select password from shop_info where email=@value1";
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

		public int create(signUp_dto dto)
		{
            if (conn == null) {
				conn = new MySqlConnection(connectstring);
			}
			conn.Open();
			MySqlTransaction transaction = conn.BeginTransaction();
			string sql = "insert into shop_info(shop_name, password,name,phone,email) values(@shopName,@password,@name,@phone,@email) ";
			try
			{
				
				
				MySqlCommand command = new MySqlCommand(sql, conn);

				command.Parameters.AddWithValue("@shopName", dto.ShopName);
				command.Parameters.AddWithValue("@password", dto.Password);
				command.Parameters.AddWithValue("@name", dto.Name);
				command.Parameters.AddWithValue("@phone", dto.Phone);
				command.Parameters.AddWithValue("@email", dto.Email);

				command.ExecuteNonQuery();
				transaction.Commit();
				return 0;
			}
            catch(MySqlException ex) { 
                if(ex.Number== 1062)
                {
					transaction.Rollback();

					return 1;
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
			transaction.Rollback();
			return 2;
		}
	}
}
