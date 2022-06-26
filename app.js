
const express = require("express") ;

const bodyParser = require("body-parser") ;

const app = express() ;
var _ = require("lodash");
const mongoose = require("mongoose") ;
const { result } = require("lodash");

const BlogSChema = {
    title : { 
        type : String ,
        required : true
    },
    content : {
        type : String ,
        required : true
    }
};

var elr = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi sunt, quis iure deserunt sequi dicta libero dolores atque saepe harum nihil est sint asperiores sit a quod amet eum! Eius!\
Necessitatibus quaerat, error quidem magni provident tempora veniam corporis voluptas. Eum corporis aperiam necessitatibus ullam maxime eveniet delectus, quam neque facilis quas? Nemo optio, cumque sed eos ipsum consectetur possimus?\
Error maxime nobis aliquam dolor soluta nostrum officia minus repudiandae dolorem, optio laudantium reprehenderit, quo quasi atque consequuntur, rem aspernatur in ipsam vero? Fuga perferendis est, facilis cum maxime error!\
Harum exercitationem natus nobis iure, voluptas dolor? Labore doloribus eaque neque ea ipsum, delectus modi, dolorum suscipit magnam ab minus architecto ratione sint nulla aspernatur veniam quod alias molestias ex!\
Dicta voluptatem, ullam aperiam maiores numquam similique iste sequi ducimus. Mollitia repellendus ut, earum incidunt cumque possimus a illo sint tenetur. Assumenda asperiores placeat voluptas eos magnam vitae, quibusdam dolor? \
Itaque animi fuga neque cum odit mollitia, dolores praesentium in molestiae non quam impedit nemo officia accusamus laudantium voluptate nam numquam explicabo enim modi ab dolorum alias magnam. Aut, sequi. \
Odit cumque cupiditate neque consequatur, optio amet iste quas suscipit omnis eligendi corporis dolor voluptates explicabo atque, debitis repudiandae eveniet corrupti quam vero perferendis fugit fuga. Commodi possimus eligendi fuga.\
Sit iste vitae consectetur, provident soluta facere quod accusantium quaerat officia inventore temporibus nam hic labore vero optio, quia assumenda, consequatur placeat molestias. Magnam corporis a quis asperiores sunt excepturi! \
Sed, corporis, sint similique voluptatum fuga atque, nobis iste molestias minima labore aspernatur facere magnam. Accusamus quaerat iure impedit soluta ducimus obcaecati fugit, nostrum fugiat placeat at quam cupiditate officia! \
Placeat, obcaecati? Itaque quia facere officia laborum autem tenetur, beatae atque natus accusamus quod commodi architecto tempore accusantium dolorem reiciendis. Id maxime eligendi a harum dolorum alias. Amet, error ex. \
Ad porro nobis, magni ullam a voluptatem. Nisi, delectus, omnis quod tempora provident laudantium ullam animi sunt natus dolores nihil! Nobis quaerat praesentium sit veritatis ad vel sapiente ipsa reprehenderit. \
Officia pariatur laborum cum repudiandae debitis consequuntur, itaque quis quo dolores soluta perspiciatis temporibus accusamus vitae modi ipsum magnam labore? Odit beatae dolor laboriosam, porro minus iure laudantium vero facere. \
Perspiciatis tenetur laboriosam laborum magnam atque quidem ipsum id possimus doloribus in quasi vitae cumque ducimus vel obcaecati consequatur, cupiditate fuga mollitia illo assumenda. Eaque veniam modi rem itaque enim. \
Libero recusandae accusamus iste aspernatur earum molestias, quidem dolores reiciendis quam nisi ab aperiam, sit facilis exercitationem impedit vel doloremque officiis adipisci. Molestiae veritatis quae amet corrupti repellendus? Pariatur, sapiente! \
Reprehenderit quis sapiente quibusdam sequi qui labore at, ex quidem corporis mollitia tempore ducimus quos nam saepe optio. Id necessitatibus, non laboriosam dolorum praesentium hic. Recusandae harum asperiores magnam incidunt. \
Impedit et beatae eligendi explicabo numquam recusandae cumque vitae vero ut, iste temporibus soluta mollitia, ab quo rerum aperiam eos sapiente tempore culpa! Sit earum, voluptates ex cum laudantium soluta."

mongoose.connect("mongodb+srv://Sankar:Desamsetti1&%40@cluster0.yju1e0z.mongodb.net/BlogDB") ;

const Blog = mongoose.model("Blog",BlogSChema) ;


app.set('view engine','ejs') ;

app.use(bodyParser.urlencoded({extended:true})) ;

app.use(express.static(__dirname+"/public")) ;

let arr = [] ;

app.get("/",(req,res)=>{
    var temp = Blog.find({},(err,blogs)=>{
        res.render("list", {Home1 : blogs } );
    });
    
});

app.get("/about",(req,res)=>{
    res.render("About", {Home1 : elr} ) ;
});

app.get("/contact",(req,res)=>{
    res.render("Contact", {Home1 : elr} ) ;
});

app.get("/publish",(req,res)=>{
    res.render("publish") ; 
});

app.post("/publish",(req,res)=>{
    var temp_obj = {title : req.body.inpt1 , content : req.body.post_content} ;
    Blog.create(temp_obj) ;
    //temp_obj.save() ;
    res.redirect("/");
}) ; 

app.get("/publish/:id",(req,res)=>{
   var tar = req.params.id ;
   let flag = false ;
   //console.log(tar);
   //tar = _.lowerCase(tar);
   var temp = Blog.find({},(err,arr)=>{
    for( let i =0 ; i < arr.length ; i++ ) {
        if( tar == arr[i]._id) {
            res.render("seperate_post",{x :arr[i]}) ;
            flag = true ;
            break;
        }
    }
    
   });
   
});


//Edit Request 

app.get("/Edit/:id",(req,res)=>{
    let tar = req.params.id ;
    var temp = Blog.find({},(err,arr)=>{
        for( let i =0 ; i < arr.length ; i++ ) {
            if( tar == arr[i]._id) {
                res.render("publish",{x :arr[i]}) ;
                flag = true ;
                break;
            }
        }
    });
});

app.post("/Edit/:id",(req,res)=>{
    let tar = req.params.id ;
    Blog.findByIdAndUpdate({_id:tar},{title:req.body.inpt1 , content:req.body.post_content},(err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.redirect("/");
        }
    })
});

app.get("/Delete/:id",(req,res)=>{
    var temp_id = req.params.id ;
    Blog.findByIdAndRemove(temp_id,(err)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/");
        }
    });
});

var t = process.env.PORT ;
if(t==null||port==""){
    t = 3000 ;
}
app.listen(t);
