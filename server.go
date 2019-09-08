package main

import (
	"bytes"
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

// GeneralRequest use for other than rename requests
type GeneralRequest struct {
	Path *[]string `json:"path"`
}

// RenameRequest to rename file
type RenameRequest struct {
	OldPath *[]string `json:"old_path"`
	NewPath *[]string `json:"new_path"`
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
	r.Methods("POST").Path("/download").HandlerFunc(downloadHandler)
	r.Methods("POST").Path("/delete").HandlerFunc(deleteHandler)

	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./frontend/public")))

	err := http.ListenAndServe(":8800", r)
	if err != nil {
		log.Fatal(err)
	}
}

func listHandler(w http.ResponseWriter, r *http.Request) {
	var req *GeneralRequest
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

func downloadHandler(w http.ResponseWriter, r *http.Request) {
	var req *GeneralRequest
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
	currFile := workdir + strings.Join(*req.Path, "/")

	// reading and printing file content
	bytesArray, err := ioutil.ReadFile(currFile)
	if err != nil {
		log.Printf("Was not able to read the file %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	buffer := bytes.NewBuffer(bytesArray)
	fileName := (*req.Path)[len(*req.Path)-1]
	w.Header().Set("Content-Disposition", "attachment;filename="+fileName)
	w.Header().Set("Content-Type", "application/octet-stream")

	// write
	if _, err := buffer.WriteTo(w); err != nil {
		log.Printf("Was not able to write the file %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}

func deleteHandler(w http.ResponseWriter, r *http.Request) {
	var req *GeneralRequest
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
	currFile := workdir + strings.Join(*req.Path, "/")

	info, err := os.Stat(currFile)
	if err != nil {
		log.Printf("Was not able to get file information %v", err)
		return
	}

	if info.IsDir() {
		os.RemoveAll(currFile)
	} else {
		os.Remove(currFile)
	}
}

func main() {
	validateWorkdir()
	setupServer()
}
