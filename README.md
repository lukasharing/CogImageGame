# CogImageGame
This game is designed and coded by Lukas Haring García.

# Code
- Style is created using CSS.
- Typescript and Angular is used to create the game.
- Phaser is used as the Game Engine, *first time*.

# Welcome
Simple box with play and result button, with a simple description. We could improve it by adding a gif.

# Music
No music is going to be used, so that the player doesn't get distracted, when tried with my roommates they got lower points so I decided to remove it.

# Card
# Card Position
The x position is situated on the left of the screen, and moved to the right in a duration of time or speed.
The y position is randomly choosen by the height of the element.
`y = RANDOM(40, SCREEN_HEIGHT - 80)`

## Card Speed
The card speed is dependent to the screen size, the smaller it is, the slower it goes, adaptative to phone.

The more time you play the faster cards come,
`dt = 2.7 - SECOND_PLAYING / 5`
The difference or delay is calculated randomly.
` Delay = Random(dt, dt + 1) `

# Points

Where `t` is delta time since the image has appear.

` Points = (1 - t / duration) * MAX_POINTS `

## Penalization
Be careful! Wrong typping would make you loose time. The penalization time is fixed by the developer.

## Alert Points
You get an alert every time you keypress:
* **GREAT**: When the card is in the first third of the size of the screen.
* **OK**: When the card is in the first third of the size of the screen.
* **BAD**: When the card is in the first third of the size of the screen.
* Loose Life if the card is out of the screen.

# Bonus
You get, +2 for `OK`, and +4 for `GREAT` more points if you mantain your Alert Points!
The formula used is:
`Points' = Points + (OK or GREAT) * CONSECUTIVE * BONUS_FACTOR`

Consecutive *Alert Points* is increment the bonus counter, different *Alert Points* reset the bonus.

# Conclusion

It was a fun experiment, where I have learnt a new game engine in a few hours, the game is fun but could be improved with special cards: freeze time cards, life cards, etc.
The api 500px was not available so I had to create one by my own, simpler but great.

# Result Table
It will show the best 10 games, the information shown is the number of points and time played.
