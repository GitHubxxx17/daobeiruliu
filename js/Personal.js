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


let user = getData('user');
let curr = getData('current_user');
console.log(user);
console.log(curr);
window.onload = () => {
    ajax(`http://8.134.104.234:8080/ReciteMemory/user.do/UserMsg`,'get','',(str) => {
        // let newstr = JSON.parse(str).msg;
        console.log(str);
    })
}