const { GoogleGenerativeAI } = require("@google/generative-ai");

require("dotenv")
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const cors = require('cors');


// Import express as a module
const express = require('express');
const bodyParser = require("body-parser"); // Note the typo correction

const app = express();

app.use(bodyParser.json())

async function  run(name)
{

    
const prompt =`I will give you a question name of problem solving and i want you to give me a description and 10 testcases with input and output include good test cases like edge cases and the description should follow this exact format "<p><strong>Problem 7: Print the multiplication of numbers from 1 to n</strong></p>
<p><strong>Problem Description:</strong></p>
<p>Write a program that takes an integer input <code>n</code> and prints the product of all numbers from 1 to <code>n</code>.</p>

<p><strong>Input:</strong></p>
<ul>
  <li>A single integer <code>n</code>.</li>
</ul>

<p><strong>Output:</strong></p>
<ul>
  <li>Print the product of all numbers from 1 to <code>n</code>.</li>
</ul>" , THe question name is "${name}" , the respose should be a json havings two fields {"description":"description here.." , "testcases": [{"input":"5","output":"25"},{"input":"8","output":"425"}]} ...etc...do not include other symbols like '''json at start or end of response it should be a proper json format`;

const result = await model.generateContent(prompt);
console.log(result.response.text());
return result.response.text();
}


app.get("/",(req,res)=>{
    console.log("working");
    res.send("working..");
})

app.post("/getquestion",async (req,res)=>{
    console.log(process.env.GEMINI_API)
    const resp = await run(req.body.name);
    console.log(resp);
    res.json(JSON.parse(resp));

})

app.listen(3001,()=>{
    console.log("Server started");
    
})

