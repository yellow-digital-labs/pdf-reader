

// Import dependencies
const fs = require("fs");
const PDFParser = require("pdf2json");

// Get all the filenames from the patients folder
const files = fs.readdirSync("patients");

// All of the parse patients
let patients = [];

// Make a IIFE so we can run asynchronous code
(async () => {

    // Await all of the patients to be passed
    // For each file in the patients folder
    await Promise.all(files.map(async (file) => {

        // Set up the pdf parser
        let pdfParser = new PDFParser(this, 1);

        // Load the pdf document
        pdfParser.loadPDF(`patients/${file}`);

        // Parsed the patient
        let patient = await new Promise(async (resolve, reject) => {

            // On data ready
            pdfParser.on("pdfParser_dataReady", (pdfData) => {
                console.log("No of pages", Object.keys(pdfData.Pages).length)
                // The raw PDF data in text form
                const raw = pdfParser.getRawTextContent().replace(/\r\n/g, "").replace(/\t/g, " ").replace(/\s/g, " ");
                if(raw){
                    var PolicyNo, InsCompany, client_name, region, BusinessLockAt, Code, TarrifRate, ProductName, PolicyCategory, InceptionDate, ExpiryDate, SumAssured, BusinessGroup, Source, VehicleMake, Model, SubModel, MfgYear, NoClaimBonus, Hypothication, CC, ODPremium, LiabBasicPremium, LiabCNG, LiabPaOwnerDR, LiabPaPassenger, Other, Terrorism, StampDuty, ServiceTax, Premium, BussClass, ClientType, ChqNo, ChqDate, CustBankName, Mode, ChasisNo, EngineNo, RegistrationNo, CNGKit, Electrical, NonElectrical, Dob, addonpremium, LastYrInsCompany, Fueltype, PolicyIsseudate, Address1, Address2, Address3, City, Pin, PhoneMobile, EmailId, TPInsuranceCo, TPPolicyNo, TPPolicyInsDate, TPPolicyExpireDate, LastNCB, NllDepreciation, Consumable, EngineProtector, TyreCover, NcbProtector, R2I, Keycover, RSA, LossOfPersonalBelonging, EmergencyTransportHotelExpenses, PrdocutPOSP, ProductPAN, ProdcutAadhar, NomiName, NomiRelation, SeatingCapacity;
                    if(/UNITED INDIA INSURANCE COMPANY/i.exec(raw)){ //format one
                        console.log("raw", raw);
                        let isFormatOne = true;
                        fs.writeFileSync("patients-sam.json", raw);
                        //insurence company
                        InsCompany = "UNITED INDIA INSURANCE CO LTD";

                        //client name
                        client_name = /Name of the Insured(.*?)Address of the Insured/i.exec(raw)[1].trim();

                        //region
                        // region = /State:(.*?)Pincode:/i.exec(raw)[1].trim(); //ASK

                        //Code
                        // Code = /Business Channel Code:(.*?)Business Channel/i.exec(raw)[1].trim();

                        //SumAssured
                        SumAssured = /Insured's Declared Value(.*?)Period/i.exec(raw)[1].trim();

                        //policy number
                        PolicyNo = /Policy No.(.*?)Customer/i.exec(raw)[1].trim();
                        if(PolicyNo){
                            let lettersReg = /[a-zA-Z]/g;
                            if(PolicyNo.match(lettersReg).length>1){
                                isFormatOne = false;
                                PolicyNo = /Policy No.(.*?)Vehicle/i.exec(raw)[1].trim();
                            }
                        }
                        try{
                            //InceptionDate
                            InceptionDate = /Insurance Start Date & Time:(.*?)00/i.exec(raw)[1].trim();

                            //ExpiryDate
                            ExpiryDate = /Insurance expiry Date & Time:(.*?)midnight/i.exec(raw)[1].trim();
                        } catch(err){
                            //InceptionDate
                            InceptionDate = /Hrs of (.*?)To Midnight of/i.exec(raw)[1].trim();

                            //ExpiryDate
                            ExpiryDate = /To Midnight of(.*?)Liability/i.exec(raw)[1].trim();
                        }

                        if(!isFormatOne){
                            
                        } else {
                            
                        }
                        
                        resolve({
                            client_name: client_name,
                            region: region, //
                            BusinessLockAt: BusinessLockAt,
                            Code: Code,
                            PolicyNo: PolicyNo,
                            InsCompany: InsCompany,
                            TarrifRate: TarrifRate, //
                            ProductName: ProductName, //
                            PolicyCategory: PolicyCategory, //
                            InceptionDate: InceptionDate,
                            ExpiryDate: ExpiryDate,
                            SumAssured: SumAssured,
                            BusinessGroup: BusinessGroup,
                            Source: Source,
                            VehicleMake: VehicleMake,
                            Model: Model,
                            SubModel: SubModel,
                            MfgYear: MfgYear,
                            NoClaimBonus: NoClaimBonus,
                            Hypothication: Hypothication,
                            CC: CC,
                            ODPremium: ODPremium,
                            LiabBasicPremium: LiabBasicPremium,
                            LiabCNG: LiabCNG,
                            LiabPaOwnerDR: LiabPaOwnerDR,
                            LiabPaPassenger: LiabPaPassenger,
                            Other: Other,
                            Terrorism: Terrorism,
                            StampDuty: StampDuty,
                            ServiceTax: ServiceTax,
                            Premium: Premium,
                            BussClass: BussClass,
                            ClientType: ClientType,
                            ChqNo: ChqNo,
                            ChqDate: ChqDate,
                            CustBankName: CustBankName,
                            Mode: Mode,
                            ChasisNo: ChasisNo,
                            EngineNo: EngineNo,
                            RegistrationNo: RegistrationNo,
                            CNGKit: CNGKit,
                            Electrical: Electrical,
                            NonElectrical: NonElectrical,
                            Dob: Dob,
                            addonpremium: addonpremium,
                            LastYrInsCompany: LastYrInsCompany,
                            Fueltype: Fueltype,
                            PolicyIsseudate: PolicyIsseudate,
                            "Address 1": Address1,
                            "Address 2": Address2,
                            "Address 3": Address3,
                            City: City,
                            Pin: Pin,
                            "Phone / Mobile": PhoneMobile,
                            "Email Id": EmailId,
                            "TP insurance co.": TPInsuranceCo,
                            "TP policy no": TPPolicyNo,
                            "TP policy ins. Date": TPPolicyInsDate,
                            "TP policy Expire  Date": TPPolicyExpireDate,
                            "last NCB": LastNCB,
                            "Nll Depreciation": NllDepreciation,
                            Consumable: Consumable,
                            "Engine Protector": EngineProtector,
                            "Tyre Cover": TyreCover,
                            "Ncb Protector": NcbProtector,
                            "R2I": R2I,
                            Keycover: Keycover,
                            RSA: RSA,
                            "Loss of Personal Belonging": LossOfPersonalBelonging,
                            "Emergency Transport &Hotel Expenses": EmergencyTransportHotelExpenses,
                            "Prdocut POSP": PrdocutPOSP,
                            "Product PAN": ProductPAN,
                            "Prodcut Aadhar": ProdcutAadhar,
                            "Nomi Name": NomiName,
                            "Nomi Relation": NomiRelation,
                            "Seating Capacity": SeatingCapacity
                        });
                    }
                }
                // console.log("raw", /Policy No.\s(.*?)Customer/i.exec(raw)[1])
                // Return the parsed data
            });

        });

        // Add the patient to the patients array
        patients.push(patient);

    }));

    // Save the extracted information to a json file
    fs.writeFileSync("patients.json", JSON.stringify(patients));

})();  