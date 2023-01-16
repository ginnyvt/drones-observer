# Drones monitoring

In the event that a rare and endangered Monadikuikka bird is found in a nearby lake.

To keep the nesting peace, authorities declared a no-drone zone (NDZ) and set up drone monitoring equipment to track violations and contact offenders.

A web service is built based on the requirements to assist in monitoring the pilots who recently breached the NDZ area. The web service saves information about the offenders in the previous 10 minutes as well as how close their drones were to the nest. Old data is also removed from the database after every 5 minutes.

## Tech Stack

**Client:** React, TailwindCSS, DaisyUI

**Server:** Node, Express, Mariadb

**Deployment:** Docker, Kubernetes, Github Actions

## Run locally

Clone the project and make sure you have node, npm installed on your local machine.

```bash
  git clone git@github.com:ginnyvt/drones-observer.git
```

Provide neccessary environment variables accordingly.

Go to the server directory, run docker and start database service.

```bash
  docker compose -f docker-compose.yml up
```

Install dependencies and start backend server.

```bash
  npm install && npm run dev
```

Go to the client directory, install dependencies and start client server.

```bash
  npm install && npm run dev
```

## Demo

Link to [demo](https://drones-client-ingress-drones-ginnyvt.cloud.okteto.net/)

## Authors

- [ginnyvt](https://github.com/ginnyvt)

## License

[MIT](https://choosealicense.com/licenses/mit/)
