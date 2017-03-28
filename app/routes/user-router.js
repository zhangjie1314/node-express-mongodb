'use strict';
//引入express
import Express from 'express';
import UserController from '../controllers/user-controller';

//新建“用户”路由
const UserRouter = Express.Router();

// 给路由定义请求方法和逻辑控制器
UserRouter.route('')
	.get(UserController.getUserList)
	.post(UserController.addUser)
	.put(UserController.upUser)
	.delete(UserController.delUser);

// 用户信息
UserRouter.route('/:id')
	.get(UserController.getUser);

export default UserRouter;