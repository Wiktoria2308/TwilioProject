const express = require('express');

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//use the application off of express.
let app = express();

//define the route for "/"
app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.get('/sendemail', function (request, response) {
  let customer_name = request.query.customer_name;
  let customer_email = request.query.email;
  let subject = request.query.subject;
  let customer_message = request.query.message;

  let from_email = 'wiktoria.nikola@icloud.com';

  if (customer_name != '' && customer_email != '' && subject != '' && customer_message != '') {
    const msg = {
      name: customer_name,
      to: customer_email,
      from: from_email,
      subject: subject,
      html: customer_message,
    };

    sgMail
      .send(msg)
      .then((response) => {
        console.log(response[0].statusCode);
        console.log(response[0].headers);
      })
      .catch((error) => {
        console.error(error);
      });
    response.send(
      "<h1 style='text-align:center;border: none;border-bottom: 5px solid black;line-height: 38pt;width: 250px;margin:auto;margin-top:100px;'>Email is sent.</h1><p style='text-align:center;'>The message may have landed in the spam folder.</p>",
    );
  } else {
    response.send(
      "<h1 style='text-align:center;border: none;border-bottom: 5px solid black;line-height: 38pt;width: 450px;margin:auto;margin-top:100px;color: red'>Please provide all information.</h1>",
    );
  }
});

//start the server
app.listen(8080);


console.log('Something awesome to happen at http://localhost:8080');
