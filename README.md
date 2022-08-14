### Account Funding API

### Introduction

This API is a simple Fintech Project that allows user to register or login to the system and then fund their account, and then withdraw funds from the account and transfer funds to other accounts.

### User Authentication API Reference

#### register

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "email": "
    "name": "
    "email": "
    "password": "
    }' \
    https://lendsqr-account-funding-api.herokuapp.com/api/v1/auth/register
```

| Parameter  | Type     | Description                        |
| :--------- | :------- | :--------------------------------- |
| `name`     | `string` | **Required**. name is required     |
| `email`    | `string` | **Required**. email is required    |
| `password` | `string` | **Required**. password is required |

### User Accounting API Reference

#### create bank account

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "type": "
  "number": "
  "balance": "
  "user_id": "
  }' \
    https://lendsqr-account-funding-api.herokuapp.com/api/v1/users/account
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `type`    | `string` | **Required**. type is required    |
| `number`  | `string` | **Required**. number is required  |
| `balance` | `string` | **Required**. balance is required |
| `user_id` | `string` | **Required**. user_id is required |

#### Fetch All user bank account

```bash
curl -X GET -H "Content-Type: application/json" -d '{
  "bearer": token"
  }' \
    https://lendsqr-account-funding-api.herokuapp.com/api/v1/users/account
```

| Parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `bearer`  | `string` | **Required**. bearer token is required |

#### users fund their account

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "amount": "
  "id": "
  "bearer": token"
  }' \
    https://lendsqr-account-funding-api.herokuapp.com/api/v1/users/account/${id}/fund
```

| Parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `amount`  | `string` | **Required**. amount is required       |
| `id`      | `string` | **Required**. id is required           |
| `bearer`  | `string` | **Required**. bearer token is required |

#### users can transfer funds to other users

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "sender_id": "
  "reciever_id": "
  "bearer": token""
  }' \
    https://lendsqr-account-funding-api.herokuapp.com/api/v1/users/${sender_id}/account/${reciever_id}/transfer
```

| Parameter     | Type     | Description                            |
| :------------ | :------- | :------------------------------------- |
| `sender_id`   | `string` | **Required**. sender_id is required    |
| `reciever_id` | `string` | **Required**. reciever_id is required  |
| `bearer`      | `string` | **Required**. bearer token is required |

#### users withdraw their account

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "amount": "
  "id": "
    "bearer": token"
  }' \
    https://lendsqr-account-funding-api.herokuapp.com/api/v1/users/account/${id}/withdraw
```

| Parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `amount`  | `string` | **Required**. amount is required       |
| `id`      | `string` | **Required**. id is required           |
| `bearer`  | `string` | **Required**. bearer token is required |

Copyright (c) 2020 Abiodun
