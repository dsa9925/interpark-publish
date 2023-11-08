window.addEventListener("load", function () {
  // event 슬라이드 데이터 연동
  // 백엔드 Response 데이터
  const xh = new XMLHttpRequest();
  xh.open("GET", "event.json");
  xh.send();
  xh.onreadystatechange = function (event) {
    //   console.log(event.target);

    if (event.target.readyState === XMLHttpRequest.DONE) {
      // 문자열을 js 에서 사용 하는 !!! json 데이터 !!! 변환
      const result = JSON.parse(event.target.response);

      //현재 화면 출력에 활용을 하지는 않고 있어요
      makeEventSlideHtml(result);
    }
  };
  // event 슬라이드 내용 채우는 기능
  function makeEventSlideHtml(_data) {
    const eventRes = _data;

    // 출력을 시켜줄 문장을 만들자.
    let eventHtml = "";

    // total 만큼 반복하자.
    // for문 은 반복을 하는데 true 인 경우만 반복한다.
    for (let i = 1; i <= eventRes.total; i++) {
      let temp = `
    <div class="swiper-slide">
        <div class="event-slide-item">
            <a href="${eventRes["event_" + i].url}">
                <img src="${eventRes["event_" + i].image}" alt="${
        eventRes["event_" + i].url
      }" />
            </a>
        </div>
    </div>
`;

      eventHtml += temp;
    }

    // 어디다가 자료를 출력할 것인지 지정
    const eventSlide = document.querySelector(".event-slide .swiper-wrapper");
    eventSlide.innerHTML = eventHtml;

    const swiperEvent = new Swiper(".event-slide", {
      slidesPerView: 4, // 슬라이드 몇장씩 보여주나
      spaceBetween: 28, // 보여지는 슬라이드 간격
      //  loop: true, // 반복해서 무한루프(활성화 해놓으면 버튼 사라지는 기능, 맨앞으로 돌아가는 기능이 비활성화됨)
      autoplay: {
        // 자동실행
        delay: 2500, // 대기시간
        disableOnInteraction: false, // 사용자 터치 후 자동실행
      },
      speed: 800, // 이동 속도 - 1000(1초)
      navigation: {
        // 좌측, 우측 이동 버튼
        nextEl: ".event-slide-wrap .slide-next-bt",
        prevEl: ".event-slide-wrap .slide-prev-bt",
      },
      slidesPerGroup: 4,
    });
  }
});
