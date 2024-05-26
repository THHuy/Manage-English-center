const btnDeleted = document.querySelectorAll(".btn-course");
btnDeleted.forEach((e) => {
  e.addEventListener("click", () => {
    const form = document.querySelector("#formDeletedCourse");
    Swal.fire({
      title: "Xóa Khóa Học",
      text: "Bạn đặt có xác nhận Xóa Khóa Học",
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
          const idcourse= e.getAttribute("data-id");
          form.action = `/course/deletedCourse/?idcourse=${idcourse}&_method=PATCH`;
          form.submit();
        });
      }
    });
  });
});
