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
* Update and save the configuration, `.env` file under /webapi
  ```
    DATABASE_HOST=""
    DATABASE="postgres"
    DATABASE_USERNAME=""
    DATABASE_PASSWORD=""
    APP_NAME="Express Webapi"
    PORT=
    MAX_CONNECTION=20          //Max number of requests allowed to call the web service per minute
  ```
* Update and save `<project_root>` in /webapi/service.js
* Install all npm required by running the following commands in cmd
    - `cd <project_root>/webapi`
    -  `npm install`
* Install web service as window service by running the following command in cmd
    - `node service.js`
    - Click yes to all window pop-ups. 
        - If the installation of the web service is successful, you can find `Express WebAPI` under Window Service. (By default, it is started.) 
![image](https://github.com/oxford-pharmacoepi/database_connection_dashboard/assets/114593559/0a1ee321-d80a-4082-b079-750a466f8dae)
       
## Part B - Deploy Web App in Tomcat Server
* Update and save `config.js` under /webapp/database_connection_dashboard
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
## Case 1: Update Web App ONLY (!!!No need to stop web service!!!)
* stop tomcat
* update and save /database_connection_dashboard/`config.js` in Tomcat webapps folder, <tomcat_root>/webapps
* start tomcat

## Case 2: Update Web Service 
* stop tomcat or undeploy web app `database_connection_dashboard`
* stop window service, `Express WebAPI`
* update and save `.env` file under <project_root>/webapi
* start window service, `Express WebAPI`
* start tomcat

Uninstall Web Service
============
!!! Undeploy the Web App first !!!
* Update and save `<project_root>` in /webapi/uninstall-service.js
* (Skip this steps if you already installed all required npm) Install all npm required by running the following commands in cmd 
    - `cd <project_root>/webapi`
    -  `npm install`
* Uninstall web service in window service by running the following command in cmd
    - `node uninstall-service.js`
    - Click yes to all window pop-ups. 
        - If the uninstallation is successful, `Express WebAPI` will been removed under Window Service.
