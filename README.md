![image](http://i.imgur.com/bkxtvgj.png?2)

This is the UI for [collegedesis.com](//collegedesis.com). It is served up with a node server and uses the API.

## Running Locally

You'll need to [install node](http://nodejs.org/).

```
npm install -g grunt-cli bower
npm install && bower install
grunt server # visit http://localhost:8000
```

#### API

By default, the App points
to a staging [API setup](http://github.com/collegedesis.com/api) at staging.collegedesis.com.
The staging API is cleared frequently, so feel free to send POST requests.

To work completely offline, you can also setup a
local version of the [API](http://github.com/collegedesis/api).

#### Future

In the future, the Directory will be a separate service from the News Board.
When that happens, this app will include the News Board API and stubs for the Directory,
or something like that.

### About

See more about CollegeDesis [here](http://github.com/collegedesis/about).
