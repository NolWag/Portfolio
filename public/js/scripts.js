var portfolio = document.getElementById('portfolio');
var logo = document.getElementById('logo');
var port = document.getElementById('port-img');
var links = document.getElementById('links');
var img = document.getElementById('img');


portfolio.addEventListener('click', function() {
  //console.log('i');
  logo.classList.add('flipOutX');
  links.classList.add('fadeOutDown');
  setTimeout(function(){
     logo.classList.add('hidden');
     img.classList.remove('hidden');
  }, 1000);
});

// Does node = 0?
// next node
// if false - Add hidden class and remove hidden class from nextSiblingElement
// else
//

img.addEventListener('click', function(e){
  img.appendChild(e.target);
  e.target.classList.add('hidden');
});
