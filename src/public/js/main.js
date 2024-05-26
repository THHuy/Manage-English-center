const arrDay = document.querySelectorAll(".date");
arrDay.forEach((e) => {
  var dateStr = e.innerHTML;
  var date = new Date(dateStr);

  // Chuyển đổi sang múi giờ Việt Nam (+7)
  date.setHours(date.getHours() + 7);

  // Lấy ngày, tháng, năm
  var day = date.getDate();
  var month = date.getMonth() + 1; // Tháng bắt đầu từ 0
  var year = date.getFullYear();
  e.innerHTML = `${day}/${month}/${year}`;
});
const arr = document.querySelectorAll(".stringDate");
arr.forEach((e) => {
  var dateStr = e.innerHTML;
  var date = new Date(dateStr.trim());

  var day = date.getDate(); // Lấy ngày
  var month = date.getMonth() + 1; // Lấy tháng (lưu ý tháng bắt đầu từ 0)
  var year = date.getFullYear(); // Lấy năm
  e.innerHTML = `${day}/${month}/${year}`;
});


const subMenus = document.querySelectorAll(".sub-menu"),
  buttons = document.querySelectorAll(".sidebar ul button");

const onClick = (item) => {
  subMenus.forEach((menu) => (menu.style.height = "0px"));
  buttons.forEach((button) => button.classList.remove("active"));

  if (!item.nextElementSibling) {
    item.classList.add("active");
    return;
  }

  const subMenu = item.nextElementSibling,
    ul = subMenu.querySelector("ul");

  if (!subMenu.clientHeight) {
    subMenu.style.height = `${ul.clientHeight}px`;
    item.classList.add("active");
  } else {
    subMenu.style.height = "0px";
    item.classList.remove("active");
  }
};