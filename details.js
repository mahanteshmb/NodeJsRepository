console.log("Start Password Manager");
//example 1
 var storage = require('node-persist');
// //works with file system.
storage.initSync();
storage.setItemSync('accounts',[{username:'Mahan',balance:100},{username:'Jaga',balance:200}]);

//example 2
var accounts = storage.getItemSync('accounts');

//push on new accounts array
accounts.push({username:'Vid',balance:300});
//save using setItemSync
storage.setItemSync('accounts',accounts);

console.log(accounts);

//example 3


