const btn = document.querySelector("#btn-score");
btn.addEventListener("click", (e) => {
  const form = document.querySelector("#attend-student");
  const url = new URLSearchParams(window.location.search);
  const date = document.querySelector("#date-attend");
  if (date.value) {
    Swal.fire({
      title: "Điểm danh",
      text: "Bạn đặt có xác nhận",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Xác Nhận",
      showCancelButton: true,
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        const idClass = url.get("id");
        form.action = `/class/attend-student/?idclass=${idClass}`;
        form.submit();
      }
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Vui lòng nhập ngày!",
    });
  }
});
