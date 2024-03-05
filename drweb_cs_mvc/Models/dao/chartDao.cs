using MySql.Data.MySqlClient;
using System.Security.Principal;

namespace drweb_cs_mvc.Models.dao
{
	public class chartDao
	{
		private string connectstring = "data source=localhost;database=book;user id=root;password=root;pooling=true;charset=utf8;";
		private MySqlConnection conn;

		public chartDao() {
			this.conn = new MySqlConnection(connectstring);
		}	

		public int TodayRevenue(int shopid)
		{
			int totalRevenue = 0;
			if (conn == null)
			{
				conn = new MySqlConnection(connectstring);
			}
			string sql = "SELECT * FROM orders WHERE DATE(order_date) = CURDATE() AND shop_id=@value1";
			try
			{
				conn.Open();
				MySqlCommand command = new MySqlCommand(sql, conn);
				command.Parameters.AddWithValue("@value1", shopid);
				MySqlDataReader reader = command.ExecuteReader();
				while (reader.Read())
				{
					totalRevenue += Convert.ToInt32(reader["amount"]);
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
			return totalRevenue;
		}

		public int monthRevenue(int shopid)
		{
			int totalRevenue = 0;
			if (conn == null)
			{
				conn = new MySqlConnection(connectstring);
			}
			string sql = "SELECT * FROM orders WHERE MONTH(order_date) = MONTH(CURDATE()) AND YEAR(order_date) = YEAR(CURDATE()) AND shop_id = @value1;";
			try
			{
				conn.Open();
				MySqlCommand command = new MySqlCommand(sql, conn);
				command.Parameters.AddWithValue("@value1", shopid);
				MySqlDataReader reader = command.ExecuteReader();
				while (reader.Read())
				{
					totalRevenue += Convert.ToInt32(reader["amount"]);
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
			return totalRevenue;
		}

		public int? ordersSum(int shopid)
		{
			
			if (conn == null)
			{
				conn = new MySqlConnection(connectstring);
			}
			string sql = "SELECT COUNT(*) AS total_count FROM orders WHERE shop_id = @value1;";
			try
			{
				conn.Open();
				MySqlCommand command = new MySqlCommand(sql, conn);
				command.Parameters.AddWithValue("@value1", shopid);
				MySqlDataReader reader = command.ExecuteReader();
				while (reader.Read())
				{
					return Convert.ToInt32(reader["total_count"]);
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

		public int? membersSum(int shopid)
		{

			if (conn == null)
			{
				conn = new MySqlConnection(connectstring);
			}
			string sql = "SELECT COUNT(*) AS total_count FROM member WHERE shop_id = @value1;";
			try
			{
				conn.Open();
				MySqlCommand command = new MySqlCommand(sql, conn);
				command.Parameters.AddWithValue("@value1", shopid);
				MySqlDataReader reader = command.ExecuteReader();
				while (reader.Read())
				{
					return Convert.ToInt32(reader["total_count"]);
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
