var arrSaoHan = [];
var stt = 1;

function tinhToan() {
    var ten = document.getElementById("name").value;
    var namSinh = document.getElementById("year").value;
    var tuoi = document.getElementById("tuoi").value;
    calculateAge();
    calculateBirthYear();
    var xGioiTinh = document.getElementById("nam").checked;
    var gioiTinhCal = xGioiTinh == true ? "Nam" : "Nữ";

    const d = new Date();
    let year = d.getFullYear();
    var tinhTuoi = year - namSinh;

    if (!ten) {
        alert("Vuil lòng nhập tên!");
        return;
    }

    if (namSinh) {
        tinhTuoi = year - namSinh + 1;
    } else if (tuoi) {
        namSinh = Number.parseInt(year) - Number.parseInt(tuoi) + 1;
        tinhTuoi = tuoi;
    } else {
        alert("Vui lòng nhập Năm Sinh hoặc Tuổi!");
    }

    var sao = getSao((tinhTuoi - 1), gioiTinhCal),
        han = getHan(namSinh, xGioiTinh, year).han;


    var jsonChild = {
        "STT": stt,
        "Ten": ten,
        "GioiTinh": gioiTinhCal,
        "NamSinh": namSinh,
        "Tuoi": tinhTuoi,
        "NamAmLich": getCanChi(namSinh),
        "Sao": sao,
        "Han": han
    };

    console.log(jsonChild);

    arrSaoHan.push(jsonChild);

    addRow(jsonChild);
    stt = stt + 1;
    sortTable();
    calculateAge();
    calculateBirthYear();

    //set null text
    document.getElementById('name').value = '';
    document.getElementById('year').value = '';
    document.getElementById('tuoi').value = '';
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
    const cell7 = row.insertCell(6);
    const cell8 = row.insertCell(7);

    cell1.textContent = person.STT;
    cell2.textContent = person.Ten;
    cell3.textContent = person.GioiTinh;
    cell4.textContent = person.NamAmLich;
    cell5.textContent = person.NamSinh;
    cell6.textContent = person.Tuoi;
    cell7.textContent = person.Sao;
    cell8.textContent = person.Han;

}

function deleteRow(button) {
    // Lấy hàng (tr) chứa nút "Xóa"
    var row = button.closest("tr");

    // Xóa hàng khỏi bảng
    row.remove();
}


function exportToExcel() {

    // Chuyển JSON sang worksheet
    const worksheet = XLSX.utils.json_to_sheet(arrSaoHan);

    // Tạo workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DanhSach");

    // Xuất file
    XLSX.writeFile(workbook, "saohan.xlsx");
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


function getSao(tuoi, gioitinh) {
    const saoNam = [
        "La Hầu",
        "Thổ Tú",
        "Thủy Diệu",
        "Thái Bạch",
        "Thái Dương",
        "Vân Hớn",
        "Kế Đô",
        "Thái Âm",
        "Mộc Đức"
    ];
    const saoNu = [
        "Kế Đô",
        "Vân Hớn",
        "Mộc Đức",
        "Thái Âm",
        "Thổ Tú",
        "La Hầu",
        "Thái Dương",
        "Thái Bạch",
        "Thủy Diệu"
    ];

    const index = tuoi % 9;
    const sao = (gioitinh.toLowerCase() === "nam") ? saoNam[index] : saoNu[index];

    return sao;
}

function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("myGrid");
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[0];
            y = rows[i + 1].getElementsByTagName("TD")[0];
            //check if the two rows should switch place:
            if (Number.parseInt(x.innerText) < Number.parseInt(y.innerText)) {
                //if so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

const hanTheoTuoi = {
    "nam": {
        "Huỳnh Tiễn": [10, 18, 27, 36, 45, 54, 63, 72, 81],
        "Tam Kheo": [11, 19, 20, 28, 37, 46, 55, 64, 73, 82],
        "Ngũ Mộ": [12, 21, 29, 30, 38, 47, 56, 65, 74, 83],
        "Thiên Tinh": [13, 22, 31, 39, 40, 48, 57, 66, 75, 84],
        "Tán Tận": [14, 23, 32, 41, 49, 50, 58, 67, 76, 85],
        "Thiên La": [15, 24, 33, 42, 51, 59, 60, 68, 77, 86],
        "Địa Võng": [16, 25, 34, 43, 52, 61, 69, 70, 78, 87],
        "Diêm Vương": [17, 26, 35, 44, 53, 62, 71, 79, 80, 88]
    },
    "nu": {
        "Tán Tận": [10, 18, 27, 36, 45, 54, 63, 72, 81],
        "Thiên Tinh": [11, 19, 20, 28, 37, 46, 55, 64, 73, 82],
        "Ngũ Mộ": [12, 21, 29, 30, 38, 47, 56, 65, 74, 83],
        "Tam Kheo": [13, 22, 31, 39, 40, 48, 57, 66, 75, 84],
        "Huỳnh Tiễn": [14, 23, 32, 41, 49, 50, 58, 67, 76, 85],
        "Diêm Vương": [15, 24, 33, 42, 51, 59, 60, 68, 77, 86],
        "Địa Võng": [16, 25, 34, 43, 52, 61, 69, 70, 78, 87],
        "Thiên La": [17, 26, 35, 44, 53, 62, 71, 79, 80, 88]
    }
};

/**
 * Trả về tên hạn dựa trên tuổi âm lịch và giới tính
 * @param {number} birthYear - Năm sinh (âm lịch hoặc dương lịch nếu tính tuổi)
 * @param {string} gender - 'nam' hoặc 'nu'
 * @param {number} targetYear - Năm cần tra hạn
 */
function getHan(birthYear, gender, targetYear) {
    const tuoiAm = targetYear - birthYear + 1;
    const hanList = hanTheoTuoi[gender == true ? "nam" : "nu"];
    let han = "Cầu An";

    for (let [tenHan, tuoiList] of Object.entries(hanList)) {
        if (tuoiList.includes(tuoiAm)) {
            han = tenHan;
            break;
        }
    }

    return {
        tuoiAm,
        han
    };
}
