const btn = document.querySelector(".btn-submit");
btn.addEventListener("click", () => {
  const input_title = document.querySelector("[name = title]");
  const input_content = document.querySelector("[name = content]");
  const form = document.querySelector("#formBlog");
  if (input_title.value && input_content.value) {
    Swal.fire({
      title: "Đăng bài đăng",
      text: "Bạn có xác nhận",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Xác Nhận",
      showCancelButton: true,
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        form.action = "/blog/postBlog";
        form.submit();
      }
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Vui lòng nhập đầy đủ thông tin",
    });
  }
});
