
window.addEventListener("load", function () {
  initLoading();
  changeBackgroundHeader();
  handleMenu();
  handleBackToTop();
  handleProgressBar();
  handlePopupVideo();
  handleMenuMobile();
  handleReviewsSlider();
  handleTabs();
  handlePagination();
  handleAccordion();
  handleFormValidation();
  handleAnimation();
});

window.addEventListener("resize", function() {
  handleReviewsSlider();
})

// Loading
function initLoading() {
  const container = document.querySelector("body");
  let imgsLength = document.querySelectorAll("img").length;
  let loadedCount = 0;

  // Init ImagesLoaded
  let imgsLoaded = new imagesLoaded(container);
   
  imgsLoaded
    .on("progress", function(instance) {
      loadedCount++;
      let percent = Math.floor((loadedCount / imgsLength) * 100);
      
      assignPercent(percent);
    })
    .on("always", function(instance) {
      console.log('always');
    })
    .on("fail", function(instance) {
      console.log("fail");
    })
    .on("done", function(instance) {
      console.log("done");
      hideLoading();
    })


    // Assign Percent For Loading Progress
    function assignPercent(percent) {
      const value = document.querySelector(".loading__inner-progressbar .value");
      const percentText = document.querySelector(".loading__inner-percent");

      value.style.width = `${percent}%`;
      percentText.textContent = `${percent}%`;
    }

    // Hide Loading
    function hideLoading() {
      const loading = document.querySelector(".loading");
      loading.classList.add("--hide");
      container.classList.remove("--disable-scroll");
    }
}

// Change Background Header
function changeBackgroundHeader() {
    const header = document.querySelector(".header");
    
    window.addEventListener("scroll", function() {
        let scrollY = window.scrollY;
        if (scrollY > 500) {
            header.classList.add("--bg-blue");
        } 
        else {
            header.classList.remove("--bg-blue");
        }
    })
}

// Handle Menu
function handleMenu(){
  const menuList = document.querySelectorAll(".header__nav .menu li a");
  
  
  addActiveSwitchPage();

  function addActiveSwitchPage() {
    menuList.forEach((item) => {
      if (item.href === window.location.href) {
        removeActiveMenu();
        item.classList.add("--active");
      }
    });
  }
  
  // Remove Active Menu
  function removeActiveMenu() {
    menuList.forEach(item => {
        item.classList.remove("--active");
    })
  }
}

// Back To Top
function handleBackToTop() {
    const btnBackToTop = document.querySelector(".footer__bottom-backtotop");

    if (btnBackToTop) {
       showBackToTop();
       backToTopOnClick();
    }

    function showBackToTop() {
        window.addEventListener("scroll", function() {
            let heightPage = document.body.offsetHeight;
            let scrollY = window.scrollY;

            if (scrollY > heightPage / 2) {
                btnBackToTop.classList.add("--show");
            }
            else {
                btnBackToTop.classList.remove("--show");
            }
        })
    }
    
    function backToTopOnClick() {
        btnBackToTop.addEventListener("click", function () {
          window.scrollTo(0, 0);
        });
    }
    
}

// Progressbar On Scroll
function handleProgressBar() {
  const progressbarInner = document.querySelector(".progressbar__inner");
  
  window.addEventListener("scroll", function() {
    let scrollHeight = document.documentElement.scrollHeight;
    let scrollY = window.scrollY;
    let windowHeight = window.innerHeight;

    // Calc Percent
    let percent = (scrollY / (scrollHeight - windowHeight) * 100).toFixed();
    
    // Assign Percent
    progressbarInner.style.width = `${percent}%`;
  })
}

// Modal Video
function handlePopupVideo() {
  const video = document.querySelector(".video__popup");
  const iframe = document.querySelector(".popupvideo__inner-iframe iframe");
  const popupVideo = document.querySelector(".popupvideo");
  const popupVideoInner = document.querySelector(".popupvideo__inner");
  const btnClose = document.querySelector(".popupvideo__inner-close")

  if (popupVideo) {
    video.addEventListener("click", function () {
      // Get ID Video
      let idVideo = this.getAttribute("data-id-video");

      // Assign For Iframe
      iframe.setAttribute(
        "src",
        `https://www.youtube.com/embed/${idVideo}?autoplay=1`
      );

      // Show Popup
      popupVideo.classList.add("--active");
    });

    // Hide Popup
    // Case 1: When click popupvideo, stop popup video inner
    popupVideo.addEventListener("click", function () {
      hidePopupVideo();
    });

    popupVideoInner.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    // Case 2: When click button close video
    btnClose.addEventListener("click", function () {
      hidePopupVideo();
    });

    function hidePopupVideo() {
      popupVideo.classList.remove("--active");
      iframe.setAttribute("src", "");
    }
  }
}

// Toggle Menu
function handleMenuMobile() {
  const btnMenuMobile = document.querySelector(".header__right-humburger");
  const nav = document.querySelector(".nav");
  const body = document.querySelector("body");
  const header = document.querySelector(".header");
  const progressbar = document.querySelector(".progressbar");
  const navLink = document.querySelectorAll(".nav .nav__inner .menu.--mobile li a");

  btnMenuMobile.addEventListener("click", function() {
    this.classList.toggle("--close");
    nav.classList.toggle("--active");
    body.classList.toggle("--disable-scroll");
    header.classList.toggle("--bg-transparent");
    progressbar.classList.toggle("--hide");
  })

  window.addEventListener("resize", function() {
    if (window.innerWidth >= 992) {
      btnMenuMobile.classList.remove("--close");
      nav.classList.remove("--active");
      body.classList.remove("--disable-scroll");
      header.classList.remove("--bg-transparent");
    }
  })

  // When Click Menu Link Then Go Next Page
  navLink.forEach(item => {
    if (item.href === window.location.href) {
      removeActiveMenuMobile();
      item.classList.add("--active");
    }
  })

  function removeActiveMenuMobile() {
    navLink.forEach((linkItem) => {
      linkItem.classList.remove("--active");
    });
  }
}

// Reviews Slider
function handleReviewsSlider() {
  const reviewList = document.querySelector(".reviews__wrap-list");
  
  if (reviewList) {
    let flkty = new FlickityResponsive(reviewList, {
      // Option
      cellAlign: "center",
      contain: true,
      wrapAround: true,
      draggable: ">1",
      prevNextButtons: false,
      groupCells: 2,
      wrapAround: true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            cellAlign: "center",
            groupCells: 1,
          },
        },
      ],
      on: {
        ready: function () {
          console.log("Flickity is ready");
          handleHeightCard();
        },
      },
    });

    // Handle Height Card Slider
    function handleHeightCard() {
      const comments = document.querySelectorAll(
        ".reviews__wrap-list .card .comment"
      );
      const p = document.querySelectorAll(
        ".reviews__wrap-list .card .comment p"
      );
      const cardItems = document.querySelectorAll(".reviews__wrap-list .card");

      p.forEach((item) => {
        let maxHeight = 0;
        let heightItem = item.offsetHeight;

        if (heightItem > maxHeight) {
          maxHeight = heightItem;
        }

        comments.forEach((comment) => {
          comment.style.height = `${maxHeight}px`;
        });
      });

      let maxHeightCard = 0;
      cardItems.forEach(function (cardItem) {
        let heightComment = cardItem.querySelector(".comment p").scrollHeight;
        let heightAuthor = cardItem.querySelector(
          ".reviews__wrap-list .card .author"
        ).offsetHeight;
        let paddingCard =
          parseInt(
            window.getComputedStyle(cardItem).getPropertyValue("padding-top")
          ) * 2;
        let gapCard = parseInt(
          window.getComputedStyle(cardItem).getPropertyValue("gap")
        );
        let heightCard = heightComment + heightAuthor + paddingCard + gapCard;
        if (heightCard > maxHeightCard) {
          maxHeightCard = heightCard;
        }
      });

      cardItems.forEach((item) => {
        item.style.height = `${maxHeightCard}px`;
      });
    }
  }
}

// Lastest Tabs
function handleTabs() {
  const tabs = document.querySelectorAll(".lastest .tabs li");
  const postsList = document.querySelectorAll(".lastest__content-list");

  if (tabs) {
    // Add Active Tab When Click
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        removeActiveTab();
        tab.classList.add("--active");
        showPostsByIndex(index);
      });
    });
  }

  // Remove Tab Active
  function removeActiveTab() {
    tabs.forEach((tab) => {
      tab.classList.remove("--active");
    });
  }

  // Show List Post By Index Tab
  function showPostsByIndex(index) {
    removeActivePostsList();
    postsList[index].classList.add("--active");
  }

  // Remove Active Posts List
  function removeActivePostsList() {
    postsList.forEach(list => {
      list.classList.remove("--active");
    })
  }
}

// Lastest Pagination
function handlePagination() {
    const numbersPage = document.querySelectorAll(".lastest__content-pagination .number");
    const btnPrev = document.querySelector(".btn.--prev");
    const btnNext = document.querySelector(".btn.--next");
    const lengthNumberPage = numbersPage.length;
    
    if (numbersPage) {
      addActiveNumberPage();
    }

    // Add Active NumberPage
    function addActiveNumberPage() {
      numbersPage.forEach((number, index) => {
        number.addEventListener("click", () => {
          removeActive(numbersPage);
          number.classList.add("--active");

          // Case 1: If index > 0 then button previous is active
          if (index > 0 ) {
            btnPrev.classList.remove("--disable");
            btnNext.classList.remove("--disable");
          }
          // Case 2: If index === lastIndex then button next is disabled
          if (index === lengthNumberPage - 1) {
            btnNext.classList.add("--disable");
          }
          // Case 3: If index === 0 then button previous is disabled
          if (index === 0) {
            btnPrev.classList.add("--disable");
            btnNext.classList.remove("--disable");
          }
        })
      })
    }

    // Remove Active NumberPage
    function removeActive(elements) {
      elements.forEach(ele => {
        ele.classList.remove("--active");
      })
    }
}

// Accordion
function handleAccordion() {
  // Get Element
  const accordions = document.querySelectorAll(".faqs__accordion-content");
  const contentElement = document.querySelectorAll(".faqs__accordion-content .content");
  
  accordions.forEach((accordion, index) => {
    accordion.addEventListener("click", () => {
      accordion.classList.toggle("--active");
      
     let isActive = accordion.classList.contains("--active");
     if (isActive) {
        contentElement[index].style.height = contentElement[index].scrollHeight + "px";
     }
     else {
        contentElement[index].style.height = "0px";
     }

      // Remove Active Accordion Previous If Different Index
      accordions.forEach((accordionPre, indexPre) => {
        if (index !== indexPre) {
          accordionPre.classList.remove("--active");
          contentElement[indexPre].style.height = "0px";
        }
      })
    })
  })
}

// Form Validation
function handleFormValidation() {
  function validator(options) {

    let selectorRules = {};

    // Handle Validate
    function validate(inputElement, rule) {
      let errorElement = inputElement.parentElement.querySelector(options.errorSelector);
      let errorMessage;

      // Get rules
      let rules = selectorRules[rule.selector];
      
      // Loop rules if is invalid break loop;
      for (let i = 0; i < rules.length; ++i) {
        errorMessage = rules[i](inputElement.value);
        if (errorMessage) break;
      }

      if (errorElement) {
        if (errorMessage) {
          errorElement.innerText = errorMessage;
          errorElement.parentElement.classList.add("--invalid");
        } else {
          errorElement.innerText = "";
          errorElement.parentElement.classList.remove("--invalid");
        }
      } else {
        if (errorMessage) {
          inputElement.parentElement.classList.add("--invalid");
        } else {
          inputElement.parentElement.classList.remove("--invalid");
        }
      }


      return !errorMessage;
    }

    // Get form need validate
    const formElement = document.querySelector(options.form);

    if (formElement) {
      // When click submit form
      formElement.addEventListener("submit", function(e) {
        e.preventDefault();

        let isFormValid = true;

        // Loop each rule and validate
        options.rules.forEach(function(rule) {
          let inputElement = formElement.querySelector(rule.selector);
          let isValid = validate(inputElement, rule);

          if (!isValid) {
            isFormValid = false;
          }
        })

        if (isFormValid) {
          // Submit with javascript
          if (typeof(options.onSubmit) === "function" ) {

            let enableInputs = formElement.querySelectorAll("[name]");

            let formValues = Array.from(enableInputs).reduce(function(values, input) {
              return (values[input.name] = input.value) && values;
            }, {})


            options.onSubmit(formValues)
          }

          // Submit default
          else {
            formElement.submit();
          }
        } 
      })


      // Loop each rule and listener events(blur, input, ...)
      options.rules.forEach(function(rule) {

        if (Array.isArray(selectorRules[rule.selector])) {
          selectorRules[rule.selector].push(rule.test);
        } 
        else {
          selectorRules[rule.selector] = [rule.test];
        }

        let inputElement = formElement.querySelector(rule.selector);
        
        if (inputElement) {
          // Handle user blur
          inputElement.addEventListener("blur", function() {
            validate(inputElement, rule);
          })

          // Handle when user type don't show message error
          inputElement.addEventListener("input", function() {
            let errorElement = inputElement.parentElement.querySelector(options.errorSelector);
            if (errorElement) {
              errorElement.innerText = "";
            }
            inputElement.parentElement.classList.remove("--invalid");
          })
        }
      })
    }
  }

  // Rules
  validator.isRequired = function(selector) {
    return {
      selector: selector,
      test: function(value) {
        return value.trim() ? undefined : "Please fill in this field";
      }
    }
  }

  validator.isEmail = function(selector) {
    return {
      selector: selector,
      test: function(value) {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(value) ? undefined : "This field must be email";
      }
    }
  }



  // Expect Result
  handleFormContact();
  handleFormEmail();

  // Form Contact
  function handleFormContact() {
    validator({
      form: "#getintouch__form",
      errorSelector: ".form-message",
      rules: [
        validator.isRequired("#fullname"),
        validator.isRequired("#email"),
        validator.isEmail("#email"),
        validator.isRequired("#subject"),
        validator.isRequired("#message"),
      ],
      onSubmit: function(data) {
        console.log(data);
      }
    });
  }
  
  // Form Newsletter
  function handleFormEmail() {
    validator({
      form: ".newsletter__form",
      rules: [
        validator.isRequired("#email"),
        validator.isEmail("#email")
      ],
      onSubmit: function (data) {
        console.log(data);
      }
    })
  }
}

function handleAnimation() {
  const animate = new WOW();
  animate.init()
}








