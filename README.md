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

### Tag
Enter the Tag of the questions you want to search for.
![image](https://user-images.githubusercontent.com/13930271/55064341-7dea7a00-5082-11e9-9261-5489b4ad30c9.png)

### Days
How old are the questions you want to include in this query?
For example, If you want to get all the questions in the past week then enter the number 7. 
![image](https://user-images.githubusercontent.com/13930271/55064368-8c389600-5082-11e9-8130-23e119c85972.png)

### Sorting Type
You can sort the questions by either the most recent or the top rated.
![image](https://user-images.githubusercontent.com/13930271/55064417-9eb2cf80-5082-11e9-9a95-88c44c2154d4.png)

### Hide Answered Questions
If you are looking to answer questions on stack overflow then questions that have accepted answers
would be of little interest to you.

![image](https://user-images.githubusercontent.com/13930271/55064454-ae321880-5082-11e9-9461-287d040d69ac.png)

### Hide [duplicate] Questions
This checkbox hides the questions that are marked as duplicate.
![image](https://user-images.githubusercontent.com/13930271/55064503-c3a74280-5082-11e9-9fc5-255bcb5d19c4.png)

### Update
After setting your preferences just click update and wait for the question pages to be fetched, parsed, and sorted. 
![image](https://user-images.githubusercontent.com/13930271/55064546-d752a900-5082-11e9-99ec-1bf27b59762f.png)
![image](https://user-images.githubusercontent.com/13930271/55064571-e2a5d480-5082-11e9-8e3e-57f977414111.png)

### Result
After querying the questions, information about the data gathered is displayed at the top
and the sorted questions are displayed beneath it.

![image](https://user-images.githubusercontent.com/13930271/55064689-12ed7300-5083-11e9-94fa-db7bb32c8046.png)

### Quick Question Preview
A brief of the question is displayed but if you want to quickly view the whole question you can click on the '+' sign next to the question brief and it will load the whole question. If you want to go the question page just click on the title. 

![image](https://user-images.githubusercontent.com/13930271/55064832-5cd65900-5083-11e9-9bce-39e4c1ff9bff.png)
![image](https://user-images.githubusercontent.com/13930271/55064879-737cb000-5083-11e9-9256-8ba6eede9cc9.png)

### Load More Questions
Initially, only 10 questions are displayed but as you come closer to the end of the page 10 more questions will be displayed. 

![image](https://user-images.githubusercontent.com/13930271/55064806-4af4b600-5083-11e9-895c-57b01692fea4.png)

## Live Demo
You can find live demo [here](https://smartrent.000webhostapp.com/queens/stack.html)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

