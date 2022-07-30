# Skyhook (Simple multi realm JWT based auth server)

TL;DR
Just a simple server that issues JWT's after a successful authentication. Think of it as a self written [keycloak](https://www.keycloak.org/) server (but without really implementing/ following any authentication standards such as OIDC, OAUTH etc...).

This repository contains a multi realm/ multi tenant based auth server written fully in TypeScript with the Expressjs framework.
The auth server supports SSO/ SLO, external provider (google/ twitter/ facebook) and basic authentication (username/ password).
Multiple applications that are running withing the same Realm are considered RealmApplications in this context.
Each RealmApplication has an clientID and the users associated to the RealmApplication can also use the same credentials to login into other RealmApplications as long as they are withing the same general Realm.

Example: <br>
Realm => MySuperAwesomeCompany <br>
RealmApplication => APP1, APP2, APP2, APP4...

### Good for microservice architectures (if you have multiple services that you need to authenticate with each other).

### Frontend

This server also contains a custom (next.js with express server) next.js application that has some build in Auth pages (Login/ Register/ Password reset etc...). Access these pages by by adding the 'client_id' and 'redirect_uri' as query params.

### Development

0. (optional)

```bash
> docker-compose up database
```

1. Install all node packages

```bash
> npm install
```

2. Start the dev server

```bash
> npm run dev
```

By Default this will create an admin Realm where you can easily connect to and start creating other realms/ applications. <br>
Admin Client can be found [here](https://github.com/Braulo/skyhook-admin-client)

### Deployment

Well just use Docker :)

```bash
> docker-compose up
```

### Documentation

TBD

#### Endpoints

TBD

#### RealmRoles

TBD

### About

This project is experimental, use at your own risk. The project was developed in my free time as a way to learn Express/ TypeScript.
