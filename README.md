## Avocado 🥑
Avocado is a management and planning platform of food safety audits and their resources.

## Motivation
 From a partnership between the University of Aveiro and SONAE, this is an innovation challenge proposed by SONAE and accepted by a group of students (master in multimedia communication)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Prerequisites

* Node v10.4.1 or above
* [Avocado API](https://github.com/HenriqueSilva2/multi-tenant-avocado) up and running

### Installing

Clone

```
$ git clone git@github.com:antoniojps/avocado-client.git
```

Install dependencies

```
$ cd avocado-client
$ yarn install
or
$ npm install
```

#### Setup hosts
The app behaves differently based on the sub-domain, to make this work on localhost please add the following lines to your hosts

Edit the file /etc/hosts with your favorite editor
```
$ nano /etc/hosts
or
$ vim /etc/hosts
or
$ code /etc/hosts
...
```
Add the following and save
```
127.0.0.1 avocado.local
127.0.0.1 sonae.avocado.local
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [avocado.local:3000](avocado.local:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Source Folder structure

    .
    ├── ...
    ├── src
    │   ├── elements          # styled base elements (typography, cards, buttons...)
    │   ├── utilities         # utilities (mixins, functions, breakpoints, theme, generators ...)
    │   ├── ui                # base app components that will be re-used and that require some logic
    │   ├── docs              # documentation features
    │   ├── redux             # redux setup
    │   └── ...               # feature folders
    └── ...


## Contributors

| [<img src="https://avatars3.githubusercontent.com/u/19779828?s=460&v=4" width="100px;"/><br /><sub><b>António Santos</b></sub>](https://antoniosantos.me) | [<img src="https://avatars3.githubusercontent.com/u/25771694?s=460&v=4" width="100px;"/><br /><sub><b>Francisco Regalado</b></sub>](https://github.com/fsfregalado) | [<img src="https://avatars1.githubusercontent.com/u/24814636?s=460&v=4" width="100px;"/><br /><sub><b>Henrique Silva</b></sub>](https://github.com/HenriqueSilva2) |
| :---: | :---: | :---: |
