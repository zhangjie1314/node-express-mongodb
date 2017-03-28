'use strict';
const users = [
	{id: 1, name: "ken1", age: 20, gender: '男', job: 'computer'},
	{id: 2, name: "ken2", age: 25, gender: '男', job: 'HR'},
	{id: 3, name: "ken3", age: 23, gender: '女', job: 'sales'},
	{id: 4, name: "ken4", age: 28, gender: '女', job: 'computer'},
	{id: 5, name: "ken5", age: 25, gender: '男', job: 'programmer'},
	{id: 6, name: "ken6", age: 24, gender: '女', job: 'teacher'},
	{id: 7, name: "ken7", age: 29, gender: '男', job: 'computer'},
	{id: 8, name: "ken8", age: 23, gender: '女', job: 'student'},
	{id: 9, name: "ken9", age: 22, gender: '男', job: 'sport'},
	{id: 10, name: "ken10", age: 21, gender: '男', job: 'computer'}
];

// 统一输出json格式
const output = function(status, data, info){
	return JSON.stringify({status: status, data: data, info: info});
}

const UserController = {
	getUserList (req, res) {
		res.send(output(true, users, '请求成功！'));
	},
	getUser (req, res) {
		let result = null;
		console.log(req.params);
		if(req.params && req.params.id){
			for(let i = 0; i < users.length; i++){
				if(users[i].id == parseInt(req.params.id)){
					result = users[i];
				}
			}
		}
		if(result){
			res.send(output(true, result, '请求成功！'));
		}else{
			res.send(output(false, result, '请求失败！'));
		}
	},
	addUser (req, res) {
		console.log(req.body);
		if(req.method === 'POST'){
			if(req.body.name && req.body.age && req.body.gender && req.body.job){
				users.push(req.body);
				res.send(output(true, users, '新增成功！'));
			}else{
				res.send(output(false, null, '信息不完整！'));
			}
		}else{
			res.send(output(false, null, '请求错误！'));
		}
	},
	upUser (req, res) {
		if(req.method === 'PUT'){
			let index;
			if(req.body.id && req.body.name && req.body.age && req.body.gender && req.body.job){
				for(var i=0; i<users.length; i++){
					if(users[i].id == parseInt(req.body.id)){
						index = i;
						users[i].name = req.body.name;
						users[i].age = req.body.age;
						users[i].gender = req.body.gender;
						users[i].job = req.body.job;
					}
				}

				if(index >= 0){
					res.send(output(true, users[index], '请求成功！'));
				}else{
					res.send(output(false, null, '不存在数据！'));
				}
			}
		}else{
			res.send(output(false, null, '请求错误！'));
		}
	},
	delUser (req, res) {
		if(req.method === 'DELETE'){
			if(req.body.id){
				let count = users.length;
				for(let i = 0; i < users.length; i++){
					if(users[i].id == parseInt(req.body.id)){
						console.log(i);
						users.splice(i, 1);
					}
				}
				if(count == users.length){
					res.send(output(false, null, '删除失败！'));
				}else{
					res.send(output(true, null, '删除成功！'));
				}
			}else{
				res.send(output(false, null, '请求错误'));
			}
		}
	}
}

export default UserController;