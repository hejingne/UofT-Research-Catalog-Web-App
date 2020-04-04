# team28
# [Table of Contents](#top)
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
5. [Access Database](#db)


<a name="url"></a>
## Deployed App URL 
https://limitless-retreat-03123.herokuapp.com

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
default login credentials:
  * [Student] email: **user** &ensp; &ensp; password: **user**

  * [Researcher] email: **user2** &ensp; &ensp; password: **user2**

  * [Admin] email: **admin** &ensp; &ensp; password: **admin**

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
  * [new]update self-introduction by moving your mouse to the description region under name
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
 
 2. [new] Handle submitted applications under `RECIEVED APPLICATIONS` tab.

#### admin

1. Manage users in `My Profile`. Under this tab, an admin can
    * add and remove users
    * handle change password request

<a name="routes"></a>
## Routes in Express Server 

<a name="users"></a>
### Users 
| Route        | Method         | Usage  | Data Involved
|:------:|:-----:|:---------:|:-------------------------:|
| /api/user/create | POST | create a new user | |
| /api/user/authenticate | POST | authenticate a user | |
| /api/user/updatePassword| PUT | upate password |  |
| /api/user/updateEmailAddressAndUserType|  PUT | update email and user type| |
| /api/user/signOut| GET | sign out  | |
| /api/user/session/:sessionId| GET | get current signed in user |  |
| /api/user/users| GET | fetch all users in database||
| /api/user/delete/:emailAddress| DELETE| delete a user with emailAddress| |

<a name="profiles"></a>
### Profiles
| Route        | Method         | Usage  | Data Involved
|:------:|:-----:|:---------:|:-------------------------:|
| /api/profile/:emailAddress | GET | | |
| /api/profile/updateInterests | PUT | | |
| /api/profile/updateProfilePicture| PUT | | |
| /api/profile/updateDescription|  PUT   | |  |
| /api/profile/updateEmploymentInfo| PUT | |  |

<a name="applications"></a>
### Applications
| Route        | Method         | Usage  | Data Involved
|:------:|:-----:|:---------:|:-------------------------:|
| /api/application/applications | GET |  |  |
| /api/application/create | POST|  |  |
| /api/application/delete/:id| DELETE |  | |
| /api/application/applications/:emailAddress| GET |   |  |
| /api/application/applications/researchId/:researchId| GET |  |   |
| /api/application/accept/:id| PATCH |   |  |
| /api/application/reject/:id| PATCH   |   |  |
| /api/application/review/:id| PATCH   |   |  |
| /api/application//offer/:id| PATCH |  |   |

<a name="postings"></a>
### Postings
| Route        | Method         | Usage  | Data Involved
|:------:|:-----:|:---------:|:-------------------------:|
| /api/manage-posting/postings | GET |  |  |
| /api/manage-posting/postings | POST |  |   |
| /api/manage-posting/:email| GET |  |   |
| /api/manage-posting/createPosting|  POST   |  |   |
| /api/manage-posting/deletePosting| DELETE |  |  |


<a name="db"></a>
## Access Database
In MongoDB Compass, connect to this url

   >mongodb+srv://admin:admin@csc309-uoftresearchcatalogue-sql0-gzdxk.mongodb.net/uoftresearchcatalogue
