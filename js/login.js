let inputs = $('.form_control input');
for (let i = 0; i < inputs.length; i++) {
    //当点击input给label添加动画
    inputs[i].onfocus = () => {
        $('label')[i].classList.add('label_change');
        $('.err').style.opacity = '0';
    }
    //当input失焦时，如果内容为空删除动画，否则添加
    inputs[i].onblur = () => {
        if (inputs[i].value != '') {
            $('label')[i].classList.add('label_change');
        } else {
            $('label')[i].classList.remove('label_change');
        }
    }
}

let phoneReg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
let passwordReg = /^[a-zA-Z0-9_]{6,16}$/;

//点击登录后进行判断
$('.login').onclick = (e) => {
    //判断手机号格式是否正确
    if (phoneReg.test($('.login_data')[0].value) && passwordReg.test($('.login_data')[1].value)) {
        let a = [];
        for (let x of $('.login_data')) {
            a.push(x.value);
        }

        ajax('http://8.134.104.234:8080/ReciteMemory/user.do/Login', 'post', `phone=${a[0]}&password=${a[1]}`, (str) => {
            let newstr = JSON.parse(str).msg;
            console.log(newstr);
            //登录成功
            if (newstr.data.isSuccess) {
                //将当前登录的用户手机号保存到本地
                let curr = {};

                //如果用户勾选自动登录，则将数据存储在本地
                if ($('.auto').checked) {
                    curr['auto'] = true;
                }else{
                    curr['auto'] = false;
                }
                // 获取登录用户的信息
                ajax(`http://8.134.104.234:8080/ReciteMemory/user.do/UserMsg?userId=${newstr.data.userId}`, 'get', '', (str) => {
                    let newstr = JSON.parse(str).msg;
                    let userInfo = newstr.data.user;
                    curr['userInfo'] = userInfo;
                    console.log(curr);
                    saveData('current_user', curr);
                    location.href = './index.html';
                })             
            }
            //如果返回的结果错误则提醒
            else {
                $('.err').style.opacity = '1';
            }
        })
    }
}
