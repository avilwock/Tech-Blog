# Tech-Blog

## Table of Contents ![License](https://img.shields.io/badge/license-MIT%20license-blue)

- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Future Implementations](#future-implementations)
- [Access](#access)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Description

Writing about tech can be just as important as making it. Developers spend plenty of time creating new applications and debugging existing codebases, but most developers also spend at least some of their time reading and writing about technical concepts, recent advancements, and new technologies. A simple Google search for any concept covered in this course returns thousands of think pieces and tutorials from developers of all skill levels!

Your task this week is to build a CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well. You’ll build this site completely from scratch and deploy it to Heroku. Your app will follow the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

## User Story

```md
AS A developer who writes about tech
I WANT a CMS-style blog site
SO THAT I can publish articles, blog posts, and my thoughts and opinions
```

## Acceptance Criteria

```md
GIVEN a CMS-style blog site
WHEN I visit the site for the first time
THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
WHEN I click on the homepage option
THEN I am taken to the homepage
WHEN I click on any other links in the navigation
THEN I am prompted to either sign up or sign in
WHEN I choose to sign up
THEN I am prompted to create a username and password
WHEN I click on the sign-up button
THEN my user credentials are saved and I am logged into the site
WHEN I revisit the site at a later time and choose to sign in
THEN I am prompted to enter my username and password
WHEN I am signed in to the site
THEN I see navigation links for the homepage, the dashboard, and the option to log out
WHEN I click on the homepage option in the navigation
THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
WHEN I click on an existing blog post
THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
WHEN I enter a comment and click on the submit button while signed in
THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
WHEN I click on the dashboard option in the navigation
THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
WHEN I click on the button to add a new blog post
THEN I am prompted to enter both a title and contents for my blog post
WHEN I click on the button to create a new blog post
THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
WHEN I click on one of my existing posts in the dashboard
THEN I am able to delete or update my post and taken back to an updated dashboard
WHEN I click on the logout option in the navigation
THEN I am signed out of the site
WHEN I am idle on the site for more than a set time
THEN I am able to view posts and comments but I am prompted to log in again before I can add, update, or delete posts
```

## Future Implementations

* Allow comments to be commented on

## Access

To access this repository, please visit: https://github.com/avilwock/E-Commerce-Platform

To access this site, please visit: https://warm-sands-36519-225dbeb270ac.herokuapp.com/ 

## Installation

To install this to your computer, clone the repositoryRun npm install in the terminal

Open mysql and source the schema

Seed the data by typing in node seeds/index.js

## Usage

To use on your local server, type in node server into the integrated terminal.

Then open a browser and type in http://localhost:3001 to reach the homepage

Click login and you can either log in, or create a new username password.

Once logged in, you can view the dashboard with your posts and comments on it.

To add a new post, click add new post

To update a post click view post, and then you can make changes. You can also delete the post from here.

If you would like to add a comment to someone else's post, you can do so on the homepage by typing a comment into the comment box and selecting submit

Login

![alt text](public/images/TechBlog4.jpeg)

Sign Up

![alt text](public/images/TechBlog5.jpeg)

Home Page

![alt text](public/images/TechBlog1.jpeg)

Dashboard

![alt text](public/images/TechBlog3.jpeg)

Add Post

![alt text](public/images/TechBlog2.jpeg)

Edit Post

![alt text](public/images/TechBlog6.jpeg)

## Credits

With thanks to:

Locan Garland, Coding Bootcamp, University of Irvine California

## Questions

For any questions please contact: avilwock@gmail.com

## License

MIT License