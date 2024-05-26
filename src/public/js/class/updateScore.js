const btn = document.querySelectorAll(".btnsubmit");
const table = document.querySelectorAll(".scoreID");
const input = document.querySelectorAll('[name="score"]');
const elementMahv = document.querySelectorAll('[name="mahv"]');

btn.forEach((element, i) => {
  element.addEventListener("click", (e) => {
    const valueInput = input[i].value;
    const value = table[i].value;
    const mahv = elementMahv[i].value;
    const form = document.querySelector("#formUpdateScore")
    Swal.fire({
      title: "Sửa điểm",
      text: "Bạn đặt có xác nhận",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Xác Nhận",
      showCancelButton: true,
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        form.action = `/class/updatedScore/?mahv=${mahv}&score=${valueInput}&score_id=${value}&_method=PUT`;
        form.submit();
      }
    });
  });
});
