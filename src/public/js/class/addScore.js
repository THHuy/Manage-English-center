const btn = document.querySelector("#btn-score");
btn.addEventListener("click", (e) => {
  const form = document.querySelector("#addScoreStudent");
  const url = new URLSearchParams(window.location.search);
  Swal.fire({
    title: "Thêm điểm",
    text: "Bạn đặt có xác nhận",
    icon: "warning",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Xác Nhận",
    showCancelButton: true,
    cancelButtonColor: "#d33",
  }).then((result) => {
    const idClass = url.get("id");
    form.action = `/class/addScore/?idclass=${idClass}`;
    form.submit();
  });
});

// Lấy thẻ <a> bằng id
var link = document.getElementById("linkUpdate");

// Gán sự kiện click cho thẻ <a>
link.addEventListener("click", function () {
  const url = new URLSearchParams(window.location.search);
  const idClass = url.get("id");
  // Thêm href vào thẻ <a> (ví dụ: 'https://example.com')
  link.setAttribute("href", `/class/scoreUpdate/?id=${idClass}`);
});
