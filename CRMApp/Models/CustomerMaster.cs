using System;

namespace CRMApp.Models
{
    public class CustomerMaster
    {
        private static CustomerControl.Variables cc1 = new CustomerControl.Variables("WebGodaddy");
        private static DataFunctions.DataFunctions df1 = new DataFunctions.DataFunctions(ref cc1);

        public int Customers_Key { get; set; } = -1;
        public int P_Customers { get; set; } = -1;
        public int RowStatus { get; set; } = 0;
        public string? CustCode { get; set; }

        public string? CustName { get; set; }
        public string? Contactperson { get; set; }

        public string? PostalAddress1 { get; set; }
        public string? PostalAddress2 { get; set; }
        public string? PostalAddress3 { get; set; }
        public string? PostalAddress4 { get; set; }

        public string? Pincode { get; set; }
        // <StringLength(10)>
        // <Required(ErrorMessage:="Mob NO is required")>
        public string? MobNo { get; set; }
        // <StringLength(10)>
        public string? Phone { get; set; }
        // <Required(ErrorMessage:="Email is required")>
        public string? Email { get; set; }
        public int HomeTown { get; set; } = 0;
        public string? TextHomeTown { get; set; }
        public int MainBussCode { get; set; } = 0;
        public string? TextMainBussCode { get; set; }
        public string? exitmode { get; set; } = "create";
        public int ProductCode { get; set; } = 0;
        public string? TextProductCode { get; set; }
        public int EmpAssigned { get; set; } = 0;
        public string? CustomerStatus { get; set; }
        public DateTime ActivationDate { get; set; } = df1.GetDateTimeISTNow(); // DateTime.Now  'df1.getDateTimeISTNow()
        public string? TxtActivationDate { get; set; }

        public int WebSessions_key { get; set; } = 0;

        // Public Property OthersText_CustomerType As String
        public string? GSTIN { get; set; }
        public int CustomerType { get; set; } = 0;
        public string? TextCustomerType { get; set; }
        public int status { get; set; } = 0;
        public string? TextStatus { get; set; }
        public string? amcmonth { get; set; }
        public int p_acccode { get; set; } = 0;
        public string? ActiveFlag { get; set; } = "Y";
        public string? LongLat { get; set; }
        public string? OnsiteFlag { get; set; }
        public DateTime mtimestamp { get; set; }
        public string? website { get; set; }
        public string? Facebookid { get; set; }
        public string? Twitterid { get; set; }
        public string? Linkedin { get; set; }
        public int Industry { get; set; } = 0;
        public string? TextIndustry { get; set; }

        // 'Added by aslam 
        public string? InfoString { get; set; }
        public string? Compositefield { get; set; }
        public string? CombinedAddress { get; set; }

        public string? Tags { get; set; }

        public string? TxtBilledUpto { get; set; }
        public string? TxtEmpAssigned { get; set; }
    }
}