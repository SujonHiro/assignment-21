const app=require("./app")
const  PORT=process.env.PORT || 9090
app.listen(PORT,function (){
    console.log(`Server Port NO ${PORT}`)
})