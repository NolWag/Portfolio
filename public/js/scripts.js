var port = document.getElementById('portfolio');
var projects = document.getElementById('img');
var next = document.getElementById('next');
var hire = document.getElementById('hire');
var info = document.getElementById('infoSection');

port.addEventListener('click', function() {
    var classes = projects.firstElementChild.classList;
    classes.remove('hidden');
    next.classList.remove('hidden');
});

next.addEventListener('click', function() {
  projects.appendChild(projects.firstElementChild);
  projects.lastElementChild.classList.add('hidden');
  projects.firstElementChild.classList.remove('hidden');
});

hire.addEventListener('click', function() {
  info.classList.remove('hidden');
});
