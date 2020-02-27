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