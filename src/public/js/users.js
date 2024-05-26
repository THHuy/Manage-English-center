const users = document.querySelector(".user");
users.addEventListener("click", () => {
  Swal.fire({
    title: "Đăng xuất",
    text: "Bạn đặt có xác nhận đăng xuất",
    icon: "warning",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Xác Nhận",
    showCancelButton: true,
    cancelButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Thành công",
        text: "Bạn đã đăng xuất thành công",
        icon: "success",
        timer: 1000,
      }).then((result) => {
        window.location.href = "/login/logout";
      });
    }
  });
});
