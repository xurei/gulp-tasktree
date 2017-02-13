const arrayToMap = require('xurei-util').arrayToMap;
const isset = require('xurei-util').isset;

function tasktree_build(deptree) {
	if (typeof(deptree) !== 'object' || Array.isArray(deptree)) {
		throw new TypeError('tasktree_build() expects an object');
	}
	
	console.log("ORIG", deptree);
	deptree = init_deptree(deptree);
	
	console.log(deptree);
	let leaves = find_leaves(deptree);
	
	while (fill_deps(deptree, leaves)) {
		/* nothing to do, just loop */
	}
	
	if (Object.keys(deptree).length !== Object.keys(leaves).length) {
		throw new Error('There is a cyclic dependency in the tasks tree');
		//TODO find the cyclic dependency and show it ?
	}
	
	return leaves;
}

function init_deptree(deptree) {
	let out = {};
	let keys = Object.keys(deptree);
	for (let key of keys) {
		let value = deptree[key];
		out[key] = arrayToMap(value, (dep) => dep, () => null)
	}
	return out;
}

function find_leaves(deptree) {
	//Look for tasks that has no dependency (ie tree leaves)
	let leaves = Object.keys(deptree).filter((key) => {
		let value = deptree[key];
		return JSON.stringify(value) === '{}'; //TODO find a more performant way to compare an empty object
	}).map((l) => ({k:l, v:deptree[l]}));
	
	leaves = arrayToMap(leaves, a=>a.k, a=>a.v);
	return leaves;
}

function fill_deps(deptree, leaves) {
	let updated_leaves = false;
	let keys = Object.keys(deptree);
	for (let key of keys) {
		let subtree = deptree[key];
		if (!isset(leaves[key])) {
			Object.keys(subtree).forEach((dep)=>{
				if (isset(leaves[dep])) {
					subtree[dep] = leaves[dep];
				}
			});
			if (Object.keys(subtree).every((dep) => subtree[dep ]!== null)) {
				leaves[key] = subtree;
				updated_leaves = true;
			}
		}
		console.log("--", key, "--");
		console.log("tree",subtree);
		console.log("leaves",leaves);
	}
	
	return updated_leaves;
}

module.exports = tasktree_build;