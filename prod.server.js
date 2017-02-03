var express = require("express"); // 依赖node.js 的 express 框架
var config = require("./config/index"); // 导入config 文件

var port = process.env.PORT || config.build.port; // 定义端口 

var app=express(); // 调用（启动）express

/*-----------定义一个路由函数 --------------------*/
var router = express.Router(); // 定义一个路由
router.get('/',function(req,res,next){
	req.url = '/index.html';
	next();
})
app.use(router);
/*-----------定义一个路由函数（完结）  --------------------*/

/*------------使用（调用）路由函数部署异步数据接口--------------------*/
var appData = require("./data.json"); // 获取测试数据源
// 将 测试数据 三大部分 分开传入 不同的变量中
var seller = appData.seller;  
var goods = appData.goods;
var ratings = appData.ratings; 

// 根据以上的数据，编写数据路由：
var apiRoutes = express.Router(); // 调用 express.Router() 接口创建路由对象
apiRoutes.get("/seller",function(req,res){  // 
  res.json({
      error:0,
      data:seller
  })
})
apiRoutes.get("/goods",function(req,res){
  res.json({
      error:0,
      data:goods
  })
})
apiRoutes.get("/ratings",function(req,res){
  res.json({
      error:0,
      data:ratings
  })
})
app.use("/api",apiRoutes); // 启用数据路由器
/*-----------------------------------------*/


/* 配置项目要调用js/css的路径*/
app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')

  // when env is testing, don't need open it
  /*if (process.env.NODE_ENV !== 'testing') { // 打包时可以不用这个判断
    opn(uri)
  }*/
})








