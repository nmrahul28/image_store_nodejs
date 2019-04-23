module.exports=(app)=>{
    const control_fun=require('../controllers/controllers.js');
    app.post('/', control_fun.post_image);
}