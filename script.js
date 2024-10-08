// ฟังก์ชันแสดงรายชื่อรุ่นในหน้าหลัก
function displayClassList() {
    const classList = document.getElementById('classList');
    if (classList) {
        classData.forEach(classInfo => {
            const classCard = document.createElement('div');
            classCard.className = 'col-md-4 mb-3';
            classCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">รุ่นปี ${classInfo.year}</h5>
                        <p class="card-text">จำนวนนักเรียน: ${classInfo.studentCount}</p>
                        <a href="class-details.html?year=${classInfo.year}" class="btn btn-primary">ดูรายละเอียด</a>
                    </div>
                </div>
            `;
            classList.appendChild(classCard);
        });
    }
}

// ฟังก์ชันทีดอาไว้แสดงรายละเอียดรุ่นในหน้ารายละเอียดรุ่น
function displayClassDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const year = parseInt(urlParams.get('year'));
    const classInfo = classData.find(c => c.year === year);

    if (classInfo) {
        document.getElementById('classYear').textContent = classInfo.year;
        document.getElementById('studentCount').textContent = classInfo.studentCount;
        document.getElementById('advisor').textContent = classInfo.advisor;
        document.getElementById('achievements').textContent = classInfo.achievements;

        const studentList = document.getElementById('studentList');
        classInfo.students.forEach(student => {
            const studentCard = document.createElement('div');
            studentCard.className = 'col-md-4 mb-3';
            studentCard.innerHTML = `
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWestySFdjEYa_HB1RMZVgx07ds7WXNUpLaQ&s" alt="รูปนักศึกษา" width="415" height="270">    
            <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${student.name}</h5>
                        <p class="card-text">รหัสนักศึกษา: ${student.pass}</p>
                        <button class="btn btn-primary" onclick="showPersonalInfo(${student.id})">ดูข้อมูลส่วนบุคคล</button>
                    </div>
                </div>
            `;
            studentList.appendChild(studentCard);
        });
    }
}

// ฟังก์ชันไว้สำหรับแสดงข้อมูลส่วนบุคคล
function showPersonalInfo(studentId) {
    const student = classData.flatMap(c => c.students).find(s => s.id === studentId);
    if (student) {
        document.getElementById('personName').textContent = student.name;
        document.getElementById('graduationYear').textContent = classData.find(c => c.students.includes(student)).year;
        document.getElementById('email').textContent = student.email;
        document.getElementById('occupation').textContent = student.occupation;
        document.getElementById('message').textContent = student.message;
        document.getElementById('stay').textContent = student.stay;
        document.getElementById('phone').textContent = student.phone;
        new bootstrap.Modal(document.getElementById('personalInfoModal')).show();
    }
}

if (document.getElementById('classList')) {
    displayClassList();
} else if (document.getElementById('studentList')) {
    displayClassDetails();
}