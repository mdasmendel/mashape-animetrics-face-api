# mashape-animetrics-face-api
Packge for integrate Masape Animetrics Face Recognition

## Installation

##### Download

Download the [latest release](https://github.com/mdasmendel/mashape-animetrics-face-api/releases)

##### Clone the repo

```bash
$ git clone https://github.com/mdasmendel/mashape-animetrics-face-api.git 
```

##### Install with [npm](https://www.npmjs.com)

```bash
$ npm install mashape-animetrics-face-api
```


## Usage

Include `Mashape Analytics Agent` after `jQuery`.

```js
// Basic usage
const mashapeAnimetricsApi = require('mashape-animetrics-face-api');

let client = mashapeAnimetricsApi.client({
    "animetricsKey": "xxxxxxxxxxxxxxxxx",
    "mashapeKey": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  });
  
  let detect = yield mashapeCilent.detect.fromUrl('photo url here');
  
  let enroll = yield detect.enroll().execute('gallery id here', 'image id here');

```
