$( document ).ready(go);

function go(){

  $('button').on('click', function(){
    var length = $('.length').val();
    var style = $('.style').val();
    generate(length, style);
  })
}//end of go function

//numbers in arrays - generic frequency, soft, harsh
var freqs = {
    a: [3],
    e: [4],
    i: [2],
    o: [3],
    u: [1],
    b: [1],
    c: [2],
    d: [3],
    f: [1],
    g: [1],
    h: [4],
    j: [1],
    k: [1],
    l: [2],
    m: [2],
    n: [5],
    p: [1],
    q: [1],
    r: [4],
    s: [4],
    t: [6],
    v: [1],
    x: [1],
    z: [1],
    w: [1],
    y: [1]
};

function generate(length, style){
  if(style === 'gen' || style === 'simp'){
    var vowels = createVowels(0);
    var consonants = createConsonants(0);
  }  
  
  var pattern = makePattern(length, style);
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
function makePattern(length, style){

  var pattern = [];
  
  //general style - random allowing two vowels/consonants in a row
  if(style == "gen"){
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
//simplistic style - random, but no vowels/consonants in a row
else if(style == "simp"){
  pattern[0] = Math.round(Math.random());
  for(var i = 1; i < length; i++){    
    if( pattern[i-1] == 0){
      pattern[i] = 1;
    }else{
      pattern[i] = 0;
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



//REWRITE LATER WITH FOREACH LOOP
function createVowels(styleNr){
  var vowels = [].concat(freqArray("a", freqs.a[styleNr]))
                  .concat(freqArray("e", freqs.e[styleNr]))
                  .concat(freqArray("i", freqs.i[styleNr]))
                  .concat(freqArray("o", freqs.o[styleNr]))
                  .concat(freqArray("u", freqs.u[styleNr]));
  return vowels;
}

function createConsonants(styleNr){
  var consonants = [].concat(freqArray("b", freqs.b[styleNr]))
                  .concat(freqArray("c", freqs.c[styleNr]))
                  .concat(freqArray("d", freqs.d[styleNr]))
                  .concat(freqArray("f", freqs.f[styleNr]))
                  .concat(freqArray("g", freqs.g[styleNr]))
                  .concat(freqArray("h", freqs.h[styleNr]))
                  .concat(freqArray("j", freqs.j[styleNr]))
                  .concat(freqArray("k", freqs.k[styleNr]))
                  .concat(freqArray("l", freqs.l[styleNr]))
                  .concat(freqArray("m", freqs.m[styleNr]))
                  .concat(freqArray("n", freqs.n[styleNr]))
                  .concat(freqArray("p", freqs.p[styleNr]))
                  .concat(freqArray("q", freqs.q[styleNr]))
                  .concat(freqArray("r", freqs.r[styleNr]))
                  .concat(freqArray("s", freqs.s[styleNr]))
                  .concat(freqArray("t", freqs.t[styleNr]))
                  .concat(freqArray("v", freqs.v[styleNr]))
                  .concat(freqArray("x", freqs.x[styleNr]))
                  .concat(freqArray("z", freqs.z[styleNr]))
                  .concat(freqArray("w", freqs.w[styleNr]))
                  .concat(freqArray("y", freqs.y[styleNr]))
  return consonants;
}