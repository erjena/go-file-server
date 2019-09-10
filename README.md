# Go File Server
Yet another file server with frontend in ReactJS and RESTful backend in Go.
![File server in action](https://media.giphy.com/media/YOwRD3MUrLPLf82aPE/giphy.gif "File server in action")

## Running
Step 1: Clone the repo
```
https://github.com/erjena/go-file-server.git
```
Step 2: Build UI and start webpack
```
$ cd go-file-server/frontend
$ npm install
$ npm run react-dev
```
Step 3: Start the server (in another terminal):
```
$ cd go-file-server
$ go build
$ ./file-server <path_to_work_directory>
```

## Usage
To show content of work directory open http://localhost:8800/.

To download a file click on the file name.

To rename a file/directory click `Rename` button and enter a new name for that file/directory.

To upload choose a file and click `Upload` button.

To delete click `Delete` button.
