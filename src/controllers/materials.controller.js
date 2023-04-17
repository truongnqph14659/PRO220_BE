import { materialsService } from '../services';
import _ from 'lodash';
import { insertManyMaterialWarehouse } from '../services/warehouse.service';
import { findMaterials } from '../services/materials.service';
import { createPartInGeneralWarehouse } from '../services/generalWarehouse.service';

export const getAll = async (req, res) => {
    try {
        const data = await materialsService.getAll();
        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: 'khong co don nao',
        });
    }
};

export const getById = async (req, res) => {
    try {
        const data = await materialsService.getById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: 'khong tim thay don nao',
        });
    }
};

export const create = async (req, res) => {
    try {
        const data = await materialsService.create(req.body);
        const quantity = req.body.quantity == null ? 0 : req.body.quantity;
        await createPartInGeneralWarehouse({ materialId: data._id, quantity });
        await insertManyMaterialWarehouse({ materialId: data._id, quantity });
        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: 'khong them duoc',
        });
    }
};

export const updateById = async (req, res) => {
    try {
        const data = await materialsService.updateById(req.params.id, req.body);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: 'khong sua duoc',
        });
    }
};

export const findMaterals = async (req, res) => {
    try {
        const data = await findMaterials(req.query);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: 'không tìm kiếm được thông tin',
        });
    }
};
