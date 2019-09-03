package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {

	r := mux.NewRouter()
	r.HandleFunc("/list", listHandler)
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./frontend/public")))

	err := http.ListenAndServe(":8800", r)
	if err != nil {
		log.Println(err)
	}
}

func listHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Hello World")
}
