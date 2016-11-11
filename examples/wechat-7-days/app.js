'use strict'

var Koa = require('koa');
var sha1 = require('sha1');

var config = {
  wechat: {
    appID: 'wx2704383e0c0f944a',
    appSecret: '9ef9579cb364c6b51779514ae5078f9d',
    token: '6dbebd742ce6dd008c42ce1d'
  }
}

var app = new Koa();

app.use(function *(next){
  console.log(this.query);

  var token = config.wechat.token;
  var signature = this.query.signature;
  var nonce = this.query.nonce;
  var timestamp = this.query.timestamp;
  var echostr = this.query.echostr;

  var str = [token, timestamp, nonce].sort().join('');
  var sha = sha1(str);

  if (sha === signature) {
    this.body = echostr;
  }
  else {
    this.body = 'error';
  }
})

app.listen(3000);
console.log('Running on port 3000...');
