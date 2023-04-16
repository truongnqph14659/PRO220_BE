import { generalWarehouse } from '../services';
import _ from 'lodash';

export const getAll = async (req, res) => {
    try {
        const dataGeneralMaterial = await generalWarehouse.getAll();
        res.status(200).json(dataGeneralMaterial);
    } catch (error) {
        res.status(400).json({
            error: 'không có vật tư nào',
        });
    }
};

export const updatePartGeneral = async (req, res) => {
    try {
        const dataGeneralMaterial = await generalWarehouse.updateGeneralPart(req.body);
        res.status(200).json(dataGeneralMaterial);
    } catch (error) {
        res.status(400).json({
            error: 'cập nhật thất bại',
        });
    }
};
