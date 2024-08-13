document.addEventListener("DOMContentLoaded", function() {
    // Fullscreen toggle
    var myElement = document.getElementById("myElement");
    if (myElement) {
        myElement.addEventListener("click", function() {
            toggleFullScreen(document.documentElement);
        });
    }

    // Select all functionality
    var selectAllCheckbox = document.getElementById('select-all');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            var isChecked = this.checked;
            var rows = document.querySelectorAll('.responsive-table__row');
            rows.forEach(function(row) {
                var checkbox = row.querySelector('.selectRow');
                if (checkbox) {
                    checkbox.checked = isChecked;
                    if (isChecked) {
                        row.classList.add('selected-row');
                    } else {
                        row.classList.remove('selected-row');
                    }
                }
            });
            updateBodyClass();
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
            console.log('Выбрано 2 или больше элементов');
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

    // Инициализация меню при загрузке страницы
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

        this.inputs = this.el.querySelectorAll('[type="checkbox"]');

        this.onCheckBox();

        this.label.addEventListener('click', function(e) {
            e.preventDefault();
            _this.toggleOpen();
        });



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
            this.isOpen = true;
            this.el.classList.add('on');
            document.addEventListener('click', function clickHandler(e) {
                if (!e.target.closest('[data-control="checkbox-dropdown"]')) {
                    _this.toggleOpen();
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
            new CheckboxDropdown(dropdown);
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



// $(document).ready(function() {
//     function checkWindowSize() {
//         if ($(window).width() < 992) {
//             $('.js-collapse-courses').addClass('show');
//         } else {
//             $('.js-collapse-courses').removeClass('show');
//         }
//     }

//     checkWindowSize();

//     $(window).resize(function() {
//         checkWindowSize();
//     });

//     $('#toggleButton').click(function(e) {
//         e.stopPropagation();
//         if ($(this).hasClass('active')) {
//             $('.js-collapse-courses').toggleClass('show');
//         }
//     });

//     $(document).click(function(e) {
//         if (!$(e.target).closest('.js-collapse-courses').length && !$(e.target).is('#toggleButton')) {
//             $('.js-collapse-courses').removeClass('show');
//         }
//     });
// });

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
    var filterOpen = document.querySelector('.filterOpen');
    var filterContainer = document.querySelector('.filter-container');

    function checkWindowSize() {
        if (window.innerWidth < 992) {
            filterOpen.style.display = 'block';
        } else {
            filterOpen.style.display = 'none';
            filterContainer.classList.remove('active');
        }
    }

    filterOpen.addEventListener('click', function(e) {
        e.preventDefault();
        filterContainer.classList.toggle('active');
    });

    checkWindowSize();

    window.addEventListener('resize', checkWindowSize);
};