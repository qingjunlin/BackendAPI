
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

- Post /api/tweets/create
    - create a tweet for current user given a json body with Tweet schema
- Get /api/tweets
    - get all tweets in database
- Get /api/tweets/:id
    - get one tweet with specific id
- Get /api/tweets/user/:id
    - get all tweets posted by user with specific id
- Patch /api/tweet/:id
    - update the content of a tweet with specific id with current login user
- Delete /api/tweet/:id
    - Delete a tweet with specific id with current login user
### Models

#### User

```Json
{
    "username": string,
    "password": string,
    "firstname": string,
    "lastname": string,
    "age": number,
    "email": string
}
```

#### Tweet

```Json
{
    "content": string,
    "user": ObjectId
}
```
