document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel");
    const firstImg = carousel.querySelectorAll("img")[0];
    const arrowIcons = document.querySelectorAll(".wrapper i");

    let isDragStart = false,
        isDragging = false,
        prevPageX,
        prevScrollLeft,
        positionDiff;

    const showHideIcons = () => {
        const scrollWidth = carousel.scrollWidth - carousel.clientWidth;
        arrowIcons[0].style.display = carousel.scrollLeft <= 0 ? "none" : "block";
        arrowIcons[1].style.display = carousel.scrollLeft >= scrollWidth ? "none" : "block";
    };

    arrowIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            const firstImgWidth = firstImg.clientWidth + 14;
            carousel.scrollLeft += icon.id === "left" ? -firstImgWidth : firstImgWidth;
            setTimeout(showHideIcons, 60);
        });
    });

    const autoSlide = () => {
        if (carousel.scrollLeft === (carousel.scrollWidth - carousel.clientWidth)) return;
        positionDiff = Math.abs(positionDiff);
        const firstImgWidth = firstImg.clientWidth + 14;
        const valDifference = firstImgWidth - positionDiff;

        if (carousel.scrollLeft > prevScrollLeft) {
            carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
        } else {
            carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
        }
    };

    const dragStart = (e) => {
        isDragStart = true;
        prevPageX = e.pageX || e.touches[0].pageX;
        prevScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
        if (!isDragStart) return;
        e.preventDefault();
        isDragging = true;
        carousel.classList.add("dragging");
        positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
        carousel.scrollLeft = prevScrollLeft - positionDiff;
        showHideIcons();
    };

    const dragStop = () => {
        isDragStart = false;
        carousel.classList.remove("dragging");
        if (!isDragging) return;
        isDragging = false;
        autoSlide();
    };

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("touchstart", dragStart);
    carousel.addEventListener("mousemove", dragging);
    carousel.addEventListener("touchmove", dragging);
    document.addEventListener("mouseup", dragStop);
    document.addEventListener("touchend", dragStop);

    showHideIcons();
});
