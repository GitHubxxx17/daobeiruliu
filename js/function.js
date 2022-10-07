//上传窗口显示隐藏
$('.container .upload').onclick = () => {
    $('.popup').style.display = 'block';
}

$('.popup .close').onclick = () => {
    $('.popup').style.display = 'none';
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

$('.header_right .fri').onclick = () => {
    $('.fri_box').classList.remove('slidein');
    $('.fri_box').classList.add('slideout');
    $('.fri_slidebox').style.display = 'block';
}

$('.fri_box').onclick = (e) => e.stopPropagation();
