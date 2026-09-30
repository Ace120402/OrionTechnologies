/* =========================
   MOBILE TOUCH CONTROLS
========================= */


/* Prevents the main screen from moving when swiping */
document.addEventListener(
    "touchmove",
    function (event) {

        /* Allows scrolling inside pages that are meant to scroll */
        if (
            event.target.closest(
                ".scroll-page"
            )
        ) {

            return;

        }


        /* Prevents the main Orion screen from moving */
        event.preventDefault();

    },
    {
        passive: false
    }
);


/* =========================
   CONSTANTS
========================= */


/* Gets the main screen element */
const screen =
    document.getElementById(
        "bios-text"
    );


/* Gets the Orion logo */
const logo =
    document.getElementById(
        "logo"
    );


/* Controls the normal typing speed */
const typingSpeed =
    20;


/* Controls menu flicker duration */
const flickerDuration =
    900;


/* Controls the blank delay after a menu disappears */
const menuDelay =
    500;


/* =========================
   ORION LOGO
========================= */


/* Starts the logo power-on effect */
setTimeout(
    function () {

        logo.classList.add(
            "logo-flicker"
        );

    },
    1000
);


/* =========================
   BIOS TEXT
========================= */


/* Text displayed during the BIOS sequence */
const biosText =
`ORION BIOS v7.4.21

Initializing system...
Neural interface........ ONLINE
AXON network............ ONLINE
Core systems............ ONLINE

Loading ORION framework...
[████████████████████] 100%

EOS CORE............... DETECTED

System ready.
Welcome.`;


/* =========================
   MENU DATA
========================= */


/* Main menu options */
const mainMenu = [

    {
        key: "1",
        text: "[ 01 ] STAFF",
        action: showStaffMenu
    },

    {
        key: "2",
        text: "[ 02 ] ARCHIVES",
        action: showArchivesMenu
    },

    {
        key: "3",
        text: "[ 03 ] EOS PROJECT",
        action: showEOSProject
    }

];


/* Staff menu options */
const staffMenu = [

    {
        key: "1",
        text: "[ 01 ] ACE",
        action: showACEGallery
    },

    {
        key: "2",
        text: "[ 02 ] EOS",
        action: showEOSGallery
    },

    {
        key: "0",
        text: "[ 00 ] RETURN",
        action: showMainMenu
    }

];


/* Archives menu options */
const archivesMenu = [

    {
        key: "1",
        text: "[ 01 ] LOG 001",
        action: function () {

            showLog(
                "LOG 001"
            );

        }
    },

    {
        key: "2",
        text: "[ 02 ] LOG 002",
        action: function () {

            showLog(
                "LOG 002"
            );

        }
    },

    {
        key: "3",
        text: "[ 03 ] LOG 003",
        action: function () {

            showLog(
                "LOG 003"
            );

        }
    },

    {
        key: "4",
        text: "[ 04 ] LOG 004",
        action: function () {

            showLog(
                "LOG 004"
            );

        }
    },

    {
        key: "5",
        text: "[ 05 ] LOG 005",
        action: function () {

            showLog(
                "LOG 005"
            );

        }
    },

    {
        key: "6",
        text: "[ 06 ] LOG 006",
        action: function () {

            showLog(
                "LOG 006"
            );

        }
    },

    {
        key: "0",
        text: "[ 00 ] RETURN",
        action: showMainMenu
    }

];


/* Stores the currently displayed menu */
let currentMenu = null;


/* Prevents interaction while typing */
let menuTyping = false;


/* =========================
   TYPING
========================= */


/* Types text onto the screen */
function typeText(
    element,
    text,
    speed = typingSpeed,
    delay = 0,
    flicker = false,
    flickerDelay = 2000,
    callback = null,
    existingCursor = null,
    blinkOnComplete = true
) {

    let index = 0;

    menuTyping = true;

    element.textContent = "";

    element.classList.remove(
        "flicker-out"
    );


    /* Uses the shared cursor when supplied */
    const cursor =
        existingCursor ||
        document.createElement(
            "span"
        );


    if (
        !existingCursor
    ) {

        cursor.classList.add(
            "cursor"
        );

    }


    /* Keeps the cursor solid while typing */
    cursor.classList.remove(
        "blinking"
    );

    cursor.style.opacity =
        "1";


    /* Places the cursor on the screen */
    element.appendChild(
        cursor
    );


    /* Waits before typing begins */
    setTimeout(
        function () {

            type();

        },
        delay
    );


    /* Types one character at a time */
    function type() {

        cursor.classList.remove(
            "blinking"
        );

        cursor.style.opacity =
            "1";


        if (
            index <
            text.length
        ) {

            cursor.before(
                document.createTextNode(
                    text.charAt(index)
                )
            );

            index++;

            setTimeout(
                type,
                speed
            );

            return;

        }


        /* Starts blinking after typing */
        if (
            blinkOnComplete
        ) {

            cursor.classList.add(
                "blinking"
            );

        }


        /* Starts flicker-out when requested */
        if (
            flicker
        ) {

            setTimeout(
                flickerOut,
                flickerDelay
            );

            return;

        }


        menuTyping = false;


        if (
            callback
        ) {

            callback();

        }

    }


    /* Flickers text before removing it */
    function flickerOut() {

        cursor.classList.remove(
            "blinking"
        );

        cursor.style.opacity =
            "1";

        menuTyping = true;

        element.classList.add(
            "flicker-out"
        );


        setTimeout(
            function () {

                element.textContent = "";

                element.classList.remove(
                    "flicker-out"
                );


                if (
                    callback
                ) {

                    callback();

                }

            },
            flickerDuration
        );

    }

}


/* =========================
   MENU CREATION
========================= */


/* Creates a clickable menu button */
function createMenuButton(
    option,
    container
) {

    const button =
        document.createElement(
            "button"
        );


    button.type =
        "button";

    button.classList.add(
        "menu-button"
    );

    button.disabled =
        true;

    button.dataset.key =
        option.key;


    button.addEventListener(
        "click",
        function () {

            selectMenuOption(
                option
            );

        }
    );


    container.appendChild(
        button
    );


    return button;

}


/* Creates a blank menu line */
function createSpacing(
    container
) {

    const spacing =
        document.createElement(
            "div"
        );


    spacing.classList.add(
        "menu-spacing"
    );


    container.appendChild(
        spacing
    );


    return spacing;

}


/* Types a complete menu */
function typeMenu(
    element,
    title,
    options
) {

    menuTyping = true;

    element.textContent = "";


    const menu =
        document.createElement(
            "div"
        );


    menu.classList.add(
        "menu"
    );


    element.appendChild(
        menu
    );


    /* Creates the header */
    const header =
        document.createElement(
            "div"
        );


    menu.appendChild(
        header
    );


    createSpacing(
        menu
    );


    /* Separates RETURN from normal options */
    const normalOptions =
        options.filter(
            function (option) {

                return option.key !== "0";

            }
        );


    const returnOption =
        options.find(
            function (option) {

                return option.key === "0";

            }
        );


    /* Creates normal buttons */
    const buttons =
        normalOptions.map(
            function (option) {

                return {

                    button:
                        createMenuButton(
                            option,
                            menu
                        ),

                    option: option

                };

            }
        );


    /* Creates RETURN */
    let returnButton = null;


    if (
        returnOption
    ) {

        createSpacing(
            menu
        );


        returnButton =
            createMenuButton(
                returnOption,
                menu
            );

    }


    /* Creates selection area */
    createSpacing(
        menu
    );


    const selection =
        document.createElement(
            "div"
        );


    selection.classList.add(
        "menu-selection"
    );


    menu.appendChild(
        selection
    );


    /* Creates one shared cursor */
    const cursor =
        document.createElement(
            "span"
        );


    cursor.classList.add(
        "cursor"
    );


    /* Types the header */
    typeText(
        header,
        title,
        typingSpeed,
        0,
        false,
        0,

        function () {

            typeOptions(
                0
            );

        },

        cursor,

        false

    );


    /* Types each option */
    function typeOptions(
        index
    ) {

        if (
            index >=
            buttons.length
        ) {

            typeReturn();

            return;

        }


        typeText(
            buttons[index].button,
            buttons[index].option.text,
            typingSpeed,
            0,
            false,
            0,

            function () {

                typeOptions(
                    index + 1
                );

            },

            cursor,

            false

        );

    }


    /* Types the RETURN option */
    function typeReturn() {

        if (
            !returnButton
        ) {

            typeSelection();

            return;

        }


        typeText(
            returnButton,
            returnOption.text,
            typingSpeed,
            0,
            false,
            0,

            typeSelection,

            cursor,

            false

        );

    }


    /* Types the selection prompt */
    function typeSelection() {

        typeText(
            selection,
            "SELECTION > ",
            typingSpeed,
            0,
            false,
            0,

            function () {

                cursor.classList.add(
                    "blinking"
                );


                buttons.forEach(
                    function (item) {

                        item.button.disabled =
                            false;

                    }
                );


                if (
                    returnButton
                ) {

                    returnButton.disabled =
                        false;

                }


                menuTyping = false;

            },

            cursor,

            false

        );

    }

}


/* =========================
   MENU TRANSITIONS
========================= */


/* Flickers the current screen before changing pages */
function flickerMenu(
    callback
) {

    menuTyping = true;


    screen
        .querySelectorAll(
            ".menu-button"
        )
        .forEach(
            function (button) {

                button.disabled =
                    true;

            }
        );


    screen
        .querySelectorAll(
            ".cursor"
        )
        .forEach(
            function (cursor) {

                cursor.classList.remove(
                    "blinking"
                );

                cursor.style.opacity =
                    "1";

            }
        );


    screen.classList.add(
        "flicker-out"
    );


    setTimeout(
        function () {

            screen.textContent = "";

            screen.classList.remove(
                "flicker-out"
            );


            /* Waits before showing the next menu */
            setTimeout(
                callback,
                menuDelay
            );

        },
        flickerDuration
    );

}


/* Handles menu selection */
function selectMenuOption(
    option
) {

    if (
        menuTyping
    ) {

        return;

    }


    /* Gets the selection prompt */
    const selection =
        screen.querySelector(
            ".menu-selection"
        );


    /* Replaces the entire selection prompt */
    if (
        selection
    ) {

        selection.textContent =
            selection.textContent +
            option.key;

    }


    /* Removes any remaining cursors from the screen */
    screen
        .querySelectorAll(
            ".cursor"
        )
        .forEach(
            function (cursor) {

                cursor.remove();

            }
        );


    /* Flickers the menu after showing the selected number */
    flickerMenu(
        function () {

            option.action();

        }
    );

}

/* =========================
   MENUS
========================= */


/* Displays the main menu */
function showMainMenu() {

    currentMenu =
        mainMenu;


    typeMenu(
        screen,
        "ORION TECHNOLOGIES",
        mainMenu
    );

}


/* Displays the staff menu */
function showStaffMenu() {

    currentMenu =
        staffMenu;


    typeMenu(
        screen,
        "STAFF",
        staffMenu
    );

}


/* Displays the archives menu */
function showArchivesMenu() {

    currentMenu =
        archivesMenu;


    typeMenu(
        screen,
        "ARCHIVES",
        archivesMenu
    );

}


/* =========================
   PAGE CREATION
========================= */


/* Creates a page with a title, content, RETURN and selection */
function showPage(
    titleText,
    contentText,
    returnAction,
    contentClass = "page-text"
) {

    currentMenu = [

        {
            key: "0",
            text: "[ 00 ] RETURN",
            action: returnAction
        }

    ];


    menuTyping = true;

    screen.textContent = "";


    const page =
        document.createElement(
            "div"
        );


    page.classList.add(
        "menu",
        "scroll-page",
        "text-page"
    );


    screen.appendChild(
        page
    );


    /* Starts the page at the top */
    page.scrollTop = 0;


    /* Creates the title */
    const title =
        document.createElement(
            "div"
        );


    page.appendChild(
        title
    );


    /* Creates the content */
    const content =
        document.createElement(
            "div"
        );


    if (
        contentClass
    ) {

        content.classList.add(
            contentClass
        );

    }


    page.appendChild(
        content
    );


    /* Creates blank line above RETURN */
    createSpacing(
        page
    );


    /* Creates RETURN button */
    const returnButton =
        createMenuButton(
            currentMenu[0],
            page
        );


    /* Creates blank line below RETURN */
    createSpacing(
        page
    );


    /* Creates selection prompt */
    const selection =
        document.createElement(
            "div"
        );


    selection.classList.add(
        "menu-selection"
    );


    page.appendChild(
        selection
    );


    /* Creates one shared cursor */
    const cursor =
        document.createElement(
            "span"
        );


    cursor.classList.add(
        "cursor"
    );


    /* Types the title */
    typeText(
        title,
        titleText,
        typingSpeed,
        0,
        false,
        0,

        function () {

            typeText(
                content,
                contentText,
                typingSpeed,
                0,
                false,
                0,

                function () {

                    typeText(
                        returnButton,
                        "[ 00 ] RETURN",
                        typingSpeed,
                        0,
                        false,
                        0,

                        function () {

                            typeText(
                                selection,
                                "SELECTION > ",
                                typingSpeed,
                                0,
                                false,
                                0,

                                function () {

                                    cursor.classList.add(
                                        "blinking"
                                    );


                                    returnButton.disabled =
                                        false;


                                    menuTyping =
                                        false;

                                },

                                cursor,

                                false

                            );

                        },

                        cursor,

                        false

                    );

                },

                cursor,

                false

            );

        },

        cursor,

        false

    );

}


/* =========================
   GALLERY PAGES
========================= */


/* Creates the gallery viewer */
function openGalleryImage(
    imageSource,
    artist
) {

    const viewer =
        document.createElement(
            "div"
        );


    viewer.classList.add(
        "gallery-viewer"
    );


    /* Creates the separate black background */
    const background =
        document.createElement(
            "div"
        );


    background.classList.add(
        "gallery-viewer-background"
    );


    /* Creates the container for the image and credit */
    const viewerContent =
        document.createElement(
            "div"
        );


    viewerContent.classList.add(
        "gallery-viewer-content"
    );


    const image =
        document.createElement(
            "img"
        );


    image.src =
        imageSource;

    image.alt =
        "Gallery image";


    const credit =
        document.createElement(
            "div"
        );


    /* Uses the normal site text style for the artist credit */
    credit.classList.add(
        "normaltext",
        "gallery-credit"
    );


    credit.textContent =
        "Artist: " + artist;


    viewerContent.appendChild(
        image
    );


    viewerContent.appendChild(
        credit
    );


    viewer.appendChild(
        background
    );


    viewer.appendChild(
        viewerContent
    );


    /* Adds the viewer to the page */
    document.body.appendChild(
        viewer
    );


    /* Starts both animations independently */
    setTimeout(
        function () {

            background.classList.add(
                "gallery-viewer-fade-in"
            );


            viewerContent.classList.add(
                "gallery-viewer-slide-in"
            );

        },
        10
    );


    /* Closes the viewer when the background is clicked */
    viewer.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                viewer ||
                event.target ===
                background
            ) {

                /* Fades the black background out */
                background.classList.remove(
                    "gallery-viewer-fade-in"
                );


                background.classList.add(
                    "gallery-viewer-fade-out"
                );


                /* Slides the image and credit down */
                viewerContent.classList.remove(
                    "gallery-viewer-slide-in"
                );


                viewerContent.classList.add(
                    "gallery-viewer-slide-out"
                );


                setTimeout(
                    function () {

                        viewer.remove();

                    },
                    900
                );

            }

        }
    );

}


/* Creates an image tile */
function createGalleryTile(
    imageSource,
    artist
) {

    const tile =
        document.createElement(
            "button"
        );


    tile.type =
        "button";


    tile.classList.add(
        "gallery-tile"
    );


    const image =
        document.createElement(
            "img"
        );


    image.src =
        imageSource;

    image.alt =
        "Gallery image";


    tile.appendChild(
        image
    );


    tile.addEventListener(
        "click",
        function () {

            openGalleryImage(
                imageSource,
                artist
            );

        }
    );


    return tile;

}


/* Creates an ACE gallery */
function createACEGallery() {

    const gallery =
        document.createElement(
            "div"
        );


    gallery.classList.add(
        "gallery-container"
    );


    /* Creates the large ACE image */
    const mainImage =
        document.createElement(
            "img"
        );


    mainImage.classList.add(
        "gallery-main"
    );


    mainImage.src =
        "images/acemain.png";

    mainImage.alt =
        "ACE";


    gallery.appendChild(
        mainImage
    );


    /* Creates the smaller ACE tiles */
    const tiles =
        document.createElement(
            "div"
        );


    tiles.classList.add(
        "gallery-tiles"
    );


    tiles.appendChild(
        createGalleryTile(
            "images/aceref.png",
            "[ JoltzDrawz ]"
        )
    );


    tiles.appendChild(
        createGalleryTile(
            "images/acesweet.jpeg",
            "[ sweeetlii ]"
        )
    );


    tiles.appendChild(
        createGalleryTile(
            "images/acemb.png",
            "[ Madnessbliss ]"
        )
    );


    gallery.appendChild(
        tiles
    );


    return gallery;

}


/* Creates an EOS gallery */
function createEOSGallery() {

    const gallery =
        document.createElement(
            "div"
        );


    gallery.classList.add(
        "gallery-container"
    );


    /* Creates the large EOS image */
    const mainImage =
        document.createElement(
            "img"
        );


    mainImage.classList.add(
        "gallery-main"
    );


    mainImage.src =
        "images/eosmain.png";

    mainImage.alt =
        "EOS";


    gallery.appendChild(
        mainImage
    );


    /* Creates the smaller EOS tiles */
    const tiles =
        document.createElement(
            "div"
        );


    tiles.classList.add(
        "gallery-tiles"
    );


    tiles.appendChild(
        createGalleryTile(
            "images/eosref.png",
            "[ JoltzDrawz ]"
        )
    );


    tiles.appendChild(
        createGalleryTile(
            "images/eosfc.png",
            "[ fixy_cookies ]"
        )
    );


    tiles.appendChild(
        createGalleryTile(
            "images/eosmb.png",
            "[ Madnessbliss ]"
        )
    );


    tiles.appendChild(
        createGalleryTile(
            "images/eosvr.jpeg",
            "[ Gelboretsu ]"
        )
    );


    tiles.appendChild(
        createGalleryTile(
            "images/eoszl1.png",
            "[ Zestylemonss ]"
        )
    );


    tiles.appendChild(
        createGalleryTile(
            "images/eoszl2.png",
            "[ Zestylemonss ]"
        )
    );


    tiles.appendChild(
        createGalleryTile(
            "images/eoszl3.png",
            "[ Zestylemonss ]"
        )
    );


    tiles.appendChild(
        createGalleryTile(
            "images/eoszl4.png",
            "[ Zestylemonss ]"
        )
    );


    tiles.appendChild(
        createGalleryTile(
            "images/eoszl5.png",
            "[ Zestylemonss ]"
        )
    );


    tiles.appendChild(
        createGalleryTile(
            "images/eoszl6.png",
            "[ Zestylemonss ]"
        )
    );


    tiles.appendChild(
        createGalleryTile(
            "images/eoszl7.png",
            "[ Zestylemonss ]"
        )
    );


    tiles.appendChild(
        createGalleryTile(
            "images/eoszl8.png",
            "[ Zestylemonss ]"
        )
    );


    tiles.appendChild(
        createGalleryTile(
            "images/eoszl9.png",
            "[ Zestylemonss ]"
        )
    );


    gallery.appendChild(
        tiles
    );


    return gallery;

}


/* Displays the ACE page */
function showACEGallery() {

    showGalleryPage(
        createACEGallery(),
        showStaffMenu
    );

}


/* Displays the EOS page */
function showEOSGallery() {

    showGalleryPage(
        createEOSGallery(),
        showStaffMenu
    );

}


/* Displays a gallery page */
function showGalleryPage(
    galleryContent,
    returnAction
) {

    currentMenu = [

        {
            key: "0",
            text: "[ 00 ] RETURN",
            action: returnAction
        }

    ];


    menuTyping = true;

    screen.textContent = "";


    const page =
        document.createElement(
            "div"
        );


    page.classList.add(
        "menu",
        "scroll-page"
    );


    screen.appendChild(
        page
    );


    /* Adds the gallery */
    page.appendChild(
        galleryContent
    );


    /* Starts the gallery at the top of the page */
    page.scrollTop = 0;


    /* Creates blank line above RETURN */
    createSpacing(
        page
    );


    /* Creates RETURN button */
    const returnButton =
        createMenuButton(
            currentMenu[0],
            page
        );


    /* Creates blank line below RETURN */
    createSpacing(
        page
    );


    /* Creates selection prompt */
    const selection =
        document.createElement(
            "div"
        );


    /* Identifies the selection prompt */
    selection.classList.add(
        "menu-selection"
    );


    /* Adds extra space below the selection prompt */
    selection.classList.add(
        "gallery-selection"
    );


    page.appendChild(
        selection
    );


    /* Creates one shared cursor */
    const cursor =
        document.createElement(
            "span"
        );


    cursor.classList.add(
        "cursor"
    );


    /* Gets the gallery images */
    const mainImage =
        galleryContent.querySelector(
            ".gallery-main"
        );


    const tiles =
        galleryContent.querySelectorAll(
            ".gallery-tile"
        );


    /* Flickers in the main image and all tiles at the same time */
    setTimeout(
        function () {

            mainImage.classList.add(
                "gallery-flicker"
            );


            tiles.forEach(
                function (tile) {

                    tile.classList.add(
                        "gallery-flicker"
                    );

                }
            );

        },
        100
    );


    /* Starts typing RETURN while the images flicker in */
    setTimeout(
        function () {

            typeText(
                returnButton,
                "[ 00 ] RETURN",
                typingSpeed,
                0,
                false,
                0,

                function () {

                    typeText(
                        selection,
                        "SELECTION > ",
                        typingSpeed,
                        0,
                        false,
                        0,

                        function () {

                            cursor.classList.add(
                                "blinking"
                            );


                            returnButton.disabled =
                                false;


                            menuTyping =
                                false;

                        },

                        cursor,

                        false

                    );

                },

                cursor,

                false

            );

        },
        100
    );

}


/* =========================
   ARCHIVE LOGS
========================= */


/* Displays an archive log */
function showLog(
    logNumber
) {

    showPage(
        logNumber,
        "[ CONTENT PLACEHOLDER ]",
        showArchivesMenu
    );

}


/* =========================
   EOS PROJECT
========================= */


/* Displays the EOS Project page */
function showEOSProject() {

    showPage(
        "EOS PROJECT",
`ACCESS DENIED

STATUS: UNDER CONSTRUCTION`,
        showMainMenu
    );

}


/* =========================
   KEYBOARD CONTROLS
========================= */


/* Allows number keys to select options */
document.addEventListener(
    "keydown",
    function (event) {

        if (
            menuTyping ||
            !currentMenu
        ) {

            return;

        }


        const option =
            currentMenu.find(
                function (item) {

                    return item.key ===
                        event.key;

                }
            );


        if (
            option
        ) {

            selectMenuOption(
                option
            );

        }

    }
);


/* =========================
   START BIOS
========================= */


/* Waits four seconds before starting BIOS */
setTimeout(
    function () {

        /* Creates the BIOS container */
        const bios =
            document.createElement(
                "div"
            );


        bios.classList.add(
            "menu"
        );


        /* Creates the element that holds the BIOS text */
        const biosTextElement =
            document.createElement(
                "span"
            );


        biosTextElement.classList.add(
            "bios-content"
        );


        bios.appendChild(
            biosTextElement
        );


        screen.textContent = "";


        screen.appendChild(
            bios
        );


        /* Types the BIOS text */
        typeText(
            biosTextElement,
            biosText,
            typingSpeed,
            0,
            true,
            2000,

            function () {

                /* Waits 0.5 seconds after BIOS disappears */
                setTimeout(
                    function () {

                        showMainMenu();

                    },
                    menuDelay
                );

            },

            null,

            true

        );

    },
    4000
);