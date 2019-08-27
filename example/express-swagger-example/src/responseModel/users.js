// The name of each response payload should be  model name defined in Request model schema and should sufix with ResponseModel.

module.exports = {
    createUser: {
        201: {
            message: "User created successfully"
        },
        500: {
            internal: "Server Error"
        }
    },
    getUsers: {
        200: [{
            id: 'number',
            firstName: 'string',
            lastName: 'string',
            address: 'string',
            contact: 'number',
            createdAt: 'date',
            updatedAt: 'date'
        }],
        500: {
            internal: "Server Error"
        }
    },
    updateUser:{
        201: {
            message: "User Updated successfully"
        },
        500: {
            internal: "Server Error"
        }
    },
    getUserDetails: {
        200: {
            id: 'number',
            firstName: 'string',
            lastName: 'string',
            address: 'string',
            contact: 'number',
            createdAt: 'date',
            updatedAt: 'date'
        },
        500: {
            internal: "Server Error"
        }
    },
};