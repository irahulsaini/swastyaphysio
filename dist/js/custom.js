
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


$('.testimonial-carousel,.team-carousel,.gallery,.serviceCarousel,.reviewsCarousel,.blogCarousel').owlCarousel({
    loop:true,
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