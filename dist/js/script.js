$(document).ready(function () {
	$(".js-tab").on("click", function (e) {
		e.preventDefault();

		let elementId = $(this).attr("href");

		$(this).parent().find(".js-tab").removeClass("active");

		$(this).addClass("active");

		new Promise((resolve, reject) => {
			$(elementId).parent().find(".js-tab-item").removeClass("active");
			setTimeout(() => {
				$(elementId).parent().find(".js-tab-item").css({ display: "none" });
				resolve();
			}, 200);
		}).then(() => {
			setTimeout(() => {
				$(elementId).addClass("active");
			}, 100);

			$(elementId).css({ display: "block" });
		});
	});

	$(".js-tab").eq(0).click();

	$(".lightgallery").lightGallery({
		selector: "a",
	});

	$(".js-ham, .header-close-menu, .bg-overlay").on("click", function (e) {
		$(".js-ham").toggleClass("active");
		$(".header").toggleClass("active");
		$(".bg-overlay").fadeToggle();
		$("body").toggleClass("lock");
	});

	$(".header").mCustomScrollbar({
		theme: "my-theme",
		scrollInertia: 100,
	});

	// МАСКА ТЕЛЕФОНА
	$("input[type=tel]").inputmask({
		mask: "+7 (Z99) 999-99-99",
		definitions: {
			Z: {
				validator: "[0-6,9]",
			},
		},
	});

	//===============ANIMATION SCROLL======================
	const animItems = $(".anim-items");

	if (animItems.length > 0) {
		$(window).on("scroll", animOnScroll);
		function animOnScroll() {
			$.each(animItems, function (index, val) {
				const animItem = animItems.eq(index);
				const animItemHeight = animItem.innerHeight();
				const animItemOffset = animItem.offset().top;
				const animStart = 10; // начало анимации при достижении скролом 1/10 части элемента

				let animItemPoint = $(window).height() - animItemHeight / animStart;

				if (animItemHeight > $(window).height()) {
					animItemPoint = $(window).height() - $(window).height() / animStart;
				}

				if ($(window).scrollTop() > animItemOffset - animItemPoint && $(window).scrollTop() < animItemOffset + animItemHeight) {
					animItem.addClass("animate");
				} else {
					if (!animItem.hasClass("anim-no-scrollTop")) {
						animItem.removeClass("animate");
					}
				}
			});
		}
		setTimeout(animOnScroll, 0);
	}

	$("select").niceSelect();

	//Попапы
	$(".js-show-popup a").on("click", function (e) {
		e.preventDefault();
		$(".modal").fadeOut();

		$(".popup-overlay").fadeIn();
		$($(this).attr("href")).fadeIn();
		$($(this).attr("href")).css({ "max-height": $(window).height() });
	});

	$(".js-modal-close").on("click", function (e) {
		$(this).parents(".modal").fadeOut();
		$(".popup-overlay").fadeOut();
	});

	$(".popup-overlay").on("click", function (e) {
		$(".modal").fadeOut();
		$(this).fadeOut();
	});

	$(window).on("load", function () {
		$.each($(".news-item"), function (index, val) {
			let heightDesc = $(val).find(".news-description").outerHeight(true) - 10;
			$(val)
				.find(".news-title")
				.css({ bottom: "-" + heightDesc + "px" });
		});

		$(window).on("resize", function () {
			$.each($(".news-item"), function (index, val) {
				let heightDesc = $(val).find(".news-description").outerHeight(true) - 10;
				$(val)
					.find(".news-title")
					.css({ bottom: "-" + heightDesc + "px" });
			});
		});
	});
});

// скрипт слайдера

document.addEventListener(
	"DOMContentLoaded",
	function () {
		const swiper_small = new Swiper(".product-swiper-container-small", {
			// Optional parameters
			slidesPerView: 3,
			spaceBetween: 15,
			loop: false,

			breakpoints: {
				768: {
					slidesPerView: 5,
					spaceBetween: 30,
				},
				500: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
		});

		const swiper_big = new Swiper(".product-swiper-container-big", {
			// Optional parameters
			slidesPerView: 1,
			spaceBetween: 30,
			loop: false,

			// Navigation arrows
			navigation: {
				nextEl: ".product-button-next",
				prevEl: ".product-button-prev",
			},

			thumbs: {
				swiper: swiper_small,
			},
		});
	},
	false
);
