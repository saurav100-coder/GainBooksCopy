namespace CRMApp
{
    public static class MyServer
    {
        public static string MapPath(string path)
        {
            string? contentRootPath =AppDomain.CurrentDomain.GetData("ContentRootPath")?.ToString();
            return Path.Combine(contentRootPath, path);
        }
    }
}
