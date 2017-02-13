const chai = require('chai');
const expect = chai.expect;

const build = require('../tasktree_builder');

describe('tasktree', function() {
	describe('builder', function() {
		it('should only accept objects', function() {
			expect(() => build(1)).to.throw(TypeError);
			expect(() => build('a')).to.throw(TypeError);
			expect(() => build(['a','b'])).to.throw(TypeError);
			expect(() => build(42.42)).to.throw(TypeError);
		});
		
		it('should return a tree based on the parsed flat tree', function() {
			//Prepare
			const input = {
				'a': [],
				'b': ['a'],
				'c': ['b'],
				'd': ['a', 'c'],
				'e': ['f'],
				'f': []
			};
			
			//Execute
			var output = build(input);
			
			//Verify
			expect(output).to.deep.equal({
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
				},
				'e': {
					'f': {}
				},
				'f': {}
			});
		});
		
		it('should handle cyclic dependencies', function() {
			//Prepare
			const input = {
				'b': ['a'],
				'a': ['b'],
			};
			
			//Execute
			var output = () => build(input);
			
			//Verify
			expect(output).to.throw(Error, /cyclic dependenc(y|ies)/);
		});
		
		it('should work whatever the depth of the dependencies, and the order should not matter', function() {
			//Prepare
			const input = {
				'f': ['e'],
				'e': ['d'],
				'd': ['c'],
				'c': ['b'],
				'b': ['a'],
				'a': [],
			};
			
			//Execute
			var output = build(input);
			
			//Verify
			expect(output).to.deep.equal({
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
					'c': {
						'b': {
							'a': {}
						},
					},
				},
				'e': {
					'd': {
						'c': {
							'b': {
								'a': {}
							},
						},
					},
				},
				'f': {
					'e': {
						'd': {
							'c': {
								'b': {
									'a': {}
								},
							},
						},
					},
				}
			});
		});
	});
});