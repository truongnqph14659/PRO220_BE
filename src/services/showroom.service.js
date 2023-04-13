import mongoose from 'mongoose';
import { showroomModel } from '../models';
import _ from 'lodash';
export const getAll = () => {
    return showroomModel.find({ deleted: false });
};

export const getById = (_id, filter = { deleted: false }) => {
    return showroomModel
        .findOne({
            _id,
            ...filter,
        })
        .exec();
};

export const create = (data) => {
    const dataShowroom = {
        name: data.name,
        phone: data.phone,
        address: data.address,
        images: data.images,
        location: {
            type: 'Point',
            coordinates: [parseFloat(data.longitude), parseFloat(data.latitude)],
        },
        districtId: data.districtId,
    };
    return new showroomModel(dataShowroom).save();
};

export const removeById = async (_id) => {
    const showroomId = mongoose.Types.ObjectId(_id);
    showroomModel.delete({ _id: showroomId }, (err, rs) => {});
};

export const updateById = (_id, data) => {
    return showroomModel.findOneAndUpdate({ _id }, data, { new: true });
};

export const updateStatusById = (_id, data) => {
    return showroomModel.findOneAndUpdate({ _id }, data, { new: true });
};

export const showroomNearBy = (data) => {
    return showroomModel.aggregate([
        {
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [parseFloat(data.longitude), parseFloat(data.latitude)],
                },
                key: 'location',
                maxDistance: 1000,
                distanceField: 'calculated',
                spherical: true,
            },
        },
    ]);
};

export const compareShowroomNearBy = (data) => {
    return showroomModel.aggregate([
        {
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [parseFloat(data.longitude), parseFloat(data.latitude)],
                },
                key: 'location',
                distanceField: 'calculated',
                spherical: true,
            },
        },
    ]);
};

// export const search = async (text) => {
//     //i : khong phan biet chu hoa, chu thuong
//     return showroomModel.find({
//         $or: [
//             { name: new RegExp(text, 'i'), deleted: false },
//             { address: new RegExp(text, 'i'), deleted: false },
//         ],
//     });
// };

const filterShowroomAddress = (showrooms, address) => {
    return showrooms.filter((showroom) => showroom.address.toLowerCase().includes(address.toLowerCase()));
};

export const searchValueInShowroom = async (dataSearch) => {
    const isDistrict = _.has(dataSearch, 'district');
    const isAddress = _.has(dataSearch, 'address');

    if (isDistrict && isAddress) {
        const listShowroom = await showroomModel
            .find({ districtId: dataSearch.district })
            .select({ _id: 1, name: 1, phone: 1, address: 1, images: 1, deleted: 1 });
        return filterShowroomAddress(listShowroom, dataSearch.address);
    } else if (isDistrict) {
        const listShowroom = await showroomModel
            .find({ districtId: dataSearch.district })
            .select({ _id: 1, name: 1, phone: 1, address: 1, images: 1, deleted: 1 });
        return listShowroom;
    } else if (isAddress) {
        const listShowroom = await showroomModel.aggregate([
            {
                $project: {
                    _id: 1,
                    name: 1,
                    phone: 1,
                    address: 1,
                    images: 1,
                    deleted: 1,
                },
            },
        ]);
        return filterShowroomAddress(listShowroom, dataSearch.address);
    } else {
        const listShowroom = await showroomModel.aggregate([
            {
                $project: {
                    _id: 1,
                    name: 1,
                    phone: 1,
                    address: 1,
                    images: 1,
                    deleted: 1,
                },
            },
        ]);
        return listShowroom;
    }
};
