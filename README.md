# full-redact

Fully redact all occurrences of specified secrets in an object.

[![CircleCI](https://circleci.com/gh/MikeSmvl/full-redact.svg?style=shield)](https://circleci.com/gh/MikeSmvl/full-redact)

## Installation

```
npm i full-redact
```

## Usage

```js
const fullRedact = require('full-redact');

let redact = fullRedact({ secrets: ['password', 'apiKey'] });

let obj = {
	username: 'mike',
	password: '123',
	config: {
		apiKey: '123abc',
	},
};

console.log(redact(obj));

// {
//   username: 'mike',
//   password: '[REDACTED]',
//   config: {
//     apiKey: '[REDACTED]',
//    }
//  }
```

## Options

### `require('full-redact')({censor, secrets, inPlace}) => Function`

Returns a function that can be used to redact secrets in an object.

| Options |      Type      |  Default   | Required |
| :-----: | :------------: | :--------: | :------: |
| censor  |     string     | [REDACTED] |  false   |
| secrets | array\<string> |    n/a     |   true   |
| inPlace |    boolean     |   false    |  false   |

#### `censor`

The replacement string that will be used when redacting a secret.

#### `secrets`

The array of strings that represent the secrets to be redacted.
Any occurrence of these secrets will have it's value inside the object replaced by the **censor**.

#### `inPlace`

When **inPlace** is true, it will update (redact) the object directly (in-place) instead of returning a copy of the object that has been redacted.

## License

**MIT**
