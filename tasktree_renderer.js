function tasktree_render_sub(input, level = 0) {
	let out = [];
	const nbkeys_input = Object.keys(input).length;
	let prefix = '├─';
	
	Object.keys(input).map((key, i) => {
		const value = input[key];
		const nbkeys_value = Object.keys(value).length;
		const hasChildren = nbkeys_value > 0;
		
		if (i+1 === nbkeys_input) {
			prefix = prefix.split('');
			prefix[prefix.lastIndexOf('├')] = '└';
			prefix = prefix.join('');
			//console.log("OK", i, key, JSON.stringify(input), prefix, prefix.lastIndexOf('├'));
		}
		
		let line = prefix;
		
		/*if (level == 0) {
			line = '├─';
		}
		else {
			if (i+1 === nbkeys_input) {
				line = '└ ';
			}
			else {
				line = '│ ';
			}
			line += new Array(level).join( '  ' ) + '└─';
		}*/
		
		if (hasChildren) {
			line += '┬';
		}
		else {
			line += '─';
		}
		
		line += ' ' + key;
		
		out.push(line);
		
		if (hasChildren) {
			let sub = tasktree_render_sub(value, level+1).map((line) => {
				if (i+1 === nbkeys_input) {
					return '  ' + line;
				}
				else {
					return '│ ' + line;
				}
			});
			out = out.concat(sub)
		}
		
	});
	return out;
}

function tasktree_render(input, logger) {
	logger(tasktree_render_sub(input).join('\n'))
}

module.exports = tasktree_render;