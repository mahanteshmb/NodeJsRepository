var argv = require('yargs')
	.command('adduser', 'Greets the user', function (yargs) {
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				description: 'Your first name goes here',
				type: 'string'
			},
			lastname: {
				demand: true,
				alias: 'l',
				description: 'Your last name goes here',
				type: 'string'
			}
			,
			city: {
				demand: true,
				alias: 'c',
				description: 'Your city name goes here',
				type: 'string'
			},			
			state: {
				demand: true,
				alias: 's',
				description: 'Your state name goes here',
				type: 'string'
			}
		}).help('help');
	})
	
	.help('help')
	.argv;
var command = argv._[0];

console.log(argv);

// if (command === 'adduser' && typeof argv.name !== 'undefind' && typeof argv.lastname !== 'undefined') {
// 	console.log('Hello ' + argv.name + ' ' + argv.lastname + '!');	
// }else 
if (command === 'adduser' && typeof argv.name !== 'undefind' && typeof argv.lastname !== 'undefined' && typeof argv.city !== 'undefind' && typeof argv.state !== 'undefined') {
	console.log('Hello ' + argv.name + ' ' + argv.lastname + ', ' + argv.city + ' ' + argv.state + '!');	
}
else if (command === 'adduser' && typeof argv.city !== 'undefind' && typeof argv.state !== 'undefined') {
	console.log('Hello ' + argv.city + ' ' + argv.state + '!');	
}
 else if (command === 'adduser' && typeof argv.name !== 'undefined') {
	console.log('Hello ' + argv.name + '!');
} else if (command === 'adduser') {
	console.log('Hello world!');
}