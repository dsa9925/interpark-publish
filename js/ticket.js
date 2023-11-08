window.addEventListener("load", function () {
  // console.log("티켓 슬라이드 기능");
  // 추천 상품 슬라이드 기능
  // 글로써 코딩 시나리오 작성 : 의사코드

  // * 외부 데이터 가져올 때 작성법
  // 1. 외부 데이터를 불러온다.
  const fileName = "ticket.json";
  const xhr = new XMLHttpRequest();

  xhr.open("GET", fileName);
  xhr.send();
  xhr.onreadystatechange = function (event) {
    // console.log("데이터 전송 상태 확인", event.target.readyState);
    if (event.target.readyState === XMLHttpRequest.DONE) {
      // console.log("자료를 가져오는데 성공", event.target.response);
      const res = event.target.response;
      const json = JSON.parse(res);
      makeHtmlTag(json);
    }
  };

  function makeHtmlTag(_res) {
    let htmlTicketTag = ``;
    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["ticket_" + index];

      let tempTag = ``;
      if (i === _res.total - 1) {
        tempTag = `
          <div class="swiper-slide">
            바로가기
          </div>
        `;
      } else {
        tempTag = `
    <div class="swiper-slide">
                      <div class="ticket-slide-item">
                        <a href="${obj.url}" class="ticket-link">
                          <div class="ticket-img">
                            <img src="${obj.image}" alt="${obj.desc}" />
                          </div>
                          <div class="ticket-info">
                            <ul>
                              <li>
                                <span class="ticket-good-info-desc">
                                  <em>${obj.name}</em>
                                </span>
                              </li>

                              <li>
                                <span class="ticket-good-info-place">
                                ${obj.place}
                                </span>
                              </li>

                              <li>
                                <span class="ticket-good-info-price">
                                ${obj.date}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </a>
                      </div>
                    </div>
                    `;
      }
      htmlTicketTag += tempTag;
    }
    showHtmlTag(htmlTicketTag);
  }
  // 3. swiper 태그에 백틱을 배치한다.
  function showHtmlTag(_html) {
    const ticketSlide = ".ticket-slide .swiper-wrapper";
    const tag = document.querySelector(ticketSlide);
    tag.innerHTML = _html;
    makeSwiper();
  }
  // 4. swiper 작동시킨다.
  // const recommendSwiper = new Swiper(".recommed-slide");
  function makeSwiper() {
    const swiperTicket = new Swiper(".ticket-slide", {
      slidesPerView: 4,
      spaceBetween: 28,
      // 좌측, 우측 이동 버튼
      navigation: {
        nextEl: ".ticket-main .slide-next-bt",
        prevEl: ".ticket-main .slide-prev-bt",
      },
      // 4장씩 이동하라.
      slidesPerGroup: 4,
    });
  }
});
