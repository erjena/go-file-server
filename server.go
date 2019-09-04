package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"
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
	r.Path("/list").Queries("dir", "{xxx}").HandlerFunc(listHandler)
	// r.HandleFunc("/list", listHandler)
	// r.HandleFunc("/list/{dirName}", listHandler)
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./frontend/public")))

	err := http.ListenAndServe(":8800", r)
	if err != nil {
		log.Fatal(err)
	}
}

func listHandler(w http.ResponseWriter, r *http.Request) {
	currDir := workdir
	vars := mux.Vars(r)
	if vars["xxx"] != "" {
		currDir = workdir + vars["xxx"]
	}
	log.Printf("reading from %v", currDir)
	files, err := ioutil.ReadDir(currDir)
	if err != nil {
		log.Fatal(err)
	}
	w.WriteHeader(http.StatusOK)
	var fileObjects []FileObject
	for _, file := range files {
		fileObjects = append(fileObjects, FileObject{file.Name(), file.IsDir(), file.ModTime()})
	}

	err = json.NewEncoder(w).Encode(fileObjects)
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	validateWorkdir()
	setupServer()
}
