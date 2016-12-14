$( document ).ready(go);

function go(){

  $('button').on('click', function(){
    var length = $('.length').val();
    generate(length);
  })
}﻿//end of go function

function generate(length){
  var name = 'name ' + length;

  $('.result').text(name);
}//end of generate function
