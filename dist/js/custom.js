
//alphabets
document.querySelectorAll('.input-text').forEach(function(element){
    element.addEventListener('input',function(){
        this.value = this.value.replace(/[^A-Z a-z]/g,'').trimStart();
    });
});
//numbers
document.querySelectorAll('.input-number').forEach(function(element){
    element.addEventListener('input',function(){
        this.value = this.value.replace(/[^0-9]/g,'').trimStart();
    });
});
//email
document.querySelectorAll('.input-email').forEach(function(element){
    element.addEventListener('input',function(){
        var value = this.value.replace(/\.\./g, ".");
        //remove .@
        value = value.replace(/\.@/g,"@");
        //remove extra chars
        value = value.replace(/[^A-Z a-z0-9.@_-]/g,'');
        //multiple @
        value = value.replace(/\@@/g,"@");
        
        //remove whitespace from start
        this.value = value.trimStart();
    });
    //remove . from the end
    element.addEventListener('change',function(){
        value = this.value;
        if( value[value.length-1] == '.'){
            value = value.substring(0,value.length-1)
        }        
        //remove whitespace from start
        this.value = value.trimStart()
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const carouselList = document.querySelectorAll('.treatmentCarousel');
    if (!carouselList) return;
    carouselList.forEach(function(carousel){
        // clone items for seamless infinite scroll
        const items = Array.from(carousel.children);
        items.forEach(item => {
            const clone = item.cloneNode(true);
            carousel.appendChild(clone);
        });
        
    })
});

document.querySelectorAll('.contactUsForm').forEach(function(element){
    element.addEventListener('submit',function(e){
        e.preventDefault();
        const formData = new FormData(this)
        sendMessage(e,formData,element)
    })
});
async function sendMessage(element,formData,parent){

    const submit = element.target.submit;
    submit.innerHTML = 'Please Wait...';
    submit.setAttribute('disabled',1);
    
        console.log(formData)
    const query = await fetch('./mail.php',{
        method: 'POST',
        body: formData
    });
    const response = await query.json();
    submit.innerHTML = 'Send';
    
    parent.querySelectorAll('.response').forEach(function(e){
        if(response.status == true){
            // window.location.href = '/thankyou/';
            e.innerHTML = '<div class="alert alert-success small mt-3">Thank you! Your message has been sent.</div>'
        }else{
            e.innerHTML = `<div class="alert alert-danger small mt-3">${response.message}</div>`
            submit.removeAttribute('disabled');
        }    
    })
}
$('.testimonial-carousel,.team-carousel,.gallery,.serviceCarousel,.reviewsCarousel,.blogCarousel').owlCarousel({
    loop:false,
    margin:30,
    responsiveClass:true,
    autoplay:true,
    nav:false,
    dots:true,
    responsive:{
        0:{
            items:1,
        },
        600:{
            items:2,
        },
        1000:{
            items:3,
        }
    }
});
$('.our-clinics-carousel').owlCarousel({
    loop:false,
    margin:30,
    responsiveClass:true,
    autoplay:true,
    nav:false,
    dots:true,
    responsive:{
        0:{
            items:1,
        },
        600:{
            items:1,
        },
        1000:{
            items:1,
        }
    }
});
/*
$(window).scroll(function(){
  var scroll = $(window).scrollTop();
  //>=, not <=
  if (scroll >= 300) {
      //clearHeader, not clearheader - caps H
      $("header nav").addClass("nav-light");
      $("header nav").removeClass("nav-dark");
  }else{
    $("header nav").addClass("nav-dark");
    $("header nav").removeClass("nav-light");
  }
});
*/