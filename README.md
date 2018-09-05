# george.js
George.js is a testing and sequence diagram library

### installation
```javascript
bower install georgejs
```

### usage
```html
<script src="bower_components/georgejs/george.js" 
  data-tests="path/to/tests.js"
  data-sequence="path/to/sequence.html"></script>
 ```
### usage via cdn 
```html
<script src="https://cdn.jsdelivr.net/gh/mitni455/george.js@1.0.0/george.js"
  data-tests="path/to/tests.js"
  data-sequence="path/to/sequence.html"></script>
```
  
### example tests.js
```javascript
mocha.setup('bdd');
var assert = chai.assert;

describe('example bdd suite', function() {
    it('should equal 1', function() {
        var num = 1;
        assert.equal(num, 1);
    });
});
```


### example sequence.html
```html
<div class="diagram" title="Title for this sequence">
	A->B: Message
	A-->B: Message
	B->A: Message
	B-->A: Message
</div>	
<div class="diagram" title="Title for this sequence">
	C->B: Message
	C-->B: Message
	B->A: Message
	B-->A: Message
</div>
```	
