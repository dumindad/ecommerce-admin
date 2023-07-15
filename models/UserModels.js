import {Schema, model, models} from "mongoose";

const userSchema = new Schema({
    username: String,
    email:String,
    imgUrl:String,
    role:String,
    password:String,
    telephone:String
})

const Users = models.User || model('User', userSchema);
export default Users;