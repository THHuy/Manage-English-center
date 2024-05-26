const btn = document.querySelectorAll(".btn-submit");
const tdMahv = document.querySelectorAll(".datamahv");
btn.forEach((e, index) => {
  e.addEventListener("click", () => {
    const form = document.querySelector("#formFee");
    const data = tdMahv[index].innerText;
    const id_Fee = e.getAttribute("idfee");
    Swal.fire({
      title: "Học phí",
      text: "Bạn đặt có xác nhận hoàn thành học phí",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Xác Nhận",
      showCancelButton: true,
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        form.action = `/fee/done-fee/?mahv=${data}&id_fee=${id_Fee}`;
        form.submit();
      }
    });
  });
});
