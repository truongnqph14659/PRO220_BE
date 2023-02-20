import Joi from 'joi';

export const permission = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        listPermissions: Joi.array()
            .items(
                Joi.object({
                    name: Joi.string(),
                    code: Joi.number(),
                }),
            )
            .required(),
    }),
};
