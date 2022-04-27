const joi = require("joi");

module.exports.registerValidation = (data) => {
    const schema = joi.object({
        user:  joi.string().trim().required().alphanum(),
        pwd:  joi.string().trim().required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$'))
    }).unknown();

    return schema.validate(data);
}