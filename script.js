// ==========================================
// ROBLOX VAULT
// ==========================================


// ==========================================
// PASSWORD WEBSITE
// ==========================================

const PASSWORD_WEBSITE = "201230rw";


// ==========================================
// DATA AKUN
// ==========================================

let akun = [];


// ==========================================
// AMBIL DATA LOCAL STORAGE
// ==========================================

function ambilData() {

    try {

        const data =
            localStorage.getItem("akunRoblox");

        if (!data) {
            return [];
        }

        const hasil =
            JSON.parse(data);

        if (!Array.isArray(hasil)) {
            return [];
        }

        return hasil;

    } catch (error) {

        console.error(
            "Gagal membaca data:",
            error
        );

        return [];

    }

}


akun = ambilData();


// ==========================================
// ELEMENT
// ==========================================

const loginScreen =
    document.getElementById("loginScreen");

const loginPassword =
    document.getElementById("loginPassword");

const loginButton =
    document.getElementById("loginButton");

const loginError =
    document.getElementById("loginError");

const app =
    document.getElementById("app");

const addButton =
    document.getElementById("addButton");

const listAkun =
    document.getElementById("listAkun");

const totalAkun =
    document.getElementById("totalAkun");


// ==========================================
// LOGIN
// ==========================================

function login() {

    const password =
        loginPassword.value.trim();


    if (password === PASSWORD_WEBSITE) {

        loginScreen.style.display = "none";

        app.style.display = "block";

        loginPassword.value = "";

        loginError.textContent = "";

        tampilkanAkun();

    } else {

        loginError.textContent =
            "❌ Password yang Anda masukkan salah!";

        loginPassword.value = "";

        loginPassword.focus();

    }

}


loginButton.addEventListener(
    "click",
    login
);


loginPassword.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            login();

        }

    }
);


// ==========================================
// SIMPAN DATA
// ==========================================

function simpanData() {

    try {

        localStorage.setItem(
            "akunRoblox",
            JSON.stringify(akun)
        );

        return true;

    } catch (error) {

        console.error(
            "Gagal menyimpan:",
            error
        );

        alert(
            "❌ Data gagal disimpan."
        );

        return false;

    }

}


// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHTML(text) {

    if (
        text === null ||
        text === undefined
    ) {
        return "";
    }


    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ==========================================
// SENSOR GMAIL
// ==========================================

function sensorGmail(gmail) {

    if (!gmail) {
        return "-";
    }


    if (!gmail.includes("@")) {

        return escapeHTML(gmail);

    }


    const bagian =
        gmail.split("@");


    const nama =
        bagian[0];


    const domain =
        bagian.slice(1).join("@");


    if (nama.length <= 2) {

        return (
            escapeHTML(nama) +
            "*****@" +
            escapeHTML(domain)
        );

    }


    return (
        escapeHTML(
            nama.substring(0, 2)
        ) +
        "*****@" +
        escapeHTML(domain)
    );

}


// ==========================================
// TAMBAH AKUN
// ==========================================

function tambahAkun() {

    const username =
        document
            .getElementById("username")
            .value
            .trim();


    const password =
        document
            .getElementById("password")
            .value
            .trim();


    const gmail =
        document
            .getElementById("gmail")
            .value
            .trim();


    const keterangan =
        document
            .getElementById("keterangan")
            .value
            .trim();


    if (!username) {

        alert(
            "Username Roblox wajib diisi!"
        );

        document
            .getElementById("username")
            .focus();

        return;

    }


    if (!password) {

        alert(
            "Password Roblox wajib diisi!"
        );

        document
            .getElementById("password")
            .focus();

        return;

    }


    const dataBaru = {

        username: username,

        password: password,

        gmail: gmail,

        keterangan: keterangan

    };


    akun.push(dataBaru);


    if (!simpanData()) {

        akun.pop();

        return;

    }


    document.getElementById(
        "username"
    ).value = "";


    document.getElementById(
        "password"
    ).value = "";


    document.getElementById(
        "gmail"
    ).value = "";


    document.getElementById(
        "keterangan"
    ).value = "";


    tampilkanAkun();


    alert(
        "✅ Akun berhasil ditambahkan!"
    );

}


addButton.addEventListener(
    "click",
    tambahAkun
);


// ==========================================
// TAMPILKAN AKUN
// ==========================================

function tampilkanAkun() {

    listAkun.innerHTML = "";

    totalAkun.textContent =
        akun.length + " akun";


    if (akun.length === 0) {

        listAkun.innerHTML = `
            <div class="empty">
                Belum ada akun Roblox.
            </div>
        `;

        return;

    }


    akun.forEach(
        function(item, index) {

            const username =
                escapeHTML(
                    item.username
                );


            const keterangan =
                escapeHTML(
                    item.keterangan || "-"
                );


            listAkun.innerHTML += `

                <div class="card">

                    <h3>
                        🎮 ${username}
                    </h3>

                    <div class="info">

                        <p>
                            <strong>Password:</strong>
                            ********
                        </p>

                        <p>
                            <strong>Gmail:</strong>
                            ${sensorGmail(item.gmail)}
                        </p>

                        <p>
                            <strong>Keterangan:</strong>
                            ${keterangan}
                        </p>

                    </div>

                    <div class="action">

                        <button
                            class="detail"
                            type="button"
                            onclick="detailAkun(${index})">
                            Detail
                        </button>

                        <button
                            class="copy"
                            type="button"
                            onclick="copyAkun(${index})">
                            Copy
                        </button>

                        <button
                            class="edit"
                            type="button"
                            onclick="editAkun(${index})">
                            Edit
                        </button>

                        <button
                            class="delete"
                            type="button"
                            onclick="hapusAkun(${index})">
                            Hapus
                        </button>

                    </div>

                </div>

            `;

        }
    );

}


// ==========================================
// DETAIL
// ==========================================

function detailAkun(index) {

    const item =
        akun[index];


    if (!item) {

        alert(
            "❌ Data akun tidak ditemukan."
        );

        return;

    }


    alert(
`Username : ${item.username}

Password : ${item.password}

Gmail : ${item.gmail || "-"}

Keterangan : ${item.keterangan || "-"}`
    );

}


// ==========================================
// COPY
// ==========================================

async function copyAkun(index) {

    const item =
        akun[index];


    if (!item) {

        alert(
            "❌ Data akun tidak ditemukan."
        );

        return;

    }


    const text =
`Username : ${item.username}
Password : ${item.password}
Gmail : ${item.gmail || "-"}
Keterangan : ${item.keterangan || "-"}`;


    try {

        await navigator.clipboard.writeText(
            text
        );

        alert(
            "✅ Data berhasil dicopy!"
        );

    } catch (error) {

        const textarea =
            document.createElement(
                "textarea"
            );


        textarea.value = text;


        textarea.style.position =
            "fixed";


        textarea.style.opacity =
            "0";


        document.body.appendChild(
            textarea
        );


        textarea.select();


        try {

            document.execCommand("copy");

            alert(
                "✅ Data berhasil dicopy!"
            );

        } catch (copyError) {

            alert(
                "❌ Gagal menyalin data."
            );

        }


        document.body.removeChild(
            textarea
        );

    }

}


// ==========================================
// EDIT
// ==========================================

function editAkun(index) {

    const item =
        akun[index];


    if (!item) {

        alert(
            "❌ Data akun tidak ditemukan."
        );

        return;

    }


    const username =
        prompt(
            "Username Roblox:",
            item.username
        );


    if (username === null) {
        return;
    }


    const password =
        prompt(
            "Password Roblox:",
            item.password
        );


    if (password === null) {
        return;
    }


    const gmail =
        prompt(
            "Gmail:",
            item.gmail || ""
        );


    if (gmail === null) {
        return;
    }


    const keterangan =
        prompt(
            "Keterangan:",
            item.keterangan || ""
        );


    if (keterangan === null) {
        return;
    }


    if (!username.trim()) {

        alert(
            "❌ Username tidak boleh kosong."
        );

        return;

    }


    if (!password.trim()) {

        alert(
            "❌ Password tidak boleh kosong."
        );

        return;

    }


    akun[index] = {

        username:
            username.trim(),

        password:
            password.trim(),

        gmail:
            gmail.trim(),

        keterangan:
            keterangan.trim()

    };


    if (!simpanData()) {

        return;

    }


    tampilkanAkun();


    alert(
        "✅ Akun berhasil diperbarui!"
    );

}


// ==========================================
// HAPUS
// ==========================================

function hapusAkun(index) {

    const item =
        akun[index];


    if (!item) {

        alert(
            "❌ Data akun tidak ditemukan."
        );

        return;

    }


    const yakin =
        confirm(
            `Yakin ingin menghapus akun "${item.username}"?`
        );


    if (!yakin) {
        return;
    }


    akun.splice(
        index,
        1
    );


    if (!simpanData()) {

        return;

    }


    tampilkanAkun();


    alert(
        "✅ Akun berhasil dihapus!"
    );

}


// ==========================================
// TAMPILKAN DATA AWAL
// ==========================================

tampilkanAkun();
