package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

var workdir string

// FileObject object for client
type FileObject struct {
	Name  string `json:"name"`
	IsDir bool   `json:"is_dir"`
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
	r.HandleFunc("/list", listHandler)
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./frontend/public")))

	err := http.ListenAndServe(":8800", r)
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	validateWorkdir()
	setupServer()
}

func listHandler(w http.ResponseWriter, r *http.Request) {
	log.Printf("reading from %v", workdir)
	files, err := ioutil.ReadDir(workdir)
	if err != nil {
		log.Fatal(err)
	}

	w.WriteHeader(http.StatusOK)
	var fileObjects []FileObject
	for _, file := range files {
		fileObjects = append(fileObjects, FileObject{file.Name(), file.IsDir()})
	}
	err = json.NewEncoder(w).Encode(fileObjects)
	if err != nil {
		log.Fatal(err)
	}
}
