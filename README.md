# Fulfil.io Typescript Client

---

### Fulfil REST API Client for Typescript/Javascript

#### Installation

```
npm i @lntw/fulfil-client
```

#### Quickstart

```typescript
import { Client } from 'fulfil-client'

CLIENT = new Client('<subdomain>', '<api key>')

PRODUCT = Client.model('product.product')

const getProduct = async () => {
  try {
    const products = await PRODUCT.find({
      fields: ['id', 'code'],
      filter: [
        ['code', 'ilike', '%iphone%']
      ]
    })
  } catch (e) {
    console.error(e)
  }
}

getProduct();
```
