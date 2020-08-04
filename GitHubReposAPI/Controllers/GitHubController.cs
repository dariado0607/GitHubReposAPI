


using GitHubRepositoriesAPI.Models;

using Newtonsoft.Json;

using System;

using System.Collections.Generic;

using System.IO;

using System.Linq;

using System.Net;

using System.Net.Http;

using System.Net.Http.Headers;

using System.Threading.Tasks;

using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.WebHost;
using System.Web.Routing;
using System.Web.SessionState;

namespace GitHubRepositoriesAPI.Controllers

{
    [EnableCors(origins:"*",headers:"*",methods:"*")]
    public class GitHubController : ApiController
    {


        public async Task<List<RepositoryModel>> GetSearchResult(string value)
        {

            string url = String.Format("https://api.github.com/search/repositories?q=" + value);
            var result = await GetItemAsync(url);

            return result.items;

        }

        
        public IHttpActionResult SaveItemInSession([FromBody]RepositoryModel rep)
        {
            if (rep != null)
            {
                
                if (HttpContext.Current.Session["ListSavedItems"] != null)
                {
                    List<RepositoryModel> itemstemp = new List<RepositoryModel>();
                    itemstemp = (List<RepositoryModel>)HttpContext.Current.Session["ListSavedItems"];
                    itemstemp.Add(rep);
                    HttpContext.Current.Session["ListSavedItems"] = itemstemp;
                }
                else
                {
                    HttpContext.Current.Session["ListSavedItems"] = new List<RepositoryModel>(); ;
                }

                
                
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        public List<RepositoryModel> GetSavedItems()
        {
            return (List<RepositoryModel>)HttpContext.Current.Session["ListSavedItems"];
        }
     





        public async Task<SearchResultModel> GetItemAsync(string Url)

        {
            try
            {
                SearchResultModel list = new SearchResultModel();
                HttpClient client = CreatetHttpClient(Url);
                HttpResponseMessage response = await client.GetAsync(Url);
                response.EnsureSuccessStatusCode();
                var responseAsString = await response.Content.ReadAsStringAsync();
                list = JsonConvert.DeserializeObject<SearchResultModel>(responseAsString);
                return list;
            }
            catch (Exception ex)
            {
                throw;

            }

        }



        public static HttpClient CreatetHttpClient(string Path)
        {

            string AccessControlAllowOrigin = "*";
            string xFrameOptions = "SAME ORIGION";
            HttpClientHandler authtHandler = new HttpClientHandler()
            {

                Credentials = CredentialCache.DefaultNetworkCredentials
            };
            HttpClient client = new HttpClient(authtHandler);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/vnd.github.mercy-preview+json"));
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.UserAgent.TryParseAdd("request");
            client.DefaultRequestHeaders.Add("Access-Control-Allow-Origin", AccessControlAllowOrigin);
            client.DefaultRequestHeaders.Add("Access-Control-Allow-Credentials", "true");
            client.DefaultRequestHeaders.Add("X-Frame-Options", xFrameOptions);   // "ALLOW-FROM http://example.com/");
            client.DefaultRequestHeaders.Add("X-Content-Type-Options", "no sniff");
            client.DefaultRequestHeaders.Add("X-XSS-Protection", "1; mode=block");


            client.BaseAddress = new Uri(Path);       

            return client;

        }
    }


    public class SessionControllerHandler : HttpControllerHandler, IRequiresSessionState
    {
        public SessionControllerHandler(RouteData routeData)
            : base(routeData)
        { }
    }

    public class SessionHttpControllerRouteHandler : HttpControllerRouteHandler
    {
        protected override IHttpHandler GetHttpHandler(RequestContext requestContext)
        {
            return new SessionControllerHandler(requestContext.RouteData);
        }
    }

}



