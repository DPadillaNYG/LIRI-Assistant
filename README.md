# Liri Assistant (CLI App)

LIRI is a Language Interpretation and Recognition Interface that takes in the user's
parameters and retrieves data accordingly with the power of Node.js

### Link to Video for Complete Walkthrough

https://drive.google.com/file/d/16crBaWk0JJAPKEivHyemGOuLKGlsL2eW/view?usp=sharing

### Skills Learned

I learned many things while doing this project with the support of my wife
who is also a very talented programmer and Stack Overflow. Here are some things
I learned and integrated into this project:

- node.js
- fs (npm package) / reading and logging data to .txt files
- dotenv (npm package) / for keeping API keys secret
- axios (npm package) / for requesting and receiving API data
- node-spotify-api (npm package) / for requesting and receiving Spotify data
- moment (npm package) / for formatting dates easily
- .gitignore / for decreasing download size/time without a node_module folder

**Also, feel free to refer to the contents within the repository to see how I:**

- exported one module to another
- utilized process.argv
- read and executed a .txt file
- logged data to .txt file

### Comments

I found Node.js fairly easy to learn because it was an extension of JavaScript. I enjoyed utilizing
NPM packages to make my workload easier. I split all three unique searches from LIRI into three
seperate functions, and then called them in a switch statement if the user's inputs corresponded
to the case word (i.e. find-song-info-for).

_created by David M. Padilla_
