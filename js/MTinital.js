//上传窗口显示隐藏
$('.container .upload').onclick = () => {
    $('.popup').style.display = 'block';
}

$('.popup').onclick = () => {
    $('.popup').style.display = 'none';
}

$('.upload_box').onclick = (e) => e.stopPropagation();


//上传文件
$('.upload input').onchange = function (f) {
    let file = f.target.files[0];
    console.log(file);
    ajax(`http://8.134.104.234:8080/ReciteMemory/upload/file?file=${file}`, 'get', '', (str) => {
        let newstr = JSON.parse(str);
        console.log(newstr);
    })
}