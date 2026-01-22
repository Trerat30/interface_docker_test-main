let patients = JSON.parse(localStorage.getItem("patients")) || [];
let nurseRecords = JSON.parse(localStorage.getItem("nurseRecords")) || [];

// ================= PATIENT =================
function addPatient() {
    const name = pname.value;
    const age = page.value;
    const phone = pphone.value;
    const imageFile = pimage.files[0];

    if (!name || !age || !phone || !imageFile) {
        alert("กรุณากรอกข้อมูลผู้ป่วยให้ครบ");
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        patients.push({
            name,
            age,
            phone,
            image: reader.result
        });
        clearPatientForm();
        saveAndRender();
    };
    reader.readAsDataURL(imageFile);
}

function clearPatientForm() {
    pname.value = "";
    page.value = "";
    pphone.value = "";
    pimage.value = "";
}

function deletePatient(index) {
    if (confirm("ลบผู้ป่วยคนนี้?")) {
        patients.splice(index, 1);
        saveAndRender();
    }
}

function renderPatients() {
    patientTable.innerHTML = "";
    patientSelect.innerHTML = '<option value="">-- เลือกผู้ป่วย --</option>';

    patients.forEach((p, i) => {
        patientTable.innerHTML += `
            <tr>
                <td><img src="${p.image}"></td>
                <td>${p.name}</td>
                <td>${p.age}</td>
                <td>${p.phone}</td>
                <td><button onclick="deletePatient(${i})">ลบ</button></td>
            </tr>
        `;
        patientSelect.innerHTML += `<option value="${p.name}">${p.name}</option>`;
    });
}

// ================= NURSE RECORD =================
function addNurseRecord() {
    const patient = patientSelect.value;
    const vital = vital.value;
    const note = note.value;
    const nurse = nurse.value;

    const diagnoses = [];
    document.querySelectorAll(".checkbox-group input:checked")
        .forEach(cb => diagnoses.push(cb.value));

    if (!patient || !vital || !note || !nurse || diagnoses.length === 0) {
        alert("กรุณากรอกข้อมูล Nurse Record ให้ครบ");
        return;
    }

    nurseRecords.push({
        patient,
        vital,
        note,
        diagnoses,
        nurse,
        datetime: new Date().toLocaleString()
    });

    clearNurseForm();
    saveAndRender();
}

function clearNurseForm() {
    vital.value = "";
    note.value = "";
    nurse.value = "";
    document.querySelectorAll(".checkbox-group input").forEach(cb => cb.checked = false);
}

function renderNurseRecords() {
    nurseTable.innerHTML = "";
    nurseRecords.forEach(r => {
        nurseTable.innerHTML += `
            <tr>
                <td>${r.patient}</td>
                <td>${r.vital}</td>
                <td>${r.note}</td>
                <td>${r.diagnoses.join(", ")}</td>
                <td>${r.nurse}</td>
                <td>${r.datetime}</td>
            </tr>
        `;
    });
}

// ================= SAVE =================
function saveAndRender() {
    localStorage.setItem("patients", JSON.stringify(patients));
    localStorage.setItem("nurseRecords", JSON.stringify(nurseRecords));
    renderPatients();
    renderNurseRecords();
}

saveAndRender();
