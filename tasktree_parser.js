function tasktree_parse(input) {
	//Remove dates and gulp tree lines
	var data = input.map((line) => {
		var match = line.match(/^\s*\[.+?\] (.*?)$/);
		if (match) {
			line = match[1];
		}
		return line.replace(/[│├┬─└]/g, ' ');
	});
	
	//Trim the lines according to the smallest spaces prefix found
	var spacesPrefix = Math.min( ...(data.map((i) => i.match(/^\s*/)[0].length)) );
	data = data.map((i) => i.substr(spacesPrefix));

	//Parse gulp tree
	var treePath = [];
	var tasks = {};
	var currentTask = {};
	
	for (var i = 0; i < data.length; ++i) {
		var line = data[i];
		
		//Count the indentation level
		var level = 0;
		while (line.startsWith('  ')) {
			line = line.substr(2);
			++level;
		}
		
		//Update the path
		treePath = treePath.slice(0, level);
		treePath[level] = line;
		
		//Add the task at the right place
		if (level == 0) {
			tasks[line] = [];
			currentTask = line;
		}
		else if (level == 1) {
			tasks[currentTask].push(line);
		}
		else {
			throw new Error('Level above 1 should not exist');
		}
	}
	
	return tasks;
}

module.exports = tasktree_parse;