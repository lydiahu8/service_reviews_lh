# SaleBoat

> Reviews Module that displays unique user reviews and images for specific products.

## Related Projects

  - https://github.com/sale-boat/service_related_kc
  - https://github.com/sale-boat/service_photos_mh
  - https://github.com/sale-boat/service_cart_ls

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## CRUD API Routing

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

```
{
  "id": "1",
  "product_id": "2",
  "product_name": "Apple AirPods",
  "username": "Jane Doe",
  "user_id": "5"
  "ratings": "3",
  "headline": "These are Fake!",
  "review": "Don't buy these, they broke within a few days!",
  "images": [],
  "created": "1511420673",
  "updated": "1528145536",
  "verified": true,
  "helpful": 9,
}
```

### POST REQUEST

> Endpoint: /api/reviews/

**URL Params** : `{ Review }` JSON Object

###### Example Responses

- **Data:** `JSON Object`

```
{
  "username": "John Docker",
  "ratings": "5",
  "headline": "Love These!",
  "review": "These are great for the gym!",
  "images": [],
}
```

### UPDATE REQUEST

> Endpoint: /api/reviews/:productId

**URL Params** : `productId`，`{ Review }` JSON Object

###### Example Responses

- **Data:** `JSON Object`

```
{
  "id": "1",
  "product_id": "2",
  "product_name": "Apple AirPods",
  "username": "Jane Doe",
  "user_id": "5"
  "ratings": "3",
  "headline": "These are Fake!",
  "review": "Don't buy these, they broke within a few days!",
  "images": [],
  "created": "1511420673",
  "updated": "1528145536",
  "verified": true,
  "helpful": 9,
}
```

#### DELETE REQUEST


> Endpoint: /api/reviews/:productId

**URL Params** : `productId`

###### Example Responses

- **Data:** `JSON Object`

```
{
  "id": "1",
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

