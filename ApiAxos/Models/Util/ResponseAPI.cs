using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace ApiAxos.Models.Util
{
    public class PostResponseAPI : IResponseAPI
    {
        public string Message { get; set; }
        public HttpStatusCode StatusCode { get; set; }
        public string Result { get; set; }
        public string Token { get; set; }

        public PostResponseAPI(string message, HttpStatusCode statusCode, string token, string result = "")
        {
            this.Message = message;
            this.StatusCode = statusCode;
            this.Result = result;
            this.Token = token;
        }
    }

    public class GetResponseAPI : IResponseAPI
    {
        public string Message { get; set; }
        public HttpStatusCode StatusCode { get; set; }
        public IEnumerable<Object> Result { get; set; }
        public string Token { get; set; }

        public GetResponseAPI(string message, HttpStatusCode statusCode, IEnumerable<Object> result, string token)
        {
            this.Message = message;
            this.StatusCode = statusCode;
            this.Result = result;
            this.Token = token;
        }
    }
}