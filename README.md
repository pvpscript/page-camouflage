# page-camouflage
A tampermonkey script to hide a page's content

# Disclaimer
This is just a silly remake of a script I made many years ago, and I tought
it would be funny to remake it and create a `how-to` :P

## What does it do?
This script will hide the content of the page you are currently navigating
on by hiding the original body and placing another page's content above it.

## Why?
For whatever reason you want other people to think you are navigating on a
certain page `A`, but you actually are navigating on a certaing page `B`.

## Setting up
The usage is pretty straightforward, just follow the steps below.
1. In this repository, go to the src folder, select the `script.js` and click
on `raw`;
2. Select the whole script and copy it to the clipboard;
3. Click on the `Tampermonkey` icon at the top right of your brower;
4. Click the `+ Create a new script` button;
5. A window will appear with an example script, erase it and paste what you
just copied;
6. Hit `Ctrl + S`;
7. Make sure the script is turned on.

## Usage
### Hiding
To fire up the script, hold `Ctrl + Shift + Alt` and click anywhere on the
page you are currently in. This will replace the screen content with the
website provided to the script during the **set up** process.

### Going back
To go back to where you were, just do the same thing as before: hold
`Ctrl + Shift + Alt` and click anywhere. This time, a prompt window will popup
asking for the password that was set up. Once the password is put correctly,
the page will go back to normal.
