``` mermaid
flowchart TB

    id1[User writes note and clicks the save button]
    id2[In the Javascript code, the event handler gets called with the note as a parameter]
    id3[A Javascript note object is created with the date and content, and is pushed to the global notes array]
    id4[The Javascript code sends the POST request to the server to create the note of type json, and sends the note as a JSON string.]
    id5[The server responds with 201 created - Note is created, no need for reloading the page]

    id1-->id2-->id3-->id4-->id5
```