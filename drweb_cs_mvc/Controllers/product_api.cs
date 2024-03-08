using drweb_cs_mvc.DTO;
using drweb_cs_mvc.interfaceForDI;
using drweb_cs_mvc.internal_interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace drweb_cs_mvc.Controllers
{
	[Route("queryProduct")]
	[ApiController]
	public class product_api : ControllerBase
	{
		private productService service;
		private IHttpContextAccessor context;
		public product_api(productService service, IHttpContextAccessor context)
		{
			this.service = service;
			this.context = context;
		}
		[HttpPost]
		public ActionResult<object> post()

		{
			//int shopid = context.HttpContext.Session.GetInt32("shopid").Value;
			int shopid = 1;
			return Ok(service.queryAll(shopid));
		}
	}

	[ApiController]
	[Route("api/[controller]")]
	public class addProduct_api : ControllerBase
	{
		private productService service;
		private IHttpContextAccessor context;

		public addProduct_api(productService service, IHttpContextAccessor context)
		{
			this.service = service;
			this.context = context;
		}
		[HttpPost]
		public ActionResult<object> Post([FromBody] productDto data)
		{
			Console.WriteLine(data);
			//int shopid = context.HttpContext.Session.GetInt32("shopid").Value;
			int result = service.addprouduct(data, 1);

			if (result == 0)
			{

				return Ok("sucess");
			}
			else
			{
				Console.WriteLine(result);
				return "fail";
			}

		}

		
	}

	[ApiController]
	[Route("api/[controller]")]
	public class updateProduct_api : ControllerBase
	{
		private productService service;
		private IHttpContextAccessor context;

		public updateProduct_api(productService service, IHttpContextAccessor context)
		{
			this.service = service;
			this.context = context;
		}
		[HttpPost]
		public ActionResult<object> Post([FromBody] productDto data)
		{
			Console.WriteLine(data);
			//int shopid = context.HttpContext.Session.GetInt32("shopid").Value;
			int result = service.updateprouduct(data, 1);

			if (result == 0)
			{

				return Ok("sucess");
			}
			else
			{
				Console.WriteLine(result);
				return "fail";
			}

		}
	}

	[ApiController]
	[Route("api")]
	public class ProductsController : ControllerBase
	{
		private productService service;
		private IHttpContextAccessor context;

		public ProductsController(productService service, IHttpContextAccessor context)
		{
			this.service= service;
			this.context= context;
		}

		[HttpPost("updateDiscontinued/{id}")]
		public IActionResult updateDiscontinued(string id, [FromBody] Dictionary<string, int> updateData)
		{
			if (updateData == null || !updateData.ContainsKey("discontinued"))
			{
				return BadRequest("Invalid request data");
			}

			int discontinued = updateData["discontinued"];

			// Call the service to update the discontinued status of the product
			var updatedProduct = service.UpdateDiscontinued(int.Parse(id), discontinued);

			if (updatedProduct != null)
			{
				return Ok(updatedProduct);
			}
			else
			{
				return NotFound();
			}
		}
	}


	[ApiController]
	[Route("api/[controller]")]
	public class excelProduct_api : ControllerBase
	{
		private productService service;
		private IHttpContextAccessor context;

		public excelProduct_api(productService service, IHttpContextAccessor context)
		{
			this.service = service;
			this.context = context;
		}
		[HttpGet]
		public ActionResult<object> get()
		{
			
			var excel = service.getexcel(1);

			return File(excel, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "output.xlxs");
			

		}
	}


	[ApiController]
	[Route("api/[controller]")]
	public class pdfProduct_api : ControllerBase
	{
		private productService service;
		private IHttpContextAccessor context;

		public pdfProduct_api(productService service, IHttpContextAccessor context)
		{
			this.service = service;
			this.context = context;
		}
		[HttpGet]
		public ActionResult<object> get()
		{

			var pdf = service.getpdf(1);

			return File(pdf, "application/pdf", "output.pdf");


		}
	}
}
