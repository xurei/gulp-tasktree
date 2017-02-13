const chai = require('chai');
const expect = chai.expect;

const parse = require('../tasktree_parser');

describe('tasktree', function() {
	describe('parser', function() {
		it('should not accept trees bigger than 1 level deep', function() {
			//Prepare
			const input = [
				"[17:14:34] ├─┬ standalone:injectcss",
				"[17:14:34] │ └─┬ standalone:compile",
				"[17:14:34] │   └── erroneous",
			];
			
			//Execute
			var fn = () => {
				var output = parse(input);
			};
			
			//Verify
			expect(fn).to.throw(Error);
		});
		
		it('should parse `gulp -T` correctly', function() {
			//Prepare
			const input = [
				"[17:14:34] ├── standalone:lint",
				"[17:14:34] ├── standalone:compile",
				"[17:14:34] ├─┬ standalone:injectcss",
				"[17:14:34] │ └── standalone:compile",
				"[17:14:34] ├─┬ standalone:uglify",
				"[17:14:34] │ └── base",
			];
			
			//Execute
			var output = parse(input);
			
			//Verify
			expect(output).to.deep.equal({
				'standalone:lint': [],
				'standalone:compile': [],
				'standalone:injectcss': ['standalone:compile'],
				'standalone:uglify': ['base'],
			});
		});
		
		it('should parse `gulp -T` without the tree lines correctly', function() {
			//Prepare
			const input = [
				"[17:14:34]  standalone:lint",
				"[17:14:34]  standalone:compile",
				"[17:14:34]  standalone:injectcss",
				"[17:14:34]    standalone:compile",
				"[17:14:34]  standalone:uglify",
				"[17:14:34]    base",
			];
			
			//Execute
			var output = parse(input);
			
			//Verify
			expect(output).to.deep.equal({
				'standalone:lint': [],
				'standalone:compile': [],
				'standalone:injectcss': ['standalone:compile'],
				'standalone:uglify': ['base'],
			});
		});
		
		it('should parse `gulp -T` without the dates correctly', function() {
			//Prepare
			const input = [
				"├── standalone:lint",
				"├── standalone:compile",
				"├─┬ standalone:injectcss",
				"│ └── standalone:compile",
				"├─┬ standalone:uglify",
				"│ └── base",
			];
			
			//Execute
			var output = parse(input);
			
			//Verify
			expect(output).to.deep.equal({
				'standalone:lint': [],
				'standalone:compile': [],
				'standalone:injectcss': ['standalone:compile'],
				'standalone:uglify': ['base'],
			});
		});
	});
});