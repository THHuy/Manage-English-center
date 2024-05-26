const btn = document.querySelectorAll('.btn-advise')
btn.forEach(e =>{
    e.addEventListener('click', event =>{
        event.preventDefault();
        const form = document.querySelector("#formDoneAdsive")
        Swal.fire({
            title: "Hoàn Thành",
            text: "Bạn đặt có xác nhận hoàn thành đơn tư vấn này không ?",
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
                const id = event.target.getAttribute('data-id')
                form.action = `/student/doneAdvise/?idkh=${id}&_method=PATCH`;
                form.submit();
              });
            }
          });
    })
})