using System;

namespace CRMApp.Models
{
    public class EmployeesMaster
    {
        private static CustomerControl.Variables cc1 = new CustomerControl.Variables("WebGodaddy");
        private static DataFunctions.DataFunctions df1 = new DataFunctions.DataFunctions(ref cc1);

        public int Employees_Key { get; set; } = -1;
        public int P_Employees { get; set; } = -1;
        public int RowStatus { get; set; } = 0;
        public int Status { get; set; } = 0;
        public string? TxtStatus { get; set; } 
        public int Department { get; set; } = 0;
        public string? TxtDepartment { get; set; } 
        public int Designation { get; set; } = 0;
        public string? TxtDesignation { get; set; } 
        public string? EmpName { get; set; } 
        public string? FatherName { get; set; } 
        public string? Sex { get; set; } 

        public DateTime DtBirth { get; set; } = df1.GetDateTimeISTNow(); // DateTime.Now 'df1.getDateTimeISTNow()
        public string? exitmode { get; set; } = "create";
        public string? MaryStatus { get; set; } 
        public string? Caste { get; set; } 
        public string? Religion { get; set; } 
        public string? PostalAddress1 { get; set; } 
        public string? PostalAddress2 { get; set; } 
        public string? PostalAddress3 { get; set; } 
        public string? PostalAddress4 { get; set; } 
        public string? Pincode { get; set; } 
        public string? MobNo { get; set; } 
        public string? Alternatenumber { get; set; } 
        public string? Phone { get; set; } 
        public string? Email { get; set; } 
        public int HomeTown { get; set; } = 0;
        public string? TxtHomeTown { get; set; } 
        public decimal PreSalary { get; set; }
        public decimal MinExpSalary { get; set; }
        // Public Property BussTypes As Int32 = 0
        // Public Property SaralKnow As Int32 = 0
        public int PhotoFlag { get; set; } = 0;
        public int Photo_key { get; set; } = 0;
        public int ResumeFileFlag { get; set; } = 0;
        public int ResumeFile_key { get; set; } = 0;
        // Public Property EmplType As string? = ""
        public int ActionFlag { get; set; } = 0;
        public DateTime ActionDate { get; set; }
        public DateTime DateOfJoining { get; set; } = df1.GetDateTimeISTNow(); // DateTime.Now  'df1.getDateTimeISTNow()
        public string? FrmtDateOfJoining { get; set; } 
        public string? Proceedings { get; set; } 
        public int Under { get; set; } = 0;
        public int P_acccode { get; set; } = 0;
        public string? ActiveYN { get; set; } = "Y";
        public DateTime mtimestamp { get; set; }
        public int WebSessions_Key { get; set; } = 0;

        public string? userid { get; set; }


        // 'Added by aslam 
        public string? InfoString { get; set; }
        public string? Compositefield { get; set; }
        public string? moduleassigned { get; set; }
    }
}