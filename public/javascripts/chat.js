$(document).ready(function () {

  var messages = [];
  var socket = io.connect('http://localhost:3700');
  var field = $("#field");
  var sendButton = $("#send");
  var content = $("#content");
  var name = $("#name");

  socket.on('message', function (data) {
    console.log(data);
    if (data.message) {
      messages.push(data);
      var html = '';
      for (var i = 0; i < messages.length; i++) {
        html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
        html += messages[i].message + '<br />';
      }
      content.html(html);
      content.scrollTop(content[0].scrollHeight);
    } else {
      console.log("There is a problem:", data);
    }
  });

  sendButton.click(sendMessage = function () {
    if (!name.val()) {
      alert('Please type your name!')
    } else {
      socket.emit('send', { message: field.val(), username: name.val() });
      field.val('');
    }
  });

  $("#field").keyup(function (e) {
    if (e.keyCode == 13) {
      sendMessage();
    }
  });

});
