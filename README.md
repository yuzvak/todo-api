# todo-api
implement API for TODO list
use `npm start` to run

# API Endpoints
* [User registration](#user-reg)
* [User authorization](#user-auth)
* [Task management](#task)

<a name="user-reg"></a>
**User registration**
----
  Registers a new user

* **URL**

  /api/user/reg

* **Method:**

  `POST`
  
*  **URL Params**

       None

* **Data Params**

       username: String
       password: String
       
* **Headers**

      no required
      
* **Success**

      Returns object with user

<a name="user-auth"></a>
**User auth**
----
  User authorization

* **URL**

  /api/user/auth

* **Method:**

  `POST`
  
*  **URL Params**

       None

* **Data Params**

       username: String
       password: String
       
* **Headers**

      no required
      
* **Success**

      Returns a JWT token

<a name="task"></a>
**Task management**
----
All methods need an authorization token in the header
```javascript
Authorization: Bearer <token>
```
* **URL**

  `POST` /api/todo - creating a new task  
  * Need `task (String)` body parameter  
  
  `GET` /api/todo - get user tasks 
  * Does not require additional parameters
  
  `PUT` /api/todo - update task status  
  * Need `id (Number) and task (String)` body parameter
  
  `DELETE` /api/todo - delete task
  * Need `id (Number)` query parameter