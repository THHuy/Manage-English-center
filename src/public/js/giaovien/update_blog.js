const btn = document.querySelector(".btn-submit");
btn.addEventListener("click", () => {
  const form = document.querySelector("#formUpdatedBlog");

  Swal.fire({
    title: "Sửa Bài Đăng",
    text: "Bạn đặt có xác nhận Sửa Bài Đăng",
    icon: "warning",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Xác Nhận",
    showCancelButton: true,
    cancelButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Thành công",
        text: "Bạn đã Sửa thành công",
        icon: "success",
        timer: 1000,
      }).then((result) => {
        const idblog = btn.getAttribute("data-idblog");
        form.action = `/blog/updatedBlog/?idblog=${idblog}&_method=PUT`;
        form.submit();
      });
    }
  });
});
