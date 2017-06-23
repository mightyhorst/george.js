# george.js
George.js is a testing and sequence diagram library

### installation
bower install georgejs

### usage
<script src="{{bower_components}}/georgejs/georgejs" 
  data-tests="path/to/tests.js"
  data-sequence="path/to/sequence.html"></script>
  
  
### example tests.js
mocha.setup('bdd');
var assert = chai.assert;

describe('example bdd suite', function() {
    it('should equal 1', function() {
        var num = 1;
        assert.equal(num, 1);
    });
});


### example sequence.html
<div class="diagram">
	A->B: Message
	A-->B: Message
	B->A: Message
	B-->A: Message
</div>	
<div class="diagram">
	C->B: Message
	C-->B: Message
	B->A: Message
	B-->A: Message
</div>	
