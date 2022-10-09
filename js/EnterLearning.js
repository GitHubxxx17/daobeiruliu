
//为数组对象添加自定义方法remove,可通过元素的值查找元素并删除
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};


// TextOverflow($('.text_page'), $('.text_page').innerHTML);
// function TextOverflow(box, str) {
//     // 如果盒子的内容溢出
//     if (box.offsetHeight < box.scrollHeight) {
//         // 记录溢出的第一个字符的序号
//         let i;
//         // 对盒子中的字符串重新循环一个一个的添加进盒子
//         for (i = 0; i < str.length; i++) {
//             box.innerHTML = str.substring(0, i);
//             // 如果内容溢出则跳出循环
//             if (box.offsetHeight < box.scrollHeight) {
//                 break;
//             }
//         }
//         // 如果刚好溢出则结束函数
//         if (i == str.length - 1)
//             return;
//         // 将内容填入盒子
//         box.innerHTML = str.substring(0, i - 1);
//         // 创建新盒子并赋予类，将盒子添加进总页面中
//         let newbox = document.createElement('div');
//         newbox.className = 'text_page';
//         $('.total_text').appendChild(newbox);
//         newbox.innerHTML = str.substring(i - 1);
//         // 递归
//         TextOverflow(newbox, str.substring(i - 1));
//     }
//     // 内容不溢出就直接就字符串添加进去
//     else {
//         box.innerHTML = str;
//     }
// }


// let pages = $('.text_page').length;
// let pageNow = 0;
// //如果有分页，则修改页数和层数
// if (pages) {
//     $('.number_of_pages').innerHTML = `1/${pages}`
//     for (let i = 0; i < pages; i++) {
//         $('.text_page')[i].style.zIndex = `${pages - i}`;
//     }
// }

// //点击切换下一页
// $('.pageDown').onclick = () => {
//     if (pageNow < pages - 1) {
//         $('.text_page')[pageNow].style.zIndex = 0;
//         $('.text_page')[pageNow].style.transform = 'rotateY(360deg)';
//         // $('.text_page')[pageNow].style.transform = 'rotateY(360deg)';
//         //如果当前页面文本溢出
//         if ($('.text_page')[pageNow].offsetHeight < $('.text_page')[pageNow].scrollHeight) {
//             // 将所有页面的文本添加到第一页
//             for (let i = 1; i < $('.text_page').length; i++) {
//                 $('.text_page')[0].innerHTML += $('.text_page')[i].innerHTML;
//             }
//             //将第一页后面的页面移除
//             for (let i = $('.text_page').length - 1; i > 0; i--) {
//                 $('.total_text').removeChild($('.text_page')[i]);
//             }
//             //重新分页
//             TextOverflow($('.text_page'), $('.text_page').innerHTML);
//             //重新分层
//             for (let i = 0; i < pages; i++) {
//                 if (i <= pageNow) {
//                     $('.text_page')[i].style.zIndex = 0;
//                 } else {
//                     $('.text_page')[i].style.zIndex = `${pages - i}`;
//                 }
//             }
//         }
        
//         pageNow++;
//         for (let x of $('.input')) {
//             x.onclick = (e) => answer(x, e);
//         }
//         for (let x of $('.recite')) {
//             x.onclick = () => {
//                 x.classList.toggle('recite');
//             }
//         }
//         $('.number_of_pages').innerHTML = `${pageNow + 1}/${pages}`
//     }
// }
// //点击切换上一页
// $('.pageUp').onclick = () => {
//     if (pageNow > 0) {
//         $('.text_page')[pageNow - 1].style.zIndex = pages - pageNow + 1;
//         $('.text_page')[pageNow - 1].style.transform = 'rotateY(0)';
//         pageNow--;
//         $('.number_of_pages').innerHTML = `${pageNow + 1}/${pages}`
//     }
// }



//数组用来存放被选中的节点
let arr1 = [];
//数组用来存放答案
let arr2 = [];
for (let x of $('.highlight')) {
    arr1.push(x);
    arr2.push(x.innerText);
}

let btns = $('.header_btn');
flag = true;
flag1 = true;
//点击进入答题模式
btns[1].onclick = () => {
    if (flag) {
        btns[1].classList.add('btn_current');
        btns[2].classList.remove('btn_current');
        btns[3].classList.remove('hidden');
        reset();
        //利用循环将选中的节点内容替换
        for (let x of $('.highlight')) {
            x.setAttribute('contenteditable',true)
            x.innerHTML = '请输入答案';
            // 点击可输入答案
            x.onclick = (e) => {
                for (let k of arr1) {
                    if (k.innerHTML == '')
                        k.innerHTML = '请输入答案';
                }
                if (x.innerHTML == '请输入答案')
                    x.innerHTML = ''
                e.stopPropagation();
            };
            x.classList.add('input');
        }
        flag = false;
        flag1 = true;
    } else {
        // 再次点击退出答题模式
        btns[1].classList.remove('btn_current');
        btns[3].classList.add('hidden');
        reset();
        flag = true;
    }
}

//点击页面其他地方时，如果填入内容为空则将内容修改
document.onclick = () => {
    for (let x of $('.input')) {
        if (x.innerHTML == '')
            x.innerHTML = '请输入答案';
    }
}

//点击进入背诵模式
btns[2].onclick = () => {
    if (flag1) {
        btns[1].classList.remove('btn_current');
        btns[2].classList.add('btn_current');
        btns[3].classList.add('hidden');
        reset();
        //利用循环将选中的节点添加类
        for (let x of $('.highlight')) {
            x.classList.add('recite');
            x.onclick = () => {
                x.classList.toggle('recite');
            }
        }
        flag1 = false;
        flag = true;
    } else {
        btns[2].classList.remove('btn_current');
        reset();
        flag1 = true;
    }
}

//点击提交答案
btns[3].onclick = () => {
    flag = true;
    btns[1].classList.remove('btn_current');
    let n = 0, sum = 0;
    for (let x of $('.highlight')) {
        if (x.innerHTML == arr2[n]) {
            sum++;
        }
        n++;
    }
    alert('正确率：' + (sum / n) * 100 + '%');
    reset();
    btns[3].classList.add('hidden');
}

//将节点重置回原本状态
function reset() {
    let n = 0;
    for (let x of $('.highlight')) {
        x.className = 'highlight';
        x.innerHTML = arr2[n];
        n++;
        x.onclick = null;
    }
}


