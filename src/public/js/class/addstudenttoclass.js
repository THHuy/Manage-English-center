const btn = document.querySelectorAll(".addStudent");
btn.forEach((e) => {
  e.addEventListener("click", () => {
    const form = document.querySelector("#formAddStudent");
    const url = new URLSearchParams(window.location.search)
    console.log(idClass)
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
          const idStudent = e.getAttribute("data-id");
          const idClass = url.get("id")
          form.action = `/class/addStudentToClass/?idStudent=${idStudent}&idclass=${idClass}`;
          form.submit();
        });
      }
    });
  });
});
