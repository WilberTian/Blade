import program from 'commander';

import initCommand from './init';
import listCommand from './list'
import addCommand from './add';
import deleteCommand from './delete';


export default () => {
	program
		.version(require('../../package').version);
	
	program
		.command('init')
		.description('Init project with specific boilerplate')
		.alias('i')
		.action(() => {
		    initCommand();
		});	

	program
		.command('list')
		.description('List all boilerplate config')
		.alias('l')
		.action(async() => {
		    await listCommand();
		});		

	program
		.command('add')
		.description('Add boilerplate config')
		.alias('a')
		.action(async() => {
		    await addCommand();
		});	

	program
		.command('delete')
		.description('Delete boilerplate config')
		.alias('d')
		.action(() => {
		    deleteCommand();
		});		

	program.parse(process.argv);
	
	if(!program.args.length){
	  	program.help();
	}	
};