using ApiAxos.Filters;
using ApiAxos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ApiAxos.Controllers
{
    [AllowAnonymous]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/login")]
    public class LoginController : ApiController
    {
        // POST api/login/authenticate
        [HttpPost]
        [Route("authenticate")]
        public IHttpActionResult Authenticate(tblUsers login)
        {
            if (login == null)
                throw new HttpResponseException(HttpStatusCode.BadRequest);

            try
            {
                using (var db = new AxosnetEntities())
                {

                    var myUser = db.tblUsers.FirstOrDefault(u => u.username == login.username && u.password == login.password);

                    if (myUser != null)
                    {
                        string token = TokenGenerator.GenerateTokenJwt(login.username);
                        return Ok(token);
                    }
                    else
                    {
                        return Unauthorized();
                    }
                }
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        // POST api/login/register
        [HttpPost]
        [Route("register")]
        public IHttpActionResult Register(tblUsers user)
        {
            if (user == null)
                throw new HttpResponseException(HttpStatusCode.BadRequest);

            try
            {
                using (var db = new AxosnetEntities())
                {

                    db.tblUsers.Add(user);
                    db.SaveChanges();
                }
                return Ok("Se guardo exitosamente el usuario.");
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

    }
}
