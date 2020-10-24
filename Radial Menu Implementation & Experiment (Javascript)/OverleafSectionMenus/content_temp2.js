setTimeout(function () {

    console.log("Starting content_temp2.js");

    let fakeHeight = "500000px";

    //Fake window size to load all elements
    let html = document.getElementsByTagName("html")[0];
    let body = document.getElementsByTagName("body")[0];
    let editor = $(".ace-editor-body")[0];

    html.style.minHeight = fakeHeight;
    body.style.minHeight = fakeHeight;
    editor.style.minHeight = fakeHeight;

    // body.style.zoom = "1000%";

    //Array of Section objects for all root sections
    let sections = [];



    /*
    *
    * Next section of code loops through every line available in the viewer...
    * ... but Overleaf doesn't show all lines at once
    * -> So viewer needs to be scrolled then lines rechecked
    *
    * */

    //Find lines currently in viewer
    let lines = $('ace_line_group');
    console.log("DEBUG: Number of lines = " + lines.length);

    //Loop through found lines, checking for sections
    for (let i = 0; i < lines.length; i++) {

            //Get span elements, as sections are stored in these
            let spans = lines[i].getElementsByTagName('span');

            //Loop through found spans
            for (let j = 0; j < spans.length; j++) {

                //Check for sections
                if (spans[j] && (spans[j].innerHTML === "\\section")) {
                    console.log("Section found!");

                    //TODO: Wrap in function
                    //Find name - stored between { and }
                    console.log(lines[i].innerHTML);
                    let nameStart = lines[i].innerHTML.lastIndexOf("{") + 1;
                    let nameEnd = lines[i].innerHTML.lastIndexOf("}") - 1;
                    let sectionName = lines[i].innerHTML.substring(nameStart, nameEnd + 1);
                    console.log(sectionName);
                }

                //TODO: Check for subsection and subsubsection here

            } //for

    } //for

    console.log("Finishing content_temp2.js");

}, 3000);


// }, 20000); //SetTimeout
// });


//Class to represent section, subsection, subsubsection, ...
class Section {
    constructor(element, name) {
        this.element = element; //DOM element
        this.title = title; //Title (i.e. name of section)
        this.subSections = []; //Array of subsections as Section elements
    }
}

function sleep(milliseconds) {
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}


//Function to return top value as an int of a line
function getTopNoPx(line) {
    let top = line.style.top;
    let topNoPx = top.substring(0, top.length - 2);
    return parseInt(topNoPx);
}


