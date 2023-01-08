# Quick calculator backend based on my boilerplate available at https://github.com/rmc-coma/NodeJS-Boilerplate-lts-Gallium-ES2022

Requirements :
- NVM or Node 18 LTS Hydrogen

Quickstart :
- Clone repo
- Install dependencies with `npm install`
- Run tests with `npm run test`
- Either build and run in livereload debug mode with `npm run debug` or build and run release with `npm run release`
- Hit http://localhost:8081/v1/calculator with a POST request having a JSON body of the next form to get a calculation result : `{ "terms": Array<number | string> }` where terms contains an array alternating numbers and operators like `{ terms: [1, "+", 1] }`

To build a docker image, run `npm run build:docker`, and to run use `npm run start:docker`. Do both by simply using `npm run docker`
