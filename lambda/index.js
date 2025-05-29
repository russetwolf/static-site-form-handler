
const AWS = require("aws-sdk");
const SES = new AWS.SES({ region: "ca-central-1" }); // Should template this region as well

const formSubmissionEmailAddress = "TBD@TBD.com"// The email of whoever needs to see the form submissions - ideally to be templated with TF

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const { name, email, message } = body; // can make this more generic by itterating over the object's keys, but then validation is harder. Maybe push that to the FE to avoid lambda costs anyway?

    if (!name || !email || !message) { // thought: Is message required? May be fine to allow an empty message depending on business usecase
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    const emailParams = {
      Destination: {
        ToAddresses: [formSubmissionEmailAddress], 
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `
              <h1>New Contact Form Submission</h1>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
            `,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: `New Form Submission from ${name}`,
        },
      },
      Source: formSubmissionEmailAddress,
    };

    await SES.sendEmail(emailParams).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully" }),
      headers: {
        "Access-Control-Allow-Origin": "*", // For CORS
      },
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email" }),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
};
