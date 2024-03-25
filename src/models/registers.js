const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");

const userSchema=new mongoose.Schema({
        firstname: {
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        confirmpassword:{
            type:String,
            required:true
        }
})
//--------

    userSchema.pre("save",async function(next){
      
        if(this.isModified("password")){

            console.log(`the current password id ${this.password}`);
            this.password = await bcrypt.hash(this.password,10);
            console.log(`the current password id ${this.password}`);
            
        }
        
        next();
    })

//--------

const Register = new mongoose.model("Register",userSchema);

module.exports=Register;