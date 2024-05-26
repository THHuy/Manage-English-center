const btn = document.querySelectorAll(".btn-change");
btn.forEach((e) => {
  e.addEventListener("click", () => {
    const form = document.querySelector("#formChangeClass");
    const url = new URLSearchParams(window.location.search);
    Swal.fire({
      title: "Thêm học viên vào lớp",
      text: "Bạn đặt có xác nhận",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Xác Nhận",
      showCancelButton: true,
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Thành công",
          icon: "success",
          timer: 1000,
        }).then((result) => {
          const idClass = e.getAttribute("data-id");
          const idStudent = url.get("mahv");
          form.action = `/class/changeClass/?idStudent=${idStudent}&idclass=${idClass}&_method=PUT`;
          form.submit();
        });
      }
    });
  });
});
