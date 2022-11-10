
# Send Email Server (API documentation)

This service is created so that you can send email to yourself from your code

## ways to send email by this API
```
  1. With Registration
  2. Without Registration
```
 
#### 1. Without Registration

| advantages              | disadvantages        | 
|  :--------              | :-------             | 
| Easy to implement       | no database storage  | 

#### 2. With Registration

| advantages                 | disadvantages        | 
|  :--------                 | :-------             | 
| can be stored in database  | Hard to implement    | 


## how to implement?


#### 1. Without Registration

    ENDPOINT: 

          https://email-server-node-js.onrender.com/contact

    BODY:  

          Required : 
              1.reciver_mail : where you want to recieve the email
              2.reciver_pass : app password of that gmail account


          Optional : 
              1.firstName
              2.lastName
              3.email
              4.topic
              5.message
              6.phone

          Content-Type : application/json

          for example : 

          {
              "reciver_mail":"yourEmail@gmail.com",
              "reciver_pass":"yourPassword",
              "firstName":"Firstnamee",
              "lastName":"Lastname",
              "email":"someEmail@hotmail.com",
              "topic":"sample topic",
              "message":"sample message",
              "phone":"1234567890"
          }

To learn moree about google app password click [here](https://support.google.com/accounts/answer/185833)
 
Example screenshot of how you have to send a request

![App Screenshot](https://github.com/joyjames143/email-server-node/blob/main/screenshots/postman%20without%20registeration.png?raw=true)

