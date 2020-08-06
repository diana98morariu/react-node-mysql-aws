const { Model } = require('objection');

class User extends Model {
    static get tableName() {
        return "users";
    }
    static get jsonSchema(){
        return{
            type: 'object',
            required: ['username', 'email', 'password'],
            properties: {
                id: {type: 'integer'},
                firstName: {
                    type: 'string', 
                    minLength: 1, 
                    maxLength: 255
                },
                lastName: {
                    type: 'string', 
                    minLength: 1, 
                    maxLength: 255
                },
                username: {
                    type: 'string', 
                    minLength: 3, 
                    maxLength: 25
                },
                email: {
                    type: 'string', 
                    format: 'email', 
                    maxLength: 25,
                    errorMessage: { format: "Invalid email" }
                },
                password: { 
                    type: "string", 
                    minLength: 3, 
                    maxLength: 60 
                }
            }
        }
    }
}

module.exports = User;