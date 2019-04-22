# Brastlewark Index

Brastlewark Index is an index where you can find all the information regarding the inahbitant of Bratleward you will need fr your quest.
In this platform you can easily naviagte and filter all the inhabitant in the city, to easily find someone who trade with.

## Interfaces

### Home

Since the main goal of the platform is to ease trades with the inhabitants, in the homepage the user has the option of choosing a trade. 
Alternatively, the user can just choose to browse the entire index

![Home](https://i.ibb.co/8XcRvJv/index.png)

### Listings

After choosing a trade in the homepage, the user is redirected to the listings, dislpaying basic information regarding the gnomes who inhabit Brastlewark.
![List](https://i.ibb.co/YTP0wR9/gnome-list.png)

If the results are still vague, the user can toggle a filter in the bavbar, which allows for further filtering
![ListFilter](https://i.ibb.co/sqtmrpL/Filter.png)

### Gnome details

Finally the user can consult more detailed information regarding every gnome
![Details](https://i.ibb.co/9hTHCcJ/gnome-details2.png)


### Instructions

#### Setup (dev mode)

1. clone repository
`git clone https://github.com/joaovcastro/brastlewark-index.git`

2. go to directory
`cd brastlewark-index`

3. install dependencies
`npm install`

4. run locally
`npm run server`
`npm run client` (in a sepparate terminal)

#### Test
run `npm test` to run all tests

### Libraries

- React: Javascript framework used for the development of the UIs

- Redux: For global state management and API consumption

- Material UI: A React implementation of Google's Material Design directives

- Babel: Compoiler

- Enzyme: For unit and snapshot testing

- Eslint: For linting tests

- Webpack: For module bundling

- Prettier: For automatic code formatting 

- Recompose: For HOC and Functional Component Management

- Express: Web server that consumes the raw data, and distributes it thourgh an API. Also, allows routing due to the information format

- SASS Loader: Compiling SASS into CSS

