'use strict';
// 引入express
import Express from 'express';
// 引入获取请求中的数据插件
import BodyParser from 'body-parser';
// 引入mongoose
import Mongoose from 'mongoose';
// 用户路由
import UserRouter from './routes/user-router';

// 初始化express
let app = Express();
// 连接MongoDB服务器
let db = Mongoose.connect("mongodb://localhost/myMongodb");
// 配置获取post数据
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: false}));

// 路由控制
app.get('/', (req, res) => {
	// 请求req的一些常用信息
	console.log(req.headers);
	console.log(req.url);
	console.log(req.method);
	console.log(req.params);
	console.log(req.query);
	// 发送响应信息
	res.send('这是服务的响应信息！');
});

app.use('/user', UserRouter);

// 配置服务器监听
app.listen(3000, () => {
	console.log('服务器正在3000端口运行。');
});