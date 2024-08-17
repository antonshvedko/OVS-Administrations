document.addEventListener("DOMContentLoaded", function() {
    // Fullscreen toggle
    var myElement = document.getElementById("myElement");
    if (myElement) {
        myElement.addEventListener("click", function() {
            toggleFullScreen(document.documentElement);
        });
    }

    // Handle individual row selection
    document.querySelectorAll('.selectRow').forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            var row = this.closest('.responsive-table__row');
            if (this.checked) {
                row.classList.add('selected-row');
            } else {
                row.classList.remove('selected-row');
            }
            updateBodyClass();
        });
    });

    // Expand/collapse row functionality
    document.querySelectorAll('.responsive-table__row').forEach(function(row) {
        row.addEventListener('click', function() {
            this.classList.toggle('expanded');
            updateBodyClass();
        });
    });

    function updateBodyClass() {
        var checkedItems = document.querySelectorAll('.selectRow:checked').length;

        if (checkedItems === 0) {
            console.log('Выбрано 0 элементов');
            document.body.classList.remove('has-selected-rows', 'item-rows-1', 'item-rows-2');
        } else if (checkedItems === 1) {
            console.log('Выбран 1 элемент');
            document.body.classList.add('has-selected-rows', 'item-rows-1');
            document.body.classList.remove('item-rows-2');
        } else if (checkedItems >= 2) {
            document.body.classList.add('has-selected-rows', 'item-rows-2');
            document.body.classList.remove('item-rows-1');
        }
    }



    var initSideMenu = function initSideMenu() {
        var sideMenuBtn = document.getElementsByClassName('js-toggle-side-menu')[0],
            sideMenuBtnSecondLevel = document.querySelectorAll('.js-toggle-second-level-menu'),
            body = document.getElementsByTagName('body')[0],
            sideMenu = document.getElementsByClassName('js-side-menu')[0];

        var openSideNavigation = function openSideNavigation() {
            body.classList.remove('side-menu-closed');
        };

        var closeSideNavigation = function closeSideNavigation() {
            body.classList.add('side-menu-closed');
        };

        var closeSecondLevel = function closeSecondLevel() {
            var subMenuCollapseElementList = document.querySelectorAll('.js-sub-menu-collapse');
            subMenuCollapseElementList.forEach(function(element) {
                var instance = bootstrap.Collapse.getInstance(element);
                if (instance !== null) {
                    instance.hide();
                }
            });
        };

        if (sideMenuBtn) {
            sideMenuBtn.addEventListener('click', function() {
                if (body.classList.contains('side-menu-closed')) {
                    openSideNavigation();
                } else {
                    closeSideNavigation();
                }
            });
        }

        var readyForClose = true;

        sideMenuBtnSecondLevel.forEach(function(btn) {
            btn.addEventListener('click', function() {
                readyForClose = false;
                closeSecondLevel();
                openSideNavigation();
                setTimeout(function() {
                    readyForClose = true;
                }, 100);
            });
        });

        var mouseEnterToSecondLevelMenu = false;

        document.querySelectorAll('.js-second-level-menu').forEach(function(menu) {
            menu.addEventListener('mouseenter', function() {
                mouseEnterToSecondLevelMenu = true;
            });

            menu.addEventListener('mouseleave', function() {
                setTimeout(function() {
                    mouseEnterToSecondLevelMenu = false;
                }, 10);
            });
        });

        sideMenu.addEventListener('mousemove', function(e) {
            if (!e.target.closest('.js-second-level-menu') && body.classList.contains('second-level-menu-opened') && mouseEnterToSecondLevelMenu && readyForClose) {
                closeSecondLevel();
                openSideNavigation();
            }
        });

        sideMenu.addEventListener('mouseenter', function() {
            if (!body.classList.contains('second-level-menu-opened')) {
                openSideNavigation();
            }
        });

        sideMenu.addEventListener('mouseleave', function(e) {
            if (readyForClose && !body.classList.contains('second-level-menu-opened')) {
                closeSecondLevel();
                closeSideNavigation();
            }
        });

        // Обновленный обработчик кликов по телу страницы
        body.addEventListener('click', function(e) {
            // Если клик был вне бокового меню и его кнопок, закройте второе меню
            if (!e.target.closest('.js-side-menu') && !e.target.closest('.js-toggle-side-menu') && !e.target.closest('.js-toggle-second-level-menu') && !e.target.closest('.js-second-level-menu')) {

            }
        });

        var sideMenuWrap = document.getElementById('side-menu');
        if (sideMenuWrap) {
            sideMenuWrap.addEventListener('show.bs.collapse', function(event) {
                body.classList.add('second-level-menu-opened');
                setTimeout(function() {
                    closeSideNavigation();
                }, 10);
            });

            sideMenuWrap.addEventListener('hide.bs.collapse', function(event) {
                body.classList.remove('second-level-menu-opened');
            });
        }
    };

    document.addEventListener('DOMContentLoaded', initSideMenu);


    // STOP ANIMATIONS DURING WINDOW RESIZING
    var initStopAnimationsDuringWindowResizing = function initStopAnimationsDuringWindowResizing() {
        var resizeTimer;

        window.addEventListener('resize', function() {
            document.body.classList.add('resize-animation-stopper');

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(function() {
                document.body.classList.remove('resize-animation-stopper');
            }, 400);
        });
    };

    initSideMenu();
    initStopAnimationsDuringWindowResizing();
});

function toggleFullScreen(elem) {
    function closeSecondLevel() {
        var subMenuCollapseElementList = document.querySelectorAll('.js-sub-menu-collapse');
        subMenuCollapseElementList.forEach(function(element) {
            var instance = bootstrap.Collapse.getInstance(element);
            if (instance !== null) {
                instance.hide();
            }
        });
    }

    if (!document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement) {

        closeSecondLevel();

        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
        document.body.classList.add("fullscreen");
    } else {
        closeSecondLevel();

        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        document.body.classList.remove("fullscreen");
    }
}
(function() {
    var CheckboxDropdown = function(el) {
        var _this = this;
        this.isOpen = false;
        this.areAllChecked = false;
        this.el = el;
        this.label = this.el.querySelector('.dropdown-label');
        this.closeBtn = this.el.querySelector('.closeDropdown');
        this.inputs = this.el.querySelectorAll('[type="checkbox"]');

        this.onCheckBox();

        this.label.addEventListener('click', function(e) {
            e.preventDefault();
            _this.toggleOpen();
        });

        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                _this.toggleOpen(false);
            });
        }

        this.inputs.forEach(function(input) {
            input.addEventListener('change', function(e) {
                _this.onCheckBox();
            });
        });
    };

    CheckboxDropdown.prototype.onCheckBox = function() {
        this.updateStatus();
    };

    CheckboxDropdown.prototype.updateStatus = function() {
        var checked = this.el.querySelectorAll(':checked');

        this.areAllChecked = false;

        if (checked.length <= 0) {
            // this.label.innerHTML = 'Select options';
        } else if (checked.length === this.inputs.length) {
            this.label.innerHTML = 'All Selected';
            this.areAllChecked = true;
        } else {
            var selectedTexts = Array.from(checked).map(function(input) {
                return input.parentNode.textContent.trim();
            }).join(', ');
            this.label.innerHTML = selectedTexts;
        }
    };

    CheckboxDropdown.prototype.toggleOpen = function(forceOpen) {
        var _this = this;

        if (!this.isOpen || forceOpen) {
            var otherDropdowns = this.el.closest('.filter-container').querySelectorAll('[data-control="checkbox-dropdown"].on');
            otherDropdowns.forEach(function(dropdown) {
                if (dropdown !== _this.el) {
                    dropdown.classList.remove('on');
                    dropdown.querySelector('.dropdown-label').dataset.instance.isOpen = false;
                }
            });

            this.isOpen = true;
            this.el.classList.add('on');

            document.addEventListener('click', function clickHandler(e) {
                if (!e.target.closest('[data-control="checkbox-dropdown"]')) {
                    _this.toggleOpen(false);
                    document.removeEventListener('click', clickHandler);
                }
            });
        } else {
            this.isOpen = false;
            this.el.classList.remove('on');
        }
    };

    document.addEventListener('DOMContentLoaded', function() {
        var checkboxesDropdowns = document.querySelectorAll('[data-control="checkbox-dropdown"]');
        checkboxesDropdowns.forEach(function(dropdown) {
            var instance = new CheckboxDropdown(dropdown);
            dropdown.querySelector('.dropdown-label').dataset.instance = instance;
        });
    });
})();



document.addEventListener('DOMContentLoaded', function() {

    var successButton = document.getElementById('success');
    var modals = document.querySelectorAll('.modal');
    var mainContent = document.getElementById('mainContent');
    var formContent = document.getElementById('formContent');
    formContent.style.display = 'none';

    successButton.addEventListener('click', function() {

        modals.forEach(function(modal) {
            modal.style.display = 'none';
        });

        if (mainContent) {
            mainContent.style.display = 'none';
            formContent.style.display = 'block';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var dropdownElement = document.querySelector('.dropdown-toggle');
    dropdownElement.addEventListener('click', function() {});
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('openSearch').addEventListener('click', function() {
        var searchMain = document.querySelector('.searchMain');
        searchMain.style.display = 'block';
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var rows = document.querySelectorAll('.responsive-table__row');
    if (rows.length > 0) {
        rows.forEach(function(row) {
            row.addEventListener('click', function() {
                console.log("Row clicked:", this);
                this.classList.toggle('clicked-row');
            });
        });
    } else {
        console.log("No rows found with class 'responsive-table__row'");
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // Select all elements with the class 'btn-account'
    var buttons = document.querySelectorAll('.btn-account');

    // Check if buttons are found
    if (buttons.length > 0) {
        console.log(buttons.length + " buttons found");

        buttons.forEach(function(button) {
            button.addEventListener('click', function(event) {
                event.stopPropagation(); // Prevent the click event from propagating further
                this.classList.toggle('show');
                var dropdownMenu = this.nextElementSibling;
                if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                    dropdownMenu.classList.toggle('show');
                }
            });
        });
    } else {
        console.log("No buttons found with class 'btn-account'");
    }

    // Close the dropdown if clicking outside
    document.addEventListener('click', function(event) {
        buttons.forEach(function(button) {
            var dropdownMenu = button.nextElementSibling;
            if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                if (!button.contains(event.target) && !dropdownMenu.contains(event.target)) {
                    button.classList.remove('show');
                    dropdownMenu.classList.remove('show');
                }
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    var dropdownToggle = document.getElementById('dropdownMenuButton');
    var dropdownMenu = document.getElementById('dropdownMenu');

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent the click event from bubbling up to the document
            var isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
            dropdownToggle.setAttribute('aria-expanded', !isExpanded);
            dropdownMenu.style.display = isExpanded ? 'none' : 'block';
        });

        // Close the dropdown menu when clicking outside of it
        document.addEventListener('click', function(event) {
            if (!dropdownToggle.contains(event.target)) {
                dropdownMenu.style.display = 'none';
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
});



document.addEventListener('DOMContentLoaded', function() {
    var accountButton = document.getElementById('accountButton');
    var accountDropdownMenu = document.getElementById('accountDropdownMenu');

    accountButton.addEventListener('click', function(event) {
        event.stopPropagation();
        accountDropdownMenu.style.display = accountDropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', function(event) {
        if (!accountButton.contains(event.target)) {
            accountDropdownMenu.style.display = 'none';
        }
    });
});


window.onload = function() {
    window.onload = function() {
        var searchInputs = document.querySelectorAll('.search-input');

        searchInputs.forEach(function(searchInput) {
            searchInput.addEventListener('keyup', function() {
                var searchTerm = this.value.toLowerCase();
                var container = this.closest('.search-container');
                var options = container.querySelectorAll('.searchEnable .dropdown-option');
                var noResults = container.querySelector('.no-results');
                var matchFound = false;

                options.forEach(function(option) {
                    var titleText = option.querySelector('.title').textContent.toLowerCase();

                    if (titleText.includes(searchTerm)) {
                        option.style.display = 'flex';
                        matchFound = true;
                    } else {
                        option.style.display = 'none';
                    }
                });

                if (!matchFound) {
                    noResults.style.display = 'flex';
                } else {
                    noResults.style.display = 'none';
                }
            });
        });
    };
};

document.addEventListener('DOMContentLoaded', function() {
    const filterOpenElement = document.querySelector('.filterOpen');
    if (filterOpenElement) {
        filterOpenElement.addEventListener('click', function(event) {
            event.preventDefault();
            const filterContainer = document.querySelector('.filter-container');
            if (filterContainer) {
                filterContainer.classList.toggle('active');
            }
            filterOpenElement.classList.toggle('active');
        });
    }
});


window.onload = function() {
        const users = [{
                "Id": 1,
                "Name": "Jessica Hanson",
                "Email": "jessica.hanson@example.com",
                "Status": [
                    { "icon": "text", "name": "18+" },
                    { "icon": "icomoon-briefcase", "name": "Business" },
                    { "icon": "icomoon-flag red", "name": "Red Flag" },
                    { "icon": "icomoon-man", "name": "Adult" }
                ],
                "Flag": "red",
                "CreationDate": "2020-05-03",
                "LastLogin": "30 days ago",
                "Courses": ["ENG4U-03", "ENG4U-03", "ENG4U-03", "ENG4U-03"]
            },
            {
                "Id": 2,
                "Name": "Jessica Hanson",
                "Email": "jessica.hanson@example.com",
                "Status": [
                    { "icon": "text", "name": "18+" },
                    { "icon": "icomoon-briefcase", "name": "Business" },
                    { "icon": "icomoon-flag blue", "name": "Blue Flag" },
                    { "icon": "icomoon-man", "name": "Adult" }
                ],
                "Flag": "blue",
                "CreationDate": "2020-05-03",
                "LastLogin": "10 days ago",
                "Courses": ["ENG4U-03", "ENG4U-03", "ENG4U-03", "ENG4U-03"]
            },
            {
                "Id": 3,
                "Name": "Jessica Hanson",
                "Email": "jessica.hanson@example.com",
                "Status": [
                    { "icon": "text", "name": "18+" },
                    { "icon": "icomoon-briefcase", "name": "Business" },
                    { "icon": "icomoon-flag green", "name": "Green Flag" },
                    { "icon": "icomoon-man", "name": "Adult" }
                ],
                "Flag": "green",
                "CreationDate": "2020-05-03",
                "LastLogin": "23 days ago",
                "Courses": ["TYIOF-03", "ENG4U-03", "ENG4U-03", "ENG4U-03"]
            },
            {
                "Id": 4,
                "Name": "Jessica Hanson",
                "Email": "jessica.hanson@example.com",
                "Status": [
                    { "icon": "text", "name": "18+" },
                    { "icon": "icomoon-briefcase", "name": "Business" },
                    { "icon": "icomoon-flag green", "name": "Green Flag" },
                    { "icon": "icomoon-man", "name": "Adult" }
                ],
                "Flag": "green",
                "CreationDate": "2020-05-03",
                "LastLogin": "23 days ago",
                "Courses": ["TYIOF-03", "ENG4U-03", "ENG4U-03", "ENG4U-03"]
            },
        ];

        const usersPerPage = 2; // Number of users per page
        let currentPage = 1;
        let filteredUsers = [...users]; // Filtered list of users, initially contains all users

        // Function to display users with pagination
        function displayUsers(usersToDisplay, page, perPage) {
            // Display the skeleton while changing pages
            displaySkeleton(perPage);

            // Simulate a short delay before displaying the paginated users
            setTimeout(() => {
                const userTableBody = document.querySelector('.responsive-table.users .responsive-table__body');
                userTableBody.innerHTML = ''; // Clear the table before adding new data

                const start = (page - 1) * perPage;
                const end = start + perPage;
                const paginatedUsers = usersToDisplay.slice(start, end);

                paginatedUsers.forEach(user => addUserRow(user));
                document.getElementById('total-count-users').textContent = usersToDisplay.length;

                // Update pagination controls
                document.getElementById('prev-page').classList.toggle('disabled', page === 1);
                document.getElementById('next-page').classList.toggle('disabled', end >= usersToDisplay.length);
                document.getElementById('current-page').value = page;

                // Re-initialize the "Select all" functionality after rendering rows
                initSelectAll();

                // Initialize row selection and expand/collapse functionality
                initRowInteractions();
            }, 500); // Adjust the delay (500ms) as needed for the skeleton visibility
        }

        // Function to filter users
        function filterUsers() {
            // Combine input from both search fields
            const query1 = document.getElementById('users-search').value.toLowerCase();
            const query2 = document.getElementById('users-search-1').value.toLowerCase();
            const combinedQuery = `${query1} ${query2}`.trim(); // Combine and trim the queries

            const selectedStatuses = Array.from(document.querySelectorAll('#user-status .dropdown-option input[type="checkbox"]:checked')).map(cb => cb.value.toLowerCase());
            const selectedCourses = Array.from(document.querySelectorAll('#user-courses .dropdown-option input[type="checkbox"]:checked')).map(cb => cb.value.toLowerCase());

            // Determine the number of users that would match the filter
            const filteredUsersCount = users.filter(user => {
                const matchesSearch = user.Name.toLowerCase().includes(combinedQuery) ||
                    user.Email.toLowerCase().includes(combinedQuery) ||
                    user.Courses.join(',').toLowerCase().includes(combinedQuery);

                const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.every(status =>
                    user.Status.some(userStatus => userStatus.name.toLowerCase() === status)
                );

                const matchesCourses = selectedCourses.length === 0 || selectedCourses.every(course =>
                    user.Courses.map(c => c.toLowerCase()).includes(course)
                );

                return matchesSearch && matchesStatus && matchesCourses;
            }).length;

            // Display the skeleton while filtering, with a number of skeleton rows equal to filteredUsersCount
            displaySkeleton(Math.min(filteredUsersCount, usersPerPage));

            // Simulate a short delay before displaying the filtered users
            setTimeout(() => {
                filteredUsers = users.filter(user => {
                    const matchesSearch = user.Name.toLowerCase().includes(combinedQuery) ||
                        user.Email.toLowerCase().includes(combinedQuery) ||
                        user.Courses.join(',').toLowerCase().includes(combinedQuery);

                    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.every(status =>
                        user.Status.some(userStatus => userStatus.name.toLowerCase() === status)
                    );

                    const matchesCourses = selectedCourses.length === 0 || selectedCourses.every(course =>
                        user.Courses.map(c => c.toLowerCase()).includes(course)
                    );

                    return matchesSearch && matchesStatus && matchesCourses;
                });

                // Reset current page to the first one after filtering
                currentPage = 1;
                displayUsers(filteredUsers, currentPage, usersPerPage);
            }, 500); // Adjust the delay (500ms) as needed for the skeleton visibility
        }

        // Attach event listeners
        document.getElementById('prev-page').addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                displayUsers(filteredUsers, currentPage, usersPerPage);
            }
        });

        document.getElementById('next-page').addEventListener('click', function() {
            if (currentPage * usersPerPage < filteredUsers.length) {
                currentPage++;
                displayUsers(filteredUsers, currentPage, usersPerPage);
            }
        });

        document.getElementById('current-page').addEventListener('input', function() {
            let pageNumber = parseInt(this.value);
            if (pageNumber > 0 && pageNumber <= Math.ceil(filteredUsers.length / usersPerPage)) {
                currentPage = pageNumber;
                displayUsers(filteredUsers, currentPage, usersPerPage);
            }
        });

        document.getElementById('users-search').addEventListener('input', function() {
            filterUsers();
        });

        document.getElementById('users-search-1').addEventListener('input', function() {
            filterUsers();
        });

        const statusCheckboxes = document.querySelectorAll('#user-status .dropdown-option input[type="checkbox"]');
        statusCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                filterUsers();
            });
        });

        const courseCheckboxes = document.querySelectorAll('#user-courses .dropdown-option input[type="checkbox"]');
        courseCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                filterUsers();
            });
        });

        // Simulate a long load time
        setTimeout(() => {
            displayUsers(filteredUsers, currentPage, usersPerPage);
        }, 1000);

        // Display skeleton during data loading with 10 skeleton rows initially
        displaySkeleton(10);

        // Function to initialize the "Select all" functionality
        function initSelectAll() {
            const selectAllCheckbox = document.getElementById('select-all');
            if (selectAllCheckbox) {
                selectAllCheckbox.addEventListener('change', function() {
                    const isChecked = this.checked;
                    const rows = document.querySelectorAll('.responsive-table__row');
                    rows.forEach(function(row) {
                        const checkbox = row.querySelector('.selectRow');
                        if (checkbox) {
                            checkbox.checked = isChecked;
                            if (isChecked) {
                                row.classList.add('selected-row');
                            } else {
                                row.classList.remove('selected-row');
                            }
                        }
                    });
                    updateBodyClass(); // Update the body class after the selection
                });
            }
        }

        // Function to initialize row interactions (selection and expand/collapse)
        function initRowInteractions() {
            // Handle individual row selection
            document.querySelectorAll('.selectRow').forEach(function(checkbox) {
                checkbox.addEventListener('change', function() {
                    var row = this.closest('.responsive-table__row');
                    if (this.checked) {
                        row.classList.add('selected-row');
                    } else {
                        row.classList.remove('selected-row');
                    }
                    updateBodyClass();
                });
            });

            // Expand/collapse row functionality
            document.querySelectorAll('.responsive-table__row').forEach(function(row) {
                row.addEventListener('click', function() {
                    this.classList.toggle('expanded');
                    updateBodyClass();
                });
            });
        }

        // Function to update body class based on row selection
        function updateBodyClass() {
            var checkedItems = document.querySelectorAll('.selectRow:checked').length;

            if (checkedItems === 0) {
                console.log('Selected 0 items');
                document.body.classList.remove('has-selected-rows', 'item-rows-1', 'item-rows-2');
            } else if (checkedItems === 1) {
                console.log('Selected 1 item');
                document.body.classList.add('has-selected-rows', 'item-rows-1');
                document.body.classList.remove('item-rows-2');
            } else if (checkedItems >= 2) {
                document.body.classList.add('has-selected-rows', 'item-rows-2');
                document.body.classList.remove('item-rows-1');
            }
        }

        // Adding a user row to the table
        function addUserRow(userData) {
            const userTableBody = document.querySelector('.responsive-table.users .responsive-table__body');

            const newRow = document.createElement('tr');
            newRow.classList.add('responsive-table__row');

            const nameCell = document.createElement('td');
            nameCell.classList.add('responsive-table__body__text', 'main-item', 'responsive-table__body__text--name');
            nameCell.innerHTML = `
            <label class="custom-checkbox">
                <input type="checkbox" class="selectRow">
                <span class="checkmark"></span>
            </label>
            <div class="main-item-holder">
                <div class="content">
                    <span class="name pr">${userData.Name}</span>
                </div>
                <div class="content autor">
                    <div class="d-flex flex-wrap icon-row">
                        ${userData.Status.map(status => status.icon === 'text' ? `<span class="icon" title="${status.name}">${status.name}</span>` : `<i class="icon ${status.icon}" title="${status.name}"></i>`).join('')}
                    </div>
                </div>
            </div>
        `;

        const emailCell = document.createElement('td');
        emailCell.classList.add('responsive-table__body__text', 'responsive-table__body__text--status');
        emailCell.innerHTML = `
            <div class="mobile-holder">
                <div class="lebel-mobile">Contact info</div>
                <div class="email">${userData.Email}</div>
            </div>
        `;

        const statusCell = document.createElement('td');
        statusCell.classList.add('responsive-table__body__text', 'responsive-table__body__text--update', 'tablet-hide');
        statusCell.innerHTML = `
            <div class="mobile-holder">
                <div class="lebel-mobile">Instructor</div>
                <div class="d-flex flex-wrap icon-row">
                    ${userData.Status.map(status => status.icon === 'text' ? `<span class="icon" title="${status.name}">${status.name}</span>` : `<i class="icon ${status.icon}" title="${status.name}"></i>`).join('')}
                </div>
            </div>
        `;

        const creationDateCell = document.createElement('td');
        creationDateCell.classList.add('responsive-table__body__text', 'responsive-table__body__text--country');
        creationDateCell.innerHTML = `
            <div class="mobile-holder">
                <div class="lebel-mobile">Creation Date/ Last Login</div>
                <div class="d-flex flex-wrap">
                    <span class="pr">${userData.CreationDate}</span>
                    <span class="secondary-text">${userData.LastLogin}</span>
                </div>
            </div>
        `;

        const coursesCell = document.createElement('td');
        coursesCell.classList.add('responsive-table__body__text', 'responsive-table__body__text--types');
        coursesCell.innerHTML = `
            <div class="mobile-holder">
                <div class="lebel-mobile">Courses</div>
                <div class="d-flex flex-wrap">
                    ${userData.Courses.map(course => `<span class="main-title">${course}</span>`).join(',')}
                </div>
            </div>
        `;

        newRow.appendChild(nameCell);
        newRow.appendChild(emailCell);
        newRow.appendChild(statusCell);
        newRow.appendChild(creationDateCell);
        newRow.appendChild(coursesCell);

        userTableBody.appendChild(newRow);
    }

    // Display skeleton during data loading, based on the number of expected rows
    function displaySkeleton(numRows) {
        const userTableBody = document.querySelector('.responsive-table.users .responsive-table__body');
        userTableBody.innerHTML = ''; // Clear the table before adding the skeleton

        // Create skeleton rows based on the number of expected rows
        for (let i = 0; i < numRows; i++) {
            const skeletonRow = document.createElement('tr');
            skeletonRow.classList.add('responsive-table__row');

            skeletonRow.innerHTML = `
            <td>
                <div class="d-flex align-items-center gap-2">
                    <div class="w-100">
                        <div class="skeleton-item animate-pulse  rounded-2 mb-6 mt-6" style="height: 16px; width: 100%;"></div>
                    </div>
                </div>
            </td>
            <td>
                <div class="skeleton-item  animate-pulse  rounded-2 mb-6 mt-6" style="height: 16px; width: 100%;"></div>
            </td>
            <td>
                <div class="skeleton-item animate-pulse  rounded-2 mb-6 mt-6" style="height: 16px; width: 100%;"></div>
            </td>
            <td>
                <div class="skeleton-item animate-pulse  rounded-2 mb-6 mt-6" style="height: 16px; width: 100%;"></div>
            </td>
            <td>
                <div class="skeleton-item animate-pulse rounded-2 mb-6 mt-6" style="height: 16px; width: 100%;"></div>
            </td>
            `;

            userTableBody.appendChild(skeletonRow);
        }
    }
};