
# Send Email Server {with database backup}
##(API documentation)

This service is created so that you can send email to yourself from your code

## ways to send email by this API
```
  1. With Registration
  2. Without Registration
```
 
#### 1. Without Registration

| advantages                   | disadvantages        | 
|  :--------                   | :-------             | 
| very Easy to implement       | no database storage  | 
|                              | loss of some email if problem while sending  | 

#### 2. With Registration

| advantages                                                               | disadvantages            | 
|  :--------                                                               | :-------                 | 
| choose which mail to store in database                                   | not easy to implement    | 
| problem while sending email,..those mails will also be stored in database|

## how to implement?


### 1. Without Registration

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

### 2. With Registration

    step 1 : resister
    step 2 : send mail using access token
    step 3 : if access token expires use refresh token to get new access token
    step 4 : if refresh token expires login to get new access & refresh token
    step 5 : view all emails(sent/notsent) stored in the database

#### 2.1 how to register ?

###### Request : 
    EndPoint : https://email-server-node-js.onrender.com/registeruser

    body : 
              {
                "service":"gmail",
                "password":"your_APP_password",
                "email":"youremail@gamil.comm"
              }
###### Response : 
      {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoieW91cmRlbWFpbEBnYW1pbC5jb21tIiwiaWF0IjoxNjY4MDQ5NjE4LCJleHAiOjE2NjgwNTMyMTh9.IB4oaIUiylo9ymvcssOVHJk8XS__NwQLvoeaZtVvQBI",
        "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoieW91cmRlbWFpbEBnYW1pbC5jb21tIiwiaWF0IjoxNjY4MDQ5NjE4LCJleHAiOjE2NzU4MjU2MTh9.cWESEMoeNBFrNx0pVTpFOdU_YbSHKkR2haoojQiW99Q",
        "access_token_expires_in": "3600 seconds",
        "refresh_token_expires_in": "7776000 seconds"
      }
###### example : 
![App Screenshot](https://github.com/joyjames143/email-server-node/blob/main/screenshots/register.png?raw=true)

#### 2.1 how to send mail using access token ?
###### Request : 
    EndPoint : https://email-server-node-js.onrender.com/registeruser

    body : 
              {
                "service":"gmail",
                "password":"your_APP_password",
                "email":"youremail@gamil.comm"
              }
###### Response : 
      {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoieW91cmRlbWFpbEBnYW1pbC5jb21tIiwiaWF0IjoxNjY4MDQ5NjE4LCJleHAiOjE2NjgwNTMyMTh9.IB4oaIUiylo9ymvcssOVHJk8XS__NwQLvoeaZtVvQBI",
        "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoieW91cmRlbWFpbEBnYW1pbC5jb21tIiwiaWF0IjoxNjY4MDQ5NjE4LCJleHAiOjE2NzU4MjU2MTh9.cWESEMoeNBFrNx0pVTpFOdU_YbSHKkR2haoojQiW99Q",
        "access_token_expires_in": "3600 seconds",
        "refresh_token_expires_in": "7776000 seconds"
      }
###### example : 
![App Screenshot](https://github.com/joyjames143/email-server-node/blob/main/screenshots/register.png?raw=true)
