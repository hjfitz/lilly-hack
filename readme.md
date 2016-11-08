# Lily Hack

## The Idea
Todo list based game where completing todos gains experience and mana. Scoreboard with highest todoers. Possible unlocks from gaining exp.

Todos are based around ideas from 'The Health Challenge'

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
