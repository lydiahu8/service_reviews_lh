# SaleBoat

> Reviews Module that displays unique user reviews and images for specific products.

## Related Projects

  - https://github.com/sale-boat/service_related_kc
  - https://github.com/sale-boat/service_photos_mh
  - https://github.com/sale-boat/service_cart_ls

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
| `/api/reviews/:productId`  | PUT     | Update a review           |
| `/api/reviews/:productId`  | DELETE  | Delete a review           |

### GET REQUEST

> Endpoint: /api/reviews/:productId

**URL Params** : `productId`

###### Example Responses

- **Data:** `JSON Object`

```js
{
  "id": Number,
  "product_id": Number,
  "product_name": String,
  "username": String,
  "user_id": Number,
  "ratings": Number,
  "headline": String,
  "review": String,
  "images": [],
  "created": Number,
  "updated": Number,
  "verified": Boolean,
  "helpful": Number,
}
```

### POST REQUEST

> Endpoint: /api/reviews/

**URL Params** : `{ Review }` JSON Object

###### Example Responses

- **Data:** `JSON Object`

```js
{
  "id": Number,
  "isSuccessful": Boolean,
}
```

### UPDATE REQUEST

> Endpoint: /api/reviews/:productId

**URL Params** : `productId`，`{ Review }` JSON Object

###### Example Responses

- **Data:** `JSON Object`

```js
{
  "id": Number,
  "product_id": Number,
  "product_name": String,
  "username": String,
  "user_id": Number,
  "ratings": Number,
  "headline": String,
  "review": String,
  "images": [],
  "created": Number,
  "updated": Number,
  "verified": Boolean,
  "helpful": Number,
}
```

#### DELETE REQUEST

> Endpoint: /api/reviews/:productId

**URL Params** : `productId`

###### Example Responses

- **Data:** `JSON Object`

```js
{
  "id": Number,
  "isSuccessful": Boolean,
}
```

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

