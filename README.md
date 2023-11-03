Database Connection Dashboard
=============
A react app to provide information about connections  in a database. 

Prerequisite
=============
* Node JS v18+
    - You can check your Node JS version by command `node -v`
    - You can download the latest version of Node JS from https://nodejs.org
* Web Server (e.g. Tomcat)

Installation
============
## Part A - Web Service
* Update the configuration, `.env` file under /webapi
  ```
    DATABASE_HOST=""
    DATABASE="postgres"
    DATABASE_USERNAME=""
    DATABASE_PASSWORD=""
    APP_NAME="Express Webapi"
    PORT=
    MAX_CONNECTION=20          //Max number of requests allowed to call the web service per minute
  ```
* Update `<project_root>` in /webapi/service.js
* Install all npm required by running the following commands in cmd
    - `cd <project_root>/webapi`
    -  `npm install`
* Install web service as window service by running the following command in cmd
    - `node service.js`
    - Click yes to all window pop-ups. 
        - If the installation of the web service is successful, you can find it under Window Service. (By default, it is started.) 
![image](https://github.com/oxford-pharmacoepi/database_connection_dashboard/assets/114593559/0d08b57e-a668-4b3e-9d98-78eda14472cf)

       
## Part B - Deploy Web App in Tomcat Server
* Update `config.js` under \database_connection_dashboard
  ```
  {
      "webapi_url": "<the link of your Web server>",
      "title": "<title shown in the web app>",
      "tooltips_msg": "<tooltip message under search bar>"
  }
  ```
* Stop tomcat server
* Copy the /database_connection_dashboard folder to Tomcat webapps folder, <tomcat_root>/webapps
* Start tomcat
* - If the web app has been deployed successfully, you can access it by http://<tomacat_server_hostname>:<port>/database_connection_dashboard

Update Configuration after Deployment
============
* stop tomcat
* stop window service
* update `.env` file under /webapi
* update /database_connection_dashboard/`config.js` in Tomcat webapps folder if needed
* start window service
* start tomcat
