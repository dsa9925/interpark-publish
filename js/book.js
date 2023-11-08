window.addEventListener("load", function () {
  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  // 추천 상품 슬라이드 기능
  // 글로써 코딩 시나리오 작성 : 의사코드

  // 1. 외부 데이터를 불러온다.
  const fileName = "book.json";
  // * 외부 데이터 가져올 때 작성법
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

  // 2. html 태그를 백틱을 이용해서 만든다.
  function makeHtmlTag(_res) {
    let htmlBookTag = ``;
    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["book_" + index];
      const tempTag = `
    <div class="swiper-slide">
                      <div class="book-slide-item">
                        <a href="${obj.url}" class="book-link">
                          <div class="book-img">
                            <img src="${obj.image}" alt="${obj.desc}" />
                          </div>
                          <div class="book-info">
                            <ul>
                              <li>
                                <span class="book-good-info-desc">
                                ${obj.name}
                                </span>
                              </li>

                              <li>
                                <span class="book-good-info-price">
                                  <em>${numberWithCommas(obj.price)}</em>
                                  원
                                </span>
                              </li>
                            </ul>
                          </div>
                        </a>
                      </div>
                    </div>

    `;
      htmlBookTag += tempTag;
    }
    showHtmlTag(htmlBookTag);
  }
  function showHtmlTag(_html) {
    const bookSlide = ".book-slide .swiper-wrapper";
    const tag = document.querySelector(bookSlide);
    tag.innerHTML = _html;
    makeSwiper();
  }
  function makeSwiper() {
    const swiperBook = new Swiper(".book-slide", {
      slidesPerView: 5,
      spaceBetween: 28,
      // 좌측, 우측 이동 버튼
      navigation: {
        nextEl: ".book-main .slide-next-bt",
        prevEl: ".book-main .slide-prev-bt",
      },
      // 4장씩 이동하라.
      slidesPerGroup: 5,
    });
  }
});
