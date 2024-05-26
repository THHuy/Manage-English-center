const btn = document.getElementById("btn-updated");
btn.addEventListener("click", (e) => {
  const targer = e.target;
  const idcourse = targer.getAttribute("data-id");
  const formUpdate = document.getElementById("formUpdatedCourse");
  Swal.fire({
    title: "Sửa khóa học",
    text: "Bạn đặt có xác nhận Sửa khóa học",
    icon: "warning",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Xác nhận",
    showCancelButton: true,
    cancelButtonColor: "#d33",
  }).then((result) => {
    formUpdate.action =
      `/course/updatedCourse/?idcourse=${idcourse}` + `&_method=PUT`;
    formUpdate.submit();
  });
});
