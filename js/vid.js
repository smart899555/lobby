$(function () {

  let sp = 1000,
    easing = 'easeOutBounce';

  let $modal = $('.modal'),
      $closeBtn = $modal.find('.close-btn'),
      $video = $modal.find('video');

  // 전역 변수로 선언    
  let mov, i;    

  $(document).ready(function() {
    // 1. 햄버거 메뉴 열기
    $('.menu').on('click', function() {
        $('.side-menu').addClass('on');
    });

    // 2. 닫기 버튼 누르기
    $('.close-menu').on('click', function() {
        $('.side-menu').removeClass('on');
    });

    // 3. (디테일) 메뉴 바깥 영역 클릭해도 닫히게 하고 싶을 때
    $(document).mouseup(function (e) {
        var container = $(".side-menu");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.removeClass("on");
        }
    });
});

  $('.vid-wrap article')
  .on('mouseenter', function(){
    let $this = $(this);
    let vidSrc = $this.find('video').get(0);

    // 동영상 재생
    vidSrc.play();
    // 동영상 시작 시간 지정
    vidSrc.currentTime = 0;

    //아티클 가로 늘리기 => 22%
    $this.stop().animate({
      width: '22%'
    }, function(){
      $this.find('h4').show().stop()
      .animate({right: 30})

      $this.find('h4 + p').show().stop()
      .delay(200)
      .animate({right: 20})
      
    })

    // 동영상 배경 나타나는 효과
    $this.find('video').stop().fadeIn()

  })
  .on('mouseleave', function(){
    let $this = $(this);
       vidSrc = $this.find('video').get(0);
    
    // 동영상 멈춤
    vidSrc.pause();   

    //아티클 원래 크기로 => 가로 12%
    $this.stop().animate({
      width: '12%'
    });
    
    $this.find('h4, h4+p')
    .stop()
    .fadeOut(100)
    .css({right: -230})

    //동영상 배경 사라지는 효과
    $this.find('video').stop().fadeOut('slow');

  })
  .on('click', function(){
    // 클릭한 아티클의 순번 변수에 저장
       i = $(this).index();

    // 순번에 해당하는 video(태그X, 영상O) 저장
       mov = $video.eq(i).get(0);
    // 영상 시작 시간
        currentTime = 0;
    // 영상 재생
        mov.play();

    // 모달 나타나는 효과
    $modal.fadeIn(sp/2, function(){
      $video.eq(i).fadeIn()
      .prop({
        muted: false,
        controls: true
      });
    });

  });

  // 모달 닫기
  $closeBtn.click(function(){
    $modal.fadeOut('fast');

    mov.pause();
    $video.fadeOut('fast')
    .prop({
      muted: true,
      controls: false
    });

  });

});