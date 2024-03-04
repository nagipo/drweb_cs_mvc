using drweb_cs_mvc.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace drweb_cs_mvc.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [Route("login")]
        public IActionResult login()
        {
            return View();
        }
        [Route("backstage")]
		public IActionResult mainIndex()
		{
			return View();
		}

		public IActionResult Logout()
		{
			
			HttpContext.Session.Clear();

			

			return RedirectToAction("login", "Home");
		}

		[Route("signup")]
		public IActionResult signUp()
		{
			return View();
		}

		[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
