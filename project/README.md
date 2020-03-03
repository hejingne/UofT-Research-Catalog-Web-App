This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Usage

### As a Student, you can

#### 1. Login or Sign up
The default login credential for **Student** is 

Email: **user** &ensp; &ensp; Password: **user**

note: Since we are not using database, a new account cannot be successfully signed up. We only allow the default users to login.
#### 2. View Homepage
The homepage includes
   * an image slider introducing the recent news on research opportunities
   * a search bar, where you type in keywords to search for research posts; a keyword should be related to some research area or a researcher name, e.g., global warming, machine learning, Steven
   * a list of research posts with title, researcher, deadline and duration
 
#### 3. Apply for a research opportunity
  * You can apply for a research opportunity by clicking on the `APPLY` button to the right of that post. 
  * An application page will pop out, which requires you to fill in some information and submit two files.
 
#### 4. Use Menu Icon to explore the website
Options include

  * `Home` - Go back to user home page
  * `My Profile` - Visit profile page
  * `Sign out`

#### 5. Manage Profile
Click on `My Profile` on the menu to manage your account. Operations include
  * Adding and deleting research areas that you are interested in
  * Viewing and editing account information by clicking on `DASHBOARD`
  * Viewing submitted applications and their status by clicking on `SUBMITTED APPLICATIONS`
  * Changing password by cliking on `ACCOUNT SETTINGS`
  
### As a Researcher, you can

#### 1. Login or Sign up
The default login credential for **Researcher** is 

Email: **user2** &ensp; &ensp; Password: **user2**

#### 2. View Homepage
This section is the same as that of **Student** except there is no `APPLY` button.
 
#### 3. Use Menu Icon to explore the website
See **Student** section.

#### 4. Manage Profile
Click on `My Profile` on the menu to manage your account. Operations include
  * Adding and deleting research areas that you are interested in
  * Viewing and editing account information by clicking on `DASHBOARD`
  * Viewing posted applications and their status, Creating posts by clicking on `POSTED OPPORTUNITIES`
  * Changing password by cliking on `ACCOUNT SETTINGS`


### As an Administrator, you can

#### 1. Login
The default login credential for **Administrator** is 

Email: **admin** &ensp; &ensp; Password: **admin**

#### 2. View Homepage
This section is the same as that of **Student** except there is an additional `REMOVE` button to remove a post.
 
#### 3. Use Menu Icon to explore the website
options are provided by the menu:
  * `Home` - Go back to user home page
  * `My Profile` - Visit profile page
  * `User Requests` - Handle user requests (e.g., changing password)
  * `User List` - View the list of users; Can remove a user if needed
  * `Sign out`

#### 4. Manage Profile
This section is the same as that of **Student** except there is no `SUBMITTED APPLICATION` tab.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
