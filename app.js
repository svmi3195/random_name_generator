$( document ).ready(go);

function go(){

  $('button').on('click', function(){
    var length = $('.length').val();
    generate(length);
  })
}//end of go function

function generate(length){
  
  var vowels = createVowels();
  var consonants = createConsonants();
  var pattern = makePattern(length);
  var name = [];

  for(var i = 0; i < pattern.length; i++){
    if(pattern[i] == 0){
      name.push(vowels[Math.floor(Math.random() * vowels.length)]);
    }else{
      name.push(consonants[Math.floor(Math.random() * consonants.length)]);
    }
  }
  
  $('.result').text(name.join(""));
}//end of generate function

//create pattern of vowels(0) and consonants(1) for future name
function makePattern(length){

  var pattern = [];

  for(var i = 0; i < length; i++){
    
    if(pattern.length > 1 && pattern[i-1] == 0 && pattern[i-2] == 0){
      pattern[i] = 1;
    }else if(pattern.length > 1 && pattern[i-1] == 1 && pattern[i-2] == 1){
      pattern[i] = 0;
    }else{
      pattern[i] = Math.round(Math.random());
    }    
  }
  return pattern;
}//end of makePattern

//create an array for letter frequency
function freqArray(letter, frequency){
  var arr = [];
  for(var i = 0; i < frequency; i++){
    arr.push(letter);
  }
  return arr;  
}//end of freqArray

function createVowels(){
  var vowels = [].concat(freqArray("a", 3))
                  .concat(freqArray("e", 4))
                  .concat(freqArray("i", 2))
                  .concat(freqArray("o", 3))
                  .concat(freqArray("u", 1));
  return vowels;
}

function createConsonants(){
  var consonants = [].concat(freqArray("b", 1))
                  .concat(freqArray("c", 2))
                  .concat(freqArray("d", 3))
                  .concat(freqArray("f", 1))
                  .concat(freqArray("g", 1))
                  .concat(freqArray("h", 4))
                  .concat(freqArray("j", 1))
                  .concat(freqArray("k", 1))
                  .concat(freqArray("l", 2))
                  .concat(freqArray("m", 2))
                  .concat(freqArray("n", 5))
                  .concat(freqArray("p", 1))
                  .concat(freqArray("q", 1))
                  .concat(freqArray("r", 4))
                  .concat(freqArray("s", 4))
                  .concat(freqArray("t", 6))
                  .concat(freqArray("v", 1))
                  .concat(freqArray("x", 1))
                  .concat(freqArray("z", 1))
                  .concat(freqArray("w", 1))
                  .concat(freqArray("y", 1))
  return consonants;
}