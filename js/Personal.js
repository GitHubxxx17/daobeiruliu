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

//好友列表通知显示隐藏
$('.fri_slidebox').onclick = () => {
    $('.fri_box').classList.add('slidein');
    $('.fri_box').classList.remove('slideout');
    $('.fri_box').addEventListener('animationend', () => {
        if ($('.fri_box').classList.contains('slidein'))
            $('.fri_slidebox').style.display = 'none';
    })
}

$('.setting_fri .fri').onclick = () => {
    $('.fri_box').classList.remove('slidein');
    $('.fri_box').classList.add('slideout');
    $('.fri_slidebox').style.display = 'block';
}

$('.fri_box').onclick = (e) => e.stopPropagation();

//点击头像上传功能（暂无裁剪功能）

window.onload = function() {
    //渲染用户数据
    let curr = getData('current_user');
    $('.show .name').innerHTML = curr.userInfo.nickName;
    $('.show .id').innerHTML = `ID号: ${curr.userInfo.userId}`;

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
        let left = ((i * 125) + 60 - 45) / vw;
        nav_indicator.style.left = `calc(${left}vw)`
    }
})