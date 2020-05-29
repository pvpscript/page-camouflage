# page-camouflage
A tampermonkey script to hide a page's content

# Disclaimer
This is just a silly remake of a script I made many years ago, and I tought
it would be funny to write it again and explain how to use it.

## What does it do?
This script will hide the content of the page you are currently navigating
on by hiding the original body and placing another page's content above it.

**Note:** The resulting page will not be a perfect copy of the captured page,
but a very good version of it for most of the time. Sometimes you won't even
be able to tell the difference, but other times some elements might appear
overlapped, mispositioned, or with a different font.
These errors are more likely to occur when the target page (the one being
hidden away) has a more strict rule about cross-origin source material.

## Why?
For whatever reason you want other people to think you are navigating on a
certain `page A`, when you actually are navigating on a certaing `page B`.

## Setting up
The usage is pretty straightforward, just follow the steps below.
1. First and foremost: Install the `Tampermonkey` extension on your navigator.
2. Now, in this repository, go to the `src` folder, select the file called
`script.js`, click it, and then click on `raw`;
![alt text][raw]
3. Select the whole script and copy it to the clipboard;
4. Click on the `Tampermonkey` icon at the top right of your browser;
5. Click the `+ Create a new script` button;
![alt text][new_script]
6. A window will appear with an example script, erase it and paste what you
just copied;
7. Hit `Ctrl + S`;
8. Make sure Tampermonkey is turned on and the script is running.

## Usage
Capture `page A` and hide `page B` by putting `page A`'s content above it!

### Capturing
First, it's necessary to capture a page that will serve as a façade. To do
this, go to any website and wait the page to finish loading. After that,
follow those steps:

1. Hold `Ctrl + Shift`;
2. Press `Left click` anywhere on the page while holding the keys from step 1.
3. A window will prompt to define a password. The password inserted will be
used further to *go back* to where you were in the target page before hiding
it. This field can be left blank if you wish by just press either `OK` or
`Cancel`.

**Done!** Now the current page is copied. Let's move to the hiding process.

### Hiding
To hide a page, it is necessary to have captured a page to work as disguise.
If a page wasn't captured, this script will simply make the screen blank
and put a fake loader.

To proceed, do the following:
1. Hold `Ctrl + Alt`;
2. Press `Left click` anywhere on the page while holding the keys from step 1.

**Done!** The current page should look like the captured page now!

### Going back
To go back to the original page after a hide operation was successfully,
executed follow the steps below:
1. Hold `Shift + Alt`;
2. Press `Left click` anywhere on the page while holding the keys from step 1.
3. A window will appear prompting an unlock password, the same that was
defined during the `Capturing` process. Enter the defined password, or leave
it blank for no password, and press `OK`.

**Done!** The original page should appear again just the way you left it!

## Demonstration
[uncaptured][https://i.imgur.com/MEUX3ns.gif]
[captured][https://i.imgur.com/h0W2jNp.gif]
### Uncaptured
![alt text][uncaptured]
Example of a page hide without capturing another page.

### Captured
![alt text][captured]
Example of a page hide using another page as disguise.

## Drawbacks
This script won't make changes to the `url` at the web browser url bar since
this is not possible, which means that it ~~won't hide porn~~ only hides so
much of the page.
