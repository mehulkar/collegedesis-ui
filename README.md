![image](http://i.imgur.com/bkxtvgj.png?2)

This is the build for UI for [news.collegedesis.com](//news.collegedesis.com). It builds a static website that
is then served with an Express.js server. We need to serve it with an Express.js server
because we are using History location in the Ember app, which means that every route must serve
`index.html`. This is not possible with static website servers like Github Pages and Amazon S3.

## Running Locally

You'll need to [install node](http://nodejs.org/).

```
npm install -g grunt-cli bower
npm install && bower install
grunt server # visit http://localhost:8000
```

#### API

You will need to set up a local version of the [API](http://github.com/collegedesis/api).
This is slated to change when the Directory authentication splits into a separate service,
then this website will have it's own database and only have to connect to a 3rd party
service for user authentication services.

### About

See more about CollegeDesis [here](http://github.com/collegedesis/about).
