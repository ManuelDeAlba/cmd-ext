# cmd-ext
#### Custom cmd commands

## Quick start
Download the code and install the dependencies

> git clone git@github.com:ManuelDeAlba/cmd-ext.git

> cd cmd-ext

> npm install

Set a new PATH system variable with the directory path
> C:\cmd-ext\commands

## Help
Commands list
> cmd-ext help

## Update
Get the latest changes
> cmd-ext update

## Use
### ls - List the information about the files in the selected directory (current by default)
> ls [dir]

### cat - Display the file content
> cat [file]

### fetch - Fetch info from urls
> fetch [url] ... [url]

### touch - Create files
> touch [name] ... [name]

### findf - Recursively search for the file or directory from the root
> findf [name] [root]

### chnames - Rename using the prefix the files matching name
> chnames [prefix] [name | *] [path]