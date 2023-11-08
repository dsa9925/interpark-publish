window.addEventListener("load", function () {
  console.log("라이브 슬라이드 기능");
  // 추천 상품 슬라이드 기능
  // 글로써 코딩 시나리오 작성 : 의사코드

  // 1. 외부 데이터를 불러온다.
  const fileName = "live.json";

  // * 외부 데이터 가져올 때 작성법
  const xhr = new XMLHttpRequest();
  xhr.open("GET", fileName);
  xhr.send();
  xhr.onreadystatechange = function (event) {
    console.log("데이터 전송 상태 확인", event.target.readyState);
    if (event.target.readyState === XMLHttpRequest.DONE) {
      console.log("자료를 가져오는데 성공", event.target.response);
    }
  };

  // 2. html 태그를 백틱을 이용해서 만든다.
  const htmlLiveTag = ``;

  // 3. swiper 태그에 백틱을 배치한다.
  const liveSlide = ".live-slide .live-wrapper";

  // 4. swiper 작동시킨다.
  // const recommendSwiper = new Swiper(".recommed-slide");
  const swiperLive = new Swiper(".live-slide", {
    slidesPerView: 4,
    spaceBetween: 28,
    // 좌측, 우측 이동 버튼
    navigation: {
      nextEl: ".live-main .slide-next-bt",
      prevEl: ".live-main .slide-prev-bt",
    },
    // 4장씩 이동하라.
    slidesPerGroup: 4,
  });
});
