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

```js
// Basic usage
const mashapeAnimetricsApi = require('mashape-animetrics-face-api');

let client = mashapeAnimetricsApi.client({
    "animetricsKey": "xxxxxxxxxxxxxxxxx",
    "mashapeKey": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  });
  ...
 	co(function *(){
	    ...
        let detect = yield mashapeCilent.detect.fromUrl('photo url here');//detect image from url
          
        let enroll = yield detect.enroll('gallery id here', 'subject id here','face id (default 0)');//enroll image from current detect
         
        let gallery = yield mashapeCilent.gallery('gallery id').getSubjects();//get subjects id
         
        enroll = yield mashapeCilent.gallery('gallery id').enroll('image obj', 'face obj', 'subject id');//enroll image in current group
        ...
 	})
 	.catch(onError)
  ...
```
## Copyright and license

Copyright Dascal Mihai, 2017.

Licensed under [the MIT License](https://github.com/mdasmendel/mashape-animetrics-face-api/blob/master/LICENSE)
