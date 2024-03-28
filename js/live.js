window.addEventListener("load", function () {
  console.log("라이브 슬라이드 기능");

  // json 파일 경로
  const fileName = "live.json";

  // 외부 데이터 불러오기
  const xhr = new XMLHttpRequest();
  xhr.open("GET", fileName);
  xhr.send();
  xhr.onreadystatechange = function (event) {
    if (event.target.readyState === XMLHttpRequest.DONE) {
      const res = event.target.response;
      const json = JSON.parse(res);
      makeHtmlTag(json);
    }
  };

  // HTML 태그 생성
  function makeHtmlTag(_res) {
    let htmlLiveTag = ``;
    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["live_" + index];
      const tempTag = `
      
      <div class="swiper-slide">
        <div class="live-slide-item">
          <a href="${obj.url}" class="live-link">
            <div class="live-img">
              <img src="${obj.image}" alt="${obj.desc}" />
            </div>
            <div class="live-info">
              <div class="live-good-list">
                <div>
                  <p class="live-good-info-tv">${obj.state}</p>
                </div>
                <div>
                  <p class="live-good-info-tilte">${obj.brand}</p>
                </div>
                <div class="live-good-list-cate">
                  <p class="live-good-info-date">${obj.date}</p>
                  <p class="live-good-info-time">${obj.time}</p>
                </div>
                <div class="live-good-footer">
                <img class="live-good-footer-images" src="${obj.good_image}" alt="">
                  <p class="live-good-info-footer">${obj.good_title}</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      `;
      htmlLiveTag += tempTag;
    }
    showHtmlTag(htmlLiveTag);
  }

  // HTML 태그 표시
  function showHtmlTag(_html) {
    const liveSlide = document.querySelector(".live-slide .swiper-wrapper");
    liveSlide.innerHTML = _html;
    makeSwiper();
  }

  // swiper 초기화 함수
  function makeSwiper() {
    const swiperLive = new Swiper(".live-slide", {
      slidesPerView: 4,
      spaceBetween: 28,
      navigation: {
        nextEl: ".live-main .slide-next-bt",
        prevEl: ".live-main .slide-prev-bt",
      },
      slidesPerGroup: 4,
    });
  }
});
