# botkit-storage-mysql

A MySQL storage module for Botkit.

## Usage

Just require `botkit-storage-mysql` and pass it a config with a `host` option.
Then pass the returned storage when creating your Botkit controller. Botkit will do the rest.
The `host` is the only required parameter in the configuration, but the configuration is passed through to `node-mysql`.
Anything that [node-mysql](https://www.npmjs.com/package/mysql) supports can be used.

Make sure everything you store has an `id` property, that's what you'll use to look it up later.

```
var Botkit = require('botkit'),
    var mysqlStorage = require('botkit-storage-mysql')({host: '127.0.0.1', user: 'root', password: 'rootPassword', database: 'my_db_name'});,
    controller = Botkit.slackbot({
        storage: mysqlStorage
    });
```

##License

  This software is licensed under the Apache 2 license, quoted below.

  Copyright 2016 ForgeX LLC Columbus Ohio

  Licensed under the Apache License, Version 2.0 (the "License"); you may not use this project except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.