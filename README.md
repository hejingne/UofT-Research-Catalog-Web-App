# team28


## Deployed App URL
https://limitless-retreat-03123.herokuapp.com


## Build and Run
1. launch server
```bash
cd server
npm i
cd src
npx nodemon server
```
2. run client
```bash
 cd client
 npm i
 npm start
```

## Usage
### Common features for all users:

#### 1. Login and Sign up
default login credentials:
  * [Student] email: **user** &ensp; &ensp; password: **user**

  * [Researcher] email: **user2** &ensp; &ensp; password: **user2**

  * [Admin] email: **admin** &ensp; &ensp; password: **admin**

#### 2. Searching
User can apply filters when searching for research opportunities; sort results in different ways; click on research title to get more information; visit researcher's profile by clicking on researcher's name

#### 3. Navigation Tool

* Click the menu icon at top right with options
  * `Home` - Go back to user home page
  * `My Profile` - Visit profile page
  * `Sign out`
  
* Click the U of T logo at top left to visit home page

#### 4. Manage Profile
Click on `My Profile` on the menu to manage your account. Operations include
  * update self-introduction by moving your mouse to the description region under name
  * maintain an interest-list by clicking on the plus icon
  * view and editing account information by clicking on `DASHBOARD`
  * changing password and profile picture by cliking on `ACCOUNT SETTINGS`
  
  
### Specific features:
#### As a student, you can

 1. View submitted applications and their status in `My Profile` under `SUBMITTED APPLICATION` tab.
    
 2. Submit applications by clicking on `APPLY` button for the researcn. When filling out the application form, the information stored in databse (name, email, file, etc) is auto-filled for the user.

#### As a researcher, you can

 1. Manage posting in `My Profile` under `MANAGE POSTING`. Under this tab, a researcher can
    * create a new post
    * view current posts
    * edit, remove current posts
 
 2. Handle submitted applications under `RECIEVED APPLICATIONS` tab.

#### As an administrator, you can

1. Manage users in `My Profile`. Under this tab, an admin can
    * add and remove users
    * handle change password request
