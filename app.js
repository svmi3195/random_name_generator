$( document ).ready(go);

function go(){

  $('button').on('click', function(){
    var length = $('.length').val();
    var style = $('.style').val();
    generate(length, style);
  })
}//end of go function

//numbers in arrays - generic frequency, soft, harsh, snake
var freqsVowels = {
    a: [3,3,3,2],
    e: [4,4,4,6],
    i: [2,2,2,1],
    o: [3,3,3,1],
    u: [1,1,1,2]
};

//numbers in arrays - generic frequency, soft, harsh, snake
var freqsCons = {
    b: [1,1,1,1],
    c: [2,1,2,1],
    d: [3,3,3,1],
    f: [1,1,1,4],
    g: [1,2,1,1],
    h: [4,1,4,8],
    j: [1,1,1,1],
    k: [1,1,1,1],
    l: [2,10,1,3],
    m: [2,2,2,1],
    n: [5,8,5,1],
    p: [1,1,1,1],
    q: [1,1,1,1],
    r: [4,1,6,1],
    s: [4,2,4,8],
    t: [6,2,6,2],
    v: [1,1,1,1],
    x: [1,1,3,1],
    z: [1,1,3,3],
    w: [1,3,1,1],
    y: [1,1,1,1]
};

//consonant clusters possible at the beginning
var clustersStart = ['bl', 'br', 'ch', 'cl', 'cr', 'dr', 'fl', 'fr', 'gl', 'gr',
  'pl', 'pr', 'sc', 'sh', 'sk', 'sl', 'sm', 'sn', 'sp', 'st', 'sw', 
  'th', 'tr', 'tw', 'wh', 'wr'];

//consonant clusters possible at the end
var clustersEnd = ['st', 'sk', 'sp', 'nd', 'nt', 'nk', 'mp', 'rd', 'ld', 'lp', 'rk', 'lt', 'lf', 'pt', 'ft', 'ct'];
  


function generate(length, style){
  var vowels;
  var consonants;
  if(style === 'soft'){
    vowels = createVowels(1);
    consonants = createConsonants(1);
  }else if(style === 'harsh'){
    vowels = createVowels(2);
    consonants = createConsonants(2);
  }else if(style === 'snake'){
    vowels = createVowels(3);
    consonants = createConsonants(3);
  }else{
    vowels = createVowels(0);
    consonants = createConsonants(0);
  } 
  
  var pattern = makePattern(length, style);
  var name = [];

  if(style === 'snake'){
    for(var i = 0; i < pattern.length; i++){      
      if(pattern[i] === 0 && pattern[i-1] === 0){
        name.push(name[i-1]);
      }else if(pattern[i] === 1 && pattern[i-1] === 1){
        name.push('s');
      }else if(pattern[i] === 0 ){
        name.push(vowels[Math.floor(Math.random() * vowels.length)]);
      }else{
        name.push(consonants[Math.floor(Math.random() * consonants.length)]);
      }
    }
  }else if(style === 'harsh'){
    for(var i = 0; i < pattern.length; i++){
      if(pattern[i] === 1 && name[i-1] === 't'){
        name.push('h');
      }else if(pattern[i] === 0 && pattern[i-1] === 0){
        name.push('i');
      }else if(pattern[i] === 1 && pattern[i-1] === 1){
        name.push('r');
      }else if(pattern[i] == 0){
        name.push(vowels[Math.floor(Math.random() * vowels.length)]);
      }else{
        name.push(consonants[Math.floor(Math.random() * consonants.length)]);
      }
    }
  }else{
    for(var i = 0; i < pattern.length; i++){
      if(i === 0 && pattern[i] == 1 && pattern[i+1] == 1){
        name.push(clustersStart[Math.floor(Math.random() * clustersStart.length)]);
        i++;
      }else if(i === pattern.length - 2 && pattern[i] == 1 && pattern[i+1] == 1){
        name.push(clustersEnd[Math.floor(Math.random() * clustersEnd.length)]);
        i++;
      }else if(pattern[i] == 0){
        name.push(vowels[Math.floor(Math.random() * vowels.length)]);
      }else{
        name.push(consonants[Math.floor(Math.random() * consonants.length)]);
      }
    }
  }

  
  name[0] = name[0].charAt(0).toUpperCase() + name[0].slice(1);
  
  $('.result').text(name.join(""));
}//end of generate function

//create pattern of vowels(0) and consonants(1) for future name
function makePattern(length, style){

  var pattern = [];  
  
//simplistic style - random, but no vowels/consonants in a row
if(style == "simp"){
  pattern[0] = Math.round(Math.random());
  for(var i = 1; i < length; i++){    
    if( pattern[i-1] == 0){
      pattern[i] = 1;
    }else{
      pattern[i] = 0;
    }    
  }
}

//soft style allows no consonants clusters
else if(style == "soft"){
  for(var i = 0; i < length; i++){    
    if(pattern.length > 1 && pattern[i-1] == 0 && pattern[i-2] == 0){
      pattern[i] = 1;
    }else if(pattern[i-1] == 1){
      pattern[i] = 0;
    }else{
      pattern[i] = Math.round(Math.random());
    }    
  }
}

//general style - random allowing two vowels/consonants in a row
  else{
  for(var i = 0; i < length; i++){    
    if(pattern.length > 1 && pattern[i-1] == 0 && pattern[i-2] == 0){
      pattern[i] = 1;
    }else if(pattern.length > 1 && pattern[i-1] == 1 && pattern[i-2] == 1){
      pattern[i] = 0;
    }else{
      pattern[i] = Math.round(Math.random());
    }    
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


function createVowels(styleNr){
  var vowels =[];

  for (var property in freqsVowels) {
    if (freqsVowels.hasOwnProperty(property)) {
        vowels = vowels.concat(freqArray(property, freqsVowels[property][styleNr]));
    }
}
  return vowels;
}

function createConsonants(styleNr){
  var consonants = [];

  for (var property in freqsCons) {
    if (freqsCons.hasOwnProperty(property)) {
        consonants = consonants.concat(freqArray(property, freqsCons[property][styleNr]));
    }
}

  return consonants;
}