import { showroomService } from '../services';
import { materialsService } from '../services';
import { warehouseService } from '../services';

export const getAll = async (req, res) => {
    try {
        const data = await showroomService.getAll();
        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: 'khong co don nao',
        });
    }
};

export const getById = async (req, res) => {
    try {
        const data = await showroomService.getById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: 'khong tim thay don nao',
        });
    }
};

export const create = async (req, res) => {
    try {
        const showroom = await showroomService.create(req.body);
        const dataMaterials = await materialsService.getAll();
        const showroomWarehouse = {
            "showroomId":showroom._id,
            "materials":dataMaterials.map((material)=>{
                    return {
                        materialId:material._id,
                        quantity:0
                    }
                })
        }
        await warehouseService.create(showroomWarehouse)
        res.json(showroom);
    } catch (error) {
        res.status(400).json({
            error: 'khong them duoc',
        });
    } 
};

export const removeById = async (req, res) => {
    try {
        showroomService.removeById(req.params.id).then(async () => {
            const data = await showroomService.getById(req.params.id, { deleted: true });
            res.status(200).json(data);
        });
    } catch (error) {
        res.status(400).json({
            error: 'khong xoa duoc',
        });
    }
};

export const removeByIds = async (req, res) => {
    try {
        showroomService.removeByIds(req.body.ids).then(async () => {
            res.json({ deleted: true });
        });
    } catch (errors) {
        res.status(400).json({
            errors,
            message: 'Đã có lỗi xảy ra xóa thất bại!',
        });
    }
};

export const updateById = async (req, res) => {
    try {
        const data = await showroomService.updateById(req.params.id, req.body);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: 'khong sua duoc',
        });
    }
};

export const showroomNearBy = async (req, res) => {
    try {
        const data = await showroomService.showroomNearBy(req.body);
        const listShowroom = data.filter((showroom) => showroom.deleted == false);
        if (listShowroom.length !== 0) {
            res.json(listShowroom);
        } else {
            res.json({ message: 'không tìm thấy cửa hàng nào gần bạn' });
        }
    } catch (error) {
        res.status(400).json({
            error: 'lỗi tìm kiếm!',
        });
    }
};

export const search = async (req, res) => {
    try {
        const data = await showroomService.search(req.query.value);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({
            error,
            message: 'Không tìm thấy showrooms!',
        });
    }
};
