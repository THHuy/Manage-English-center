document.getElementById("search-input").addEventListener("input", function () {
  //Lấy giá trị truy vấn
  const query = this.value;
  //Kiểu truy vấn
  const type = document.getElementById("type").value;
  //Dropdown dữ liệu khi có kết quả
  const dropdown = document.getElementById("search-results");
  //Kiểm tra nếu kết quả không có thì ko hiện dropdown
  if (query.length === 0) {
    dropdown.style.display = "block";
    return;
  }
  //tạo đường dẫn mặc định
  const window_href = window.location.origin;
  //Sử dụng fetch để lấy kết quả truy vấn
  fetch(`${window_href}/search?type=${type}&query=${query}`)
    .then((response) => response.json())
    .then((data) => {
      //Tạo thẻ
      dropdown.innerHTML = "";
      //Kiểm tra nếu có dữ liệu thì duyệt qua dữ liệu
      if (data.length > 0) {
        data.forEach((item) => {
          //Tạo thẻ li
          const a = document.createElement("a");
          if (type == "class") {
            a.href = `/class/information/?id=${item.id}`
            a.innerHTML = item.nameclass;
          } else {
            if (type == "student") a.href = `/student/information/?mahv=${item.mahv}`
            else a.href = `/teacher/information/?magv=${item.magv}`
            a.innerHTML = item.fullname;
          }
          dropdown.appendChild(a);
        });
        dropdown.style.display = "block";
      } else {
        dropdown.style.display = "block";
        dropdown.innerHTML = "Không tim thấy"
      }
    })
    .catch((error) => {
      console.error("Error fetching search results:", error);
      dropdown.style.display = "none";
    });
});

// Ẩn dropdown khi nhấp ra ngoài
document.addEventListener("click", function (event) {
  const dropdown = document.getElementById("search-results");
  if (!event.target.closest(".nav-search")) {
    dropdown.style.display = "none";
  }
});
