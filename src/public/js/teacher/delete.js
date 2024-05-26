const btn_delete = document.querySelectorAll(".delete-data");
btn_delete.forEach((e) => {
  e.addEventListener("click", () => {
    const form_submit = document.querySelector("#delete-users-form");
    Swal.fire({
      title: "Xóa tài khoản",
      text: "Bạn có xác nhận",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Xác Nhận",
      showCancelButton: true,
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        const magv = e.getAttribute("data-magv");
        form_submit.action = `/teacher/deleted_users/?magv=${magv}&_method=delete`;
        form_submit.submit();
      }
    });
  });
});
