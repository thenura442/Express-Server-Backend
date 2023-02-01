//VALIDATING Assingment
const Joi = require('@hapi/joi');

//Subject Validation
const AssignmentValidation = data => {
    const schema = Joi.object({
        id: Joi.string()
            .min(5)
            .required(),
        title: Joi.string()
            .min(4)
            .required(),
        description: Joi.string()
            .min(6)
            .max(512),
        subject: Joi.string()
            .required(),
        url: Joi.required(),
        createdAt: Joi.string(),
        updatedAt: Joi.string()
    });
    return schema.validate(data);
}

module.exports.AssignmentValidation = AssignmentValidation;