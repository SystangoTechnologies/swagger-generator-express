# swagger-generator-express

NPM module to generate swagger documentation for Express APIs with minimum additional effort.

>[![Downloads](https://badgen.net/npm/dt/swagger-generator-express)](https://www.npmjs.com/package/swagger-generator-express) [![npm dependents](https://badgen.net/npm/dependents/swagger-generator-express)](https://www.npmjs.com/package/swagger-generator-express?activeTab=dependents)

## Description
This NPM module let's you validate and generate swagger (OpenAPI) documentation for your Express APIs without putting in much extra efforts. You just need to follow the convention for your request and response objects, and the module will take care of the rest. This module will cover your controllers, API specs along with request and response object structures.


## Usage ##

Install using npm:

```bash
$ npm install --save swagger-generator-express
```

### Express setup `app.js` ###

```javascript
const express = require("express");
const app = express();
const swagger = require("swagger-generator-express");

// Define your router here

const options = {
	title: "swagger-generator-express",
	version: "1.0.0",
	host: "localhost:3000",
	basePath: "/",
	schemes: ["http", "https"],
	securityDefinitions: {
		Bearer: {
			description: 'Example value:- Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MmQwMGJhNTJjYjJjM',
			type: 'apiKey',
			name: 'Authorization',
			in: 'header'
		}
	},
	security: [{Bearer: []}],
	defaultSecurity: 'Bearer'
};

/**
 * serveSwagger must be called after defining your router.
 * @param app Express object
 * @param endPoint Swagger path on which swagger UI display
 * @param options Swagget Options.
 * @param path.routePath path to folder in which routes files defined.
 * @param path.requestModelPath Optional parameter which is path to folder in which requestModel defined, if not given request params will not display on swagger documentation.
 * @param path.responseModelPath Optional parameter which is path to folder in which responseModel defined, if not given response objects will not display on swagger documentation.
 */
swagger.serveSwagger(app, "/swagger", options, {routePath : './src/routes/', requestModelPath: './src/requestModel', responseModelPath: './src/responseModel'});

```

### Express router `user.js` ###

```javascript
'use strict';
var express = require('express');
var router = express.Router();
var { validation } = require('swagger-generator-express');
var userController = require('../controller/user');
var requestModel = require('../requestModel/users');

router.post('/', validation(requestModel[0]), userController.createUser);

router.get('/', userController.getUsers);

router.put('/:userId', userController.updateUser);

router.get('/:userId', userController.getUserDetails);

router.delete('/:userId', userController.deleteUser);

module.exports = router;
/**
 *  Router can be exported in different ways if your structure need export some other data along with routers. 
 * Create object with key router inside and export from there For example
 * module.exports = {
        router: router,
        basePath: '/users'
    }
 * /

```

## Request Model `/requestModel/user.js`
  - File name for request model should be same as router file.
  - Define request model with their order of apis in router js file. For example first api in user router is create user so you need to define createUser schema with key 0.
  - Add boolean flag "excludeFromSwagger" inside requestmodel if you want to exclude any particular api from swagger documentation.
  - This Request model follows Joi module conventions, so it can also be used for request parameters validation.

```javascript
const Joi = require("@hapi/joi");
/**
 * File name for request and response model should be same as router file.
 * Define request model with there order in router js file.
 * For example first api in user router is create user so we define createUser schema with key 0.
 */
module.exports = {
    // Here 0 is the order of api in route file.
    0: {
        body: {
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            address: Joi.string().required(),
            contact: Joi.number().required()
        },
        model: "createUser", // Name of the model
        group: "User", // Swagger tag for apis.
        description: "Create user and save details in database"
    },
    1: {
        query: {},
        path: {}, // Define for api path param here.
        header: {}, // Define if header required.
        group: "User",
        description: "Get All User"
    },
    2: {
        body: {
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            address: Joi.string().required(),
            contact: Joi.number().required()
        },
        model: "updateUser",
        group: "User",
        description: "Update User"
    },
    3: {
        query: {},
        path: {
            userId: Joi.number().required()
        }, // Define for api path param here.
        header: {}, // Define if header required.
        model: 'getUserDetails',
        group: "User",
        description: "Get user details"
    },
    4: {
        excludeFromSwagger: false // Make it true if need to exclude apis from swagger.
    }
};
```

## Response Model `/responseModel/user.js`

 - File name for response model should be same as router file.
 - Response name should be same as model name from requestmodel. For example model name of create user api is "createUser" so key for response object will be "createUser".
 - Inside response model define responses with respect to their status code returned from apis.

```javascript

// The name of each response payload should be model name defined in Request model schema.

// The name of each response payload should be  model name defined in Request model schema and should sufix with ResponseModel.

module.exports = {
    createUser: {
        201: {
            message: {
                type: 'string'
            }
        },
        500: {
            internal: {
                type: 'string'
            }
        }
    },
    getUsers: {
        200: [{
            id: {
                type: 'number'
            },
            firstName: {
                type: 'string',
                pattern: '^\d{3}-\d{2}-\d{4}$'
            },
            lastName: {
                type: 'string'
            },
            address: {
                type: 'string'
            },
            contact: {
                type: 'number'
            },
            createdAt: {
                type: 'string',
                format: 'date-time'
            },
            updatedAt: {
                type: 'string',
                format: 'date-time'
            }
        }],
        500: {
            internal: "string"
        }
    },
    updateUser: {
        201: {
            message: {
                type: 'string'
            }
        },
        500: {
            internal: {
                type: 'string'
            }
        }
    },
    getUserDetails: {
        200: {
            id: {
                type: 'number'
            },
            firstName: {
                type: 'string',
                pattern: '^\d{3}-\d{2}-\d{4}$'
            },
            lastName: {
                type: 'string'
            },
            address: {
                type: 'string'
            },
            contact: {
                type: 'number'
            },
            createdAt: {
                type: 'string',
                format: 'date-time'
            },
            updatedAt: {
                type: 'string',
                format: 'date-time'
            }
        },
        500: {
            internal: {
                type: 'string'
            }
        }
    },
};
```

Open `http://`<app_host>`:`<app_port>`/swagger` in your browser to view the documentation.

# Version changes

## v2.1.0

#### Added Request Parameter Validation Function

- Use `validation` function exported from this module to validate request params.

```javascript
'use strict';
var express = require('express');
var router = express.Router();
var { validation } = require('swagger-generator-express');
var userController = require('../controller/user');
var requestModel = require('../requestModel/users');

/**
 * Function: validation
 * Use validation function to validate request parameter.
 * @param schema Joi schema for request.
 */
router.post('/', validation(requestModel[0]), userController.createUser);

module.exports = router;
```


## Pre-requisite

- Node v10 or above
- Express 4 or above

## Contributors

[Vikas Patidar](https://www.linkedin.com/in/vikas-patidar-0106/)
[Nidhi Tripathi](https://www.linkedin.com/in/nidhi-tripathi-3244817a/)
