# Skyhook (Simple multi realm JWT based auth server)

TL;DR
Just a small server that issues JWT's after a successful authentication. Think of it as a self written [keycloak](https://www.keycloak.org/) server (but without really implementing/ following any authentication standards such as OIDC, OAUTH etc...).

This repository contains a multi realm/ multi tenant based auth server written fully in TypeScript with the Expressjs framework. 
The auth server supports SSO/ SLO, external provider (google/ twitter/ facebook) and basic authentication (username/ password).
Multiple applications that are running withing the same realm are considered RealmApplications in this context. 
Each RealmApplication has an ID and the users associated to the RealmApplication can also use the same credentials to login into other RealmApplications as long as they are withing the same general Realm.

Example: <br>
Realm => MySuperAwesomeProject <br>
RealmApplication => Frontend, Microservice2, Microservice3, Microservice4...

### Good for microservices architecture of if you have multiple services that you need to authenticate with each other. 


### Development

1. Intall all node packages

```bash
> npm install
```

2. Start the dev server

```bash
> npm run start
```

### Deployment

Well just use Docker :)

```bash
> docker build ....
```

```bash
> docker run ...
```

### Documentation

#### Endpoints
TBD

#### RealmRoles
TBD

### About

This project is experimental, use at your own risk. The project was developed in my free time as a way to learn Express/ TypeScript.

