const prespective  = require('./api/perspective');

prespective().then(data => console.log(data));
// const data = async () => { 
//     await console.log(google(), "1");
// }

//data();


function test(){
    static var num = 0;
    num++;
  }