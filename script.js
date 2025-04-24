var arrSaoHan = [];

function tinhToan() {
   var ten = document.getElementById("name").value;
   var namSinh = document.getElementById("year").value;
   var x = document.getElementById("nam").checked;
   var gioiTinhCal = x == true ? "Nam" : "Nữ";

   const d = new Date();
   let year = d.getFullYear();
   var tinhTuoi = year - namSinh + 1;

   var jsonChild = {
      "Ten": ten,
      "GioiTinh": gioiTinhCal,
      "Tuoi": tinhTuoi,
      "NamAmLich": getCanChi(namSinh),
      "Sao": getSaoChieuMenh(namSinh, gioiTinhCal),
      "Han": getSaoVaHan(namSinh, gioiTinhCal)
   };

   console.log(jsonChild);

   arrSaoHan.push(jsonChild);

   addRow(jsonChild);
}

function addRow(child) {
   // Object dữ liệu mới
   const person = child;

   // Lấy tbody
   const table = document.getElementById("myGrid").getElementsByTagName('tbody')[0];

   // Tạo hàng mới
   const row = table.insertRow();

   // Thêm ô vào hàng
   const cell1 = row.insertCell(0);
   const cell2 = row.insertCell(1);
   const cell3 = row.insertCell(2);
   const cell4 = row.insertCell(3);
   const cell5 = row.insertCell(4);
   const cell6 = row.insertCell(5);

   cell1.textContent = person.Ten;
   cell2.textContent = person.GioiTinh;
   cell3.textContent = person.Tuoi;
   cell4.textContent = person.NamAmLich;
   cell5.textContent = person.Sao;
   cell6.textContent = person.Han;
}

function exportExcel() {
   console.log(arrSaoHan);
}

function exportToExcel() {

   // Chuyển JSON sang worksheet
   const worksheet = XLSX.utils.json_to_sheet(arrSaoHan);

   // Tạo workbook
   const workbook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(workbook, worksheet, "DanhSach");

   // Xuất file
   XLSX.writeFile(workbook, "danh_sach.xlsx");
}

function getCanChi(year) {
   const can = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
   const chi = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
   var canYear = Number.parseInt(year) + 6,
      chiYear = Number.parseInt(year) + 8;
   const canIndex = canYear % 10; // Can bắt đầu từ Giáp ứng với năm có số cuối là 4
   const chiIndex = chiYear % 12; // Chi bắt đầu từ Tý ứng với năm có số cuối là 4

   return `${can[canIndex]} ${chi[chiIndex]}`;
}

function getSaoChieuMenh(yearOfBirth, gender) {
   const saoNam = [
      "La Hầu", // 0
      "Thổ Tú", // 1
      "Thủy Diệu", // 2
      "Thái Bạch", // 3
      "Thái Dương", // 4
      "Vân Hớn", // 5
      "Kế Đô", // 6
      "Thái Âm", // 7
      "Mộc Đức" // 8
   ];

   const saoNu = [
      "Kế Đô", // 0
      "Vân Hớn", // 1
      "Mộc Đức", // 2
      "Thái Âm", // 3
      "Thái Bạch", // 4
      "Thủy Diệu", // 5
      "La Hầu", // 6
      "Thổ Tú", // 7
      "Thái Dương" // 8
   ];

   const cycleIndex = yearOfBirth % 9;

   if (gender.toLowerCase() === "nam") {
      return saoNam[cycleIndex];
   } else if (gender.toLowerCase() === "nữ") {
      return saoNu[cycleIndex];
   } else {
      return "Giới tính không hợp lệ (nam/nữ)";
   }
}

// Ví dụ sử dụng:
const namSinh = 1996;
const gioiTinh = "nam";
console.log(`Năm ${namSinh} (${gioiTinh}) chiếu mệnh bởi sao: ${getSaoChieuMenh(namSinh, gioiTinh)}`);


function getSaoVaHan(yearOfBirth, gender) {
   const saoNam = [
      "La Hầu", "Thổ Tú", "Thủy Diệu",
      "Thái Bạch", "Thái Dương", "Vân Hớn",
      "Kế Đô", "Thái Âm", "Mộc Đức"
   ];
   const saoNu = [
      "Kế Đô", "Vân Hớn", "Mộc Đức",
      "Thái Âm", "Thái Bạch", "Thủy Diệu",
      "La Hầu", "Thổ Tú", "Thái Dương"
   ];

   const hanTheoSao = {
      "La Hầu": "Hạn Tam Kheo",
      "Thổ Tú": "Hạn Ngũ Mộ",
      "Thủy Diệu": "Hạn Hàm Ếch",
      "Thái Bạch": "Hạn Thiên Tinh",
      "Thái Dương": "Hạn Tán Tận",
      "Vân Hớn": "Hạn Thiên La",
      "Kế Đô": "Hạn Địa Võng",
      "Thái Âm": "Hạn Huỳnh Tuyền",
      "Mộc Đức": "Hạn Ngũ Mộ"
   };

   const index = yearOfBirth % 9;
   const sao = (gender.toLowerCase() === "nam") ? saoNam[index] : saoNu[index];
   const han = hanTheoSao[sao];

   return han;
   //return "Sao: " + sao + ", Han: " + han;
   // return {
   //   saoChieuMenh: sao,
   //   nienHan: han,
   //   message: `Sao chiếu mệnh: ${sao} → Niên hạn: ${han}`
   // };
}
