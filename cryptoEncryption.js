console.log('starting password manager');

var storage = require('node-persist');
storage.initSync();

var crypto = require('crypto-js');

var argv = require('yargs')
	.command('create', 'Create a new account', function (yargs) {
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				description: 'Account name (eg: Twitter, Facebook)',
				type: 'string'
			},
			username: {
				demand: true,
				alias: 'u',
				description: 'Account username or email',
				type: 'string'
			},
			password: {
				demand: true,
				alias: 'p',
				description: 'Account password',
				type: 'string'
			},
			confirmpassword: {
				demand: true,
				alias: 'c',
				description: 'Confirm Account password',
				type: 'string'
			},
			secretquestion: {
				demand: true,
				alias: 'q',
				description: 'Enter your own secret question',
				type: 'string'
			},
			masterPassword: {
				demand: true,
				alias: 'm',
				description: 'Enter your master key',
				type: 'string'
			}
		}).help('help');
	})
	.command('get', 'Get an existing account', function (yargs) {
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				description: 'Account name (eg: Twitter, Facebook)',
				type: 'string'
			},
			masterPassword: {
				demand: true,
				alias: 'm',
				description: 'Enter your master key',
				type: 'string'
			}
		}).help('help');
	})
	.help('help')
	.argv;
var command = argv._[0];

// create
//     --name
//     --username
//     --password
//     --confirmpassword
//     --secret question
//     --Master Key


// get
//     --name

// account.name Facebook
// account.username User12!
// account.password Password123!

function getAccounts (masterPassword) {
	// use getItemSync to fetch accounts
	var encryptedAccount = storage.getItemSync('accounts');
	var accounts = [];
	// decrypt
	if (typeof encryptedAccount !== 'undefined') {
		var bytes = crypto.AES.decrypt(encryptedAccount,masterPassword);
		accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
	}
	// return accounts array
	return accounts;
}

function saveAccounts (accounts, masterPassword) {
	// encrypt accounts
	var encryptedAccounts = crypto.AES.encrypt(JSON.stringify(accounts), masterPassword);
	// setItemSync
	storage.setItemSync('accounts', encryptedAccounts.toString());	
	// return accounts
	return accounts;
}

function createAccount (accountparam, masterPassword) {
	//Fetch all the contents of file(all accounts) by decrypting
    var accounts = getAccounts(masterPassword);
    //check if it is already created
    accounts.forEach(function (account) {
		if (account.name === accountparam.name) {
			console.log("Account " + accountparam.name + " already exists. Please check.")
            return null;
		}
	});
	accounts.push(accountparam);
	saveAccounts(accounts, masterPassword);
	return accountparam;
}

function getAccount (accountName, masterPassword) {
	var accounts = getAccounts(masterPassword)
	var matchedAccount;
	accounts.forEach(function (account) {
		if (account.name === accountName) {
			matchedAccount = account;
		}
	});
	return matchedAccount;
}

if (command === 'create') {
    try
    {
	var createdAccount = createAccount({
		name: argv.name,
		username: argv.username,
		password: argv.password,
		confirmpassword: argv.confirmpassword,
		secretquestion: argv.secretquestion       
	}, argv.masterPassword);    

	console.log('Account created!');
	console.log(createdAccount);    
    }
    catch(e){
        console.log("unable to create account");
    }
} else if (command === 'get') {
    try{
	var fetchedAccount = getAccount(argv.name, argv.masterPassword);

	if (typeof fetchedAccount === 'undefined') {
		console.log('Account not found');
	} else {
		console.log('Account found!');
		console.log(fetchedAccount);
	}
    }
    catch(e)
    {console.log("unable to fetch the account details for " + argv.name)}
}



















