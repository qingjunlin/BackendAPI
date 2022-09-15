const request = require('supertest')
const app = require('./server')

describe('Twitter API', () => {
    it('Get /logout --> logout user', () => {
        return request(app)
            .get('/logout')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200)
    });

    it('Post /login --> login user', () => {
        return request(app)
            .post('/login')
            .send({
                username: 'qingjunlin',
                password: '131827lol'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual({
                    message: 'Login successfully'
                }
                )
            })
    });

    it('Post /register --> register user with same email', () => {
        return request(app)
            .post('/register')
            .send({
                username: "sx",
                password: "131827",
                firstname: "xxx",
                lastname: "yyy",
                age: 25,
                email: "qingjun2022@gmail.com"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual({ message: 'email in used' }
                )
            })
    })

    it('Post /register --> register user with same username', () => {
        return request(app)
            .post('/register')
            .send({
                username: "qingjunlin",
                password: "131827",
                firstname: "xxx",
                lastname: "yyy",
                age: 25,
                email: "qingjun255@gmail.com"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual({ message: 'username in used' }
                )
            })
    })

    it('Get /api/tweets --> get all tweets ', () => {
        return request(app)
            .get('/api/tweets')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        {
                            __v: expect.any(Number),
                            _id: expect.any(String),
                            content: expect.any(String),
                            user: expect.any(String),
                            likes: expect.any(Array),
                            createdAt: expect.any(String),
                            updatedAt: expect.any(String)
                        }
                    ])
                )
            })
    })

    it('Get /api/tweets/:id --> get one tweet by its id ', () => {
        return request(app)
            .get('/api/tweets/6322343b7cffe68bf8c40d2a')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    {
                        __v: expect.any(Number),
                        _id: '6322343b7cffe68bf8c40d2a',
                        content: expect.any(String),
                        user: expect.any(String),
                        likes: expect.any(Array),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String)
                    }

                )
            })
    })

    it('Get /api/tweets/user/:id--> get all tweet for current login user ', () => {

        return request(app)
            .get('/api/tweets/user/6321e40d5eb8bf78a3f48ea4')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        {
                            __v: expect.any(Number),
                            _id: expect.any(String),
                            content: expect.any(String),
                            user: '6321e40d5eb8bf78a3f48ea4',
                            likes: expect.any(Array),
                            createdAt: expect.any(String),
                            updatedAt: expect.any(String)
                        }]

                    ))
            })
    })

    it('Post /api/tweets/create--> post one tweet as current login user ', () => {

        return request(app)
            .post('/api/tweets/create')
            .send({
                "content": "supertest content "
            })
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(401)
            
    })
})

