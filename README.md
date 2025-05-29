# static-site-form-handler

A serverless form submission backend for static websites, using AWS API Gateway, Lambda, and SES.

## Use Case

Use this to power contact forms or newsletter signups on static sites (e.g., Netlify, GitHub Pages, S3 websites) without needing a backend server.

## Background

Built something similar years ago, for a friend with a small business and a static site. Wanting to codify it as IAC to refresh technical skills.

##  Stack

- AWS API Gateway – exposes the public form submission endpoint
- AWS Lambda (Node.js) – parses and validates form data, formats the email
- AWS SES – sends the email to the specified recipient

## Data Flow

1. User fills out a form and clicks Submit.
2. JavaScript sends the form data to the API Gateway endpoint.
3. Lambda receives the event, builds a clean HTML email, and sends it via SES.
4. Recipient gets an email with the form submission details.

## Features

- Works with any static HTML site
- Low cost: no backend server required, and lambda processing means you only pay for what you use
- Protects email address from being exposed in the frontend
- Easily customizable

## Setup Instructions

Prerequisites:
 - AWS Account
 - Domain you own
 - SES-verified domain and email(s)
 - AWS CLI configured locally: [https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-prereqs.html)

## To Do

- Add templating to pull in email(s), region, etc.
- Add Github Actions to do the deploy instead of locally
- Add spam filtering
- Add reCAPTCHA integration
- Add auto-responder email (have to clarify feasibility to sending external emails with SES)
