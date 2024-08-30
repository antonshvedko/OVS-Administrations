document.addEventListener('DOMContentLoaded', function() {
    // Данные о пользователе
    const data = {
        "loginName": "mtlhunter+student2@gmail.com",
        "fullName": "LS2, MS2",
        "preferredName": "John",
        "telephone": "123-456-7890",
        "email": "mtlhunter+student2@gmail.com",
        "gender": "Other",
        "dateOfBirth": "1000-01-01",
        "age": 1024,
        "address": "123 Main St, Test City",
        "homeSchool": "Test School",
        "parent1": "Parent Name",
        "parentTelephone": "987-654-3210",
        "registrationDate": "2024-06-19 03:26:57 AM",
        "lastLoggedIn": "2024-06-19 01:50:45 PM",
        "lastLoggedInDuration": "2 months, 1 week, 16 hours, 39 minutes, 10 seconds ago",
        "ocas": "OCAS123",
        "oen": "OEN456",
        "cautionFlag": true,
        "communicationNotes": [{
                "date": "2024-08-27 10:49 AM",
                "author": "George",
                "note": "Caution Flag set"
            },
            {
                "date": "2024-08-28 09:12 AM",
                "author": "George",
                "note": "Reminder to check with parent."
            }
        ],
        "notes": "",
        "documents": [
            { "name": "document1.pdf", "url": "#" },
            { "name": "document2.png", "url": "#" }
        ],
        "attachmentsList": [ // Вложенные файлы
            { "name": "attachment1.pdf", "url": "#" },
            { "name": "attachment2.docx", "url": "#" }
        ],
        "accountType": "Student",
        "inactivityNotices": true,
        "iepFlag": true,
        "teacherCommunicationNotes": [{
            "date": "2024-06-19 12:57 PM",
            "course": "[MCV4U-03:Proctor System]",
            "note": "Student added a blacklisted proctor"
        }],
        "referredBy": "No data",
        "webBrowsersUsed": "2024-06-19 16:46:40 - Google Chrome 125 on Windows 10",
        "iepAccommodationNotes": [{
                "date": "2024-06-20 10:30 AM",
                "author": "Mrs. Smith",
                "note": "Student requires extra time for exams."
            },
            {
                "date": "2024-07-15 02:45 PM",
                "author": "Mr. Brown",
                "note": "Accommodation for note-taking has been arranged."
            }
        ]
    };

    // Функция для добавления файла в список
    function addAttachment(file, attachmentsListElement) {
        const attachmentItem = document.createElement('div');
        attachmentItem.className = 'attachment-item';

        const fileLink = document.createElement('a');
        fileLink.href = file.url || '#'; // Ссылка для скачивания или просмотра файла
        fileLink.textContent = file.name;

        const removeButton = document.createElement('button');
        removeButton.className = 'btn btn-danger';
        removeButton.textContent = 'Remove';

        // Обработчик для удаления файла из списка
        removeButton.addEventListener('click', function() {
            attachmentItem.remove();
        });

        attachmentItem.appendChild(fileLink);
        attachmentItem.appendChild(removeButton);
        attachmentsListElement.appendChild(attachmentItem);
    }

    // Заполнение существующих вложений для Documents (Attachments)
    const attachmentsList = document.getElementById('attachmentsList');
    data.attachmentsList.forEach(file => {
        addAttachment(file, attachmentsList);
    });

    // Обработчик нажатия на кнопку "Add Files" для Documents (Attachments)
    const fileInput = document.getElementById('fileInput');
    const addFileButton = document.getElementById('addFileButton');

    addFileButton.addEventListener('click', function() {
        const files = fileInput.files;
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                addAttachment({ name: files[i].name, url: '#' }, attachmentsList);
            }
            // Очищаем input после добавления файлов
            fileInput.value = '';
        }
    });

    // Заполнение существующих вложений для Applications Attachments
    const attachmentsListApplications = document.getElementById('attachmentsListApplications');
    // Если есть уже данные для applicationsAttachments, можно их добавить аналогично
    // Пример:
    // data.applicationsAttachments.forEach(file => {
    //     addAttachment(file, attachmentsListApplications);
    // });

    // Обработчик нажатия на кнопку "Add Files" для Applications Attachments
    const fileInputApplications = document.getElementById('fileInputApplications');
    const addFileButtonApplications = document.getElementById('addFileButtonApplications');

    addFileButtonApplications.addEventListener('click', function() {
        const files = fileInputApplications.files;
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                addAttachment({ name: files[i].name, url: '#' }, attachmentsListApplications);
            }
            // Очищаем input после добавления файлов
            fileInputApplications.value = '';
        }
    });

    // Заполнение teacherCommunicationNotes
    const teacherCommunicationNotesDiv = document.getElementById('teacherCommunicationNotes');
    teacherCommunicationNotesDiv.innerHTML = ''; // Очистка существующего содержимого

    data.teacherCommunicationNotes.forEach(note => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';

        const deleteButton = document.createElement('button');
        deleteButton.className = 'button-icon';
        deleteButton.innerHTML = '<i class="icomoon-x"></i>';

        const editButton = document.createElement('button');
        editButton.className = 'button-icon';
        editButton.innerHTML = '<i class="icon icomoon-pencil"></i>';

        const p = document.createElement('p');
        p.textContent = `${note.date} - ${note.course}: ${note.note}`;

        commentDiv.appendChild(deleteButton);
        commentDiv.appendChild(editButton);
        commentDiv.appendChild(p);

        teacherCommunicationNotesDiv.appendChild(commentDiv);
    });

    // Заполнение секции IEP & Accommodation Notes
    const iepAccommodationNotesDiv = document.getElementById('iepAccommodationNotes');
    iepAccommodationNotesDiv.innerHTML = ''; // Очистка существующего содержимого

    data.iepAccommodationNotes.forEach(note => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';

        const deleteButton = document.createElement('button');
        deleteButton.className = 'button-icon';
        deleteButton.innerHTML = '<i class="icomoon-x"></i>';

        const editButton = document.createElement('button');
        editButton.className = 'button-icon';
        editButton.innerHTML = '<i class="icon icomoon-pencil"></i>';

        const p = document.createElement('p');
        p.textContent = `${note.date} - ${note.author}: ${note.note}`;

        commentDiv.appendChild(deleteButton);
        commentDiv.appendChild(editButton);
        commentDiv.appendChild(p);

        iepAccommodationNotesDiv.appendChild(commentDiv);
    });

    // Заполнение других данных
    document.getElementById('loginName').textContent = data.loginName;
    document.getElementById('fullName').textContent = data.fullName;
    document.getElementById('preferredName').textContent = data.preferredName;
    document.getElementById('telephone').textContent = data.telephone;
    document.getElementById('email').textContent = data.email;
    document.getElementById('gender').textContent = data.gender;
    document.getElementById('dateOfBirth').textContent = `${data.dateOfBirth} (Age: ${data.age})`;
    document.getElementById('address').textContent = data.address;
    document.getElementById('homeSchool').textContent = data.homeSchool;
    document.getElementById('parent1').textContent = data.parent1;
    document.getElementById('parentTelephone').textContent = data.parentTelephone;
    document.getElementById('registrationDate').textContent = data.registrationDate;
    document.getElementById('lastLoggedIn').textContent = `${data.lastLoggedIn} (${data.lastLoggedInDuration})`;
    document.getElementById('ocas').textContent = data.ocas;
    document.getElementById('oen').textContent = data.oen;

    const communicationNotesDiv = document.getElementById('communicationNotes');
    data.communicationNotes.forEach(note => {
        const p = document.createElement('p');
        p.textContent = `${note.date} - ${note.author}: ${note.note}`;
        communicationNotesDiv.appendChild(p);
    });

    document.getElementById('notes').textContent = data.notes || 'No additional notes';
    document.getElementById('accountType').textContent = data.accountType;
    document.getElementById('inactivityNotices').textContent = data.inactivityNotices ? 'Enabled' : 'Disabled';
    document.getElementById('iepFlag').textContent = data.iepFlag ? 'IEP Active' : 'No IEP';
    document.getElementById('referredBy').textContent = data.referredBy;
    document.getElementById('webBrowsersUsed').textContent = data.webBrowsersUsed;
});



// document.addEventListener('DOMContentLoaded', function() {

//     const jsonFilePath = 'js/studentData.json';


//     fetch(jsonFilePath)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(data => {

//             document.getElementById('loginName').textContent = data.loginName;
//             document.getElementById('fullName').textContent = data.fullName;
//             document.getElementById('preferredName').textContent = data.preferredName;
//             document.getElementById('telephone').textContent = data.telephone;
//             document.getElementById('email').textContent = data.email;
//             document.getElementById('gender').textContent = data.gender;
//             document.getElementById('dateOfBirth').textContent = `${data.dateOfBirth} (Age: ${data.age})`;
//             document.getElementById('address').textContent = data.address;
//             document.getElementById('homeSchool').textContent = data.homeSchool;
//             document.getElementById('parent1').textContent = data.parent1;
//             document.getElementById('parentTelephone').textContent = data.parentTelephone;
//             document.getElementById('registrationDate').textContent = data.registrationDate;
//             document.getElementById('lastLoggedIn').textContent = `${data.lastLoggedIn} (${data.lastLoggedInDuration})`;
//             document.getElementById('ocas').textContent = data.ocas;
//             document.getElementById('oen').textContent = data.oen;

//             const communicationNotesDiv = document.getElementById('communicationNotes');
//             data.communicationNotes.forEach(note => {
//                 const p = document.createElement('p');
//                 p.textContent = `${note.date} - ${note.author}: ${note.note}`;
//                 communicationNotesDiv.appendChild(p);
//             });

//             document.getElementById('notes').textContent = data.notes || 'No additional notes';

//             document.getElementById('accountType').textContent = data.accountType;

//             document.getElementById('inactivityNotices').textContent = data.inactivityNotices ? 'Enabled' : 'Disabled';

//             document.getElementById('iepFlag').textContent = data.iepFlag ? 'IEP Active' : 'No IEP';

//             const teacherCommunicationNotesDiv = document.getElementById('teacherCommunicationNotes');
//             data.teacherCommunicationNotes.forEach(note => {
//                 const p = document.createElement('p');
//                 p.textContent = `${note.date} - ${note.course}: ${note.note}`;
//                 teacherCommunicationNotesDiv.appendChild(p);
//             });

//             document.getElementById('referredBy').textContent = data.referredBy;

//             document.getElementById('webBrowsersUsed').textContent = data.webBrowsersUsed;
//         })
//         .catch(error => {
//             console.error('Error loading JSON data:', error);
//         });
// });