const getAllSinhVien = async () => {
    let response = await fetch("https://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien");
    const data = await response.json();
    return data;
}
// hiển thị thông tin
const renderSinhVien = () => {
    getAllSinhVien().then(datas => {
        
        let htmlString = "";
        for(let data of datas ){
            htmlString += `
                <tr>
                        <td>${data.maSinhVien}</td>
                        <td>${data.tenSinhVien}</td>
                        <td>${data.soDienThoai}</td>
                        <td>${data.email}</td>
                        <td>${data.diemToan}</td>
                        <td>${data.diemLy}</td>
                        <td>${data.diemHoa}</td>
                        <td>${data.diemRenLuyen}</td>
                        <td>${data.loaiSinhVien}</td>
                        <td>
                            <button class="btn btn-danger" id="xoa_sinh_vien" onclick="xoaSinhVien(${data.maSinhVien})">Xóa</button>
                            <button class="btn btn-success" id="xoa_sinh_vien" onclick="loadThongTinSV(${data.maSinhVien})">Sửa</button>
                        </td>
                </tr> 
            `
        }
        document.querySelector("#tblSinhVien").innerHTML = htmlString;
    }).catch(error => {
        console.error("Error fetching data:", error);
    });
}
renderSinhVien();

// thêm sinh viên
document.getElementById("btnThemSinhVien").onclick = async (e) => {
    e.preventDefault();
    let sv =  {}
    const inputs = document.querySelectorAll(".form-control");
    for(let input of inputs){
        sv[input.id] = input.value;
    }
    

    const response =  await fetch('https://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien',{
        method: "POST",
        headers: {
            'Content-Type': 'Application/json'
        },
        body:JSON.stringify(sv)
    })
    renderSinhVien();
    for(let input of inputs){
        input.value = "";
    }
}

// Xóa sinh viên
const xoaSinhVien  = async (maSinhVien) => {
    const response = await fetch(`https://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=${maSinhVien}`,{
        method: "DELETE",
        headers: {
             'Content-Type': 'Application/json'
        },

    })
    renderSinhVien();
}

// cập nhật sinh viên
const loadThongTinSV = async (maSinhVien) => {
    getAllSinhVien().then(datas => {
        const sinhVien = datas.find(data => data.maSinhVien === maSinhVien)
        document.getElementById("maSinhVien").value = sinhVien.maSinhVien;
        document.getElementById("maSinhVien").disabled = true;
        document.getElementById("tenSinhVien").value = sinhVien.tenSinhVien;
        document.getElementById("soDienThoai").value = sinhVien.soDienThoai;
        document.getElementById("email").value = sinhVien.email;
        document.getElementById("diemToan").value = sinhVien.diemToan;
        document.getElementById("diemLy").value = sinhVien.diemLy;
        document.getElementById("diemHoa").value = sinhVien.diemHoa;
        document.getElementById("diemRenLuyen").value = sinhVien.diemRenLuyen;
        document.getElementById("loaiSinhVien").value = sinhVien.loaiSinhVien;
        
    }).catch(error => {
        console.error("Error fetching data:", error);
    }); 
}

document.getElementById("btnLuuThongTin").onclick = async () => {
    let sv =  {}
    const inputs = document.querySelectorAll(".form-control");
    for(let input of inputs){
        sv[input.id] = input.value;
    }
    const response = await fetch(`https://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=${sv.maSinhVien}`,{
        method: "PUT",
        headers: {
             'Content-Type': 'Application/json'
        },
        body:JSON.stringify(sv)
    })
    renderSinhVien();
}
