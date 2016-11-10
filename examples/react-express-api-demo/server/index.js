var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Post = require('./models/post');
var bodyParser = require('body-parser');
var routes = require('./routes');
var logger = require('morgan');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/react-express-api');

var db = mongoose.connection;
db.on('error', console.log) // 如果连接失败打印错误信息
db.once('open', function(){
  console.log('db connected ...');
});

// 解析 HTTP 请求中的 JSON 数据，并存储到 req.body 对象中
app.use(bodyParser.json());
// 如果想使用 form 提交，这一行是必须的
app.use(bodyParser.urlencoded({ extended: false }));
// 每次 HTPP 请求的信息都会遵照一定的格式在终端打印出来，上述采用的格式是 dev，
// 格式如下：:method :url :status :response-time ms - :res[content-length]
app.use(logger('dev'));

routes(app);

app.get('/', function(req, res){
  res.send('Hello world！！！');
})

app.listen(3000, function(){
  console.log('Running on port 3000...');
})
