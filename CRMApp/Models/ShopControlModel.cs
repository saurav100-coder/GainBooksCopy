using System;

namespace CRMApp.Models
{

    public class ShopControlModel
    {
        // Dim df1 As New DataFunctions.DataFunctions
        public int shopcontrol_key { get; set; } = -1;
        public int p_shopcontrol { get; set; } = -1;
        public int rowstatus { get; set; }
        public string? corpid { get; set; } 
        public string? shopcode { get; set; } 
        public string? shopname { get; set; } 
        public string? licenseecode { get; set; } 
        public string? licenseename { get; set; } 
        public string? shopaddress { get; set; } 
        public string? excisedistrict { get; set; } 
        public string? circleoffice { get; set; } 
        public string? locality { get; set; } 
        public decimal clguaranteevalue { get; set; }
        public decimal flguaranteevalue { get; set; }
        public DateTime fystartdate { get; set; }
        public DateTime fyenddate { get; set; }
        public decimal clcumulative { get; set; }
        public decimal flcumulative { get; set; }
        public string? printingphone { get; set; } 
        public string? registeredphone { get; set; } 
        public string? billpapersize { get; set; } 
        public int defaultquantity { get; set; }

        public int uploadtype { get; set; }
        public int salesynctype { get; set; }
        public int servicetype { get; set; }
        public int syncwhen { get; set; }
        public DateTime startdatetime { get; set; }
        public string? nextservice { get; set; } 
        public DateTime nextdatetime { get; set; }
        public string? testurl { get; set; } 
        public string? urllive { get; set; } 
        public string? printshopno { get; set; } 

        // Public Property frmtfystartdate As string? = df1.getDateTimeISTNow.Tostring?("yyyy-MM-dd")
        // Public Property frmtfyenddate As string? = df1.getDateTimeISTNow.Tostring?("yyyy-MM-dd")

        // Public Property frmtstartdatetime As string? = df1.getDateTimeISTNow.Tostring?("yyyy-MM-dd")
        // Public Property frmtnextdatetime As string? = df1.getDateTimeISTNow.Tostring?("yyyy-MM-dd")

        public string? textuploadtype { get; set; } 
        public string? textsalesynctype { get; set; } 
        public string? textservicetype { get; set; } 
        public string? textsyncwhen { get; set; } 



    }
}