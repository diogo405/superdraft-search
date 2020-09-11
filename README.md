# superdraft-search

## How it works
When the page is loaded it makes an API request to fetch the projects (and form). When the filter button is hit it calls the API passing the form fields.

### Running it in your machine
`npm install`
`npm run start`

## Architecture
App.js is the central point. It calls the API and shows / hides the components based on the API response. 

### Filtering
Filter.js receives a callback via props which is triggered every time the filter button is clicked. The callback has the form as argument and is executed in App.js to call the API.

## Error handling
If something goes wrong a message is displayed: 'Oops something went wrong'.

## Responsiveness
The app is responsive till iPhone SE (320px wide). It basically changes the number of projects in each row thru media queries and flex direction for the form.


## Testing
There's a few E2E tests using Cypress. To run 'em headless type in your terminal (assuming you npm'ed)

`npm run cy:test`

Or if wanna run thru UI

`node_modules/cypress/bin/cypress open`
