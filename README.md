# Go File Server

A simple file server operates via REST API. Front-end implemented in React. Supports list, download, rename, upload and delete operations.

[![](http://img.youtube.com/vi/5CDGxB96Vjg/0.jpg)](http://www.youtube.com/watch?v=5CDGxB96Vjg "")

## Installation

Step1: Clone the repo
```
https://github.com/erjena/go-file-server.git
```
Step2: Install dependencies
```
$ cd go-file-server
$ npm install
```
Step 3: Start server and config webpack:
```
$ npm run react-dev
$ go build 
```

## Usage
Get list of file
```
open http://localhost:8800/
```
To download (supports only files)
```
click on file name
```
To rename
```
click `Rename` button and enter new name for directory or file
```
To upload
```
Choose file and click upload
```
To delete
```
Simply click `Delete` button
```