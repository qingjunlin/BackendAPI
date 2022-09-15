
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
- Patch /api/users/deposit
    - update current login user's wallet given a json body with balanceAdded
- Patch /api/users/sharesChange/:id
    - given a json body with share (could be positive or negative, indicate buy or sell shares)
    - update current login user's share owned and add corresponsed company 
     - if but share for this company for the first time
    - update corresponsed company information including share distribution and total share

- Post /api/companies/
    - create a company with name and totalShare in json body
- Post /api/endpoints/
    - create a endpoint with name in json body
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
    "totalShare": number,
    "sharesDistribtion": array of number,
    "sharesOwners": array of objectIDs,
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
