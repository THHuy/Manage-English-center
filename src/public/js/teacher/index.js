var options = document.querySelectorAll(".data");
var decohtml = options.forEach(function (data) {
  const html = data.innerHTML;
  var entities = html.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  data.innerHTML = entities;
  return html;
});
//getdata from teacher
const btnSubmit = document.querySelectorAll(".btn-assign");
const table = document.querySelectorAll(".table-data");
var formAssign = document.forms["assign-teacher-form"];
// btnSubmit.forEach((e, index) => {
//   e.addEventListener("click", () => {
//     const indexTable = table[index];
//     //Lấy node của table ra
//     const nodeNgayhoc = indexTable.childNodes[9];
//     const nodeGiohoc = indexTable.childNodes[11];
//     //Lấy data
//     const dataNgayhoc = nodeNgayhoc.innerHTML;
//     const dataGioHoc = nodeGiohoc.innerHTML;
//   });
// });
function getValue(id, idclass, giohoc, ngayhoc) {
  //Xử lí ngày học cho đúng day/month/year
  var date = new Date(ngayhoc);
  date.setHours(date.getHours() + 7);
  var day = date.getDate();
  var month = date.getMonth() + 1; // Tháng bắt đầu từ 0
  var year = date.getFullYear();
  const datangayhoc = `${year}-${month}-${day}`;

  var formSelect = document.getElementById(`select${id}`);
  var selectValue = formSelect.value;
  formAssign.action =
    "/class/assign/" +
    `?magv=${selectValue}` +
    `&idclass=${idclass}` +
    `&giohoc=${giohoc}` +
    `&ngayhoc=${datangayhoc}`;
  formAssign.submit();
}
