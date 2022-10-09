$('.Log_out').onclick = () => {
    let curr = getData('current_user');
    if(!curr.auto){
        window.localStorage.clear();
    }
    location.href = './login.html';
}