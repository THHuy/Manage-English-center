const btnDeleted = document.querySelectorAll(".btn-deleted");
btnDeleted.forEach((e) => {
  e.addEventListener("click", () => {
    const form = document.querySelector("#formDeletedBlog");
    Swal.fire({
      title: "Xóa Bài Đăng",
      text: "Bạn đặt có xác nhận Xóa Bài Đăng",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Xác Nhận",
      showCancelButton: true,
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Thành công",
          text: "Bạn đã Xóa thành công",
          icon: "success",
          timer: 1000,
        }).then((result) => {
          const idblog = e.getAttribute("data-idblog");
          form.action = `/blog/deletedBlog/?idblog=${idblog}&_method=PATCH`;
          form.submit();
        });
      }
    });
  });
});
