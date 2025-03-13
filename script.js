// Making sure document loaded
document.addEventListener('DOMContentLoaded', () => {

    // getting form
    const from = document.getElementById('student-form');
    
    // getting display table
    const tableBody = document.querySelector('#student-table tbody');

    // submit button
    const submitBtn = document.querySelector('button');

    // getting the previous loaded data 
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // For storing student id to be edit
    let editingId = null;


    showStudents();
    
    // collection data on submit
    from.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const id = document.getElementById('student-id').value.trim();
        const email = document.getElementById('email').value.trim();
        const contact = document.getElementById('contact').value.trim();

        if (!name || !id || !email || !contact){
            alert("Please fill in  all fields");
            return;
        };
    
        if (isNaN(id) || idNaN(contact)) {
            alert('student ID and Contact must be numbers');
            return;
        };
    
        if (!email.includes('@') || !email.includes('.')){
            alert('Please enter a valid email');
            return;
        }

        // making sure no field is null
        // Not neccssary to add here I am using required but its a good practice.
        
        const student = { name, id, email, contact};

        if (editingId != null) {
            const index = students.findIndex(s => s.id === editingId);
            students[index] = student;
            editingId = null;
            submitBtn.textContent = 'Add Student';
        } else {
            students.push(student);
        }


        localStorage.setItem('students', JSON.stringify(students));
        showStudents();
        from.reset();
        
    });


    function showStudents(){
        tableBody.innerHTML = '';

        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button class='edit-btn' data-id="${student.id}">
                        <i class="fa-solid fa-edit"></i> Edit
                    </button>
                    <button class='delete-btn' data-id="${student.id}">
                        <i class="fa-solid fa-trash"></i> Edit
                    </button>
                </td>
            `;

            tableBody.appendChild(row);
        });
    };

    tableBody.addEventListener('click', (e) => {
        const studentId = e.target.closest('button').dataset.id;

        if(e.target.closest('.delete-btn')){
            if(confirm("Are you sure you want to delete this student?")){
                students = students.filter(student=> student.id !== studentId)
                localStorage.setItem('students', JSON.stringify(students));
                showStudents();
            }
        }

        if(e.target.closest('.edit-btn')){
            const student = students.find(s => s.id === studentId);
            document.getElementById('name').value = student.name;
            document.getElementById('student-id').value = student.id;
            document.getElementById('email').value = student.email;
            document.getElementById('contact').value = student.contact;
            editingId = studentId;
            submitBtn.textContent = 'Update Student';
        }
    })

})