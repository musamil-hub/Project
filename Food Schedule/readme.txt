Install 
Step-1
npm init 				create json file

Step-2
package json file
{
  "name": "food",
  "version": "1.0.0",
  "description": "Demo Project",
  "default": "index.html",
  "scripts": {
    "start": "parcel index.html",
    "build": "parcel build index.html --dist-dir ./dist"
  },
  "author": "Mohamed Musamil",
  "license": "ISC",
  "devDependencies": {
    "parcel": "^2.0.0-beta.3.1"
  }
}

Step-3
npm i parcel@next -D			install parcel for node-module

RUN
Step-4
npm start
