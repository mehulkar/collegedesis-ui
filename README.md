![image](http://i.imgur.com/bkxtvgj.png?2)

Rails app running Ember Appkit Rails to serve [news.collegedesis.com][1].

## Running Locally

You'll need to [install node](http://nodejs.org/).

```
bundle install
rails s #=> visit http://localhost:3000
```

#### API

You will need to set up a local version of the [API](http://github.com/collegedesis/api).
This is slated to change when the Directory authentication splits into a separate service,
then this website will have it's own database and only have to connect to a 3rd party
service for user authentication services.

### About

See more about CollegeDesis [here](http://github.com/collegedesis/about).

[1]: "//news.collegedesis.com"