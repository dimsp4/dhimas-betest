# BE Test

- `db_dhimas_betest/` : MongoDB Collections
  - `userdatas.json` : Userdatas collection exported on json
  - `users.json` : Userdatas collection exported on json
- `ms_dhimas_betest/` : Backend Microservices that communicates each other
  - `BtpnAuthAPI` : Backend for Authentication & Authorization methods
  - `BtpnUserAPI` : Backend for User Data CRUD methods
- `redis_dhimas_betest.rdb` : Redis datas

## API

There is two Backend Application on this project,

- `BtpnAuthAPI`
- `BtpnUserAPI`

## BtpnAuthAPI

This API is for Register, Login, and Get Authorization Token.

### Login
  
| Field      | Type   | Description               |
| ---------- | ------ | ------------------------- |
| `username` | String | Nama pengguna (username). |
| `password` | String | Kata sandi pengguna.      |

#### **Request Body**

```json
{
  "username": "user123",
  "password": "password123"
}
```

### Register
  
| Field      | Type   | Description               |
| ---------- | ------ | ------------------------- |
| `username` | String | Nama pengguna (username). |
| `password` | String | Kata sandi pengguna.      |

#### **Request Body**

```json
{
  "username": "user123",
  "password": "password123"
}
```

## BtpnUserAPI

This API is for Create, Read, Update, Delete on User Data

### Technology
- MongoDB
- Redis
- Node JS
- Express

## Endpoint

`localhost/api/users/`

* `/` (GET) - Mendapatkan semua data user.
* `/:id` (GET) - Mendapatkan data user berdasarkan ID.
* `/byAccountNumber/:accountNumber` (GET) - Mendapatkan data user berdasarkan nomor rekening.
* `/byIdentityNumber/:identityNumber` (GET) - Mendapatkan data user berdasarkan nomor identitas.
* `/` (POST) - Membuat data user baru.
* `/:id` (PUT) - Memperbarui data user.
* `/:id` (DELETE) - Menghapus data user.


### Catatan

- Semua endpoint membutuhkan autentikasi menggunakan token JWT.
- Endpoint (GET) / dan /:id menggunakan cache Redis.
- Jika data cache sudah tersedia, maka data tersebut akan dikembalikan tanpa perlu melakukan query ke database.
- Endpoint createUserData, updateUserData, dan deleteUserData akan menghapus cache data user.
