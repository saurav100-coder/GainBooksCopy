using Microsoft.AspNetCore.Mvc;

namespace CRMApp.ViewComponents
{
    public class LocationGridViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke()
        {
            return View();
        }
    }
}
