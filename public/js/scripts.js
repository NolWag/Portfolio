var port = document.getElementById('portfolio');
var projects = document.getElementById('img');
var next = document.getElementById('next');

port.addEventListener('click', function() {
    var classes = projects.firstElementChild.classList;
    classes.remove('hidden');
    next.classList.remove('hidden');
});

next.addEventListener('click', function() {
  console.log('click')
  projects.appendChild(projects.firstElementChild);
  projects.lastElementChild.classList.add('hidden');
  projects.firstElementChild.classList.remove('hidden');
});
