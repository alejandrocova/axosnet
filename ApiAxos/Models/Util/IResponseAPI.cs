using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace ApiAxos.Models.Util
{
    public interface IResponseAPI
    {
        string Message { get; set; }
        HttpStatusCode StatusCode { get; set; }
        string Token { get; set; }
    }
}