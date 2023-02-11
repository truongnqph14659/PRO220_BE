import jwt from 'jsonwebtoken';
export const generateAccessToken = ({ _doc: data }) => {
    const {  password,__v,updatedAt,createdAt, ...ortherData } = data;
    return jwt.sign(ortherData, process.env.JWT_ACCESS_KEY, { expiresIn: '30d' });
};

export const generateRefreshToken = ({ _doc: data }) => {
    const { password,__v,updatedAt,createdAt, ...ortherData } = data;
    return jwt.sign(ortherData, process.env.JWT_REFRESH_KEY, { expiresIn: '30d' });
};
