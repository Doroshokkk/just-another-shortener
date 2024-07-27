# LINK SHORTENER API

Used to shorten links that are so long they irritate you.

## Installation

1. Clone the repository in your working directory

```
git clone https://github.com/Doroshokkk/just-another-shortener
```

2. Run a command to install dependencies

```
npm install
```

3. Boot the docker container with Server, Psql and Redis images

```
npm run docker
```

4. Your local application should be running on localhost:3000. It supports hot-reloading for /src file changes

5. To run tests, go to your container, open your Server image terminal, and enter
```
npm run test
```

## Routes

### GET /:shortcode

Endpoint for redirecting users from shortened link to original one.

`Example: `
localhost:3000/awBfe6 -> https://googlebutveryveryverylong.com?some=queryparam


### POST /api/shorten

Endpoint for creating a new short link from a long one.

#### Request example:
`localhost:3000/api/shorten`
```
body: {
    "link": "https://googlebutveryveryverylong.com?some=queryparam",
}
```
```
response: {
      status: 'success',
      message: 'link successfully shortened',
      data: `localhost:3000/awBfe6` (https://shrt.li/awBfe6 ... or something like this for prod)
    }
```


### GET /api/resolve

Endpoint for (well nothing cause I missunderstood it at first xD) getting the original link via api. Later might add some stats for the link to response

#### Request example:
`localhost:3000/api/resolve?link=localhost:3000/awBfe6`
```
query: {
    "link": "localhost:3000/awBfe6",
}
```
```
response: {
    "status": "success",
    "message": "Data for localhost:3000/awBfe6",
    "data": {
        "id": 130,
        "originalUrl": "https://googlebutveryveryverylong.com?some=queryparam",
        "shortUrl": "localhost:3000/awBfe6",
        "userId": null,
        "expirationTime": null,
        "createdAt": "2023-09-01T14:01:15.236Z",
        "updatedAt": "2023-09-01T14:01:15.236Z"
    }
}
```


# But what if? - Part 2
If we're planning for our app to reach such popularity that it'll suffer from 10.000 or even 100.000 requests per second loads, I'd do a few things:
* 1 - I'd introduce rate limiting (for example, by IP address). Such amounts of requests are on a DDOS attack levels, so it's reasonable to have some control if we don't want to spend thousands on server maintenance or AWS bills.
* 2 - I'd think about switching to NoSQL database, as they are designed for horizontal scalability and can handle high load easier, and also allow to partition the data.
* 3 - Of course, I'd spend a lot of time profiling and trying to optimize the hell out of each function, cause usage===money especially in case of serverless.
* 4 - I'd use a load balancer, cause not only the database is a bottleneck, but also our server. We'd have to distribute traffic by many instances.
* 5 - Redis where possible, to reduce amount of DB calls. For this amount of traffic, I think it's reasonable to keep the popular links cached for about a day.
* 6 - About the url generation method - for now I use a simple random-based function, that can generate more then 62 billion unique codes, that should be enough. But I'd look for better approaches and optimization of that function.
