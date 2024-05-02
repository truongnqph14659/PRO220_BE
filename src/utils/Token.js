import jwt from 'jsonwebtoken';
import _ from 'lodash';
export const generateAccessToken = ({ _doc: data }) => {
    const { password, __v, updatedAt, createdAt, ...ortherData } = data;
    let filterData = {};
    if (data.roleId) {
        filterData = {
            ..._.omit(ortherData, ['roleId']),
            role: data.roleId.name,
        };
    } else {
        filterData = _.omit(ortherData, ['showroomId', 'roleId']);
    }
    return jwt.sign({ ...filterData, isPhoneInSystem: true }, process.env.JWT_ACCESS_KEY, { expiresIn: '30d' });
};

export const generateRefreshToken = ({ _doc: data }) => {
    const { password, __v, updatedAt, createdAt, ...ortherData } = data;
    let filterData = {};
    if (data.roleId) {
        filterData = {
            ..._.omit(ortherData, ['roleId']),
            role: data.roleId.name,
        };
    } else {
        filterData = _.omit(ortherData, ['showroomId', 'roleId']);
    }
    return jwt.sign(filterData, process.env.JWT_REFRESH_KEY, { expiresIn: '30d' });
};
