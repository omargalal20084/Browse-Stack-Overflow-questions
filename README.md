# Description

This is a tool that helps you sort stack overflow questions asked in the past several days by the top rated questions or the most recent questions.

## Installation

To use this tool on your website just copy the files into a directory and open the stack.html page link.

If you don't have a server and want to run the tool localy then you should follow these steps.

step 1. install a plugin to your browser that allows cross-domain requests to be sent directly from your browser.

step 2. 
Replace each occurrence of  ```httpGetAsync('php.php?url='+encodeURIComponent(url)```
 in js.js file to this ```httpGetAsync(encodeURIComponent(url)```

step 3. open stack.html in the browser.
## Usage

```python
import foobar

foobar.pluralize('word') # returns 'words'
foobar.pluralize('goose') # returns 'geese'
foobar.singularize('phenomena') # returns 'phenomenon'
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
