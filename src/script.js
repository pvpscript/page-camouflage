// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.onmousedown = (e) => {
        if (e.ctrlKey && e.shiftKey && e.altKey) {
            console.log("Pressed correctly");
        }
    };
})();
