/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = {

    sendInviteEmail: function(options) {

        var opts = {"type":"messages","call":"send","message":
            {
                "subject": "YourIn!",
                "from_email": "info@balderdash.co",
                "from_name": "AmazingStartupApp",
                "to":[
                    {"email": options.email, "name": options.name}
                ],
                "text": "Dear "+options.name+",\nYou're in the Beta! Click <insert link> to verify your account"
            }
        };

        myEmailSendingLibrary.send(opts);

    }
};