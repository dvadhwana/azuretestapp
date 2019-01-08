﻿using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace azuretestapp.Service
{
    public class APODService
    {
        HttpClient _client = new HttpClient();
        private readonly ILogger<APODService> _logger;

        public APODService(ILogger<APODService> logger)
        {
            _logger = logger;
        }

        public virtual async Task<JObject> GetAPOD (DateTime APODdate)
        {            
            string uri = "https://api.nasa.gov/planetary/apod?api_key=HfNsuJpUXQplm4uGYogg5oMe5JnW7EhdN5Ke3seP&start_date=" + APODdate.ToString("yyyy-MM-dd") + "&end_date=" + APODdate.ToString("yyyy-MM-dd");
            _logger.LogInformation("Before calling Nasa API @ URL : " + uri);
            try
            {
                var response = await _client.GetAsync(uri);
                JObject JsonObject = JObject.Parse("{ APODS : " + response.Content.ReadAsStringAsync().Result + " }");
                _logger.LogInformation("Call to Nasa API successful");
                return JsonObject;                
            }
            catch (Exception ex)
            {
                _logger.LogError(string.Format("Exception occurred in calling nasa apod API: URI-{0}, Exception-{1}", uri, ex.Message));
                return null;
            }
        }
    }
}
