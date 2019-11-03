package main

import (
	"bufio"
	"fmt"
	"os"
	"os/exec"
	"path"
	"sync"

	"github.com/labstack/gommon/log"
)

func startClientOne(wg *sync.WaitGroup) {
	cwd, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}
	command := exec.Command("npm", "start")
	command.Dir = path.Join(cwd, "client_one")
	runAndWait(command)
	wg.Done()
}

func startClientTwo(wg *sync.WaitGroup) {
	cwd, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}
	command := exec.Command("npm", "start")
	command.Dir = path.Join(cwd, "client_two")
	runAndWait(command)
	wg.Done()
}

func startServer(wg *sync.WaitGroup) {
	fmt.Println("now we will run server")
	cwd, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}
	rustComm := exec.Command("cargo", "run")
	rustComm.Dir = path.Join(cwd)
	rustCommOutput, comErr := rustComm.Output()
	if comErr != nil {
		log.Fatal(comErr)
	}
	fmt.Println(fmt.Sprintf("Rust server output %s", rustCommOutput))
	wg.Done()
}

func runAndWait(command *exec.Cmd) {
	httpServerOut, httpServerErr := command.StdoutPipe()
	if httpServerErr != nil {
		log.Fatal(httpServerErr)
	}
	httpServerOutScanner := bufio.NewScanner(httpServerOut)
	go func() {
		for httpServerOutScanner.Scan() {
			fmt.Printf("%s\n", httpServerOutScanner.Text())
		}
	}()
	httpServerStartErr := command.Start()
	if httpServerStartErr != nil {
		log.Fatal(httpServerErr)
	}
	httpServerWaitErr := command.Wait()
	if httpServerWaitErr != nil {
		log.Fatal(httpServerErr)
	}
}

func main() {
	npmComm := exec.Command("npm", "-v")
	npmOutput, err := npmComm.Output()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(fmt.Sprintf("You are using npm version %s", npmOutput))
	fmt.Println("No we will start apty clients and auth server")

	var wg sync.WaitGroup

	wg.Add(1)
	go startServer(&wg)

	wg.Add(1)
	go startClientOne(&wg)

	wg.Add(1)
	go startClientTwo(&wg)

	wg.Wait()

}
