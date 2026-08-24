// ==============================
// PASSWORD WEBSITE
// ==============================

const PASSWORD_WEBSITE = "stokakun";


// ==============================
// DATA
// ==============================

let akun = [];

try {
    akun =
        JSON.parse(
            localStorage.getItem("akunRoblox")
        ) || [];
} catch (error) {
    akun = [];
}


// ==============================
// ELEMENT
// ==============================

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


// ==============================
// LOGIN
// ==============================

function login() {

    if (
        loginPassword.value.trim() ===
        PASSWORD_WEBSITE
    ) {

        loginScreen.style.display = "none";

        app.style.display = "block";

        loginPassword.value = "";

        loginError.textContent = "";

        tampilkanAkun();

    } else {

        loginError.textContent =
            "❌ Password salah!";

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
    function (event) {

        if (event.key === "Enter") {
            login();
        }

    }
);


// ==============================
// SIMPAN
// ==============================

function simpanData() {

    try {

        localStorage.setItem(
            "akunRoblox",
            JSON.stringify(akun)
        );

        return true;

    } catch (error) {

        alert(
            "❌ Data gagal disimpan."
        );

        return false;
    }
}


// ==============================
// SENSOR GMAIL
// ==============================

function sensorGmail(gmail) {

    if (!gmail) {
        return "-";
    }

    if (!gmail.includes("@")) {
        return gmail;
    }

    const bagian =
        gmail.split("@");

    const nama =
        bagian[0];

    const domain =
        bagian.slice(1).join("@");

    if (nama.length <= 2) {

        return (
            nama +
            "*****@" +
            domain
        );

    }

    return (
        nama.substring(0, 2) +
        "*****@" +
        domain
    );
}


// ==============================
// TAMBAH AKUN
// ==============================

function tambahAkun() {

    const username =
        document.getElementById("username")
        .value
        .trim();

    const gmail =
        document.getElementById("gmail")
        .value
        .trim();

    const keterangan =
        document.getElementById("keterangan")
        .value
        .trim();


    if (!username) {

        alert(
            "Username Roblox wajib diisi!"
        );

        return;
    }


    akun.push({

        username: username,

        gmail: gmail,

        keterangan: keterangan

    });


    if (!simpanData()) {

        akun.pop();

        return;
    }


    document.getElementById("username").value = "";

    document.getElementById("gmail").value = "";

    document.getElementById("keterangan").value = "";


    tampilkanAkun();

    alert(
        "✅ Akun berhasil ditambahkan!"
    );
}


addButton.addEventListener(
    "click",
    tambahAkun
);


// ==============================
// TAMPILKAN
// ==============================

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
        function (item, index) {

            listAkun.innerHTML += `

                <div class="card">

                    <h3>
                        🎮 ${aman(item.username)}
                    </h3>

                    <div class="info">

                        <p>
                            <strong>Gmail:</strong>
                            ${sensorGmail(item.gmail)}
                        </p>

                        <p>
                            <strong>Keterangan:</strong>
                            ${aman(
                                item.keterangan || "-"
                            )}
                        </p>

                    </div>

                    <div class="action">

                        <button
                            class="detail"
                            type="button"
                            onclick="detailAkun(${index})"
                        >
                            Detail
                        </button>

                        <button
                            class="copy"
                            type="button"
                            onclick="copyAkun(${index})"
                        >
                            Copy
                        </button>

                        <button
                            class="edit"
                            type="button"
                            onclick="editAkun(${index})"
                        >
                            Edit
                        </button>

                        <button
                            class="delete"
                            type="button"
                            onclick="hapusAkun(${index})"
                        >
                            Hapus
                        </button>

                    </div>

                </div>
            `;

        }
    );
}


// ==============================
// AMANKAN TEKS
// ==============================

function aman(teks) {

    return String(teks)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


// ==============================
// DETAIL
// ==============================

function detailAkun(index) {

    const item = akun[index];

    if (!item) return;


    alert(
`Username : ${item.username}

Gmail : ${item.gmail || "-"}

Keterangan : ${item.keterangan || "-"}`
    );
}


// ==============================
// COPY
// ==============================

async function copyAkun(index) {

    const item = akun[index];

    if (!item) return;


    const text =
`Username : ${item.username}
Gmail : ${item.gmail || "-"}
Keterangan : ${item.keterangan || "-"}`;


    try {

        await navigator.clipboard
            .writeText(text);

        alert(
            "✅ Data berhasil dicopy!"
        );

    } catch (error) {

        alert(
            "❌ Gagal menyalin data."
        );

    }
}


// ==============================
// EDIT
// ==============================

function editAkun(index) {

    const item = akun[index];

    if (!item) return;


    const username =
        prompt(
            "Username Roblox:",
            item.username
        );

    if (username === null) return;


    const gmail =
        prompt(
            "Gmail:",
            item.gmail || ""
        );

    if (gmail === null) return;


    const keterangan =
        prompt(
            "Keterangan:",
            item.keterangan || ""
        );

    if (keterangan === null) return;


    if (!username.trim()) {

        alert(
            "Username tidak boleh kosong!"
        );

        return;
    }


    akun[index] = {

        username: username.trim(),

        gmail: gmail.trim(),

        keterangan: keterangan.trim()

    };


    if (simpanData()) {

        tampilkanAkun();

        alert(
            "✅ Akun berhasil diperbarui!"
        );
    }
}


// ==============================
// HAPUS
// ==============================

function hapusAkun(index) {

    const item = akun[index];

    if (!item) return;


    if (
        confirm(
            `Yakin ingin menghapus akun "${item.username}"?`
        )
    ) {

        akun.splice(index, 1);

        if (simpanData()) {

            tampilkanAkun();

            alert(
                "✅ Akun berhasil dihapus!"
            );
        }
    }
}
