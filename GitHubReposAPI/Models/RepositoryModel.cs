using System;

using System.Collections.Generic;

using System.Linq;

using System.Web;



namespace GitHubRepositoriesAPI.Models

{

    public class SearchResultModel

    {

        public int total_count { get; set; }

        public bool incomplete_results { get; set; }

        public List<RepositoryModel> items { get; set; }

        public SearchResultModel()
        {
            items = new List<RepositoryModel>();
        }

    }



    public class RepositoryModel

    {
        public int id { get; set; }

        public string name { get; set; }

        public Owner owner { get; set; }
    }



    public class Owner
    {

        public int id { get; set; }

        public string login { get; set; }

        public string avatar_url { get; set; }
    }

}