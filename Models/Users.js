var mongoose=require('mongoose')
const{Schema}=mongoose;
//Table Schema 
const userSchema=new Schema({
    uname:String,
    umobile:Number,
    uemail:String,
    upassword:String
})
//Schema Export as Model
var userModel =mongoose.model("user",userSchema);

module.exports=userModel;