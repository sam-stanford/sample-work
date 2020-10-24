//TODO: Add refresh capability and parse all sections
//========================================================
//================== Global Definitions  =================
//========================================================

//Global variable for timing
let timeStart = 0;

//Class to represent section, subsection, subsubsection, ...
class Section {
    constructor(elementTop, title) {
        this.elementTop = elementTop; //DOM element
        this.title = title; //Title (i.e. name of section)
        this.subSections = []; //Array of subsections as Section elements
    }
}

//Array of Section objects for all root sections
let sections = [];


//========================================================
//=================== Set Up Extension  ==================
//========================================================

console.log("Starting content.js");

//Check not on projects selection page
if (!document.getElementsByClassName("navbar-brand")[0]) {

//Fetch scrollbar and viewer
    let scrollBar = null;
    while (!scrollBar) {
        scrollBar = document.getElementsByClassName("ace_scrollbar-v")[0];
    }
    let viewer = document.getElementsByClassName("ace_content")[0];
    console.log("Scrollbar & viewer found");


    setTimeout(function () {

        //Initial parse of sections from file
        sections = parseSections(scrollBar, sections);


//========================================================
//================== Create Linear Menu  =================
//========================================================

        //Add custom stylesheet to Overleaf
        let headDiv = document.getElementsByTagName("head")[0];
        headDiv.innerHTML = "<link rel='content.css' type='text/css' href='content.css'>".concat(headDiv.innerHTML);

        //Allow toolbar overflow & adjust z-index
        let toolbar = document.getElementsByClassName("toolbar-editor")[0];
        toolbar.style.overflow = "initial";
        // toolbar.style.zIndex = "300";

        //Create sections menu button
        let toolbarRight = toolbar.getElementsByClassName("toolbar-right")[0];
        let menuHTML = "<div class='sections-menu'>Sections<span class='caret'></span></div>";
        toolbarRight.innerHTML = menuHTML.concat(toolbarRight.innerHTML);

        //Create menu drop down
        let dropDownHTML = "<div class='sections-menu-dropdown'></div>";
        toolbarRight.innerHTML = dropDownHTML.concat(toolbarRight.innerHTML);
        let menuDropDown = document.getElementsByClassName("sections-menu-dropdown")[0];

        //Add refresh button
        let refreshBtnCode = "<div class='sect-menu-refresh'><i class='fa fa-refresh'></i></div>";
        menuDropDown.innerHTML = menuDropDown.innerHTML.concat(refreshBtnCode);


        //TODO: Adjust translate to match size or max-size for drop-down

        //Attach handler to hide drop down
        window.addEventListener("click", function () {
            menuDropDown.classList.remove("show-sect-menu");
            menuBtn.classList.remove("open");
        });

        //Attach handler to stop hiding if menu is clicked
        menuDropDown.addEventListener("click", function (event) {
            event.stopPropagation();
        });

        //Attach handler to show drop down
        let menuBtn = document.getElementsByClassName("sections-menu")[0];
        menuBtn.addEventListener("click", function (event) {
            event.stopPropagation(); //Prevent window click event

            //Toggle added classes for menu
            menuDropDown.classList.toggle("show-sect-menu");
            menuBtn.classList.toggle("open");

            //Timing
            console.log("Time between menu openings: " + getTimer());
            startTimer();

        });

        //Fill linear menu entries
        fillLinearMenu(scrollBar, sections);

//========================================================
//================== Create Radial Menu  =================
//========================================================

        //Container for draggable
        let mount = document.getElementsByClassName("toolbar-pdf")[0];
        let radialContainerCode = "<div class='sections-radial-menu-container'></div>";
        mount.innerHTML = mount.innerHTML.concat(radialContainerCode);
        let radialContainer = document.getElementsByClassName("sections-radial-menu-container")[0];


        //Button
        let radialMenuCode = "<div class='sections-radial-menu'></div>";
        radialContainer.innerHTML = radialMenuCode.concat(radialContainer.innerHTML);
        let radialMenuBtn = document.getElementsByClassName("sections-radial-menu")[0];

        //Expanded menu
        let radialMenuExpandCode = "<div class='sections-radial-menu__expand'></div>";
        radialContainer.innerHTML = radialMenuExpandCode.concat(radialContainer.innerHTML);
        let radialMenuExpand = document.getElementsByClassName("sections-radial-menu__expand")[0];

        //Rotating plus
        radialMenuBtn = document.getElementsByClassName("sections-radial-menu")[0];
        let radialPlusCode = "<div class='sections-radial-menu__plus'>" +
            "<span class='line hline'></span><span class='line vline'></span>" +
            "</div>";
        radialMenuBtn.innerHTML = radialPlusCode.concat(radialMenuBtn.innerHTML);

        //Add tasteful logo
        let radialMenuLogoCode = "<img class='radial-menu__logo' src='" + chrome.extension.getURL("images/overleaf_logo.png") + "' alt='logo'>";
        radialMenuExpand.innerHTML = radialMenuLogoCode.concat(radialMenuExpand.innerHTML);

        //Link logo to top of editor
        let radialMenuLogo = document.getElementsByClassName("radial-menu__logo")[0];
        radialMenuLogo.addEventListener("click", function () {
            scrollBar.scrollTo(0, 0);
        });

        //Handler to show menu
        radialMenuBtn.addEventListener("click", function (event) {
            event.stopPropagation();
            radialContainer.classList.toggle("rad-menu-open");

            //Timing
            console.log("Time between menu openings: " + getTimer());
            startTimer();
        });

        //Handler to hide menu
        window.addEventListener("click", function () {
            radialContainer.classList.remove("rad-menu-open");
        });

        //Handler to stop closing of menu if menu is in use
        radialMenuExpand.addEventListener("click", function (event) {
            event.stopPropagation();
        });

        //Create 8 entry containers in menu
        for (let i = 7; i >= 0; i--) {
            //Add container for each entry
            let containerHTML = "<div id='rad-entry-container" + i + "' class='rad-entry-container'></div>";
            radialMenuExpand.innerHTML = containerHTML.concat(radialMenuExpand.innerHTML);
        }

        //Adjust for attributes of each container
        let rotationArray = [54, -54, 18, -18, -18, 18, -54, 54];
        let topArray = [74, 51, 80, 54, 101, 72, 107, 82];
        let rightArray = [-52, -179, -10, -221, -9, -223, -50, -182];

        //Loop through containers - new for loop to allow elements to load
        for (let i = 7; i >= 0; i--) {
            //Find container element
            let container = document.getElementById("rad-entry-container" + i);

            //Rotate container
            container.style.transform = "rotate(" + rotationArray[i] + "deg)";

            //Move containers into place
            container.style.top = topArray[i] + "px";
            container.style.right = rightArray[i] + "px";
        }

        //Add refresh button
        refreshBtnCode = "<div class='rad-menu-refresh'><i class='fa fa-refresh'></i></div>";
        radialMenuExpand.innerHTML = radialMenuExpand.innerHTML.concat(refreshBtnCode);

        //Draggable
        //STARTING CODE TAKEN FROM INTERACT.JS'S DOCS
        const position = {x: 0, y: 0};
        interact('.sections-radial-menu-container').draggable({
            listeners: {
                start(event) {
                    event.stopPropagation();
                },
                move(event) {
                    position.x += event.dx;
                    position.y += event.dy;
                    event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
                },
                end(event) {
                    event.stopPropagation();
                }
            }
        });
        //ENDING CODE TAKEN FROM INTERACT.JS'S DOCS

        //Get entries
        fillRadialMenu(scrollBar, sections);


//========================================================
//============= Cleanup & Delayed Functions  =============
//========================================================

        //Add refresh button functionality
        let refreshBtn = document.getElementsByClassName("sect-menu-refresh")[0].getElementsByTagName("i")[0];
        refreshBtn.addEventListener("click", function () {
            //Parse and fill menu
            console.log("Refreshing Linear Menu");
            sections = [];
            sections = parseSections(scrollBar, sections);
            fillLinearMenu(scrollBar, sections);

        });

        //Add radial refresh button functionality
        refreshBtn = document.getElementsByClassName("rad-menu-refresh")[0].getElementsByTagName("i")[0];
        refreshBtn.addEventListener("click", function () {
            //Parse and fill menu
            console.log("Refreshing Radial Menu");
            sections = [];
            sections = parseSections(scrollBar, sections);
            fillRadialMenu(scrollBar, sections);

        });

        console.log("Finishing content.js");

    }, 1000); //SetTimeout


} //If projects selection page


//========================================================
//====================== Functions  ======================
//========================================================

function getSectionName(innerHTML) {
    //Find name - stored between { and }
    let nameStart = innerHTML.lastIndexOf("{") + 1;
    let nameEnd = innerHTML.lastIndexOf("}") - 1;
    let sectionName = innerHTML.substring(nameStart, nameEnd + 1);

    //Convert common LaTeX symbols to ASCII
    // sectionName.replace("<span class=\"ace_constant ace_character ace_escape\">\\&amp;</span>", "&");

    //Return
    return sectionName;
}

//Function to return top value as an int of an element
function getTopNoPx(elem) {
    let top = elem.style.top;
    let topNoPx = top.substring(0, top.length - 2);
    return parseInt(topNoPx);
}

//Functions to time taken to use menus
function startTimer() {
    let now = new Date();
    timeStart = now.getTime();
}

function getTimer() {
    let now = new Date();
    return now.getTime() - timeStart;
}

//Function to parse all sections in a file
function parseSections(scrollBar, sections) {

    console.log("Starting Parse");

    //Save initial scroll to return at end
    let initScroll = scrollBar.scrollTop;

    let viewer = document.getElementsByClassName("ace_scroller")[0];
    let origDisplay = viewer.style.display;
    viewer.style.display = "none";
    scrollBar.scrollTo(0,0);
    viewer.style.display = origDisplay;


    //Save current and prev scroll tops to check when viewer is at end
    let prevScrollTop = -1; //-1 init to be < prev
    let thisScrollTop = 0; //Start at top of viewer

    //Loop until viewer at bottom
    while (thisScrollTop !== prevScrollTop) {

        //Find lines currently in viewer
        let lines = document.getElementsByClassName('ace_line_group');
        console.log("DEBUG: Number of lines = " + lines.length);

        //Loop through found lines, checking for sections
        for (let i = 0; i < lines.length; i++) {

            //Do not add lines until previously added lines passed
            // console.log(getTopNoPx(lines[i]));

            if (getTopNoPx(lines[i]) > thisScrollTop) {
                //Get span elements, as sections are stored in these
                let spans = lines[i].getElementsByTagName('span');

                //Loop through found spans
                for (let j = 0; j < spans.length; j++) {

                    //Check for sections
                    if (spans[j] && (spans[j].innerHTML === "\\section")) {
                        let title = getSectionName(lines[i].innerHTML);
                        console.log("Section found: " + title);
                        sections[sections.length] = new Section(getTopNoPx(lines[i]), title);
                    }

                    //TODO: Check for subsection and subsubsection here

                } //for

            } //if

        } //for


        //Adjust scroll tops
        prevScrollTop = thisScrollTop;
        thisScrollTop = getTopNoPx(lines[lines.length - 1]);

        console.log("Prev Scroll Top: " + prevScrollTop);
        console.log("This Scroll Top: " + thisScrollTop);

        //Scroll viewer to new scrollTop
        origDisplay = viewer.style.display;
        viewer.style.display = "none";
        scrollBar.scrollTo(0, thisScrollTop);
        viewer.style.display = origDisplay;




    } //while
    //

    //Return to original scroll
    origDisplay = viewer.style.display;
    viewer.style.display = "none";
    scrollBar.scrollTo(0, initScroll);
    viewer.style.display = origDisplay;

    console.log("Ending Parse");
    return sections;
}


//Function to put entries into linear menu
function fillLinearMenu(scrollBar, sections) {

    //Finds required elements
    let menuDropDown = document.getElementsByClassName("sections-menu-dropdown")[0];
    let menuBtn = document.getElementsByClassName("sections-menu")[0];

    //Removes prev entries, leaving refresh btn
    let oldEntries = menuDropDown.getElementsByClassName("entry");
    while (oldEntries.length !== 0) {
        for (let i = 0; i < oldEntries.length; i++) {
            oldEntries[i].remove();
        }
        oldEntries = menuDropDown.getElementsByClassName("entry");
    }

    //Remove prev message
    let oldMessage = menuDropDown.getElementsByClassName("sections-menu__error")[0];
    while (oldMessage) {
        oldMessage.remove();
        oldMessage = menuDropDown.getElementsByClassName("sections-menu__error")[0];
    }

    //Create entries in drop down
    if (sections.length !== 0) {
        for (let i = sections.length - 1; i >= 0; i--) {
            //Add entry
            let titleToAdd = sections[i].title;
            if (titleToAdd.length > 14) {
                titleToAdd = titleToAdd.substring(0, 11).concat("...");
            }
            let entryHTML = "<div id='entry" + i + "' class='entry'>" + titleToAdd + "</div>";
            menuDropDown.innerHTML = entryHTML.concat(menuDropDown.innerHTML);
        }

        //Attach handlers - new for loop to allow elements to load
        for (let i = sections.length - 1; i >= 0; i--) {
            //Add handler
            let entry = document.getElementById("entry" + i);
            entry.addEventListener("click", function () {
                scrollBar.scrollTo(0, sections[i].elementTop);
                menuBtn.classList.remove("open");
                menuDropDown.classList.remove("show-sect-menu");

                //Timing
                console.log("Time from start until selection: " + getTimer());
                startTimer();
            });
        }
    } else {
        //No entries so display message
        let noEntryCode = "<p class='sections-menu__error'>No Sections Were Found</p>"
        menuDropDown.innerHTML = noEntryCode.concat(menuDropDown.innerHTML);
    }

    //Reintroduce refresh button functionality
    let refreshBtn = document.getElementsByClassName("sect-menu-refresh")[0].getElementsByTagName("i")[0];
    refreshBtn.addEventListener("click", function () {
        console.log("Refresh");

        //Parse and fill menu
        console.log("Refreshing Linear Menu");
        sections = [];
        sections = parseSections(scrollBar, sections);
        fillLinearMenu(scrollBar, sections);

    });
}


//Function to put entries into radial menu
function fillRadialMenu(scrollBar, sections) {

    //Find required elements


    //Removes prev entries, leaving refresh btn
    let oldEntries = document.getElementsByClassName("rad-entry");
    while (oldEntries.length !== 0) {
        for (let i = 0; i < oldEntries.length; i++) {
            oldEntries[i].remove();
        }
        oldEntries = document.getElementsByClassName("rad-entry");
    }


    //Fill containers
    for (let i = sections.length - 1; i >= 0; i--) {

        //Can only handle 8 entries for radial menu
        if (i > 7) continue;

        //Shorten title if needed
        let titleToAdd = sections[i].title;
        if (titleToAdd.length > 14) {
            titleToAdd = titleToAdd.substring(0, 11).concat("...");
        }

        //Put title into container
        let entryHTML = "<div id='rad-entry" + i + "' class='rad-entry'>" + titleToAdd + "</div>";
        let thisContainer = document.getElementById("rad-entry-container" + i);
        thisContainer.innerHTML = entryHTML.concat(thisContainer.innerHTML);
    }

    //Loop through entries - new for loop to allow elements to load
    for (let i = sections.length - 1; i >= 0; i--) {

        //Can only handle 8 entries for radial menu
        if (i > 7) continue;

        //Find element
        let entry = document.getElementById("rad-entry" + i);

        //Add handler
        entry.addEventListener("click", function () {

            // console.log(sections[i].elementTop);
            let radialContainer = document.getElementsByClassName("sections-radial-menu-container")[0];
            scrollBar.scrollTo(0, sections[i].elementTop);
            radialContainer.classList.remove("rad-menu-open");

            //Timing
            console.log("Time from start until selection: " + getTimer());
            startTimer();
        });
    }
}




