const cursor = document.querySelector(".cursor");
const trail = document.querySelector(".cursor-trail");
document.addEventListener("mousemove", e => {
  let x = e.clientX + "px", y = e.clientY + "px";
  if(cursor){cursor.style.left=x; cursor.style.top=y;}
  if(trail){trail.style.left=x; trail.style.top=y;}
});

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");
if(menuToggle && nav){
  menuToggle.addEventListener("click", ()=>{
    nav.classList.toggle("active");
    menuToggle.classList.toggle("fa-bars");
    menuToggle.classList.toggle("fa-times");
  });
  document.querySelectorAll("nav a").forEach(link=>{
    link.addEventListener("click", ()=>{
      nav.classList.remove("active");
      menuToggle.classList.remove("fa-times");
      menuToggle.classList.add("fa-bars");
    });
  });
}

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    entry.target.classList.toggle('show', entry.isIntersecting);
  });
},{threshold:0.3});
document.querySelectorAll('.project-block').forEach(el=>observer.observe(el));

particlesJS("particles-js",{
  particles:{
    number:{value:80,density:{enable:true,value_area:800}},
    color:{value:"#4cafef"},shape:{type:"circle"},opacity:{value:0.5},size:{value:3,random:true},
    line_linked:{enable:true,distance:150,color:"#4cafef",opacity:0.4,width:1},
    move:{enable:true,speed:2}
  },
  interactivity:{
    events:{onhover:{enable:true,mode:"repulse"},onclick:{enable:true,mode:"push"}},
    modes:{repulse:{distance:100,duration:0.4},push:{particles_nb:4}}
  },
  retina_detect:true
});
