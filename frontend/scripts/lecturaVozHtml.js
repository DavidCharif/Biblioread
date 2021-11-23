
var volumeInput = parent.document.getElementById('volume');
var rateInput = parent.document.getElementById('rate');
var pitchInput = parent.document.getElementById('pitch');
parent.document.getElementById("activarVoz").addEventListener("click",activarVozIframe);

function activarVozIframe(){
    console.log("funcion activada")
    setTimeout(function(){
        $(function(){    
	$("a, .gallery ,#textolibro, div , .desc ,.titulo, .title, .filas, p, b, h5, h4, h3, h2, h1, strong, li, #iframe, .iframe").hover(function(){
    event.preventDefault();


    var nacordeon = $(this);
    var utterance = new SpeechSynthesisUtterance();
   
    utterance.text = $(this).text();
    utterance.rate = 1;
    
    if (parent.document.getElementById("voice").value) {
		utterance.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == parent.document.getElementById("voice").value; })[0];
	}
    
    utterance.volume = parseFloat(volumeInput.value);
	utterance.rate = parseFloat(rateInput.value);
	utterance.pitch = parseFloat(pitchInput.value);
    
    utterance.onstart = function() {
        console.log('Inicio Oradora');
    };
    utterance.addEventListener('error', function(event) { 
      console.log('An error has occurred with the speech synthesis: ' + event.error);
    });
    utterance.onerror = function(event) {
      console.log('An error has occurred with the speech synthesis: ' + event.error);
    }
    utterance.onend = function() {
        console.log('final Oradora');
    };
    
    window.speechSynthesis.speak(utterance);
},function(){
    window.speechSynthesis.cancel();
    console.log('Oradora cancelada');
});
});
},1000)}