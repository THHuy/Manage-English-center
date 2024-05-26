const btn = document.querySelector(".btn-submit");
btn.addEventListener("click", () => {
  const input_name = document.querySelector("[name = fullname]");
  const input_sex = document.querySelector("[name = gt]");
  const input_phone = document.querySelector("[name = phone]");
  const input_dc = document.querySelector("[name = dc]");
  const input_email = document.querySelector("[name = email]");
  const input_school = document.querySelector("[name = school]");
  const birthday = document.querySelector("[name = birthday]");
  const form = document.querySelector("#formAddStudent");
  if (input_name.value && input_sex.value && input_phone.value && birthday.value) {
    Swal.fire({
      title: "Thêm học viên",
      text: "Bạn đặt có xác nhận",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Xác Nhận",
      showCancelButton: true,
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        form.action = "/student/addstudent";
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
