using Aspose.Pdf.Operators;
using drweb_cs_mvc.DTO;
using drweb_cs_mvc.interfaceForDI;
using MySql.Data.MySqlClient;
using System.Collections.Generic;

namespace drweb_cs_mvc.Models.dao
{
	public class productDaoimpl:productDao
	{
		private string connectstring = "data source=localhost;database=book;user id=root;password=root;pooling=true;charset=utf8;";


		public List<Dictionary<string, object>> query(int shopid)
		{
			using (MySqlConnection conn = new MySqlConnection(connectstring))
			{
				string sql = "select * from products where shop_id=@value1";
				List<Dictionary<string, object>> result = new List<Dictionary<string, object>>();
				try
				{
					conn.Open();

					MySqlCommand command = new MySqlCommand(sql, conn);
					command.Parameters.AddWithValue("@value1", shopid);
					MySqlDataReader reader = command.ExecuteReader();
					while (reader.Read())
					{
						Dictionary<string, object> row = new Dictionary<string, object>();
						for (int i = 0; i < reader.FieldCount; i++)
						{
							string columnName = reader.GetName(i);

							object columnValue = reader.GetValue(i);
							string stringValue = (columnValue == null || columnValue == DBNull.Value) ? null : columnValue.ToString();
							row.Add(columnName, stringValue);
						}
						result.Add(row);
					}
				}
				catch (Exception ex)
				{
					Console.WriteLine("錯誤：" + ex.Message);
					// 您可能希望更適當地處理此錯誤，
					// 如記錄或拋出自定義異常。
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

		public int addproduct(productDto dto)
		{
			using (MySqlConnection conn = new MySqlConnection(connectstring))
			{
				conn.Open();
				MySqlTransaction transaction = conn.BeginTransaction();
				string sql = "INSERT INTO products (Id, Name, Price, Cost, Discription, Shelves, Stock, Discontinued, Shop_Id, Pictext_0,  Picjson) " +
							 "VALUES (@Id, @Name, @Price, @Cost, @Discription, @Shelves, @Stock, @Discontinued, @ShopId, @Pictext_0, @Picjson)";
				try
				{
					MySqlCommand command = new MySqlCommand(sql, conn, transaction);
					command.Parameters.AddWithValue("@Id", dto.id);
					command.Parameters.AddWithValue("@Name", dto.name);
					command.Parameters.AddWithValue("@Price", int.Parse(dto.price));
					command.Parameters.AddWithValue("@Cost",int.Parse(dto.cost) );
					command.Parameters.AddWithValue("@Discription", dto.discription);
					command.Parameters.AddWithValue("@Shelves", int.Parse(dto.shelves));
					command.Parameters.AddWithValue("@Stock", int.Parse(dto.stock));
					command.Parameters.AddWithValue("@Pictext_0", dto.pictext_0);
					command.Parameters.AddWithValue("@ShopId", dto.shopId);
					command.Parameters.AddWithValue("@Discontinued", 0);
					command.Parameters.AddWithValue("@Picjson", dto.picjson);

					command.ExecuteNonQuery();
					transaction.Commit();
					return 0;
				}
				catch (MySqlException ex)
				{
					Console.WriteLine("Error: " + ex.Message);
					return 1;
				}
				catch (Exception ex)
				{
					Console.WriteLine("Error: " + ex.Message);
					return 2;
				}
				finally
				{
					if (conn.State == System.Data.ConnectionState.Open)
					{
						conn.Close();
					}
				}
				
				
			}
		}

		public int updateproduct(productDto dto)
		{
			using (MySqlConnection conn = new MySqlConnection(connectstring))
			{
				conn.Open();
				MySqlTransaction transaction = conn.BeginTransaction();
				string sql = "UPDATE products SET Name = @Name, Price = @Price, Cost = @Cost, Discription = @Discription, Shelves = @Shelves, Stock = @Stock, Discontinued = @Discontinued, Shop_Id = @ShopId,Pictext_0 = @Pictext_0,  Picjson = @Picjson WHERE Id = @Id";
				try
				{
					MySqlCommand command = new MySqlCommand(sql, conn, transaction);
					command.Parameters.AddWithValue("@Id", dto.id);
					command.Parameters.AddWithValue("@Name", dto.name);
					command.Parameters.AddWithValue("@Price", int.Parse(dto.price));
					command.Parameters.AddWithValue("@Cost", int.Parse(dto.cost));
					command.Parameters.AddWithValue("@Discription", dto.discription);
					command.Parameters.AddWithValue("@Shelves", int.Parse(dto.shelves));
					command.Parameters.AddWithValue("@Stock", int.Parse(dto.stock));
					command.Parameters.AddWithValue("@Pictext_0", dto.pictext_0);
					command.Parameters.AddWithValue("@ShopId", dto.shopId);
					command.Parameters.AddWithValue("@Discontinued", 0);
					command.Parameters.AddWithValue("@Picjson", dto.picjson);

					command.ExecuteNonQuery();
					transaction.Commit();
					return 0;
				}
				catch (MySqlException ex)
				{
					Console.WriteLine("Error: " + ex.Message);
					return 1;
				}
				catch (Exception ex)
				{
					Console.WriteLine("Error: " + ex.Message);
					return 2;
				}
				finally
				{
					if (conn.State == System.Data.ConnectionState.Open)
					{
						conn.Close();
					}
				}


			}
		}


		public int? UpdateDiscontinued(int id,int discontinued)
		{
			using (MySqlConnection conn = new MySqlConnection(connectstring))
			{
				conn.Open();
				MySqlTransaction transaction = conn.BeginTransaction();
				string sql = "UPDATE products SET  Discontinued = @Discontinued WHERE Id = @Id";
				try
				{
					MySqlCommand command = new MySqlCommand(sql, conn, transaction);
					command.Parameters.AddWithValue("@Id",id);
					
					command.Parameters.AddWithValue("@Discontinued", discontinued);
					

					command.ExecuteNonQuery();
					transaction.Commit();
					return 0;
				}
				catch (MySqlException ex)
				{
					Console.WriteLine("Error: " + ex.Message);
					return null;
				}
				catch (Exception ex)
				{
					Console.WriteLine("Error: " + ex.Message);
					return null;
				}
				finally
				{
					if (conn.State == System.Data.ConnectionState.Open)
					{
						conn.Close();
					}
				}


			}
		}







	}
}
