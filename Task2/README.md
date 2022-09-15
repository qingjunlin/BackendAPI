
## Instruction

### Installation for dependencies

```bash
npm install
```
### Run

```bash
npm start
```
### Test

```bash
npm test
```

## API Documents


- POST /register
    - register new users given a json body with User schema
    - check uniqueness of username and email
- POST /login
    - login users given a json body with username and password
    - compare password for successful login
- Get /logout
    - logout users by destory current session

- Get /api/users/
    - get current login user's portfolio
- Patch /api/users/addbalance
    - update current login user's wallet given a json body with balanceAdded
### Models

#### User

```Json
{
    "username": string,
    "password": string,
    "firstname": string,
    "lastname": string,
    "wallet": number,
    "sharesOwnCompany": array of objectIDs,
    "shares": array of numbers,
    "subscriptions": array of objectIDs,
}
```

#### Company

```Json
{
    "name": string,
    "sharesDistribtion": array of objectIDs,
    "liverates": number,
}
```

#### EndPoint

```Json
{
    "name": string,
    "subscribers": array of objectIDs,
    "liverates": array of numbers,
    "companies": array of objectIDs,
}
```
