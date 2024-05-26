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
        <li><a href="#installation">Installation</a></li>
       <li><a href="# Step by step of testing Docker Swarm Cluster"> Step by step of testing Docker Swarm Cluster</a></li>
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

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

The project has made use of the following to setup the solutions. 
* [![Vue][Vue.js]][Vue-url]
* [![Docker][Docker-icon]][Docker-url]
* [![DockerSwarm][DockerSwarm-icon]][DockerSwarm-url]
* [![MySQL][MySQL-icon]][MySQL-url]
* [![phpMyAdmin][phpMyAdmin-icon]][phpMyAdmin-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To start op the entire project the team started by creating their own repository and then cloning the repository from the asignment into their own repository. Then in the repository the team created 2 dockerfiles one for the backend and one for the frontend, along these files the team also created a docker-compose.yml file in the main folder for the repository.

The team also created a file which is used later in the process to seed the database, this file is the seed.sh file. This file gets used together with the seeders folder that already exsists in the orginal repositoy.

### Prerequisites

To make the solution you need 3 computers which can be used as nodes for the setup, all of which need to have the following programmes installed. 
* Docker - So you can set up and add the nodes to a swarm and thus connect them to one another.
* Node Package Manager - So you can install the nessesary dependencies for the repo
Furthermore, in order to use the nodes with a wireless wifi connection you need to correct the informaiton written in the 00-installer-config-wifi.yml files within the /etc/netplan folder. This step can be omitted when using a direct connection to the internet through a switch and a router, where all nodes are connected. 

In order to install the nessesary programs you need to write a series of commands on the 3 nodes, however, first you need to ensure the 3 nodes have access to wifi and are up to date. 
<br>
In the 00-installer-config-wifi.yml file you correct the information about the connection. Here you need to write the information for your wifi under the access-point, both the name and the password for it. 
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
Once you have installed Docker and NPM on the nodes, it is time to clone the repository down on the nodes. This is done by cloning it to 1 node which is gonna be the managing node and then using docker swarm to deploy it to the other nodes. 

To clone the github repository you run the following command:
* Setup
 ```sh
 git clone <git repo clone link>
 ```

Once the repository has been cloned on node 1, you can setup the images, containers along with the docker swarm.

### Build the site

To build the site itself you need to start with setting up the nessesary images and containers. In order to work with the repository it is first nessesary to ensure you are in the correct folder in the repository. As the team have created their own repository, and then added a clone of the repository which was handed out by the teacher the webshop is in the zen-ecconomy-main folder inside the repository which also has the same name. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

###  Step by step of testing Docker Swarm Cluster
<br>
## 1. Initial Setup Verification
Verify node status: Use docker node ls on the manager node to ensure all nodes are connected and functioning correctly.
# bash
 ```sh
docker node ls
 ```
## Result of test
<br>

## 2. Deployment Test
Deploy a simple service: Deploy a simple Docker service (e.g., nginx) and verify that all replicas are running.
# bash
```sh
docker service create --name test-service --replicas 3 -p 80:80 nginx
docker service ls
docker service ps test-service
```
## Result of test
<br>

## 3. Scaling Test
Scale the service: Scale the service up and down to ensure Swarm can handle changes in workload.
# bash
```sh
docker service scale test-service=5
docker service ps test-service
docker service scale test-service=2
docker service ps test-service
```
## Result of test
<br>
## 4. Failover Test
Simulate node failure: Turn off a worker node and verify that Swarm redirects the workload to the remaining nodes.
#bash
```sh
docker node update --availability drain <NODE-ID>
docker service ps test-service
```
## Result of test
<br>
## 5. Health Check Test
Monitor service health: Implement health checks and monitor that Swarm restarts containers that fail.
# bash
```sh
docker service update --update-monitor 10s --health-cmd 'curl -f http://localhost || exit 1' --health-interval 30s --health-retries 3 test-service
docker service ps test-service
```
## Result of test
<br>

## 6. Persistent Storage Test
Test persistent storage: Create a service that uses volumes and confirm that data is preserved across container restarts.
# bash
```sh
docker service create --name volume-test --replicas 1 -v test-volume:/data busybox sh -c "while true; do echo 'Hello, World!' >> /data/testfile; sleep 5; done"
docker service ps volume-test
```
## Result of test
<br>
<!-- USAGE EXAMPLES -->
## Usage

This project can be used to create the base for a webshop, with a databse, all which runs in a containerizes enviroment. As such this repository can be used to better understand how to setup a webshop and what you need to write in the dockerfile and docker-compose file to get create the containerization enviroment. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: images/screenshot.png
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
