'use strict';
import User from '../models/user-model';


// 统一输出json格式
const output = function(status, data, info){
	return JSON.stringify({status: status, data: data, info: info});
}

const UserController = {
	getUserList (req, res) {
		User.find((err, users) => {
			if(err){
				res.send(output(false, null, '请求失败！'));
			}else{
				res.send(output(true, users, '请求成功！'));
			}
		});
	},
	getUser (req, res) {
		if(req.params && req.params.id){
			User.findById(req.params.id, (err, user) => {
				if(err || !user){
					res.send(output(false, null, '用户不存在！'));
				}else{
					res.send(output(true, user, '请求成功！'));
				}
			});
		}else{
			res.send(output(false, null, '请求错误！'));
		}
	},
	addUser (req, res) {
		let user = new User(req.body);
		user.save((err, user) => {
			if(err){
				res.send(output(false, null, '用户数据插入失败！'));
			}else{
				User.find((err, users) => {
					if(err){
						res.send(output(false, user, '用户数据插入成功!'));
					}else{
						res.send(output(true, users, '用户数据插入成功!'));
					}
				});
			}
		});
	},
	upUser (req, res) {
		if(req.method === 'PUT'){
			console.log('body', req.body);
			if(req.body && req.body._id){
				User.findById(req.body._id, (err, user) => {
					if(err || !user){
						res.send(output(false, null, '用户不存在！'));
					}else{
						user.id = req.body.id;
						user.name = req.body.name;
						user.age = req.body.age;
						user.job = req.body.job;

						user.save((err) => {
							if(err){
								res.send(output(false, null, '用户修改失败！'));
							}else{
								res.send(output(true, user, '用户修改成功！'));
							}
						});
					}
				});
			}
		}else{
			res.send(output(false, null, '请求错误！'));
		}
	},
	delUser (req, res) {
		if(req.method === 'DELETE'){
			if(req.body && req.body._id){
				User.findById(req.body._id, (err, user) => {
					if(err || !user){
						res.send(output(false, null, '用户不存在！'));
					}else{
						user.remove((err) => {
							if(err){
								res.send(output(false, null, '用户删除失败！'));
							}else{
								User.find((err, users) => {
									if(err){
										res.send(output(false, null, '用户删除成功！'));
									}else{
										res.send(output(true, null, '用户删除成功！'));
									}
								});
							}
						});
					}
				});
			}else{
				res.send(output(false, null, '请求错误'));
			}
		}
	}
}

export default UserController;