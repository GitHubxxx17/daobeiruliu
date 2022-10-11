//上传窗口显示隐藏
$('.container .upload').onclick = () => {
    $('.popup').style.display = 'block';
}

$('.popup').onclick = () => {
    $('.popup').style.display = 'none';
}

$('.upload_box').onclick = (e) => e.stopPropagation();

let curr = getData('current_user');
let id = curr.userInfo.userId
// http://8.134.104.234:8080/ReciteMemory/upload/parseContent
//上传文件
$('.upload input').onchange = function (f) {
    let file = f.target.files[0];
    let fd = new FormData($('.upload_form'))
    ajax(`http://8.134.104.234:8080/ReciteMemory/upload/parseContent?userId=${id}`, 'post', fd, (str) => {
        let newstr = JSON.parse(str).msg;
        let context = newstr.data.context;
        let template = getData('template');
        template = {title : file.name,context : context};
        template['upload'] = true;
        console.log(template);
        saveData('template',template);
        location.href = './MakingTemplates.html';
    }, false)
}
// pdfFile=${file}&userId=${curr.userInfo.userId}