'use strict';
// 引入express
// const express = require('express');
import Express from 'express';
import BodyParser from 'body-parser';
// 用户路由
// const userRouter = require('./routes/user-router');
import UserRouter from './routes/user-router';

// 初始化express
let app = Express();

// 配置获取post数据
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: false}));

// 路由控制
app.get('/', (req, res) => {
	res.send('这是服务的响应信息！');
});

app.use('/user', UserRouter);



// 配置服务器监听
app.listen(3000, () => {
	console.log('服务器正在3000端口运行。');
});