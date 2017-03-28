//引入mongoose
import Mongoose from 'mongoose';
//定义数据库模式
let Schema = Mongoose.Schema;
//创建用户模型
let UserModel = new Schema({
	id: Number,
	name: String,
	age: Number,
	gender: String,
	job: String
});

export default Mongoose.model("User", UserModel);