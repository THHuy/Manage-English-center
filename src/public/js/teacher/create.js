const btn = document.querySelector("#btn_submit");
btn.addEventListener("click", (e) => {
  const form_submit = document.querySelector("#create_form");
  const usersname = document.querySelector("#exampleInputEmail1");
  const value_usersname = usersname.value;
  const mahv = document.querySelector("#magv");
  const value_mahv = mahv.value;
  const password = document.querySelector("#exampleInputPassword1");
  const value_password = password.value;
  if (value_usersname && value_password && value_mahv) {
    Swal.fire({
      title: "Tạo tài khoản",
      text: "Bạn đặt có xác nhận",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Xác Nhận",
      showCancelButton: true,
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        form_submit.action = `/teacher/created_post`;
        form_submit.submit();
      }
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Nhập đầy đủ thông tin",
    });
  }
});
