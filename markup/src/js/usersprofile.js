document.addEventListener('DOMContentLoaded', function() {

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
        "attachmentsList": [
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
        ],
        "transactions": [{
                "transactionId": "80036",
                "courses": ["SCH4U", "Chemistry"],
                "ecoupon": "INTERNATIONAL FEE APPLIED",
                "checkoutPaid": 824.00,
                "actualPaid": 574.00,
                "internationalFeesPaid": true,
                "refund": "MCV4U",
                "notes": "Important transaction",
                "name": "John Doe",
                "email": "john.doe@example.com",
                "phone": "123-456-7890",
                "referralAccount": "None Found"
            },
            {
                "transactionId": "80037",
                "courses": ["ENG4U", "English"],
                "ecoupon": "DISCOUNT 20%",
                "checkoutPaid": 500.00,
                "actualPaid": 500.00,
                "internationalFeesPaid": false,
                "refund": "ENG3U",
                "notes": "Standard transaction",
                "name": "Jane Smith",
                "email": "jane.smith@example.com",
                "phone": "987-654-3210",
                "referralAccount": "Referred by Friend"
            },
            {
                "transactionId": "80038",
                "courses": ["MCV4U", "Mathematics"],
                "ecoupon": "NO COUPON",
                "checkoutPaid": 1000.00,
                "actualPaid": 750.00,
                "internationalFeesPaid": true,
                "refund": "N/A",
                "notes": "Partial refund applied",
                "name": "Alex Brown",
                "email": "alex.brown@example.com",
                "phone": "555-123-4567",
                "referralAccount": "None Found"
            }
        ]
    };
    console.log(data.loginName); // Check if this logs the expected value

    function addAttachment(file, attachmentsListElement) {
        const attachmentItem = document.createElement('div');
        attachmentItem.className = 'attachment-item';

        const fileLink = document.createElement('a');
        fileLink.href = file.url || '#';
        fileLink.textContent = file.name;

        const removeButton = document.createElement('button');
        removeButton.className = 'btn btn-danger';
        removeButton.textContent = 'Remove';


        removeButton.addEventListener('click', function() {
            attachmentItem.remove();
        });

        attachmentItem.appendChild(fileLink);
        attachmentItem.appendChild(removeButton);
        attachmentsListElement.appendChild(attachmentItem);
    }


    const attachmentsList = document.getElementById('attachmentsList');
    data.attachmentsList.forEach(file => {
        addAttachment(file, attachmentsList);
    });


    const fileInput = document.getElementById('fileInput');
    const addFileButton = document.getElementById('addFileButton');

    addFileButton.addEventListener('click', function() {
        const files = fileInput.files;
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                addAttachment({ name: files[i].name, url: '#' }, attachmentsList);
            }

            fileInput.value = '';
        }
    });

    const attachmentsListApplications = document.getElementById('attachmentsListApplications');
    const fileInputApplications = document.getElementById('fileInputApplications');

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
    });


    const iepAccommodationNotesDiv = document.getElementById('iepAccommodationNotes');
    iepAccommodationNotesDiv.innerHTML = '';

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
    document.getElementById('notes').textContent = data.notes || 'No additional notes';
    document.getElementById('accountType').textContent = data.accountType;
    document.getElementById('inactivityNotices').textContent = data.inactivityNotices ? 'Enabled' : 'Disabled';
    document.getElementById('referredBy').textContent = data.referredBy;
    document.getElementById('webBrowsersUsed').textContent = data.webBrowsersUsed;

    function renderTransaction(transaction, index) {
        const transactionSection = document.getElementById('transaction-item');

        const accordionHeader = document.createElement('div');
        accordionHeader.className = 'accordion-header blue';
        accordionHeader.setAttribute('role', 'tab');
        accordionHeader.setAttribute('aria-expanded', 'false');
        accordionHeader.setAttribute('aria-selected', 'false');
        accordionHeader.setAttribute('tabindex', '0');
        accordionHeader.id = `transaction-${index}`;

        accordionHeader.innerHTML = `
            <span>Transaction ID: <strong>${transaction.transactionId}</strong></span>
            <span>Courses: <strong>${transaction.courses.join(', ')}</strong></span>
            <span>ECoupon: <strong>${transaction.ecoupon}</strong></span>
            <span>Checkout Paid: <strong>$${transaction.checkoutPaid.toFixed(2)}</strong></span>
        `;

        const accContainer = document.createElement('div');
        accContainer.className = 'acc-container';
        accContainer.style.display = 'none';

        accContainer.innerHTML = `
            <div class="container mt-4">
                <div class="form-group">
                    <label for="notes-${index}" class="font-weight-bold">NOTES:</label>
                    <div class="mt-2">
                        <button type="button" class="btn btn-secondary mb-3">Send Receipt</button>
                        <button type="button" class="btn btn-secondary mb-3">Send Receipt to Email</button>
                    </div>
                    <p>${transaction.notes || 'No additional notes'}</p>
                </div>

                <div class="form-group mt-4">
                    <label for="actual_paid-${index}" class="font-weight-bold">Actual Paid:</label>
                    <div class="align-items-center mt-2">
                        <span>$</span>
                        <input type="text" id="actual_paid-${index}" class="form-control ml-2" value="${transaction.actualPaid.toFixed(2)}" style="width: 100px;">
                        <button type="button" class="btn btn-secondary ml-2">Save</button>
                    </div>
                </div>

                <div class="form-group mt-4">
                    <label class="custom-checkbox dropdown-option d-flex align-items-center">
                        <input type="checkbox" id="international_fees_paid-${index}" ${transaction.internationalFeesPaid ? 'checked' : ''}>
                        <span class="checkmark"></span>
                        <div class="title ml-2">International Fees Paid</div>
                    </label>
                </div>

                <div class="form-group mt-4">
                    <label for="refund-${index}" class="font-weight-bold">Refund</label>
                    <input type="text" id="refund-${index}" class="form-control mt-2" value="${transaction.refund}" style="width: 150px;">
                </div>

                <hr class="mt-4">

                <div class="form-group">
                    <p><strong>Name:</strong> ${transaction.name}</p>
                    <p><strong>Email:</strong> ${transaction.email}</p>
                    <p><strong>Phone:</strong> ${transaction.phone}</p>
                    <p><strong>Referral Account:</strong> ${transaction.referralAccount}</p>
                </div>
            </div>
        `;

        accordionHeader.addEventListener('click', function() {
            const isExpanded = accordionHeader.getAttribute('aria-expanded') === 'true';
            accordionHeader.setAttribute('aria-expanded', !isExpanded);
            accContainer.style.display = isExpanded ? 'none' : 'block';
        });

        transactionSection.appendChild(accordionHeader);
        transactionSection.appendChild(accContainer);
    }

    data.transactions.forEach((transaction, index) => {
        renderTransaction(transaction, index);
    });
});