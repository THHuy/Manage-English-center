const btn_assign = document.querySelectorAll(".deleted_assign");
btn_assign.forEach((e) => {
  e.addEventListener("click", () => {
    const id = e.getAttribute("data-id");
    const form_submit = document.querySelector("#deleted_assign");
    Swal.fire({
      title: "Xóa giáo viên ra khỏi lớp",
      text: "Bạn có xác nhận",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Xác Nhận",
      showCancelButton: true,
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        form_submit.action = `/teacher/deleted_assign?id=${id}&_method=delete`;
        form_submit.submit();
      }
    });
  });
});
