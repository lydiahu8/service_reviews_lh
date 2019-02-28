# SaleBoat

> Reviews Module that displays unique user reviews and images for specific products.

## Related Projects

  - [Related Products](https://github.com/sale-boat/service_related_kc)
  - [Photos](https://github.com/sale-boat/service_photos_mh)
  - [Service Cart](https://github.com/sale-boat/service_cart_ls)

## Table of Contents

1. [API](#api)
1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## API

### CRUD API Routing

| Endpoint                   | Type    | Operation                 |
|----------------------------|---------|---------------------------|
| `/api/reviews/:productId`  | GET     | Get all reviews           |
| `/api/reviews/`            | POST    | Add a review              |
| `/api/reviews/:reviewsId`  | PUT     | Update a review           |
| `/api/reviews/:reviewsId`  | DELETE  | Delete a review           |

### CREATE

> POST  /api/reviews/

Adds a new review to a specific product.

###### Example Request

```js
{
  "id": Number,
  "product_id": Number,
  "product_name": String,
  "user_id": Number,
  "username": String,
  "overall_ratings": Number,
  "subRatings": [
    {
      "feature": String,
      "rating": Number
    }
  ],
  "headline": String,
  "review": String,
  "images": [
    String
  ],
  "created": Number,
  "updated": Number,
  "verified": Boolean,
  "helpful": Number,
}
```

###### Example Responses

- **Data:** `JSON Object`

```js
{
  "id": Number,
  "isSuccessful": Boolean,
}
```

##### Success

- **Status Code:** `201 CREATED`

##### Error

- **Status Code:** `400 BAD REQUEST`


### READ

> GET /api/reviews/:productId

Returns a list of reviews for a specific product.

###### Example Responses

- **Data:** `JSON Object`

```js

{
  "id": Number,
  "product_id": Number,
  "product_name": String,
  "user_id": Number,
  "username": String,
  "overall_ratings": Number,
  "subRatings": [
    {
      "feature": String,
      "rating": Number
    }
  ],
  "headline": String,
  "review": String,
  "images": [
    String
  ],
  "created": Number,
  "updated": Number,
  "verified": Boolean,
  "helpful": Number,
}

```
##### Success

- **Status Code:** `200 OK`

##### Error

- **Status Code:** `400 BAD REQUEST`


### UPDATE

> PUT /api/reviews/:reviewsId

Updates a review for a specific product.

###### Example Request

- **Data:** `JSON Object`

```js
{
  "id": Number,
  "product_id": Number,
  "product_name": String,
  "user_id": Number,
  "username": String,
  "overall_ratings": Number,
  "subRatings": [
    {
      "feature": String,
      "rating": Number
    }
  ],
  "headline": String,
  "review": String,
  "images": [
    String
  ],
  "created": Number,
  "updated": Number,
  "verified": Boolean,
  "helpful": Number,
}
```

##### Success

- **Status Code:** `201 CREATED`

##### Error

- **Status Code:** `400 BAD REQUEST`

#### DELETE

> DELETE /api/reviews/:reviewsId

Deletes a review for a specific product.

###### Example Responses

- **Data:** `JSON Object`

```js
{
  "id": Number,
  "isSuccessful": Boolean,
}
```

##### Success

- **Status Code:** `204 NO CONTENT`

##### Error

- **Status Code:** `400 BAD REQUEST`

## Usage

> npm postinstall

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

