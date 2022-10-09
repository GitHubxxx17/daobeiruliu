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
    $('.fri_box').addEventListener('animationend',() => {
        if($('.fri_box').classList.contains('slidein'))
            $('.fri_slidebox').style.display = 'none';
    })
}

$('.setting_fri .fri').onclick = () => {
    $('.fri_box').classList.remove('slidein');
    $('.fri_box').classList.add('slideout');
    $('.fri_slidebox').style.display = 'block';
}

$('.fri_box').onclick = (e) => e.stopPropagation();

window.onload = () => {
    let curr = getData('current_user');
    $('.show .name').innerHTML = curr.userInfo.nickName;
    $('.show .id').innerHTML = `ID号: ${curr.userInfo.userId}`;
}