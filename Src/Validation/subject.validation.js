//VALIDATING REGISTRATION
const Joi = require('@hapi/joi');

//Subject Validation
const SubjectValidation = data => {
    const schema = Joi.object({
        _id: Joi.string()
            .min(6)
            .required(),
        name: Joi.string()
            .min(6)
            .required(),
        description: Joi.string()
            .min(20)
            .max(512),
        lecturer: Joi.string()
            .min(6)
            .max(100)
            .required(),
        grade: Joi.string()
            .required(),
        url: Joi.string()
            .min(10)
            .max(1024)
            .required()
    });
    return schema.validate(data);
}


module.exports.SubjectValidation = SubjectValidation;
module.exports.Subject = SubjectValidation;