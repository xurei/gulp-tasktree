const chai = require('chai');
const expect = chai.expect;

const render = require('../tasktree_renderer');

describe('tasktree', function() {
	describe('renderer', function() {
		it('should render the tree correctly', function() {
			//Prepare
			const input = {
				'a': {},
				'b': {
					'a': {}
				},
				'c': {
					'b': {
						'a': {}
					},
				},
				'd': {
					'a': {},
					'c': {
						'b': {
							'a': {}
						},
					},
					'f': {}
				},
				'f': {},
				'e': {
					'f': {}
				},
			};
			
			//Execute
			var output = '';
			render(input, (...args) => {
				output += args.map((a) => (typeof(a)==='object' || Array.isArray(a)) ? JSON.stringify(a) : a).join(' ');
			});
			
			//Verify
			console.log(output);
			expect(output).to.be.eq([
				"├── a",
				"├─┬ b",
				"│ └── a",
				"├─┬ c",
				"│ └─┬ b",
				"│   └── a",
				"├─┬ d",
				"│ ├── a",
				"│ ├─┬ c",
				"│ │ └─┬ b",
				"│ │   └── a",
				"│ └── f",
				"├── f",
				"└─┬ e",
				"  └── f",
			].join("\n"));
		});
	});
});