var j = $.noConflict();

var timer = null, delta = 500, onePlay = 0;

var arrTarget = ['home', 'about', 'skill', 'portfolio', 'contact'];
var arrMoblileTarget = ['home', 'about', 'skill', 'portfolio', 'contact'];

var typingBool = false;
var typingIdx = 0;
var typingIdx2 = 0;
var typingTxt = $(".typing-txt").text(); // 타이핑될 텍스트를 가져온다
var typingTxt2 = $(".typing-txt-about").text();
var tyInt = setInterval(typing, 150); // 반복동작
var tyInt2 = setInterval(typingAbout, 150); // 반복동작

$(function() {
  typingTxt = typingTxt.split(""); // 한글자씩 자른다.
      if (typingBool == false) {
        // 타이핑이 진행되지 않았다면
        typingBool = true;
      }

  typingTxt2 = typingTxt2.split("");
      if (typingBool == false) {
        // 타이핑이 진행되지 않았다면
        typingBool = true;
      }

  // goto("header");

  for(var i = 0; i < $("#pc-top-menu li").length; i++) {
        (function(i) {
            $("#pc-top-menu li:nth-child(" + (i + 1) + ")").bind('click', function() {
                goto('#' + arrTarget[i]);
            });
        }(i));
    }

  // 모바일
  // for(var i = 0; i < $("#pc-top-menu li").length; i++) {
  //   (function(i) {
  //     $("#pc-top-menu li:nth-child(" + (i + 1) + ")").bind('click', function() {
  //       goto('#' + arrMoblileTarget[i]);
  //       hideBuger();
  //     });
  //   }(i));
  // }


  $(".screen").each(function(index) {
    if(index != 3)
        $(this).on("mousewheel DOMMouseScroll", function(e) {
          e.preventDefault(); // 기존 기능 차단
          var isUp = 0; // 스크롤 값 반환
          if(!event) event = window.event;

          // 마우스휠
          if(event.wheelDelta) {
            isUp = event.wheelDelta / 120; // 크롬
            if(window.opera) isUp = -isUp; // 오페라
          }
          else if(event.detail)
            isUp = -event.detail / 3; // 파이어폭스

          var moveTop = $(window).scrollTop(); // 현재 스크롤 위치
          var elmSelecter = $(this);

          //마우스휠 위에서 아래로
          if(isUp < 0) {

            if($(elmSelecter).next() != undefined) {
              try {
                moveTop = $(elmSelecter).next().offset().top;
                playGround($(elmSelecter).next());
                onePlay= 0;
              } catch(e) {
                moveTop = $("#contact").offset().top;
                playGround($("#contact"));
                onePlay = 0;
              }
            }
          //마우스휠 아래에서 위로
          } else {
            if(index != 1) {
              if($(elmSelecter).prev() != undefined) {
                try {
                  moveTop = $(elmSelecter).prev().offset().top;
                  playGround($(elmSelecter).prev());
                  onePlay = 0;
                } catch(e) {
                  moveTop = $("header").offset().top;
                  playGround($("header"));
                  onePlay = 0;
                }
              }
            } else {
              try {
                moveTop = $("header").offset().top;
                playGround($("header"));
                onePlay = 0;
              } catch(e) {}
            }
          }

          // 화면 이동
          $("html, body").stop().animate({
            scrollTop: moveTop + 'px'
          }, {
            duration: 500, easing: 'linear', complete: function() {
            }
          });

        });

  });

  $(".aboutimg2>button").click(function() {
    $(".aboutimg1>h1, .aboutimg1>ul").stop().show().addClass("animated flash");
  });

  // $(".card-back").click(function() {
  //   $(".card-back>img").hide();
  //   $(".card-front>img").show().addClass("element-animation animationFrames");
  //   progress();
  // });

  $(".card-back").click(function() {
    $(".card-back>img").each(function(index) {
        // console.log($(this).parents(".card-back"));
        var el = $(this);
        (function(el) {
            setTimeout(function() {
                // console.log(el);
                el.hide().parents(".card-back").next(".card-front").find("img").addClass("element-animation animationFrames");
                progress(index);         
            }, index * 500);
        })(el);
        // $(this).hide().parents(".card-back").next(".card-front").find("img").delay(index * 1000).addClass("element-animation animationFrames");
        // $(this).
        // $(".card-front>img").show().addClass("element-animation animationFrames");
    });
    // progress();
  });

    var swiper = new Swiper('.swiper-container', {
            direction: 'horizontal',
            slidesPerView: 'auto',
            freeMode: true,
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            mousewheel: true,
            direction: 'vertical',
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            on: {
                reachEnd: function() {
                    moveTop = $("#contact").offset().top;
                    playGround($("#contact"));
                    $("html, body").stop().animate({
                            scrollTop: moveTop + 'px'
                        }, {
                            duration: 500, easing: 'linear', complete: function() {
                        }
                    });
                },
                reachBeginning: function() {
                    moveTop = $("#skill").offset().top;
                    playGround($("#skill"));
                    $("html, body").stop().animate({
                            scrollTop: moveTop + 'px'
                        }, {
                            duration: 500, easing: 'linear', complete: function() {
                        }
                    });
                },
            }
    });

    // console.log(swiper);

    // swiper.on("slideChangeTransitionEnd", function() {
    //     console.log("test");
    //     var i = swiper.realIndex;
    //     console.log(swiper.realIndex);
    //     if(i == 3) {
    //         $(this).on("mousewheel DOMMouseScroll", function(e) {
    //               e.preventDefault(); // 기존 기능 차단
    //               var isUp = 0; // 스크롤 값 반환
    //               if(!event) event = window.event;

    //               // 마우스휠
    //               if(event.wheelDelta) {
    //                 isUp = event.wheelDelta / 120; // 크롬
    //                 if(window.opera) isUp = -isUp; // 오페라
    //               }
    //               else if(event.detail)
    //                 isUp = -event.detail / 3; // 파이어폭스

    //               var moveTop = $(window).scrollTop(); // 현재 스크롤 위치
    //               var elmSelecter = $(this);

    //               //마우스휠 위에서 아래로
    //               if(isUp < 0) {

    //                 if($(elmSelecter).next() != undefined) {
    //                   try {
    //                     moveTop = $(elmSelecter).next().offset().top;
    //                     playGround($(elmSelecter).next());
    //                     onePlay= 0;
    //                   } catch(e) {
    //                     moveTop = $("#contact").offset().top;
    //                     playGround($("#contact"));
    //                     onePlay = 0;
    //                   }
    //                 }
    //               //마우스휠 아래에서 위로
    //               } else {
    //                 if(index != 1) {
    //                   if($(elmSelecter).prev() != undefined) {
    //                     try {
    //                       moveTop = $(elmSelecter).prev().offset().top;
    //                       playGround($(elmSelecter).prev());
    //                       onePlay = 0;
    //                     } catch(e) {
    //                       moveTop = $("header").offset().top;
    //                       playGround($("header"));
    //                       onePlay = 0;
    //                     }
    //                   }
    //                 } else {
    //                   try {
    //                     moveTop = $("header").offset().top;
    //                     playGround($("header"));
    //                     onePlay = 0;
    //                   } catch(e) {}
    //                 }
    //               }

    //               // 화면 이동
    //               $("html, body").stop().animate({
    //                 scrollTop: moveTop + 'px'
    //               }, {
    //                 duration: 500, easing: 'linear', complete: function() {
    //                 }
    //               });

    //         });
    //     } else {

    //     }
    // });

});


//스크롤 될 때 탑메뉴 고정
window.onscroll = function(e) {
  timer = setTimeout(checkStaticMenu, delta);
}

//탑 메뉴 고정
function checkStaticMenu() {
  var nav = document.getElementById("pc-top-menu");
  var header = document.querySelector("header");

  if(header.offsetHeight < window.scrollY + 20) {
    nav.classList.add('set-fixed');
    if(header.offsetHeight < window.scrollY + 20)
      nav.classList.add('show-menu');
  } else {
    if(window.scrollY == 0)
      nav.classList.remove('set-fixed');
      nav.classList.remove('show-menu');
  }
}


var goto = function(target) {
  $("html, body").animate({
    scrollTop: $(target).offset().top
  }, {
    duration: 500, easing: 'linear', complete: function() {
      playGround($(target));
    }
  }).promise().then(function() {
    onePlay = 0;
  });
  return false;
};

var playGround = function(elm) {
  if(!onePlay) {
    var nowScreen = 0;

    if(elm.selector) {
      switch(elm.selector) {
        case 'header': case '#home':
          nowScreen = 0;
          break;
        case '#about':
          nowScreen = 1;

          break;
        case '#skill':
          nowScreen = 2;
          break;
        case '#portfolio':
          nowScreen = 3;
          break;
        case '#contact':
          nowScreen = 4;
          break;
      }
    } else {
      switch(elm[0].id) {
        case 'wrap': case 'about':
          nowScreen = 1;
          break;
        case 'skill':
          nowScreen = 2;
          break;
        case 'portfolio':
          nowScreen = 3;
          break;
        case 'contact':
          nowScreen = 4;
          break;
      }
    }

    showNowScreen(nowScreen);

    switch(nowScreen) {
        case 1:
            $(".aboutimg2").removeAttr("style");
            $(".aboutimg2").stop().delay(500).addClass("animated fadeInUp");
            // $("#someDiv").stop().delay(500).animate({
            //   "opacity": "1",
            //   "top": "-40px"
            // }, 1500).delay(500).animate({
            //   "left": "-500px"
            // }, 1500);
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
      default:
            break;
    }
  }
}

var showNowScreen = function(ns) {
  // PC - 1 2 3 4 0
  // 모바일 - 1 2 3 4

  // PC 메뉴
  $("#pc-top-menu>ul>li").each(function(index) {
    $(this).removeClass("actived");
    if(ns != 0) {
        if(index > 1) {
            if(index == ns) $(this).addClass("actived");
        } else {
            if(index == (ns - 0)) $(this).addClass("actived");
        }
    }
  });

  // $("#m-top-menu").each(function(index) {
  //   $(this).removeClass("actived");
  //   if(ns != 0) {
  //       if(index == (ns - 1)) {
  //           $(this).addClass("actived");
  //       }
  //   }
  // });

  // 모바일 메뉴
}

function typing() {
  if (typingIdx < typingTxt.length) {
    // 타이핑될 텍스트 길이만큼 반복
    $(".typing").append(typingTxt[typingIdx]); // 한글자씩 이어준다.
    typingIdx++;
  } else {
    clearInterval(tyInt); //끝나면 반복종료
  }
}

function typingAbout() {
  if (typingIdx2 < typingTxt2.length) {
    // 타이핑될 텍스트 길이만큼 반복
    $(".typing2").append(typingTxt2[typingIdx2]); // 한글자씩 이어준다.
    typingIdx2++;
  } else {
    clearInterval(tyInt2); //끝나면 반복종료
  }
}

var pro = document.getElementsByClassName("pro");
var txtPro = document.getElementsByClassName("txtpro");
var s = [95, 80, 70, 70, 70];

function progress(index) {
    // console.log(index);    
    var timer = null;
    var e = 1;

    setTimeout(function() {
        timer = setInterval(function() {
            pro[index].value +=1;
            if(s[index] == e) {
                clearInterval(timer);
            }
            txtPro[index].innerText = pro[index].value + "%";
            e++;
        }, 10);
    }, index * 100);
    // timer = setInterval(function() {
    //     pro[index].value +=1;
    //     if(s[index] == e) {
    //         clearInterval(timer);
    //     }
    //     txtPro[index].innerText = pro[index].value + "%";
    //     e++;
    // }, 50);
    // var e = [1, 1, 1, 1, 1];
    // for(var i = 0; i < pro.length; i++) {
    //     (function(i) {
    //         timer[i] = setInterval(function() {
    //             pro[i].value +=1;
    //             if(s[i] == e[i]) {
    //                 clearInterval(timer[i]);
    //             }
    //             txtPro[i].innerText = pro[i].value + "%";
    //             e[i]++;
    //         }, 50);
    //     })(i);
    // }
    // s += "<div class='txtpro'><progress value='" + i + "' max='100' class='pro'></progress></div>";
  }

  