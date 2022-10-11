window.onload = () => {
    // ajax('http://8.134.104.234:8080/ReciteMemory/inf.get/getPage?pageName=Personal.html', 'get', '', (str) => {
    //     console.log(str);
    //     let newstr = JSON.parse(str).msg.data.page;
    //     console.log(newstr);

    //     document.querySelector('newbody').innerHTML = newstr
    // }, true)
    let curr = getData('current_user');
    console.log(curr);
    if (curr.length == 0) {
        location.href = './login.html';
    }

    //渲染用户数据
    $('.show .name').innerHTML = curr.userInfo.nickName;
    $('.show .id').innerHTML = `ID号: ${curr.userInfo.userId}`;
}

let bannerBody = document.getElementById("banner_body");
let bannnerSwipe = document.getElementById("bannner_swipe");
let bannerSwipeItem = document.getElementsByClassName("banner_swipe_item");
let itemImg = document.getElementsByClassName("itemImg");


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

bannner_swipe.addEventListener('transitionend', (e) => {
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
})

//手指触摸开始
bannnerSwipe.addEventListener('touchstart', function (e) {
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
    bannnerSwipe.style.transform = `translateX(${-(cn * imageWidth)}px)`;
    const touch = e.changedTouches[0];
    startPointX = touch.pageX;
    pointLeft = parseFloat(bannnerSwipe.style.transform.split('(')[1]);
})

//手指触摸开始移动
bannnerSwipe.addEventListener('touchmove', function (e) {
    // console.log('touchmove');
    const touch = e.changedTouches[0];
    movePointX = touch.pageX - startPointX;
    bannnerSwipe.style.transform = `translate(${(movePointX + pointLeft)}px)`
})

//手指触摸结束
bannnerSwipe.addEventListener('touchend', function (e) {
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
    bannnerSwipe.style.transform = `translateX(${-(cn * imageWidth)}px)`;
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


//好友列表通知显示隐藏
$('.fri_slidebox').onclick = () => {
    $('.fri_box').classList.add('slidein');
    $('.fri_box').classList.remove('slideout');
    $('.fri_box').addEventListener('animationend', () => {
        if ($('.fri_box').classList.contains('slidein'))
            $('.fri_slidebox').style.display = 'none';
    })
}

for (let x of $('.fri')) {
    x.onclick = () => {
        $('.fri_box').classList.remove('slidein');
        $('.fri_box').classList.add('slideout');
        $('.fri_slidebox').style.display = 'block';
    }
}


$('.fri_box').onclick = (e) => e.stopPropagation();


let tabMemory = document.querySelector(".tab_memory");
let tabPlans = document.querySelector(".tab_plans");
let memory = document.querySelector(".memory");
let plans = document.querySelector(".plans");


click_block(tabMemory, tabPlans, memory, plans);
click_block(tabPlans, tabMemory, plans, memory);
//点击显示盒子
function click_block(obj1, obj2, obj3, obj4) {
    obj1.addEventListener('click', () => {
        obj1.classList.add("active");
        obj2.classList.remove("active");
        obj3.style.display = "block";
        obj4.style.display = "none";
    })
}

// 获取元素
var headPortrait = document.querySelector('.head_portrait');
var file = document.getElementById('file');
var headBox = document.querySelector(".head_box");

// 图片上传成功后创建 URL
let imgUrl = '';
//当文件上传按钮改变时发生的事件
file.onchange = function(value) {
    console.log(value.target.files)
    const fileList = value.target.files;
    if (fileList.length) {
        //通过window.URL.createObjectURL(files[0])获得一个http格式的url路径
        imgUrl = window.URL.createObjectURL(fileList[0]);
        //headPortrait盒子的背景图的路径改为imgUrl
        headPortrait.style.backgroundImage = "url(" + imgUrl + ")";
    }
}



/* 2、拖拽上传 */
headBox.ondragover = function() {
    return false;
}

headBox.ondrop = function(e) {
    //通过window.URL.createObjectURL(files[0])获得一个http格式的url路径
    imgUrl = window.URL.createObjectURL(e.dataTransfer.files[0]);
    //headPortrait盒子的背景图的路径改为imgUrl
    headPortrait.style.backgroundImage = "url(" + imgUrl + ")";
    return false;
}




//底部导航栏动画
let vw = 3.95
let footer_nav = document.querySelector('.footer_nav');
footer_nav.querySelectorAll('li a').forEach((a, i) => {
    a.onclick = () => {
        if (a.classList.contains('nav_item_active')) return

        footer_nav.querySelectorAll('li a').forEach(e => {
            e.classList.remove('nav_item_active')
        })

        a.classList.add('nav_item_active')

        let nav_indicator = footer_nav.querySelector('.nav_indicator')
        let left = ((i * 131) + 60 - 40) / vw;
        nav_indicator.style.left = `calc(${left}vw)`
        $('.scroll_box').style.left = `${- i * 100}vw`
    }
})
