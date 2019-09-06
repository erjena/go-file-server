package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gorilla/mux"
)

var workdir string

// FileObject object for client
type FileObject struct {
	Name    string    `json:"name"`
	IsDir   bool      `json:"is_dir"`
	ModTime time.Time `json:"mod_time"`
}

type ReqBody struct {
	Path *[]string `json:"path"`
}

func validateWorkdir() {
	if len(os.Args) != 2 {
		log.Fatal("Expected path to directory")
	}
	workdir = os.Args[1]
	_, err := ioutil.ReadDir(workdir)
	if err != nil {
		log.Fatal(err)
	}
}

func setupServer() {
	r := mux.NewRouter()
	r.Methods("POST").Path("/list").HandlerFunc(listHandler)
	//r.Path("/download").Queries("path", "{path}").HandleFunc(downloadFile)

	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./frontend/public")))

	err := http.ListenAndServe(":8800", r)
	if err != nil {
		log.Fatal(err)
	}
}

func listHandler(w http.ResponseWriter, r *http.Request) {
	var req *ReqBody
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		log.Printf("Was not able to parse path %v", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if req.Path == nil {
		log.Printf("Missing path")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	currDir := workdir + "/" + strings.Join(*req.Path, "/")
	log.Printf("reading from %v", currDir)

	files, err := ioutil.ReadDir(currDir)
	if err != nil {
		log.Printf("Unable to read directory %v, request was %v", err, *req.Path)
		w.WriteHeader(http.StatusNotFound)
		return
	}
	w.WriteHeader(http.StatusOK)
	var fileObjects []FileObject
	for _, file := range files {
		fileObjects = append(fileObjects, FileObject{file.Name(), file.IsDir(), file.ModTime()})
	}

	err = json.NewEncoder(w).Encode(fileObjects)
	if err != nil {
		log.Printf("Was not able to encode %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}

// func downloadFile(filepath string) {

// }

func main() {
	validateWorkdir()
	setupServer()
}
