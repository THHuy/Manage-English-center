const btn = document.querySelector(".btn-primary");
btn.addEventListener("click", () => {
  const input_nameCourse = document.querySelector("[name = nameCourse]");
  const input_link = document.querySelector("[name = link]");
  const form = document.querySelector("#formAddCourse");
  if (input_nameCourse.value && input_link.value) {
    Swal.fire({
      title: "Đăng khóa học",
      text: "Bạn có xác nhận",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Xác Nhận",
      showCancelButton: true,
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        form.action = "/course/createCourse";
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
