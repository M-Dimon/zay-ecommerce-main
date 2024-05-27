# zay-commerce-exam

This is a copy of the elecetive course Containerization & Linux exam project, Zay eCommerce. 

The original repository can be found at the following:
https://github.com/ucldk/zay-ecommerce 

Please note this is a copy, that the team has made of the original, so the entire process from start to finish can be documented on github.

It is only to be used for the exam, and has no other purpose. 

# The Project
 
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#setting-up-the-nodes">Setting up the nodes</a></li>
        <li><a href="#git-clone">Github Clone</a></li>
        <li><a href="#build-the-site">Build the site</a></li>
        <li><a href="#build-images">Build Images</a></li>
        <li><a href="#seeding-the-database">Seeding the database</a></li>
        <li><a href="#stack-deploy">Stack Deploy</a></li>
       <li><a href="#step-by-step-of-testing-docker-swarm-cluster">Step by step of testing Docker Swarm Cluster</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
<img>

This repository is a copy of the elective course material for the Containerization and Linux elevtive class at UCL Erhvervsakademi & Professionshøjskole in Odense. 

For the exam the team was tasked with creating a containerized version of the webshop in the repository, with Docker and Docker swarm. Furthermore a part of the exam revolves around setting up the repository and webshop on 3 nodes, which the school have provided. 

### Built With

The project has made use of the following to setup the solutions. 
* [![Vue][Vue.js]][Vue-url]
* [![Docker][Docker-icon]][Docker-url]
* [![DockerSwarm][DockerSwarm-icon]][DockerSwarm-url]
* [![MySQL][MySQL-icon]][MySQL-url]
* [![phpMyAdmin][phpMyAdmin-icon]][phpMyAdmin-url]

<p align="right">(<a href="#zay-commerce-exam">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To start op the entire project the team started by creating their own repository and then cloning the repository from the asignment into their own repository. Then in the repository the team created 2 dockerfiles one for the backend and one for the frontend, along these files the team also created a docker-compose.yml file in the main folder for the repository.

The team also created a file which is used later in the process to seed the database, this file is the seed.sh file. This file gets used together with the seeders folder that already exsists in the orginal repositoy.

### Prerequisites

To make the solution you need 3 computers which can be used as nodes for the setup, all of which need to have the following programmes installed. 
* Docker - So you can set up and add the nodes to a swarm and thus connect them to one another.
* Node Package Manager - So you can install the nessesary dependencies for the repo
<br>
The computer nodes is setup to be Linux, since there is used Ubuntu, the default CLI that will is used is Bash shell.
<br>
Furthermore, in order to use the nodes with a wireless wifi connection you need to correct the informaiton written in the 00-installer-config-wifi.yml files within the /etc/netplan folder on the nodes. This step can be omitted when using a direct connection to the internet through a switch and a router, where all nodes are connected. 

To install the nessesary programs you need to write a series of commands on the 3 nodes, however, first you need to ensure the 3 nodes have access to wifi and are up to date. 
<br>
In the 00-installer-config-wifi.yml file you correct the information about the connection. Here you need to write the information for your wifi under the access-point, both the name and the password for it. 
<br>
![wifi-config]
* In the image about you can see how the team has changed the information to their network, Con-Linux and also the password for said internet.

<br>
Once the nodes have wifi you can run the following commands to ensure the nodes are up to date. 

* Setup
 ```sh
 sudo apt update

 sudo apt upgrade
 ```
Once the setup is complete you can move on to installing the other programs.
* Docker
 ```sh
 # Start by uninstall all conflicting packages:
 for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done

 # Install using the apt repository
 sudo apt-get install ca-certificates curl
 sudo install -m 0755 -d /etc/apt/keyrings
 sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
 sudo chmod a+r /etc/apt/keyrings/docker.asc

 # Add the repository to Apt sources:
 echo \
   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
   $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
   sudo tee /etc/apt/sources.list.d/docker.list > /dev/null 
 
 sudo apt-get update

 # To install the latest version:
 sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
 ```
* NPM
 ```sh
 # Install Node.js
 sudo apt install nodejs

 # Verify the installation
 node --version

 npm --version
 ```
Once you have installed Docker and NPM on the nodes, it is time to move onto setting up the nodes, and creating and connecting them to a a swarm so that they can work together.

### Setting up the nodes
To set up the nodes the first step is to change the host and hostname on all 3 nodes to make it easier to identify which node is which. To do this you use the following command to enter the area where you need to change the name.

 ```sh
 # To change the host.
 sudo vim host
 # Once in you can then change the name for the host.

# To change the hostname.
 sudo vim hostname
 # Once in you can then change the name for the hostname.
 ```

For this project the team have named the 3 nodes, node01, node02 and node03, and have decided that node01 will become the manager of the swarm, to make it easier to remember. 

Now that we have named the nodes, we then use node01 to initiate the swarm and to generate the join token for the other nodes. This is done with the following commands:
```sh
 # Initiate the swarm
 docker swarm init
 # This will initialise the swarm, and make the node which it is used on into the manager for the swarm.

 # Generate join-token for workers
 docker swarm join-token worker
 # This will then generate the command you need to run on the other nodes
```
In order to make it easier to use the join token commands on the other nodes, the team decided to ssh into the nodes from another pc. To do this use the following command on you pc's terminal:
```sh
 ssh user@<ip address>
 # Please note the ip address is the nodes ip, which can be found on the node with the following command:
 ip a
 # When ip a is used it generates a list where you can see the ip address for the node. 
```
This is an example of what the ip a command shows and what you need. <br>
![ip-a] <br>
Then you can simply copy the join token and use it on the other nodes to join the swarm. Once all the nodes are a part of the swarm, we can then do a git clone on the manager node, and then a stack deploy to deploy the repository to the other nodes. 

#### Github Clone
To clone the github repository, you run the following commands: 
 ```sh
 # Clone repository.
 git clone <git repo clone link>
 # This will clone the repository down on the node.
 ```
 * Note once the git repository has been cloned you need to cd into the correct folder to work with the repository. 

### Build the site
To build the site itself you need to start with setting up the nessesary images and containers. 
* Please ensure you are in the correct folder when working with the project, the team have created their own repository, and added a clone of the repository from the teacher. The webshop is in the zen-ecconomy-main folder inside the repository which also has the same name. 

To build the site you first need to install the dependencies for the project, and then update the nodes themselves afterwards. To do this use the following commands:
```sh
 npm install
 # This will install all the dependencies that are represented in the package.json file.

 sudo apt update
 # To update the node, which is needed now that more things have been installed. 
```
* For the project to fully work please make sure to run the npm install command in the main folder, backend folder and frontend folder, as they all have a list of dependencies. 

Once the dependencies have been installed, you can then build the images and the container for the site, along with the database.
#### Build Images
For the project we have created some images for the  frontend, backend, db and phpmyadmin. These are created using the dockerfiles and then run using the docker-compose.yml file. 

To build the 2 images you first need to cd into the folders, once for the backend and once for the frontend. In the terminal use the following commands:
```sh
 # Frontend
 cd frontend
 # Go to frontend folder
 docker build -t frontend 
 # Build the image
 docker run -p 80:80 frontend
 # To build the container


 # Backend
 cd backend
 # Go to the backend folder
 docker build -t backend
 # Build the image
 docker run -p 80:80 backend
 # To build the container.
```
Now the 2 images, frontend and backend have been created, and the container has also been build. 

#### Seeding the database

When using the command to deploy the stack it is not just the images that will be build and run. In the backend dockerfile there is some commands for seeding the database that activate when you build the image. 

In this case the team made use of an extra file called seed.sh, which contains the commands needed to reset and then seed the database, with a small delay inbetween. The dockerfile then specifies the seed.sh file as a entry point for this, and will thus run the commands in it to seed the database. 

You can also run the commands manually instead, however this makes it more streamlined, and limits the amount of commands you have to write. 

#### Stack Deploy
With the images for the frontend and backend build you then need to run the following command to deploy the actual site.
```sh
 # Stack Deploy
 docker stack deploy --compose-file docker-compose.yml <name>
 # Note <name> is the name you give it, the <> is not needed. 
```
* This will setup the remainding db and phpmyadmin images and also run the actual images. Furthermore, the code written in the docker-compose.yml file, under deploy will create replicas of the images in the specified location. 

In the docker-compose.yml file the team has specified which node role is responsiple for which image, along with how many replicas need to be made. Furthermore, the file also contains the information needed to access the database. For this the team has also setup phpMyAdmin as a gui for database management.

We also have a volume called db_data, which is used in connection with the mysql database. The database gets its content and data from a file which is a part of the original repository from the teacher. 

* Please note the current repository makes use of docker hub for the frontend and backend, as such the files themselves gets fetched from docker hub after they have been created. 

<p align="right">(<a href="#zay-commerce-exam">back to top</a>)</p>

###  Step by step of testing Docker Swarm Cluster
<br>

## 1. Initial Setup Verification
Verify node status: Use docker node ls on the manager node to ensure all nodes are connected and functioning correctly.
#bash

 ```sh
docker node ls
 ```
# Result of test
Command Execution: The command docker node ls is run on the manager node of a Docker Swarm cluster.
Commands a lists all the nodes that are part of the Docker Swarm cluster.
<br>
![test-img-1]

<br>

## 2. Deployment Test

Deploy a simple service: Deploy a simple Docker service (e.g., nginx) and verify that all replicas are running.
 bash
```sh
docker service create --name test-service --replicas 3 -p 80:80 nginx
docker service ls
docker service ps test-service
```
# Result of test
Deploy Service: docker service create --name test-service --replicas 3 -p 80:80 nginx List Services: docker service ls to check the service is running. 
Verify Replicas: docker service ps test-service to ensure all 3 replicas are active.
This ensures the Docker Swarm deployment is functioning correctly.
<br>
![test-img-2]
<br>
![test-img-3]
<br>

## 3. Scaling Test
Scale the service: Scale the service up and down to ensure Swarm can handle changes in workload.
bash
```sh
docker service scale test-service=5
docker service ps test-service
docker service scale test-service=2
docker service ps test-service
```
# Result of test
Scale Up: docker service scale test-service=5 to increase replicas to 5. 
Verify Scaling Up: docker service ps test-service to ensure 5 replicas are running. Scale Down: docker service scale test-service=2 to decrease replicas to 2. 
Verify Scaling Down: docker service ps test-service to ensure only 2 replicas are running. 
This ensures Docker Swarm can handle scaling the service up and down effectively.
<br>
![test-img-4]
<br>
![test-img-5]
<br>

## 4. Failover Test
Simulate node failure: Turn off a worker node and verify that Swarm redirects the workload to the remaining nodes.
bash
```sh
docker node update --availability drain <NODE-ID>
docker service ps test-service
```
# Result of test
Simulate Node Failure: docker node update --availability drain <NODE-ID> to drain a worker node. 
Verify Failover: docker service ps test-service to ensure the workload is redirected to remaining nodes. 
This tests that Docker Swarm properly handles node failures by redistributing tasks.
<br>
![test-img-6]
<br>

## 5. Health Check Test
Monitor service health: Implement health checks and monitor that Swarm restarts containers that fail.
bash
```sh
docker service update --update-monitor 10s --health-cmd 'curl -f http://localhost || exit 1' --health-interval 30s --health-retries 3 test-service
docker service ps test-service
```
# Result of test
Implement Health Checks: docker service update --update-monitor 10s --health-cmd 'curl -f http://localhost || exit 1' --health-interval 30s --health-retries 3 test-service to add health checks to the service. 
Monitor Service Health: docker service ps test-service to ensure Swarm restarts any failing containers. 
This ensures Docker Swarm can monitor and maintain the health of the service by restarting unhealthy containers.
<br>
![test-img-7]
<br>

## 6. Persistent Storage Test

Test persistent storage: Create a service that uses volumes and confirm that data is preserved across container restarts.
bash
```sh
docker service create --name volume-test --replicas 1 -v test-volume:/data busybox sh -c "while true; do echo 'Hello, World!' >> /data/testfile; sleep 5; done"
docker service ps volume-test
```
# Result of test
We tried to perform the last test, but it would not create the new file. However, it is something that can be included for further investigation and development to find out why it would not execute the test
<br>
![test-img-8]
<br>
<!-- USAGE EXAMPLES -->
## Usage

This project can be used to create the base for a webshop, with a databse, all which runs in a containerizes enviroment. As such this repository can be used to better understand how to setup a webshop and what you need to write in the dockerfile and docker-compose file to get create the containerization enviroment. 

<p align="right">(<a href="#zay-commerce-exam">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Below are the emails and github profiles for the 3 students responsible for the solution represented in this repository. 

Emilie
<br>
Email: ebha38482@edu.ucl.dk
<br>
Github: https://github.com/Reitc

Helene:
<br>
Email: hmlm56862@edu.ucl.dk
<br>
Github: https://github.com/Zentia-DK

Maria:
<br>
Email: mndi32110@edu.ucl.dk
<br>
Github: https://github.com/M-Dimon


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Docker-icon]: https://img.shields.io/badge/Docker-f0f0f0?logo=Docker
[Docker-url]: https://www.docker.com/
[DockerSwarm-icon]: https://img.shields.io/badge/Docker%20Swarm-2496ED
[DockerSwarm-url]: https://docs.docker.com/engine/swarm/
[MySQL-icon]: https://img.shields.io/badge/MySQL-fff?logo=MySQL
[MySQL-url]: https://www.mysql.com/
[phpMyAdmin-icon]: https://img.shields.io/badge/phpMyAdmin-fff?logo=phpMyAdmin
[phpMyAdmin-url]: https://www.phpmyadmin.net/

<!-- IMAGES -->
[wifi-config]: readme-images/wifi-config.PNG
[ip-a]: readme-images/ip-a.PNG
[test-img-1]: readme-images/1.docker_node_ls.png
[test-img-2]: readme-images/2.create-a-service.png
[test-img-3]: readme-images/3.docker.service.ls.png
[test-img-4]: readme-images/4.scale_up_test_service.png
[test-img-5]: readme-images/5.scale_down_test_service.png
[test-img-6]: readme-images/6.Simulate_shut_down_with_drain.png
[test-img-7]: readme-images/7.activate_shut_down_node.png
[test-img-8]: readme-images/8.health_check.png

<p align="right">(<a href="#zay-commerce-exam">back to top</a>)</p>