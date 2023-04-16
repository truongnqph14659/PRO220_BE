require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import ApiError from './src/utils/ApiError';
import orderRouter from './src/routes/order.router';
import showroomRouter from './src/routes/showroom.router';
import BannerRouter from './src/routes/banner.router';
import routerMaterials from './src/routes/materials.router';
import httpStatus from 'http-status';
import cookiesParser from 'cookie-parser';
import routerAccount from './src/routes/acount.router';
import routerWarehouse from './src/routes/warehouse.router';
import routerDistrict from './src/routes/district.router';
import routerPayment from './src/routes/paymentVnpay.router';
import routerRole from './src/routes/role.router';
import routerPermission from './src/routes/permission.router';
import routerPost from './src/routes/post.router';
import routerService from './src/routes/service.router';
import routeDiscount from './src/routes/discount.router';
import routersubService from './src/routes/subservice.router';
import routerGeneralWarehouse from './src/routes/generalWarehouse';

const app = express();
// const app = express();

//parse json request body
app.use(express.json());
app.use(cookiesParser());
//use morgan log info when get data
app.use(morgan('tiny'));
app.use(cors({ origin: ['http://127.0.0.1:5173', 'http://localhost:3000'], credentials: true }));
app.options('*', cors());
//use routers

app.use('/api', routerPayment);
app.use('/api', BannerRouter);
app.use('/api', orderRouter);
app.use('/api', routerAccount);
app.use('/api', showroomRouter);
app.use('/api', routerMaterials);
app.use('/api', routerWarehouse);
app.use('/api', routerWarehouse);
app.use('/api', routerDistrict);
app.use('/api', routerRole);
app.use('/api', routerPermission);
app.use('/api', routerPost);
app.use('/api', routerService);
app.use('/api', routeDiscount);
app.use('/api', routersubService);
app.use('/api', routersubService);
app.use('/api', routerGeneralWarehouse);

// parse urlencoded request body
app.use(
    express.urlencoded({
        extended: true,
    }),
);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Không tồn tai api này vui lòng thử lại!'));
});

//conect db
try {
    // connect db atlas ket noi db atlas
    (async () => {
        const url = `mongodb+srv://${process.env.DATABASE}:${process.env.PASSWORD}@cluster0.utwdlzd.mongodb.net/web_app`;
        await mongoose.connect(url);
        console.log('CONNECTED SUCCES DB');
    })();
} catch (error) {
    console.log('CONNECTED FAILED', error.message);
}
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`CONNECTED SUCCES PORT ${process.env.PORT}`);
});
