# build-Bookstore-App
https://github.com/Sabchai/Bookstore-updated 

## How to run this project:

### For Frontend 
Follow the below steps to run the project: 
- Firstly clone or unzip the project folder.
* Go to the frontend directory by using the following command ``` cd frontend ```.
* * create a **.env.local** file in the backend root directory as the same level where the **package.json** is located and keep the following environment variables there:
```
>>> Stepup firebase app and configure the environment

VITE_API_KEY=AIzaSyBglrQYxiPUHZtH-5hDaDqMQy3abWMOCx8
VITE_AUTH_DOMAIN=bookstore-app-a91ab.firebaseapp.com
VITE_PROJECT_ID=bookstore-app-a91ab
VITE_STORAGE_BUCKET=bookstore-app-a91ab.firebasestorage.app
VITE_MESSAGING_SENDER_ID=1088066445836
VITE_APP_ID=1:1088066445836:web:339616357666bc6d638429
```
+ Then run `` npm install `` commend to install node dependencies.
- Finally, to run the project, use ``npm run dev`` command.


### For Backend
Follow the below steps to run the project: 
- Firstly clone or unzip the project folder.
* Go to the backend directory by using the following command ``` cd backend```.
+ Then run `` npm install `` commend to install node dependencies.
* create a **.env** file in the backend root directory as the same level where the **package.json** is located and keep the following environment variables there: 
```

Note: Please setup mongodb and change the MongoDB url and set your jwt secret key above.
```

- Finally, to run the project, use ``npm run start:dev`` command.
