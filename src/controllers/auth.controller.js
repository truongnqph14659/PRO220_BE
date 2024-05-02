import { accountServices } from '../services';
import bcyrpt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../utils/Token';

export const register = async (req, res) => {
    try {
        //check exirst number phone
        const checkPhoneNumber = await accountServices.search({ number_phone: req.body.number_phone });
        if (!checkPhoneNumber) {
            const passwordVerify = bcyrpt.hashSync(req.body.password, 10);
            const data = await accountServices.create({ ...req.body, password: passwordVerify });
            return res.status(200).json({ data, message: 'Tạo tài khoản thành công!' });
        }
        res.status(400).json({
            message: 'Tài khoản đã tồn tại trong hệ thống!',
        });
    } catch (error) {
        res.status(400).json({
            error,
            message: 'Đăng ký tài khoản thất bại! Vui lòng thử lại.',
        });
    }
};

export const login = async (req, res) => {
    try {
        let checkPhoneNumber = await accountServices.search({ number_phone: req.body.number_phone });
        if (!checkPhoneNumber) {
            return res.status(400).json({
                message: 'Tài khoản chưa tồn tại trong hệ thống!',
            });
        }
        const comparePassword = bcyrpt.compareSync(req.body.password, checkPhoneNumber.password);
        if (!comparePassword) {
            return res.status(400).json({
                message: 'Mật khẩu sai vui lòng nhập lại!',
            });
        }
        if (checkPhoneNumber.roleId) {
            checkPhoneNumber = await accountServices.getUserRole({ number_phone: req.body.number_phone });
        }
        const accessToken = generateAccessToken(checkPhoneNumber);
        // const refreshToken = generateRefreshToken(checkPhoneNumber);

        return res.status(200).json({
            accessToken,
        });
    } catch (error) {
        res.status(404).json({
            error,
            message: 'Đã có lỗi xảy ra vui lòng thử lại!',
        });
    }
};
export const requestRefreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken);
    if (!refreshToken) return res.status(401).json('you`re not authenticate');
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (error, user) => {
        if (error) {
            return res.status(401).json({
                message: 'Token is not valid!',
            });
        }
        const newAccessToken = user;
        const newRefreshToken = generateRefreshToken(user);
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict',
        });
        return res.status(200).json({ newAccessToken, refreshToken });
    });
};

export const logout = (req, res) => {
    res.clearnCookie('refreshToken');
};
