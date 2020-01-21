using ApiAxos.Filters;
using ApiAxos.Models;
using ApiAxos.Models.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ApiAxos.Controllers
{
    [Authorize]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api")]
    public class ReceiptController : ApiController
    {
        // GET api/receipts/0/0
        [HttpGet]
        [Route("receipts/{supplierId}/{currencyId}/")]
        public IHttpActionResult GetReceipts(int supplierId, int currencyId)
        {
            var identity = Thread.CurrentPrincipal.Identity.Name;
            string token = TokenGenerator.GenerateTokenJwt(identity);

            try
            {
                using (var db = new AxosnetEntities())
                {
                    var receiptsList = (from r in db.tblReceipts
                                        join s in db.catSuppliers on r.supplierId equals s.supplierId
                                        join c in db.catCurrencies on r.currencyId equals c.currencyId
                                        where (r.supplierId == supplierId || supplierId == 0) && (r.currencyId == currencyId || currencyId == 0)
                                        orderby r.date descending
                                        select new
                                        {
                                            r.receiptId,
                                            s.supplier,
                                            r.amount,
                                            c.currency,
                                            r.date,
                                            r.comment,
                                            r.supplierId,
                                            r.currencyId
                                        }).ToList();

                    return Ok(new GetResponseAPI("Se cargo correctamente", HttpStatusCode.OK, receiptsList, token));
                }
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        // POST api/receipts
        [HttpPost]
        [Route("receipts")]
        public IHttpActionResult PostReceipt([FromBody]tblReceipts receipt)
        {
            if (!ModelState.IsValid)
                return BadRequest("No se realizo la peticion con el formato adecuado.");

            try
            {
                var identity = Thread.CurrentPrincipal.Identity.Name;
                string token = TokenGenerator.GenerateTokenJwt(identity);
                using (var db = new AxosnetEntities())
                {
                    var result = db.tblReceipts.SingleOrDefault(r => r.receiptId == receipt.receiptId);
                    if (result != null)
                    {
                        result.amount = receipt.amount;
                        result.date = receipt.date;
                        result.comment = receipt.comment;
                        result.supplierId = receipt.supplierId;
                        result.currencyId = receipt.currencyId;
                    }
                    else
                    {
                        db.tblReceipts.Add(receipt);
                    }
                    db.SaveChanges();

                    return Ok(new PostResponseAPI("Se guardo correctamente", HttpStatusCode.OK, token, "OK, se guardo registro"));
                }
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        // DELETE api/receipts
        [HttpDelete]
        [Route("receipts/{receiptId}/")]
        public IHttpActionResult DeleteReceipt(int receiptId)
        {
            try
            {
                var identity = Thread.CurrentPrincipal.Identity.Name;
                string token = TokenGenerator.GenerateTokenJwt(identity);

                using (var db = new AxosnetEntities())
                {

                    var result = db.tblReceipts.SingleOrDefault(r => r.receiptId == receiptId);
                    if (result != null)
                    {
                        db.tblReceipts.Remove(result);
                        db.SaveChanges();
                    }
                    return Ok(new PostResponseAPI("Se elimino correctamente", HttpStatusCode.OK, token, "OK, se elimino registro"));
                }
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        // GET api/suppliers
        [HttpGet]
        [Route("suppliers")]
        public IHttpActionResult GetSuppliers()
        {
            try
            {
                var identity = Thread.CurrentPrincipal.Identity.Name;
                string token = TokenGenerator.GenerateTokenJwt(identity);

                using (var db = new AxosnetEntities())
                {
                    var suppliers = (from c in db.catSuppliers
                                     orderby c.supplierId ascending
                                     select new
                                     {
                                         c.supplierId,
                                         c.supplier,
                                     }).ToList();
                    return Ok(new GetResponseAPI("Se cargo correctamente", HttpStatusCode.OK, suppliers, token));
                }
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        // GET api/currencies
        [HttpGet]
        [Route("currencies")]
        public IHttpActionResult GetCurrencies()
        {
            try
            {
                var identity = Thread.CurrentPrincipal.Identity.Name;
                string token = TokenGenerator.GenerateTokenJwt(identity);

                using (var db = new AxosnetEntities())
                {
                    var currencies = (from c in db.catCurrencies
                                      orderby c.currencyId ascending
                                      select new
                                      {
                                          c.currencyId,
                                          c.currency,
                                      }).ToList();
                    return Ok(new GetResponseAPI("Se cargo correctamente", HttpStatusCode.OK, currencies, token));
                }
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }
    }
}
