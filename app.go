package main

import (
	"context"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"sort"
)
type RandomImage struct {
	Message string
	Status string
}

type AllBreads struct {
	Message map[string]map[string][]string
	Status string
}

type ImagesByBreed struct {
	Message []string
	Status string
}

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) GetRandomImageUrl() string {
	response, err := http.Get("https://dog.ceo/api/breeds/image/random")
	if err != nil {
		log.Fatal(err)
	}

	responseData, err := io.ReadAll(response.Body)
	if err != nil {
		log.Fatal(err)
	}

	var data RandomImage
	json.Unmarshal(responseData, &data)

	return data.Message
}

func (a *App) GetBreedList() []string {
	var breeds []string

	response, err := http.Get("https://dog.ceo/api/breeds/list/all")
	if err != nil {
		log.Fatal(err)
	}

	responseData, err := io.ReadAll(response.Body)
	if err != nil {
		log.Fatal(err)
	}

	var data AllBreads
	json.Unmarshal(responseData, &data)
	
	for k := range data.Message {
		breeds = append(breeds, k)
	}

	sort.Strings(breeds)

	return breeds
}