
//好友列表通知显示隐藏
$('.fri_slidebox').onclick = () => {
    $('.fri_box').classList.add('slidein');
    $('.fri_box').classList.remove('slideout');
    $('.fri_box').addEventListener('animationend', () => {
        if ($('.fri_box').classList.contains('slidein'))
            $('.fri_slidebox').style.display = 'none';
    })
}

$('.header_right .fri').onclick = () => {
    $('.fri_box').classList.remove('slidein');
    $('.fri_box').classList.add('slideout');
    $('.fri_slidebox').style.display = 'block';
}

$('.fri_box').onclick = (e) => e.stopPropagation();



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