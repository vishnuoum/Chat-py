var name = getCookie("phone");
alert(name);
console.log(name);
function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

function update_chat_word(id,msg){
        document.getElementById(id+"-message").innerHTML=msg;
}


var sender='';
sname='';
var receiver='';
var msg=document.getElementById('comment');
var message='';
var html='';

var io=io();
io.emit("user_connected", name);
sender=name;
//receiver=name;


all_users();
chat_history();


function all_users(){
        // call an ajax
        $.ajax({
                url: "/all_users",
                method: "POST",
                data: {
                phone: sender
                },
                success: function (response) {
                console.log(response);
        
                var messages = JSON.parse(response);
                // var messages=response;
                //console.log(messages.length);

                
                html='';
                for (var a = 0; a < messages.length; a++) {
                        html += "<div id=\""+messages[a][2]+"\" class=\"row sideBar-body\" onclick=\"chat('"+messages[a][2]+"','"+messages[a][1]+"')\"><div class=\"col-sm-3 col-xs-3 sideBar-avatar\"><div class=\"avatar-icon\"><img src=\"static/person.png\" style=\"width:55;height:55\"></div></div><div class=\"col-sm-9 col-xs-9 sideBar-main\"><div class=\"row\"><div class=\"col-sm-8 col-xs-8 sideBar-name\"><span class=\"name-meta\">"+messages[a][1]+"</span></div><div class=\"col-sm-4 col-xs-4 pull-right sideBar-time\"><span class=\"time-meta pull-right\">18:18</span></div></div></div></div>";
                        console.log(messages[a]);
                }
                //alert(messages[0]);
                document.getElementsByClassName('compose-sideBar')[0].innerHTML=html;
                // append in list
                
                }
        });
}

        // call an ajax
        $.ajax({
                url: "/get_name",
                method: "POST",
                data: {
                phone: sender
                },
                success: function (response) {
                console.log(response);
        
                var messages = JSON.parse(response);
                //console.log(messages.length);

                
                sname=messages[0][0];
                console.log(sname);
                // append in list
                
                }
        });


function chat_history(){
        //call an jax for chat history
        $.ajax({
                url: "/chat_history",
                method: "POST",
                data: {
                phone: sender
                },
                success: function (response) {
                console.log(response);
        
                var messages = JSON.parse(response);
                //console.log(messages.length);

                
                html='';
                for (var a = 0; a < messages.length; a++) {
                        html += "<div id=\""+messages[a][2]+"\" class=\"row sideBar-body\" onclick=\"chat('"+messages[a][2]+"','"+messages[a][1]+"')\"><div class=\"col-sm-3 col-xs-3 sideBar-avatar\"><div class=\"avatar-icon\"><img src=\"static/person.png\" style=\"width:55;height:55\"></div></div><div class=\"col-sm-9 col-xs-9 sideBar-main\"><div class=\"row\"><div class=\"col-sm-8 col-xs-8 sideBar-name\"><span class=\"name-meta\">"+messages[a][1]+"</span><br><span id=\""+messages[a][2]+"-message\" class=\"name-meta\" style=\"color:grey;white-space:nowrap;text-overflow:ellipsis\">"+messages[a][3]+"</span></div><div class=\"col-sm-4 col-xs-4 pull-right sideBar-time\"><span class=\"time-meta pull-right\" style=\"height:55%\">"+messages[a][5]+"</span><span class=\"time-meta pull-right\">"+messages[a][6]+"</span></div></div></div></div>";
                        //console.log(messages[a]);
                }
                //alert(messages[0]);
                document.getElementById("chatlist").innerHTML = html;
                // append in list
                
                }
        });
}







// listen from server
	io.on("user_connected", function (username) {
                if(username!=sender){
                        all_users();
                        console.log("user connected:"+username);
                }
	});



document.getElementsByClassName('heading-compose')[0]
        .addEventListener('click', function (event) {
            document.getElementsByClassName('side-two')[0].style.left=0;
        });
document.getElementsByClassName('newMessage-back')[0]
        .addEventListener('click', function (event) {
          document.getElementsByClassName('side-two')[0].style.left="-100%";
        });
function chat(receive,rname) {
          document.getElementsByClassName('side-two')[0].style.left="-100%";

          var element=document.getElementById(receive);
          html='';
        
          if(document.getElementById("chatlist").contains(element)){
                console.log("if");
          }else{
                console.log("ok");
                html = "<div id=\""+receive+"\" class=\"row sideBar-body\" onclick=\"chat('"+receive+"','"+rname+"')\"><div class=\"col-sm-3 col-xs-3 sideBar-avatar\"><div class=\"avatar-icon\"><img src=\"static/person.png\" style=\"width:55;height:55\"></div></div><div class=\"col-sm-9 col-xs-9 sideBar-main\"><div class=\"row\"><div class=\"col-sm-8 col-xs-8 sideBar-name\"><span class=\"name-meta\">"+rname+"</span><br><span id=\""+receive+"-message\" class=\"name-meta\" style=\"color:grey;white-space:nowrap;text-overflow:ellipsis\"></span></div><div class=\"col-sm-4 col-xs-4 pull-right sideBar-time\"><span class=\"time-meta pull-right\">18:18</span></div></div></div></div>";
    

		document.getElementById("chatlist").innerHTML += html;
        }
          
          html="<div class=\"row message-previous\"><div class=\"col-sm-12 previous\"><a onclick=\"previous(this)\" id=\"ankitjain28\" name=\"20\">Show Previous Message!</a></div></div>";
          document.getElementById('conversation').innerHTML =html;
          
          receiver=receive;
          document.getElementsByClassName('side')[0].style.display="none";
          document.getElementById("heading_name").innerHTML=rname;

          


        // call an ajax
        $.ajax({
                url: "/get_messages",
                method: "POST",
                data: {
                sender: sender,
                receiver: receiver
                },
                success: function (response) {
                console.log(response);
        
                var messages = JSON.parse(response);
                //console.log(messages.length);

                
                html='';
                var msgs='';
                for (var a = 0; a < messages.length; a++) {
                                if(messages[a][7]!=null){
                                        msgs=messages[a][7].replace('/','');
                                        msgs=msgs.replace('/','');
                                }
                                else{
                                        msgs='null'
                                }
                        if(html.includes('d'+msgs)){

                                }
                        else{
                                
                                html+="<br><center><div id=\"d"+msgs+"\" style=\"height:auto;width:20%;background:#5AB4CF;padding:8px;border-radius:10px;font-size:75%\">"+messages[a][7]+"</div></center><br>";
                        }
                        if(sender==messages[a][2]){
                                html+="<div class=\"row message-body\" style=\"height:auto\"><div class=\"col-sm-12 message-main-sender\" style=\"height:auto\"><div class=\"sender\" style=\"height:auto\"><div class=\"message-text\" style=\"height:auto\">"+messages[a][5]+"</div><span class=\"message-time pull-right\" style=\"height:auto\">"+messages[a][8]+"</span></div></div></div>";
                        }
                        else{
                                 html+="<div class=\"row message-body\" style=\"height:auto\"><div class=\"col-sm-12 message-main-receiver\" style=\"height:auto\"><div class=\"receiver\" style=\"height:auto\"><div class=\"message-text\" style=\"height:auto\">"+messages[a][5]+"</div><span class=\"message-time pull-right\" style=\"height:auto\">"+messages[a][8]+"</span></div></div></div>";
                        }
                        //console.log(messages[a]);
                }
                //alert(messages[0]);
        
                // append in list
                document.getElementById("conversation").innerHTML += html;
                //scroll down
                var scroll = document.getElementById('conversation');
                scroll.scrollTop = scroll.scrollHeight - scroll.clientHeight;
                }
        });

        





        }
document.getElementById("three-dot")
        .addEventListener('click', function (event){
        chat_history();
        document.getElementsByClassName('side')[0].style.display="block";
        });
document.getElementsByClassName("reply-send")[0]
        .addEventListener('click',function (event){


        
                // send message to server
                message=msg.value;
                if(message!=''){
                                io.emit("send_message", {
                                        sname: sname,
                                        sender: sender,
                                        receiver: receiver,
                                        message: message
                                });
                        msg.value="";
                        msg.focus();


                        

                        var today = new Date();
                        var date = today.getDate()+''+String(today.getMonth()+1).padStart(2, '0')+''+today.getFullYear();
                        var date1 = today.getDate()+'/'+String(today.getMonth()+1).padStart(2, '0')+'/'+today.getFullYear();
                        console.log(date,date1);

                        var element =  document.getElementById('d'+date);
                        if (typeof(element) != 'undefined' && element != null)
                        {
                                }else{
                                document.getElementById('conversation').innerHTML +="<br><center><div id=\"d"+date+"\" style=\"height:auto;width:20%;background:#5AB4CF;padding:8px;border-radius:10px;font-size:75%\">"+date1+"</div></center><br>";
                        
                        }

                        //add to conversation
                        html="<div class=\"row message-body\" style=\"height:auto\"><div class=\"col-sm-12 message-main-sender\" style=\"height:auto\"><div class=\"sender\" style=\"height:auto\"><div class=\"message-text\" style=\"height:auto\">"+message+"</div><span class=\"message-time pull-right\" style=\"height:auto\">"+moment().format('hh:mm A')+"</span></div></div></div>";
                        document.getElementById('conversation').innerHTML +=html;
                        update_chat_word(receiver,message);
                        var scroll = document.getElementById('conversation');
                        scroll.scrollTop = scroll.scrollHeight - scroll.clientHeight;
                }
        });


// listen from server
io.on("new_message", function (data) {
        //console.log("hai");
        
        var element=document.getElementById(data.sender);
        html='';
        
        if(document.getElementById("chatlist").contains(element)){
                console.log("if");
        }else{
                console.log("ok");
                html = "<div id=\""+data.sender+"\" class=\"row sideBar-body\" onclick=\"chat('"+data.sender+"','"+data.sname+"')\"><div class=\"col-sm-3 col-xs-3 sideBar-avatar\"><div class=\"avatar-icon\"><img src=\"static/person.png\" style=\"width:55;height:55\"></div></div><div class=\"col-sm-9 col-xs-9 sideBar-main\"><div class=\"row\"><div class=\"col-sm-8 col-xs-8 sideBar-name\"><span class=\"name-meta\">"+data.sname+"</span><br><span id=\""+data.sender+"-message\" class=\"name-meta\" style=\"color:grey;white-space:nowrap;text-overflow:ellipsis\">"+data.message+"</span></div><div class=\"col-sm-4 col-xs-4 pull-right sideBar-time\"><span class=\"time-meta pull-right\">18:18</span></div></div></div></div>";
    

		document.getElementById("chatlist").innerHTML += html;
        }       

                chat_history();
                //update_chat_word(data.sender,data.message);

        
                if(receiver==data.sender){
                        var today = new Date();
                        var date = today.getDate()+''+String(today.getMonth()+1).padStart(2, '0')+''+today.getFullYear();
                        var date1 = today.getDate()+'/'+String(today.getMonth()+1).padStart(2, '0')+'/'+today.getFullYear();
                        console.log(date,date1);

                        var element =  document.getElementById('d'+date);
                        if (typeof(element) != 'undefined' && element != null)
                        {
                                }else{
                                document.getElementById('conversation').innerHTML +="<br><center><div id=\"d"+date+"\" style=\"height:auto;width:20%;background:#5AB4CF;padding:8px;border-radius:10px;font-size:75%\">"+date1+"</div></center><br>";
                        
                        }
                html="<div class=\"row message-body\" style=\"height:auto\"><div class=\"col-sm-12 message-main-receiver\" style=\"height:auto\"><div class=\"receiver\" style=\"height:auto\"><div class=\"message-text\" style=\"height:auto\">"+data.message+"</div><span class=\"message-time pull-right\" style=\"height:auto\">"+data.time+"</span></div></div></div>";
                document.getElementById('conversation').innerHTML +=html;
                var scroll = document.getElementById('conversation');
                scroll.scrollTop = scroll.scrollHeight - scroll.clientHeight;
                }

        //document.getElementById("messages").innerHTML += html;
});
        


// $(".heading-compose").click(function() {
    //   $(".side-two").css({
    //     "left": "0"
    //   });
    // });

    // $(".newMessage-back").click(function() {
    //   $(".side-two").css({
    //     "left": "-100%"
    //   });
    // });