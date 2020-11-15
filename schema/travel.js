module.exports = {
    type: 'object',
    required: ['username', 'country'],
    properties: {
        username: {
            type: 'string',
        },
        country: {
            type: 'object',
            required: [],
            properties: {
                name: {
                    type: 'string',
                },
                capital:  {
                    type: 'string',
                },
                flag: {
                    type: 'string',
                },
                population: {
                    type: 'string',
                },
                timezones: {
                    type: 'string',
                },
                currencies: {
                    type: 'string',
                },
                alpha2Code: {
                    type: 'string',
                }
            }
        },
        goingWith: {
            type: 'string',
        },
        outBoundDate: {
            type: 'string',
        },
        inBoundDate:{
            type: 'string',
        },
        flight: {
            type: 'object',
            required: [],
            properties: {
                airline: {
                    type: 'string',
                },
                time: {
                    type: 'string',
                },
                flightNo: {
                    type: 'string',
                },
                airport: {
                    type: 'string',
                },
                price: {
                    type: 'number',
                    minimum: 0
                }
            }
        },
        accommodation: {
            type: 'object',
            required: [],
            properties: {
                name: {
                    type: 'string',
                },
                address: {
                    type: 'string',
                },
                price:  {
                    type: 'number',
                    minimum: 0
                }
            }
        },
        budget: {
            type: 'object',
            required: [],
            properties: {
                allocated: {
                    type: 'number',
                    minimum: 0
                },
                actual: {
                    type: 'number',
                    minimum: 0
                }
            }
        },
        completed: {
            type: 'bool'
        }
    }
};


