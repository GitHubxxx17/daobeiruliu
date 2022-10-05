let bannerBody = document.getElementById("banner_body");
let bannnerSwipe = document.getElementById("bannner_swipe");
let bannerSwipeItem = document.getElementsByClassName("banner_swipe_item");
let itemImg = document.getElementsByClassName("itemImg");

console.log(bannerSwipeItem[0].classList);
bannnerSwipe.innerHTML += bannnerSwipe.innerHTML; //叠多一层好切换

let startPointX = 0, //触摸的开始位置
    pointLeft = 0, //移动的位置
    movePointX = 0, //触摸移动的的距离
    cn = 0; //记录到第几个


let imageWidth; //单个轮播图片的宽度
let imagemargin; //单个轮播图片的左右宽度
let imageLen; //轮播图片的个数

var spots = document.querySelectorAll(".spots span"); //所有小圆点

let timer = setInterval(() => {
    imageLen = itemImg.length;
    if (cn === 0) {
        cn = imageLen / 2;
        bannnerSwipe.style.transition = 'none';
        let translatex = -itemImg[0].clientWidth * cn;
        bannnerSwipe.style.transform = `translateX(${translatex}px)`;
    } else if (cn === imageLen - 1) {
        cn = imageLen / 2 - 1;
        bannnerSwipe.style.transition = 'none';
        let translatex = -itemImg[0].clientWidth * cn;
        bannnerSwipe.style.transform = `translateX(${translatex}px)`;
    }
    cn++;
    //让小圆点对应的显示
    for (var i = 0; i < spots.length; i++) {
        if (i == (cn % 5)) {
            spots[i].className = "active";
        } else {
            spots[i].className = "";
        }
    }
    let translatex = -itemImg[0].clientWidth * cn;
    bannnerSwipe.style.transition = '.5s';
    bannnerSwipe.style.transform = `translateX(${translatex}px)`;

}, 3000)


//手指触摸开始
bannnerSwipe.addEventListener('touchstart', function(e) {
    clearInterval(timer);
    imageWidth = itemImg[0].clientWidth;
    imageLen = itemImg.length;
    if (cn === 0) {
        cn = imageLen / 2;
        bannnerSwipe.style.transition = 'none';
        let translatex = -itemImg[0].clientWidth * cn;
        bannnerSwipe.style.transform = `translateX(${translatex}px)`;
    } else if (cn === imageLen - 1) {
        cn = imageLen / 2 - 1;
        bannnerSwipe.style.transition = 'none';
        let translatex = -itemImg[0].clientWidth * cn;
        bannnerSwipe.style.transform = `translateX(${translatex}px)`;
    }
    bannnerSwipe.style.transform = `translateX(${-(cn*imageWidth)}px)`;
    const touch = e.changedTouches[0];
    startPointX = touch.pageX;
    pointLeft = parseFloat(bannnerSwipe.style.transform.split('(')[1]);
})

//手指触摸开始移动
bannnerSwipe.addEventListener('touchmove', function(e) {
    // console.log('touchmove');
    const touch = e.changedTouches[0];
    movePointX = touch.pageX - startPointX;
    bannnerSwipe.style.transform = `translate(${(movePointX+pointLeft)}px)`
})

//手指触摸结束
bannnerSwipe.addEventListener('touchend', function(e) {
    const touch = e.changedTouches[0];
    movePointX = touch.pageX - startPointX;
    let backWidth = imageWidth / 5; //回弹的距离
    if (Math.abs(movePointX) > backWidth) {
        if (movePointX > 0) {
            cn -= 1;
        }
        if (movePointX < 0) {
            cn += 1;
        }
    }
    //让小圆点对应的显示
    for (var i = 0; i < spots.length; i++) {
        if (i == (cn % 5)) {
            spots[i].className = "active";
        } else {
            spots[i].className = "";
        }
    }
    bannnerSwipe.style.transition = '.5s';
    bannnerSwipe.style.transform = `translateX(${-(cn*imageWidth)}px)`;
    timer = setInterval(() => {
        imageLen = itemImg.length;
        if (cn === 0) {
            cn = imageLen / 2;
            bannnerSwipe.style.transition = 'none';
            let translatex = -itemImg[0].clientWidth * cn;
            bannnerSwipe.style.transform = `translateX(${translatex}px)`;
        } else if (cn === imageLen - 1) {
            cn = imageLen / 2 - 1;
            bannnerSwipe.style.transition = 'none';
            let translatex = -itemImg[0].clientWidth * cn;
            bannnerSwipe.style.transform = `translateX(${translatex}px)`;
        }
        cn++;
        //让小圆点对应的显示
        for (var i = 0; i < spots.length; i++) {
            if (i == (cn % 5)) {
                spots[i].className = "active";
            } else {
                spots[i].className = "";
            }
        }
        let translatex = -itemImg[0].clientWidth * cn;
        bannnerSwipe.style.transition = '.5s';
        bannnerSwipe.style.transform = `translateX(${translatex}px)`;

    }, 3000)
})