// ~~~ testing.and.sequence.diagram.framework.js ~~~
function loadScripts(array,callback){
    var loader = function(src,handler){
        var script = document.createElement("script");
        script.src = src;
        script.onload = script.onreadystatechange = function(){
            script.onreadystatechange = script.onload = null;
            handler();
        }
        var head = document.getElementsByTagName("head")[0];
        (head || document.body).appendChild( script );
    };
    (function run(){
        if(array.length!=0){
            loader(array.shift(), run);
        }else{
            callback && callback();
        }
    })();
}
function loadCss(cssArray){
	for (var i = cssArray.length - 1; i >= 0; i--) {
		var head  = document.getElementsByTagName('head')[0];
		var link  = document.createElement('link');
		link.rel  = 'stylesheet prefetch';
		link.type = 'text/css';
		link.href = cssArray[i];
		link.media = 'all';
		head.appendChild(link);	
	}
}


var requirements = [
		'https://cdnjs.cloudflare.com/ajax/libs/mocha/2.3.4/mocha.min.js',
		'https://cdnjs.cloudflare.com/ajax/libs/chai/3.4.1/chai.min.js',
		'https://bramp.github.io/js-sequence-diagrams/js/webfont.js',
	    'https://bramp.github.io/js-sequence-diagrams/js/snap.svg-min.js',
	    'https://bramp.github.io/js-sequence-diagrams/js/underscore-min.js',
	    'https://bramp.github.io/js-sequence-diagrams/js/sequence-diagram-snap-min.js',
	    // '../js/tests.js'
];

var css = [
	// '../tests/mocha.css'	
	'https://rawgit.com/mitni455/2eb2376f96ce9f6c3129efb99542a088/raw/f15ff61e43b5db5044de1aa891dadd08cbe34ac4/mocha.css'
];


if (!window.jQuery) {
  	requirements.unshift('http://code.jquery.com/jquery-latest.js');
}
console.log('requirements', requirements); 

loadScripts(requirements, function(){
	main();
});
loadCss(css);










/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                _                  
               | |                 
  ___ _   _ ___| |_ ___  _ __ ___  
 / __| | | / __| __/ _ \| '_ ` _ \ 
| (__| |_| \__ \ || (_) | | | | | |
 \___|\__,_|___/\__\___/|_| |_| |_|
                                   
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function TestingView(parentRef) {
	
	this.template = function() {
		var html = `
			<section id="testingPanel">
				<tab data-tab="tests" class="active">
					Tests 
					<widescreen> 
						<plus> + </plus>
						<minus> - </minus>
					</widescreen>
				</tab>
				<tab data-tab="sequence">
					Sequence
					<widescreen> 
						<plus> + </plus>
						<minus> - </minus>
					</widescreen>
				</tab>
				<tab data-tab="todos">
					To Dos
					<widescreen> 
						<plus> + </plus>
						<minus> - </minus>
					</widescreen>
				</tab>
				<panel data-tab="tests" class="active">
					
					<div id="mocha"></div>
				</panel>
				<panel data-tab="sequence">

				</panel>
				<panel data-tab="todos">
					<iframe src="http://127.0.0.1:4001/"></iframe>
				</panel>
				
			</section>
		`;
		return $(html);
	}
	this.initEvents = function() {

		$('tab').click(function() {
			var tabName = $(this).attr('data-tab');

			$('panel').removeClass('active');
			$('tab').removeClass('active');
			
			var panel = $('panel[data-tab="'+tabName+'"]');
			
			$(this).addClass('active');
			panel.addClass('active');
		})

		$('widescreen').click(function() {
			$('#testingPanel ').toggleClass('widescreen');
		})

		// $(".diagram").sequenceDiagram({theme: 'simple'});

	}
	this.init = function(parentRef) {
		this.dom = this.template();
		$(parentRef).prepend(this.dom);
		this.initEvents();
	}
	this.init(parentRef);
}



function main(){
	$(document).ready(function() {

		// var george = document.getElementById('testing.and.sequence.diagram.framework');
		var george = document.querySelectorAll('[data-tests]')[0];
		george.dataset.tests;
		george.dataset.sequence;
		console.log('george.dataset.tests', george.dataset.tests); 
		console.log('george.dataset.sequence', george.dataset.sequence); 
		
		loadScripts([george.dataset.tests], function(){
			mocha.run();	
		});

		var testingView = new TestingView('body');

		
		// var seq = window.location.protocol + '//' + window.location.host + george.dataset.sequence;
		var seq = george.dataset.sequence;

		$('panel[data-tab="sequence"]').load(seq, function() {

			$(".diagram").each(function(i, el) {
				var diagram = $(this);
				var title = diagram.attr('title');

				diagram.before('<diagramheader data-title="'+title+'">'+title+'</diagramheader>');

				diagram.sequenceDiagram({theme: 'simple'});
			})

			$('diagramheader').click(function() {
				
				console.log('diagramheader', $(this)); 
				
				var diagramheader = $(this);					
				var title = diagramheader.attr('data-title');
				diagramheader.next().toggleClass('closed');
			})

			// $(".diagram").sequenceDiagram({theme: 'simple'});
		});
		
	});
}