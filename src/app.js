const express=require("express");
const app=express();
const path=require("path")
const hbs=require("hbs");
const bcrypt = require("bcryptjs");


require("./db/conn").connect();

const Register=require("./models/registers");

const port  = process.env.PORT || 3000;

const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));

app.set("view engine","hbs");

app.set("views",template_path);

hbs.registerPartials(partials_path);

app.get("/",(req,res)=>{
    // res.send("Hello !!");
    res.render("index");
})


app.post("/register",async (req,res)=>{
    try{
        // console.log(req.body.firstName);
        // res.send(req.body.firstName);

        const password = req.body.password;
        const cpassword = req.body.confirmPassword;

        if(password===cpassword){

            const registerUser = new Register({
                firstname:req.body.firstName,
                lastname:req.body.lastName,
                email:req.body.email,
                password:req.body.password,
                confirmpassword:req.body.confirmPassword
            });

           const registered =  await registerUser.save();

           res.status(201).render("index");
        }else{
            res.send("Password isn't matching")
        }

    }catch(error){
        res.status(400).send(error);
    }
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.post("/login",async (req,res)=>{
   try{


    const email=req.body.email;
    const password=req.body.password;

    const userEmail = await Register.findOne({email:email});

    //hashed password validating below line

    const isMatch = await bcrypt.compare(password,userEmail.password);
    
    // if(userEmail.password===password){ keep this line for normal or below line for hashed one
    if(isMatch){ 
        res.status(201).render("loginSuccess");
    }else{
        res.send("Invalid login credentials, Try Register instead");
    }


   }catch(error){
    res.status(400).send("Invalid credentials..!");
   }
})


app.get("/register",(req,res)=>{
   
    res.render("register");
})

app.post("/index",async (req,res)=>{
    try{
        console.log(req.body.firstName);
        res.send(req.body.firstName);

    }catch(error){
        res.status(400).send(error);
    }
})


app.listen(port,()=>{
    console.log(`Server is running at port no. ${port}`);
})

