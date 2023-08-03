import Joi from 'joi';

interface CalculateResistanceDTO {
    bandAColorId: number;
    bandBColorId: number;
    bandCColorId: number;
    bandDColorId: number;
}

const calculateResistance = Joi.object<CalculateResistanceDTO>({
    bandAColorId: Joi.number().integer().required(),
    bandBColorId: Joi.number().integer().required(),
    bandCColorId: Joi.number().integer().required(),
    bandDColorId: Joi.number().integer().required(),
});

export const validateCalculateResistanceDto = (data: any) => {
    return calculateResistance.validate(data);
};
