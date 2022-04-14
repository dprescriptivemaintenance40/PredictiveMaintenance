using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KiranaPasalManagementSystem.Response
{
    public class MessageResponse
    {
        public string Status { get; set; }
        public string Message { get; set; }

        public MessageResponse(string Message, string Status)
        {
            this.Message = Message;
            this.Status = Status;
        }
    }
}
