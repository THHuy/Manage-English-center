const btn = document.querySelector("#btn-submit");
btn.addEventListener("click", () => {
  const form = document.querySelector("#formTuVan");
  console.log(form);
  Swal.fire({
    title: "Xác Nhận Gửi Đơn Tư Vấn",
    text: "Nhân viên sẽ sớm liên hệ lại với bạn",
    icon: "warning",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Xác Nhận",
    showCancelButton: true,
    cancelButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed) {
      //Lấy giá trị để kiểm tra
      var yourname = document.getElementById("yourname").value;
      var email = document.getElementById("email").value;
      var phonenumber = document.getElementById("phonenumber").value;
      if (yourname && email && phonenumber) {
        Swal.fire({
          title: "Thành công",
          text: "Bạn đã gửi thành công",
          icon: "success",
          timer: 1000,
        }).then((result) => {
          form.action = `/postTuvan`;
          form.submit();
        });
      } else {
        // Hiển thị thông báo lỗi bằng SweetAlert2 nếu có trường trống
        Swal.fire({
          icon: "error",
          title: "Lỗi!",
          text: "Vui lòng điền đầy đủ thông tin.",
        });
      }
    }
  });
});
