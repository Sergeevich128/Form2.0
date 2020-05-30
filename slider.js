const slider = document.getElementsByClassName('slider')[0];
const dotsContainer = document.getElementsByClassName('dots')[0];
const prevButton = document.getElementsByClassName('button-previous')[0];
const nextButton = document.getElementsByClassName('button-next')[0];
let canMove = true;
const imgLinks = [
    "img/1.jpg",
    "img/2.jpg",
    "img/3.jpg",
    "img/4.jpg",
    "img/5.jpg",
    "img/6.jpg",
    "img/7.jpg",
];

const images = imgLinks.map((item) => {
    const img = document.createElement('img');
    img.src = item;
    return img;
})

images[0].classList.add('active');
activeImg = images[0];
slider.append(...images);

const dots = imgLinks.map((item) => {
    const dot = document.createElement('span');
    dot.classList.add('dot')
    return dot;
})

dots[0].classList.add('active');
activeDot = dots[0];
dotsContainer.append(...dots);

dots.indexOf = [].indexOf; // добавляем коллекции dots метод массива indexOf

dotsContainer.addEventListener('click', (event) => { // вешаем слушатель кликов на див, который содержит все доты
    if (canMove) {
        canMove = false;
        setTimeout(() => canMove = true, 1000);
        if (event.target.classList.contains('dot')) { // проверяем содержит ли текущий элемент класс дот
            if (event.target !== activeDot) { // проверяем является ли таргет элемент тем же самым элементом на который ссылается переменная activeDot
                activeDot.classList.remove('active'); // удаляем класс эктив с активного элемента
                event.target.classList.add('active'); // вешаем класс эктив на неактивный элемент
                activeDot = event.target; // переприсваиваем переменную эктивДот, теперь она равна следующему активному доту

                activeImg.classList.remove('active'); // удаляем с активной картинки класс эктив
                const nextActiveImg = images[dots.indexOf(activeDot)];
                nextActiveImg.classList.add('active'); // добавляем класс эктив картинке с конкретным индексом
                activeImg = nextActiveImg; // переприсваиваем переменной activeImg картинку с этим индексом(которой добавили класс эктив)
            }
        }
    }
});

const handleArrowClick = (isLeft) => {
    if (canMove) {
        canMove = false;
        setTimeout(() => canMove = true, 1000);
        activeImg.classList.remove('active');
        activeImg = isLeft ?
            activeImg.previousElementSibling === null ? images[images.length - 1] : activeImg.previousElementSibling :
            activeImg.nextElementSibling === null ? images[0] : activeImg.nextElementSibling;
        activeImg.classList.add('active');

        activeDot.classList.remove('active');
        activeDot = isLeft ?
            activeDot.previousElementSibling === null ? dots[dots.length - 1] : activeDot.previousElementSibling :
            activeDot.nextElementSibling === null ? dots[0] : activeDot.nextElementSibling;
        activeDot.classList.add('active');
    }
};

nextButton.addEventListener('click', () => handleArrowClick(false));
prevButton.addEventListener('click', () => handleArrowClick(true));
document.addEventListener('keydown', () => {
    if (event.key === 'ArrowLeft') {
        handleArrowClick(true);
    } else if (event.key === 'ArrowRight') {
        handleArrowClick(false);
    }
});

let isMove = false;
let moveOut = false;

slider.addEventListener('mousedown', (event) => {
    slider.classList.add('grabbing');
    isMove = true;
    moveOut = true;
    start = event.clientX;
})

slider.addEventListener('mouseup', (event) => {
    slider.classList.remove('grabbing');
    isMove = false;
    moveOut = true;
})

slider.addEventListener('mouseout', (event) => {
    slider.classList.remove('grabbing');
    moveOut = false;
})

slider.addEventListener('mousemove', (event) => {
    if (isMove) {
        if (moveOut) {
            let isLeft = event.clientX < start;
            if (isLeft) {
                console.log('move left');
                handleArrowClick(false);
            } else {
                console.log('move right');
                handleArrowClick(true);
            } 
            start = event.clientX;
        }
    }
})