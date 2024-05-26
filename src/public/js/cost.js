const cost = document.querySelectorAll('.cost')
cost.forEach(e =>{
    const gia = e.innerText
    e.innerHTML = `${numberWithCommas(gia)} VND`
})
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}