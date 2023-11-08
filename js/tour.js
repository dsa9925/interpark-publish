window.addEventListener("load", function () {
  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  // console.log("투어 슬라이드 기능");
  // 추천 상품 슬라이드 기능
  // 글로써 코딩 시나리오 작성 : 의사코드

  // 1. 외부 데이터를 불러온다.
  const fileName = "tour.json";

  // * 외부 데이터 가져올 때 작성법
  const xhr = new XMLHttpRequest();
  // 외부의 파일을 열어라
  // Get 방식으로 파일을 열어준다.
  xhr.open("GET", fileName);
  // 실제로 실행하자
  xhr.send();
  // 데이터의 전송상태 체크
  xhr.onreadystatechange = function (event) {
    // console.log("데이터 전송 상태 확인", event.target.readyState);
    if (event.target.readyState === XMLHttpRequest.DONE) {
      // console.log("자료를 가져오는데 성공", event.target.response);
      const res = event.target.response;
      const json = JSON.parse(res);
      makeHtmlTag(json);
    }
  };

  // 2. html 태그를 백틱을 이용해서 만든다.
  function makeHtmlTag(_res) {
    let htmlTourTag = ``;
    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["tour_" + index];

      const tempTag = `
        <div class="swiper-slide">
                      <div class="tour-slide-item">
                        <a href="${obj.url}" class="tour-link">
                          <div class="tour-img">
                            <img src="${obj.image}" alt="${obj.desc}" />
                          </div>
                          <div class="tour-info">
                            <ul>
                              <li>
                                <span class="tour-good-info-desc">
                                  ${obj.name}
                                </span>
                              </li>

                              <li>
                                <span class="tour-good-info-place">
                                  ${obj.place}
                                </span>
                              </li>

                              <li>
                                <span class="tour-good-info-price">
                                  <em>${numberWithCommas(obj.price)}</em>
                                  원~
                                </span>
                              </li>
                            </ul>
                          </div>
                        </a>
                      </div>
                    </div>
                    `;
      htmlTourTag += tempTag;
    }
    showHtmlTag(htmlTourTag);
  }

  // 3. swiper 태그에 백틱을 배치한다.
  function showHtmlTag(_html) {
    // swiper 태그에 백틱을 배치한다.
    const tourSlide = ".tour-slide .swiper-wrapper";
    const tag = document.querySelector(tourSlide);
    tag.innerHTML = _html;

    // swiper 만들고 실행하기
    makeSwiper();
  }
  function makeSwiper() {
    const swiperTour = new Swiper(".tour-slide", {
      slidesPerView: 3,
      spaceBetween: 28,
      // 좌측, 우측 이동 버튼
      navigation: {
        nextEl: ".tour-main .slide-next-bt",
        prevEl: ".tour-main .slide-prev-bt",
      },
      // 4장씩 이동하라.
      slidesPerGroup: 3,
    });
  }
});
