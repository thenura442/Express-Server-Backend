//VALIDATING REGISTRATION
const Joi = require('@hapi/joi');

//Subject Validation
const SubjectValidation = data => {
    const schema = Joi.object({
        _id: Joi.string()
            .min(4)
            .required(),
        name: Joi.string()
            .min(4)
            .required(),
        description: Joi.string()
            .min(10)
            .max(512),
        lecturer_id: Joi.string()
            .min(4)
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