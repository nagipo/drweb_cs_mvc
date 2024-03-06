using drweb_cs_mvc.interfaceForDI;
using MySql.Data.MySqlClient;
using System.Security.Principal;

namespace drweb_cs_mvc.Models.dao
{
	public class chartDaoimpl:chartDao
	{
		private string connectstring = "data source=localhost;database=book;user id=root;password=root;pooling=true;charset=utf8;";
		

		public chartDaoimpl() {
			
		}	


		public int TodayRevenue(int shopid)
		{	
			using(MySqlConnection conn=new MySqlConnection(connectstring)){
				int totalRevenue = 0;
				
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
			
		}

		public int monthRevenue(int shopid)
		{
			using (MySqlConnection conn = new MySqlConnection(connectstring))
			{
				int totalRevenue = 0;

				string sql = "SELECT amount FROM orders WHERE MONTH(order_date) = MONTH(CURDATE()) AND YEAR(order_date) = YEAR(CURDATE()) AND shop_id = @value1;";
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
				
		}

		public int? ordersSum(int shopid)
		{
			using (MySqlConnection conn = new MySqlConnection(connectstring))
			{
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

				
		}

		public int? membersSum(int shopid)
		{
			using (MySqlConnection conn = new MySqlConnection(connectstring))
			{
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

		public List<List<string>> getBestSelling(int shopid)
		{
			using (MySqlConnection conn = new MySqlConnection(connectstring))
			{
				List<List<string>> result = new List<List<string>>();

				string sql = "SELECT p.name AS productName, COALESCE(SUM(od.quantity), 0) AS totalQuantitySold FROM Products p LEFT JOIN Orderdetails od ON p.id = od.productsid WHERE p.shop_id = @value1 GROUP BY p.id, p.name ORDER BY totalQuantitySold DESC;";
				try
				{


					conn.Open();

					MySqlCommand command = new MySqlCommand(sql, conn);
					command.Parameters.AddWithValue("@value1", shopid);
					MySqlDataReader reader = command.ExecuteReader();
					while (reader.Read())
					{
						string productName = reader["productName"].ToString();
						string totalQuantitySold = reader["totalQuantitySold"].ToString();
						Console.WriteLine(productName);
						List<string> row = new List<string>();
						row.Add(productName);
						row.Add(totalQuantitySold);
						result.Add(row);
					}
				}
				catch (Exception ex)
				{
					Console.WriteLine("Error: " + ex.Message + "te");

				}
				finally
				{
					if (conn.State == System.Data.ConnectionState.Open)
					{
						conn.Close();
					}
				}
				return result;
			}
				
		}

		public Dictionary<string,int> getLastFewMonth(int shopid)
		{
			using (MySqlConnection conn = new MySqlConnection(connectstring))
			{
				Dictionary<string,int> result = new Dictionary<string,int>();
				string sql = "SELECT YEAR(order_date) AS order_year, MONTH(order_date) AS order_month, SUM(amount) AS total_amount\r\nFROM orders\r\nWHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) AND shop_id=@value1 \r\nGROUP BY order_year, order_month\r\nORDER BY order_year DESC, order_month DESC;";
				try
				{
					conn.Open();
					MySqlCommand command = new MySqlCommand(sql, conn);
					command.Parameters.AddWithValue("@value1", shopid);
					MySqlDataReader reader = command.ExecuteReader();
					while (reader.Read())
					{
						result.Add(reader["order_month"] + "/" + reader["order_year"],decimal.ToInt32((decimal)reader["total_amount"]) );
						
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
				return result;
			}


		}
	}
}
