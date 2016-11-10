# Lilly Hack

## The Idea and Inspiration
I'm ashamed that I've only just put this on the document. The inspiration for this web "game" is comes from the health challenge. More specifically, Use Case 2 - trying to help maintain better diet and exercise.

Here's where my idea comes in to play. I want to create a to-do list that rewards the user, and allows the user to compete with other users - competing to be healthy. The idea is simple, the user creates their to-dos and assigns them certain health and experience bonuses or penalties. With the completion of a to-do, they are rewarded or punished.

The aim of the game is to create a miniature version of you, and get the highest level and experience on the leaderboard!

Eventually, I'd like to develop this over more time and create a rewards system, where experience can be used to buy visual upgrades for their character.

Notes:
- Experience and health are limited to 100 per task. It's still easy to add a lot of experience to your character and get to the top of the leaderboard... But where's the fun in that?
- levels are calculated as a f(n) = 100n<sup>2</sup> where n is the level required.

## The Codebase
After attending the conference, I learnt about a number of technologies that would be very applicable to this idea of mine. There are also some things of my own that I'm taking with me.

[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/hyperium/hyper/master/LICENSE)


### Requirements/Technologies Used
- Express.js
  * I found this a great way of dynamically creating pages with a sort of skeleton outline - ```layout.hbs```
- PostgreSQL
  * I was fascinated by the quick and easy set up of this - Something that I'd really like to not worry about when I've got a week-long hack to complete!
- Materialize CSS
  * I've used this before as part of my role at the IT society - It's great and I'm certainly going to be using it again
- canvas
  * This is integral to my idea. I want the user to customise their little person. I don't want to use a lot of resources for my website though - I'll dynamically generate their charater!
    - I'm going to save their chosen colours in the database that I'm using and will fetch them when they log in.
- nodemon
  * I think that being able to press f5 after changing some code without restarting the server is really important, and will make the development process a lot easier.
- git
  * I want to keep a track of what I'm doing! Heroku also has very nice integration with this.
- [jscolor](http://www.jscolor.com/)
  * Because the user has the option to customise their character, I wanted a user firendly way to select it. I chose jscolor, hosted on [cdnjs.com](www.cdnjs.com).
- Query. I was pretty worried about concatenating variables to make a query for the database. Query solves this by letting you set them up with a Query object. It also makes the code SO MUCH more readable.

## The Blog
Like anyone who uses atom and has a fancy .io domain, I'm going to blog my experiences with competing in the Lilly hackathon. The engine I wrote is a little basic, but it's available [here](https://hjf.io/blog/blog.php).


## Notes, what I've learnt

- Use ```heroku config --app lilly-hack-hjf``` to find the DB URL
  * This should be left in a file called ```.env```, with DATABASE_URL="$response" as a line in the file.
- Don't use ```npm start``` to start the server, use ```heroku local```
- To view the page in action, it's hosted on [heroku](http://lilly-hack-hjf.herokuapp.com)
- Local storage is a great *kind of* IPC for different js scripts, but not really IPC.
  * It lets me move the user info between pages. (really should start hashing the passwords at this point)
  * I can access the username via ```localStorage[userid]``` as defined in main.js
- I forgot how to update a table in SQL!
  * ```update PREFERENCES set foo=bar, barfoo=foobar where user_id = 1;```
