# Simple HTTP Server

This project implements a simple HTTP server that responds to GET requests on the /data endpoint. The server is designed to handle requests with query parameters, providing the ability to retrieve content from specified files.

## Implementation

The server is built using Node.js and Express for handling HTTP requests. It includes the following features:

- Responds to incoming GET requests on the endpoint /data.
- Accepts two query parameters: n (file name) and m (line number).
- If both n and m are provided, it returns the content of file /tmp/data/n.txt at line number m.
- If only n is provided, it returns the entire contents of file /tmp/data/n.txt.
- Each file is expected to be around 100MB in size.

## Usage

### Prerequisites

- Node.js installed (version 14 or higher)
- npm package manager

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/simple-http-server.git
   cd simple-http-server

### Run the server 

2. Run the command
    ```bash
    node server

### Use Curl in CMD to test

3. Run the following commands to test all the test cases
    ```bash
    curl http://localhost:8080/data?n=1
    curl "http://localhost:8080/data?n=2&m=10"
    curl http://localhost:8080/data
    curl "http://localhost:8080/data?n=3&m=999"

Node : if you don't have files in tmp/data you can use command
    ```bash
    node generatefile

above command will generate 30 sample text file for test

PS: We were trying to upload 30 sample files on github each of size around 100 MB however, git is not allowing to upload those files due to large size however if you use generatefile,js you can generate those files 