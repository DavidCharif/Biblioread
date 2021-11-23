
var volumeInput = document.getElementById('volume');
var rateInput = document.getElementById('rate');
var pitchInput = document.getElementById('pitch');


function activarVoz(){
    setTimeout(function(){
        $(function(){    
	$("a, .gallery , div , .desc ,.titulo, .title, .filas, p, b, h5, h4, h3, h2, h1, strong, li").hover(function(){
    event.preventDefault();


    var nacordeon = $(this);
    var utterance = new SpeechSynthesisUtterance();
   
    utterance.text = $(this).text();
    utterance.rate = 1;
    
    if (voiceSelect.value) {
		utterance.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == voiceSelect.value; })[0];
	}
    utterance.voice = utterance.voice;
    
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