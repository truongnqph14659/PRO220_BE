import dateFormat from 'dateformat';
import queryStrings from 'qs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export const Payment = async (req, res) => {
    const { amount, bankCode, orderInfo, orderType, locale = 'vn', idOrder } = req.body;
    const ipAddr =
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    const date = new Date();
    const createDate = dateFormat(date, 'yyyymmddHHmmss');
    const orderId = dateFormat(date, 'HHmmss');
    const currCode = 'VND';
    let vnpUrl = process.env.VNP_URL;
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = process.env.VNP_TMNCODE;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = +amount * 100;
    vnp_Params['vnp_ReturnUrl'] = `${process.env.HOST}cai-dat/quan-ly-don-hang/${idOrder}`;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }
    vnp_Params = sortObject(vnp_Params);
    const signData = queryStrings.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac('sha512', process.env.VNP_HASHSECRET);
    const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + queryStrings.stringify(vnp_Params, { encode: false });
    return res.json(vnpUrl);
};

export const vnpayReturn = (req, res, next) => {
    var vnp_Params = req.query;
    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    var tmnCode = process.env.VNP_TMNCODE;
    var secretKey = process.env.VNP_HASHSECRET;

    var signData = queryStrings.stringify(vnp_Params, { encode: false });

    var hmac = crypto.createHmac('sha512', secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
    if (secureHash === signed) {
        AppResponse.success(req, res)({ code: vnp_Params['vnp_ResponseCode'], result: vnp_Params });
    } else {
        AppResponse.success(req, res, 97)(null);
    }
};

export const vnpay_Ipn = (req, res, next) => {
    var vnp_Params = req.query;
    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    var secretKey = process.env.VNP_HASHSECRET;
    var signData = queryStrings.stringify(vnp_Params, { encode: false });
    var hmac = crypto.createHmac('sha512', secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
        var orderId = vnp_Params['vnp_TxnRef'];
        var rspCode = vnp_Params['vnp_ResponseCode'];
        res.status(200).json({ RspCode: '00', Message: 'success' });
    } else {
        res.status(200).json({ RspCode: '97', Message: 'Fail checksum' });
    }
};

export const SendMail = async (req, res) => {
    const { serviceType, materials, total, _id, email } = req.body;
    const Bill = materials
        .map((item, index) => {
            return `
            <tr>
                <td><span style="padding: 10px;display: block;">${index}</span></td>
                <td><span style="padding: 10px;display: block;">Nhông sên dĩa DID Dream AD3 </span></td>
                <td><span style="padding: 10px;display: block;"> ${item.qty} </span></td>
                <td><span style="padding: 10px;display: block;"> ${item.price} </span></td>
                <td><span style="padding: 10px;display: block;"> ${item.price * item.qty} </span></td>
            </tr>
        `;
        })
        .join('');
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'huyndph14652@fpt.edu.vn',
            pass: 'upphlixzjrebbmxz',
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
    const option = {
        from: 'huyndph14652@fpt.edu.vn',
        to: email,
        subject: 'Dịch Vụ Đặt Lịch Sửa Xe Dodoris',
        html: ` 
            <div style="width: 100%; background: #f2f2f2; position: relative; padding: 30px">
                <div style="padding: 20px; width: 600px; background: white">
                    <div>
                        <div style="display: flex">
                            <img
                                style="width: 50px"
                                src="https://res.cloudinary.com/df6zs06nu/image/upload/v1676394303/myLogo_nxb70g.png"
                                alt=""
                            />
                            <p style="margin-left: 10px; font-weight: 800; color: #02b875; font-family: sans-serif">
                                DODORIS
                            </p>
                        </div>
                        <p>- Xin chào quý khách,</p>
                        <p>
                            - Dịch vụ sửa xe Dodoris rất vui thông báo đơn hàng #${_id} của quý khách đã được giao thành
                            công ngày 02/02/2023.
                        </p>
                        <p>- Dịch vụ : ${serviceType == 0 ? 'Bảo dưỡng tại nhà' : 'Bảo dưỡng tại cửa hàng'}</p>
                        <p>- Thông tin chi tiết đơn hàng :</p>
                    </div>
                    <table border="1">
                        <thead>
                            <tr>
                                <th><span style="padding: 10px;display: block;">STT</span></th>
                                <th><span style="padding: 10px;display: block;">Tên Sản Phẩm</span></th>
                                <th><span style="padding: 10px;display: block;">Số lượng</span></th>
                                <th><span style="padding: 10px;display: block;">Giá</span></th>
                                <th><span style="padding: 10px;display: block;">Tổng Giá</span></th>
                            </tr>
                        </thead>
                        <tbody>
                           ${Bill}
                            <tr>
                                <td colspan="5">
                                    <span style="padding: 10px;display: block;">Tổng Đơn Hàng : ${total} VNĐ</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p>- Cảm ơn quý khách đã tin tưởng dịch vụ sửa chữa DODORIS</p>
                </div>
            </div>
        `,
    };
    return transporter.sendMail(option, (err, info) => {
        if (err) {
            return;
        }

        res.json({ status: info.response });
    });
};

function sortObject(obj) {
    var sorted = {};
    var str = [];
    var key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
}
