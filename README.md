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

Once the repository has been cloned

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

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