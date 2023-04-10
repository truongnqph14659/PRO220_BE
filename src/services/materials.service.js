import _ from 'lodash';
import mongoose from 'mongoose';
import {
    materialsModel
} from '../models';

export const getAll = async () => {
    return materialsModel.find();
};

export const getById = async (_id) => {
    return await materialsModel.findOne({
        _id
    }).exec();
};

export const create = ({
    name,
    priceInitial,
    price,
    image,
    unit
}) => {
    return new materialsModel({
        name,
        priceInitial,
        price,
        image,
        unit
    }).save();
};

export const updateById = async (_id, data) => {
    return await materialsModel.findOneAndUpdate({
        _id
    }, data, {
        new: true
    });
};

const dataFilter = [{
        value: 2,
        label: 'dưới 100,000 VNĐ',
        query: {
            price: {
                $lt: 100000
            }
        },
        sortPrice: {
            price: 1
        },
    },
    {
        value: 3,
        label: 'giá giảm dần',
        query: {},
        sortPrice: {
            price: -1
        },
    },
    {
        value: 7,
        label: 'giá tăng dần',
        query: {},
        sortPrice: {
            price: 1
        },
    },
    {
        value: 6,
        label: 'từ 100,000 VNĐ - 500,000 VNĐ',
        query: {
            price: {
                $gt: 100000,
                $lt: 500000
            }
        },
        sortPrice: {
            price: 1
        },
    },
    {
        value: 4,
        label: 'dưới 1,000,000 VNĐ',
        query: {
            price: {
                $lt: 1000000
            }
        },
        sortPrice: {
            price: 1
        },
    },
    {
        value: 5,
        label: 'trên 1,000,000 VNĐ',
        query: {
            price: {
                $gt: 1000000
            }
        },
        sortPrice: {
            price: 1
        },
    },
    {
        value: 1,
        label: 'tất cả vật tư',
        query: {},
        sortPrice: {
            price: 1
        },
    },
];

export const findMaterials = async (filterInput) => {
    const findObjFilter = dataFilter.find((itemFilter) => itemFilter.value == filterInput.value);
    return await materialsModel.aggregate([{
        $match: findObjFilter.query
    }, {
        $sort: findObjFilter.sortPrice
    }]);
};