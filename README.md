# questions

## What is this?
This is a questions-processing app as an exercise for Pluralsight. :)

I originally wrote an app based on the application built during the Pluralsight course 
"Building a full stack app with React and Express". 
https://app.pluralsight.com/library/courses/react-express-full-stack-app-building

My intent was to just go through the tutorial, pick up the information about how to connect the front and back end, maybe learn a little about authentication, and then move on.

I really should have known that I was a) going to love learning React too much to give that up, and b) going to run into some completely bizarre bug that would derail me for several days.

Eventually I gave up and rewrote the entire application in Angular.

This README includes: 

* Requirements for running locally
* Assumptions
* Limitations and known issues
* Packages used, and why
* Notes about what I'm learning

## Running locally

You will need Node, NPM, and MongoDB.

1. Run ***npm install*** from the top level application folder. This will install the dependencies. 
2. Set up a local MongoDB install to run on port 27017 (the default, at least for Windows).
3. You may need to enable authentication for MongoDB. https://docs.mongodb.com/manual/tutorial/enable-authentication/
   If you do, you might need to create a .env file with this line: 
   LOCAL_URI = 'mongodb://USER:PASSWORD@localhost:27017/pluralsight-jmroy'
4. For Windows, start MongoDB by navigating to the folder where MongoDB is installed, opening a command line, and executing ***mongod.exe***. Leave this running.
5. In a separate command line window, initialize the database by running ***npm run initialize***. This will take the data from the csv (included here as questions.csv -- see "Limitations and known issues" below) and load it into the MongoDB database. This only needs to be done once. 
6. Run ***npm run start-dev*** from the top level application folder. Leave this running. This will start both the back end server (on port 7777) and front end server (on port 8080), and it will open up a browser for you to localhost:8080.

## To Do List
* Allow adding to the distractors multiple
* Allow removing from the distractors multiple
* Confirm that edit works... it might be slowness accessing the database
* Get delete to actually delete from the store
* Get delete to actually delete from the database
* Get add to actually add to the store
* Get add to actually add to the database
* Confirm that the APIs can be accessed via JSON
* validate and sanitize
* See if you can get the original CSV file read in

## Assumptions

This application assumes that:
* All of the distractors for a given question will be unique.
* No # characters are used in the CSV file. (See Limitations and known issues, below.)

## Limitations and known issues

* I converted the CSV file delimiters. The utility I am using for importing into MongoDB could not handle | as a delimiter. Rather than spending more time looking for a better way to import the CSV into MongoDB, I decided to convert. Since there were no # characters in the CSV file, I replaced the existing commas with #, and then replaced the | delimiter with commas. This allowed me to use the csvtojson tool to import the file into json.

* Loading the questions, at least for me locally, is a bit slow.

* This isn't the most secure application. It could really use an authentication mechanism for both the app and the APIs, and some route guards.

## Packages used

### Production dependencies

 * dotenv - environment variable assistant
 * uuid - random id generator

### Dev dependencies:

 * babel - JavaScript compiler, including converting React JSX syntax
 * body-parser - for POST http requests
 * concurrently - to start up the web server and the front end dev server simultaneously
 * cors - cross origin request security
 * eslint - linter
 * express - receive http requests on the back end
 * mongodb - database
 * webpack - bundling

## Lessons learned along the way

### 1. Redux helps us manage state

I hadn't worked with Redux before, so I wanted to make a quick summary of what I learned:

As it says on the React Redux website: React Redux "lets your React components read data from a Redux store, and dispatch actions to the store to update data."

* The ***Provider*** API mentioned above makes the Redux store available to the app.
* The ***connect*** function takes two arguments: mapStateToProps and mapDispatchToProps, both optional. It returns a function, and when you run that function on a component (such as QuestionList) you get a connected component (such as ConnectedQuestionList).
  * mapStateToProps describes which part of the store's data the component needs
  * mapDispatchToProps "is used for dispatching actions to the store". 

Here's an interesting blog article about mapDispatchToProps in function form or in object form: https://daveceddia.com/redux-mapdispatchtoprops-object-form/

### 2. Encountered two children with the same key

This bug was so clear in hindsight:

    Warning: Encountered two children with the same key, `{group.id}`. Keys should be unique so that components maintain their identity across updates.

I had key="{groupId}" instead of key={groupId} (it shouldn't have quotation marks). 

### 3. When to use curly braces on import?

I realized as I was following along with the Pluralsight tutorial that I didn't know why the presenter was sometimes using curly braces at import and sometimes not. Here's a good explanation: http://2ality.com/2014/09/es6-modules-final.html

### 4. Router

The tutorial doesn't really explain what "match" is or where it comes from (used in TaskDetail.jsx). I found a pretty good page on it (and other features of React's Router) here:
https://medium.freecodecamp.org/hitchhikers-guide-to-react-router-v4-4b12e369d10

### 5. Node, NPM, and Heroku

I had a discussion with a very helpful Puralsight'r here:
https://app.pluralsight.com/library/courses/react-express-full-stack-app-building/discussion

The short version of that discussion: My deploy to Heroku wasn't working. It would deploy but then immediately crash on the heroku side. I tracked it down to this: I had specified (in package.json) the version of Node that I was using locally, and this turned out to be a higher version of Node than the instructor was using in the React course. Somewhere between his version and mine, something had changed that was causing the deploy to Heroku to stop working. So, this project is running Node 9.2.0, even though that is not the latest version available.

### 6. Functional vs. Class components

I don't really have enough experience yet to take a stand on functional components vs. class components in React. I'm using functional components here because that's what I learned to do, and it wasn't until after the project was mostly coded that I learned that class components exist!

https://medium.freecodecamp.org/7-reasons-to-outlaw-reacts-functional-components-ff5b5ae09b7c
https://medium.freecodecamp.org/8-key-react-component-decisions-cc965db11594
https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc

### 7. This was a MUCH bigger project than I meant it to be.
