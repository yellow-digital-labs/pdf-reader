const express = require("express");
const fs = require('fs')
const pdfParse = require('pdf-parse')
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);
  app.exit(1); // mandatory (as per the Node.js docs)
});

app.listen(5000, () => {
  console.log("running server on port 5000");
});

app.get("/", (req, res) => {
    res.send('<h1>Welcome</h1>');
});

app.get("/get/pdf/data", async (req, res) => {
    try{
        const path = req.query.path || './patients/PRIVATE 1.pdf';
        var pdfData = await getPDF(path);
        if(pdfData){
            res.send({ code: 200, message: JSON.stringify(pdfData) });
        } else {
            res.send({ code: 616, message: "issue in reading a PDF file." });
        }
    }
    catch(err){
        res.send({ code: 616, message: "something went wrong. Please try again." });
    }
});

const getPDF = async (file) => {
    let readFileSync = fs.readFileSync(file)
    try {
        let pdfExtract = await pdfParse(readFileSync)
        var textArr = pdfExtract.text.toString().split('\n').filter(function(e){return e.trim().replace(/\t/g, "")});
        var policy_no, email, name, mobile, address, policy_start_date, policy_end_date, amount;
        for(var i = 0; i < textArr.length; i++){
            //policy no
            if(textArr[i].includes('Policy No.')){
                if(!policy_no){
                    console.log("textArr[i]", textArr[i])
                    policy_no = /Policy No.\s(.*?)/i.exec(textArr[i]);
                }
            }

            //email
            if(textArr[i].includes('Email id')){
                if(!email){
                    if(/Email id\s(.*?)/i.exec(textArr[i])){
                        email = /Email id\s(.*?)/i.exec(textArr[i])[1].trim();
                    }
                }
            }

            //name
            if(textArr[i].includes('Policyholder Name')){
                if(!name){
                    name = textArr[i].substring(17, textArr[i].indexOf('Customer'));
                }
            }

            //mobile
            if(textArr[i].includes('Mobile No/Phone No')){
                if(!mobile){
                    mobile = textArr[i].substring(18, textArr[i].length);
                }
            }

            //address
            if(textArr[i].includes('Policyholder\'s address')){
                if(!address){
                    address = textArr[i].substring(22, textArr[i].length);
                }
            }

            //policy date
            if(textArr[i].includes('Current Policy PeriodFrom:')){
                if(!policy_start_date){
                    policy_start_date = textArr[i].substring(textArr[i].indexOf('Current Policy PeriodFrom:')+25, textArr[i].length);
                    policy_end_date = textArr[i+1].substring(textArr[i+1].indexOf('To:')+3, textArr[i].length);
                }
            }

            //amount
            if(textArr[i].includes('Net Premium(With')){
                if(!amount){
                    amount = textArr[i+2];
                }
            }
        }

        return {
            policy_no: policy_no,
            email: email,
            name: name,
            mobile: mobile,
            address: address,
            policy_start_date: policy_start_date,
            policy_end_date: policy_end_date,
            amount: amount
        };
    } catch (error) {
        console.log("err", error);
        return false;
    }
}
