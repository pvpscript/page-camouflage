// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @grant        GM.setValue
// @grant        GM.getValue
// ==/UserScript==

(async function() {
    'use strict';
    /*
    // Hide page
    res = Array.from(document.body.childNodes);
    res.forEach(e => document.body.removeChild(e));
    
    // Unhide page
    res.forEach(e => document.body.appendChild(e));
    */

    window.onmousedown = async (e) => {
        if (e.ctrlKey && e.shiftKey) {
            const dummyHtml = document.createElement("html");
            dummyHtml.innerHTML = document.documentElement.outerHTML;
            Array.from(document.documentElement.attributes).forEach((e) => {
                dummyHtml.setAttributeNode(e.cloneNode());
            });

            // Convert relative path to absolute path
            for (let i of dummyHtml.getElementsByTagName("script")) {
                if (i.src) {
                    i.src = i.src;
                }
            }
            for (let i of dummyHtml.getElementsByTagName("link")) {
                if (i.href) {
                    i.href = i.href;
                }
            }
            await GM.setValue("page-capture", JSON.stringify(dummyHtml.outerHTML));
            const passwd = prompt("Type a password to unlock the original page.");
            await GM.setValue("page-passwd", (passwd != null && passwd != "") ? passwd : "");
            await GM.setValue("page-origin", window.location.origin);
            console.log("Page captured");
        }

        if (e.ctrlKey && e.altKey) {
            const pageOrigin = await GM.getValue("page-origin");
            console.log("Page Origin: " + pageOrigin);
            await GM.getValue("page-capture", null).then((val) => {
                if (val != null) {
                    //window.res = Array.from(document.body.childNodes);
                    //window.res.forEach(e => document.body.removeChild(e));
                    document.body.style.display = "none";

                    window.dummyHtml = document.createElement("html");
                    window.dummyHtml.innerHTML = JSON.parse(val);
                    document.documentElement.appendChild(window.dummyHtml);
                }
                localStorage.setItem("page-capture", val);
            });
            await GM.getValue("page-passwd", null).then((val) => {
                localStorage.setItem("page-passwd", val);
            });
        }
        if (e.shiftKey && e.altKey) {
            //if (window.res != undefined) {
            const passwd = prompt("Insert password.");
            if (localStorage.getItem("page-passwd") == passwd) {
                document.documentElement.removeChild(window.dummyHtml);
                //window.res.forEach(e => document.body.appendChild(e));
                document.body.style.display = "";
            }
            //}
        }
    };
})();
