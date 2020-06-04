# BOOKMYGIG

![BookMyGig Logo](https://github.com/manojnaidu619/bookmygig-frontend/blob/master/bookmygig.png)

### This is the backend part, checkout the frontend [here](https://github.com/manojnaidu619/bookmygig-frontend)

## What it does

This is a platform where creators perform live online shows (like dance, comedy, plays, and the list goes on...) for live audiences. There is also a chat feature, where the users who are part of the same show can chat in realtime while they are watching it.

## Built using

* [ReactJS](https://reactjs.org/)
* [NodeJS](https://nodejs.org/en/)
* [Redis](https://redis.io/) as an in-memory database
* [Node-Media-Server](https://github.com/illuspas/Node-Media-Server) for video streaming
* [Socket.io](https://socket.io/) for realtime-chat
* [Web Monetization API](https://webmonetization.org/) + [Coil](https://coil.com/) for monetizing content
 
## Challenges I ran into

* Handling creator data in the backend and storing it efficiently using built-in Redis data structures.
* Fetching all the shows asynchronously(using [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)), and resolving them was tricky.
* Figuring out a way to load & play the live stream on the browser without clashing between other sessions was really challenging.

### How to Setup
> Also checkout frontend [here](https://github.com/manojnaidu619/bookmygig-frontend)
* Download the repo as zip-file
* unzip it and `cd` into project folder
* `npm install`
* `npm start`
