var voiceSelect = document.getElementById('voice');
function loadVoices() {
    // Fetch the available voices.
      var voices = speechSynthesis.getVoices();
      
    
    // Loop through each of the voices.
    
      voices.forEach(function(voice, i) {
      // Create a new option element.
      if (voice.lang == 'es-ES' || voice.lang == 'es-MX' ){
          var option = document.createElement('option');
      
      // Set the options value and text.
          option.value = voice.name;
          option.innerHTML = voice.name;
            
      // Add the option to the voice selector.
          voiceSelect.appendChild(option);
          
      }});
  }
  
  
// Execute loadVoices.
loadVoices();
// Chrome loads voices asynchronously.
window.speechSynthesis.onvoiceschanged = function(e) {
  loadVoices();
}; 

