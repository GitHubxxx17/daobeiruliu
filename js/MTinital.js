//上传窗口显示隐藏
$('.container .upload').onclick = () => {
    $('.popup').style.display = 'block';
}

$('.popup').onclick = () => {
    $('.popup').style.display = 'none';
}

$('.upload_box').onclick = (e) => e.stopPropagation();

let curr = getData('current_user');
console.log(curr.userInfo.userId);
//上传文件
$('.upload input').onchange = function (f) {
    let file = f.target.files[0];
    console.log(f.target.files);
    // ajax(`http://8.134.104.234:8080/ReciteMemory/upload/parseContent`, 'post', `pdfFile=${file}&userId=${curr.userInfo.userId}`, (str) => {
    //     let newstr = JSON.parse(str);
    //     console.log(newstr);
    // })
}