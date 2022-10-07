// import { $, ajax } from './base.js'

let code = "";
//将函数返回值赋给code
createCode();
//点击canvas图片更换验证码
$('canvas').onclick = function () {
    createCode();
};

function rand() {
    //去掉i,I,l,o,O等易混淆字母
    var str = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ0123456789";
    //将字符串分隔为数组
    var arr = str.split("");
    //随机字符在[0,56]之间
    var ranNum = Math.floor(Math.random() * 57);
    var captcha = arr[ranNum];
    return captcha;
}

function drawline(canvas, context) {
    //若省略beginPath，则每点击一次验证码会累积干扰线的条数
    context.beginPath();
    //起点与终点在canvas宽高内随机
    context.moveTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height));
    context.lineTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height));
    context.lineWidth = 1;
    context.strokeStyle = '#000';
    context.stroke();
}



/*生成验证码*/
function createCode() {
    //每次生成code先将其清空防止叠加
    code = "";
    var canvas = $('canvas');
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "#FFF";
    context.strokeRect(0, 0, canvas.width, canvas.height);

    //生成干扰线，数量随意
    for (var i = 0; i < 30; i++) {
        drawline(canvas, context);
    }

    //循环生成5位验证码
    for (var k = 0; k < 5; k++) {
        context.font = '76px Arial';
        //将初始状态保存
        context.save();
        //获得-1到1的随机数
        var rA = 1 - Math.random() * 2;
        //获取随机倾斜角
        var angle = rA / 8;
        var ranNum = rand();
        //旋转生成的随机字符
        context.rotate(angle);
        //把rand()生成的随机数文本依次填充到canvas中，注意x坐标
        context.fillText(ranNum, 20 + 45 * k, 100);
        //恢复初始状态，以便下一次循环
        context.restore();
        code += ranNum;
    }
    //返回生成的验证码字符串
    return code;
}


let inputs = $('.form_control input');
let labelStrArr = [];
for (let i = 0; i < inputs.length; i++) {
    labelStrArr.push($('label')[i].innerHTML);
    inputs[i].onblur = () => {
        if (i < 2) {
            //获取对应的正则表达式
            let reg = new RegExp(`${inputs[i].pattern}`);
            let url = '';

            if (i == 0)
                url = `http://8.134.104.234:8080/ReciteMemory/inf.get/checkUsedNumber?phone=${inputs[i].value}`;
            else
                url = `http://8.134.104.234:8080/ReciteMemory/inf.get/checkUserNickName?username=${inputs[i].value}`;
            //如果格式正确则发送get请求
            if (reg.test(inputs[i].value)) {
                ajax(url, 'get', '', (str) => {

                    let newstr = JSON.parse(str).msg;
                    console.log(newstr);
                    if (!newstr.data) {
                        $('label')[i].innerHTML = newstr.content;
                        $('label')[i].style.color = 'red';
                    }
                })
            }
        }
        //当input失焦时，如果内容为空删除动画，否则添加
        if (inputs[i].value != '') {
            $('label')[i].classList.add('label_change');
        } else {
            $('label')[i].classList.remove('label_change');
        }
    }
    //当点击input给label添加动画
    inputs[i].onfocus = () => {
        $('label')[i].innerHTML = labelStrArr[i];
        $('label')[i].style.color = '#fff';
        $('label')[i].classList.add('label_change');
    }
}

let pw = $('input[type="password"]');

//点击注册后进行判断
$('button').onclick = (e) => {
    let n = 0;
    let reg1 = new RegExp(`${inputs[0].pattern}`);
    let reg2 = new RegExp(`${inputs[1].pattern}`);

    //判断手机号格式是否正确
    if (reg1.test(inputs[0].value)) {
        n++;
    }

    //判断昵称格式是否正确
    if (reg2.test(inputs[1].value)) {
        n++;
    }

    //判断两次密码是否一致
    if (pw[0].value != '' && pw[1].value != '' && pw[0].value != pw[1].value) {
        $('.passwordErr').classList.add('show');
        e.stopPropagation();
    } else {
        n++;
    }

    //判断验证码是否正确
    if ($('.captcha input').value.toUpperCase() != code.toUpperCase()) {
        $('.captchaErr').classList.add('show');
        e.stopPropagation();
    } else {
        n++;
    }

    if (n == 4) {
        let a = [];
        for (let x of $('.register_data')) {
            a.push(x.value);
        }
        ajax('http://8.134.104.234:8080/ReciteMemory/user.do/Reg', 'post', `phone=${a[0]}&password=${a[2]}&username=${a[1]}`, (str) => {
            let newstr = JSON.parse(str).msg;
            if(newstr.data){
                location.href = './index.html';
            }else{
                alert('注册失败，请重新注册');
            }
        })
    }
}

document.onclick = () => {
    $('.captchaErr').classList.remove('show');
    $('.passwordErr').classList.remove('show');
}
