# UofT-Research-Catalogue-Web-App
[](#top)
# Table of Contents
1. [Deployed App URL](#url)
2. [Build and Run Locally](#build)
3. [Usage](#usage)
   * [Common features for all users](#common)
   * [Specific features](#specific)
4. [Routes in Express Server](#routes)
   * [Users Related](#users)
   * [Profiles Related](#profiles)
   * [Applications Related](#applications)
   * [Postings Related](#postings)


<a name="url"></a>
## Deployed App URL 
https://uoftresearchcatalogue.herokuapp.com

<a name="build"></a>
## Build and Run Locally 
In root directory, run
```bash
npm i
npm run start:dev
```

**note:** When you run it locally, please make sure your NODE_ENV is not set to `production`.


<a name="usage"></a>
## Usage 

<a name="common"></a>
### Common features for all users:

#### 1. Login and Sign up
As Student / Researcher / Admin 

#### 2. Searching
[new feature] User can apply filters when searching for research opportunities; sort results in different ways; visit researcher's profile by clicking on researcher's name

One can also click on research title to get more information.

#### 3. Navigation Tool

* Click the menu icon at top right with options
  * `Home` - Go back to user home page
  * `My Profile` - Visit profile page
  * `Sign out`
  
* Click the U of T logo at top left to visit home page

#### 4. Manage Profile
Click on `My Profile` on the menu to manage your account. Operations include
  * [new] update self-introduction by moving your mouse to the description region under name
  * maintain an interest-list by clicking on the plus icon
  * view and editing account information by clicking on `DASHBOARD`
  * changing password and profile picture by cliking on `ACCOUNT SETTINGS`

 
<a name="specific"></a>  
### Specific features:
#### student

 1. [new] View submitted applications and their status in `My Profile` under `SUBMITTED APPLICATION` tab.
    
 2. Submit applications by clicking on `APPLY` button for the researcn. 
 
 [new] When filling out the application form, the information stored in databse (name, email, file, etc) is auto-filled for the user.

#### researcher

 1. Manage posting in `My Profile` under `MANAGE POSTING`. Under this tab, a researcher can
    * create a new post
    * view current posts
    * [new] edit, remove current posts
    * [new] view removed posts
 
 2. [new] Handle submitted applications under `RECIEVED APPLICATIONS` tab. Under this tab, user can
    * click on research title to view applicant's information
        * click on submitted files (CV or transcript) to change the application status to `under review`, so that the action buttons are displayed (e.g., SEND OFFER)
    

#### admin

1. Manage users in `My Profile`. Under this tab, an admin can
    * add and remove users
    * [new] change user type
    * [new] view list of applications and their status; delete applications

<a name="routes"></a>
## Routes in Express Server 

<a name="users"></a>
### Users 
| Route        | Method         | Description
|:------:|:-----:|:---------:|
| /api/user/create | POST | create a new user and profile;<br> save them in databse | 
| /api/user/authenticate | POST | authenticate a user by comparing provided data (email, password) with that in database | 
| /api/user/updatePassword| PUT | given a new (email, password) pair, find the right user and store new pwd in database|  
| /api/user/updateEmailAddressAndUserType|  PUT | update email and user type| 
| /api/user/signOut| GET | sign out  | 
| /api/user/session/:sessionId| GET | get current signed in user |  
| /api/user/users| GET | fetch all users in database|
| /api/user/delete/:emailAddress| DELETE| delete a user with emailAddress| 

<a name="profiles"></a>
### Profiles
| Route        | Method         | Description
|:------:|:-----:|:---------:|
| /api/profile/:emailAddress | GET |fetch a user's profile given email|
| /api/profile/updateInterests | PUT |update the list of interests in profile with input from user|
| /api/profile/updateProfilePicture| PUT |change profile picture to the one uploaded by user|
| /api/profile/updateDescription| PUT  |change description of a user given input from user|
| /api/profile/updateEmploymentInfo| PUT | update employment information provided by the user|

<a name="applications"></a>
### Applications
| Route        | Method         | Description
|:------:|:-----:|:---------:|
| /api/application/applications | GET |  fetch all applications stored in database  |
| /api/application/create | POST|  create a new application given information filled by the user |
| /api/application/delete/:id| DELETE | delete an application with _id |
| /api/application/applications/:emailAddress| GET | fetch an application given user's email from database |
| /api/application/applications/researchId/:researchId| GET |   get an application with id researchId  |
| /api/application/accept/:id| PATCH | change the status of the application with _id to "accepted" |
| /api/application/reject/:id| PATCH   |  change the status of the application with _id to "rejected" |
| /api/application/review/:id| PATCH   |  change the status of the application with _id to "under review" |
| /api/application/offer/:id| PATCH |change the status of the application with _id to "offered"|

<a name="postings"></a>
### Postings
| Route        | Method         | Description
|:------:|:-----:|:---------:|
| /api/manage-posting/postings | GET |fetch all postings  |
| /api/manage-posting/postings | POST | initialize a new posting with empty postings and save it in database |
| /api/manage-posting/:email| GET | fetch a posting with corresponding email |   
| /api/manage-posting/createPosting|  POST   | create a new posting and store it in database    |
| /api/manage-posting/deletePosting| DELETE |  delete a research for a researcher, given research's _id |


<a name="db"></a>
