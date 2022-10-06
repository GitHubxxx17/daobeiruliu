let inputs = $('.form_control input');
for (let i = 0; i < inputs.length; i++) {
    inputs[i].onfocus = () => {
        $('label')[i].classList.add('label_change');
    }
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
$('button').onclick = (e) => {
    let n = 0;

    //判断手机号格式是否正确
    if (phoneReg.test($('.login_data')[0].value) && passwordReg.test($('.login_data')[1].value)) {
        let a = [];
        for (let x of $('.login_data')) {
            a.push(x.value);
        }
        ajax('http://192.168.43.169:8000/server', 'post', `identification=${a[0]}&password=${a[1]}`, (str) => {
            console.log(str);
        })
    }
    // http://192.168.43.169:8000/server
}