const Joi = require("@hapi/joi");
/**
 * File name for request and response model should be same as router file.
 * Define request model with there order in router js.
 * For example first api in user router is is create user so we define schema with key 0.
 */
module.exports = {
    // Here 0 is the order of api route file.
    0: {
        body: {
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            address: Joi.string().required(),
            contact: Joi.number().required()
        },
        model: "createUser",
        group: "User",
        description: "Create user and save details in database"
    },
    1: {
        query: {},
        path: {}, // Define for api path param here.
        header: {}, // Define if header required.
        group: "User",
        model: "getUsers",
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
        excludeFromSwagger: false
    }
};