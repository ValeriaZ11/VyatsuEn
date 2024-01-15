//
namespace BPMSoft.Configuration
{
    using System;
    using System.Configuration;
    using System.ServiceModel;
    using System.ServiceModel.Web;
    using System.ServiceModel.Activation;
    using BPMSoft.Common;
    using BPMSoft.Core;
    using BPMSoft.Web.Common;

    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class UsrMyService : BaseService
    {
        [OperationContract]
        [WebInvoke(Method = "GET", UriTemplate = "TestMethod", BodyStyle = WebMessageBodyStyle.Wrapped,
            RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        /// <summary>
        /// todo:
        /// </summary>
        /// <returns>просто строка.</returns>
        public string MyMethod()
        {
            var userName = UserConnection.CurrentUser.Name;

            var account = new Account(UserConnection);
            account.SetDefColumnValues();
            account.Zip = "09563xxxx";
            account.Name = "New company name";
            account.Save(true, false);

            var contact = new Contact(UserConnection);
            contact.JobTitle = "Boss";
            contact.SetDefColumnValues();
            contact.SetColumnValue("Name", "New contact");
            contact.OwnerId = UserConnection.CurrentUser.ContactId;
            contact.MobilePhone = "333-444-2222";
            contact.Save();

            //var realty = new UsrMain(UserConnection);
            //realty.SetDefColumnValues();
            //realty.UsrName = userName;
            //realty.UsrComment = "новый объект из веб-сервиса";
            //realty.UsrArea = 111;
            //realty.UsrPriceUsd = 222;
            //realty.Save();

            return "UsrMyService - everything is OK";
        }
    }
}