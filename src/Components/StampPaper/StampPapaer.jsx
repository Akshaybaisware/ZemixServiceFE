import {
  Box,
  Heading,
  Text,
  Image,
  Table,
  Tr,
  Td,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
  Select,
} from "@chakra-ui/react";
import sign from "../../assets/cropto stamp.svg";
// import image from "./SVG STAM.svg";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StampPaper = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  // const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(null);
  const [signature, setSignature] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    setPhoto(selectedPhoto);
    setPhotoPreview(URL.createObjectURL(selectedPhoto));
  };

  const handleSignatureChange = (e) => {
    const selectedSignature = e.target.files[0];
    setSignature(selectedSignature);
    setSignaturePreview(URL.createObjectURL(selectedSignature));
  };

  const today = new Date();
  const todayFormatted = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD

  // Get tomorrow's date
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowFormatted = tomorrow.toISOString().split("T")[0]; // Format: YYYY-MM-DD

  const toast = useToast();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("email", email);
      formData.append("signature", signature);
      formData.append("photo", photo);
      formData.append("startdate", date);
      console.log(formData, "formdata");

      const config = {
        method: "post",
        url: `http://localhost:5000/api/user/add_terms`,
        data: formData,
      };

      const response = await axios(config);
      console.log(response, "resp");
      toast({
        position: "top",
        title: "Form Submitted Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/stampapersucess");
    } catch (err) {
      alert("Complete all the feild");
    }
  };

  return (
    <>
      <Box>
        <Box display="flex" flexDirection="column" textAlign="center">
          <Box
            mx="auto"
            boxSize={{ base: "100%", md: "auto" }} // Adjusted to "auto" for non-base screen sizes
            objectFit="contain"
            mb={{ base: "2", lg: "0" }}
            maxWidth="100%" // Added maxWidth property
          >
            <Image src={""} alt="Description of the image" />
          </Box>
        </Box>

        <Box>
          <Text>
            Presently we are providing the business for form filling more
            meaningfully described in the column Scope of Work, through their
            principals. AND WHEREAS the Business Associate is engaged inter
            alias, in the business of providing a wide Spectrum of online form
            filling & services. The Business Associate has acquired the
            necessary expertise and developed the requisite skill base and
            infrastructure for successful execution of Form Filling Projects.
            This Agreement represents the business Agreement and operational
            understandings between the parties and shall remain in effect for a
            period of ELEVEN MONTHS from the date of execution hereof or from
            the date of providing the first data whichever is later & can be
            extended for the period as mutually agreed upon, for the purpose
            <br />
            <br />
            <p fontSize={{ base: "1rem", md: "1rem" }}>
              NOW THIS AGREEMENT WITNESSETH AS FOLLOWS: BOTH PARTIES ARE
              MUTUALLY AGREE FOR THE FOLLOWING POINTS.
            </p>
            <br />
            1. Main Purpose: The Original data will be available online on
            website provided by Tricom Enterprise at the time of signup. You are
            required to feed the provided data field wise online as per the
            guidelines. Data supply and preservation of the output file is done
            online on real time basis.
            <br />
            <br /> 2. Compensation: For the Form Filling services rendered by
            the Business Associate, they shall be entitled for payment of price
            38 RS (INR) per form (if you achieved cut-off above 486) The
            Business Associate shall raise invoice after completion of work with
            the data. The Invoice can be raised through email. Q.C. report will
            be provided in 72 Hrs. International Working Days from the date of
            submission.
            <br />
            <br />
            3. Payouts: Client will provide workload of 540 FORMS 5 Days. This
            MOU has been signed for 1 system.
            <br />
            <br />
            4. SERVICES: - Business Associate will get single id to work on and
            business associate can work 24X7 on this id.
            <br />
            <br />
            5. Time Period for work completion: you have 5 days (include
            holidays) to complete the New work and Second Party has to send it
            to First Party. The First Party shall give an accuracy report within
            72 hrs. For the New Work, after submissions as per technical
            specifications which are included in this agreement with accuracy
            parameters
            <br />
            <br /> 6. Client agrees to provide formats and other information for
            processing the job to Business Associate at the time of providing
            the data.
            <br />
            <br />
            7. Telecommunication cost applicable at each end shall be borne by
            the respective parties. 8. Business Associate will execute the data
            processing work provided by Client through experienced persons in
            such manner so as to carry out the work efficiently at minimum of
            90% accuracy for out files.
            <br />
            <br />
            <p
              style={{
                color: "red",
              }}
            >
              If you want Extra days to complete the project than you need to
              pay extension charges to the company.
            </p>
            {/* ... (rest of the Background section) */}
          </Text>
          <Text>
            <br />
            9. This agreement represents the business Agreement and operational
            understandings between the parties and shall remain in effect for a
            period of Eleven months from the date of execution hereof. The
            clients' specifications in terms of quality and other parameters
            that shall be issued by the Client/their principals from time to
            time and acknowledged by the Business Associate shall be read with
            this agreement.
            <br />
            <br />
            10. Termination Clauses: - If you fail to submit data on time or, If
            fails to give accuracy in output files. Company reserves the right
            to terminate the agreement with immediate effect. And PEXIV will not
            be responsible for any further data and payment to the Business
            Associate.
            <br />
            <br />- If company found that there are multiple logins of a single
            I.D., The company will not be responsible for the corruption of the
            data in both online and offline modules. And your I.D. will get
            terminated without any intimation. If we find any 2 login/ logout
            together, 2 IP address without login/ logout, browser upgrade/
            degrade without login / logout then ID will be terminate without any
            prior intimation.
            <br />
            <br />- If any kind of malfunctioning found in the work then company
            reserved right to take trail of your work for a day.
            <br />
            <br />- If you break the company rules & regulations means your id
            is get terminate, company will not do any financial transaction with
            you.
            <br />
            <br />
            11. No modification of the terms of this AGREEMENT shall be valid
            unless it is in writing and signed by all the parties.
            <br />
            <br />
            12. Force Majeure: If the rendition of the Form Filling Services is
            hampered due to earthquake, flood, tempest, civil riotsor Act of God
            then the Business Associate shall be absolved of its obligations
            hereunder till normalcy is restored after the cessation of the
            aforementioned contingencies. The Business Associate shall likewise
            be absolved if rendition of the services is hampered due to a strike
            called by the date entry operators engaged by the Business
            Associate, violence or political turbulence or for any other reason
            of a similar nature, which is beyond the control of the Business
            Associate.
            <br />
            <br />
            13. Severability: Unenforceability of any provision of this
            Agreement shall not affect any other provisions herein contained;
            instead, this Agreement shall be construed as if such unenforceable
            provision had not been contained herein.
            <br />
            <br />
            14. Variation: Except as otherwise expressly provided in this
            Agreement, this Agreement may not be changed or modified in any way
            after it has been signed, except in writing signed by or on behalf
            of both of the parties.
            <br />
            <br />
            15. Dispute Resolution & Jurisdiction: In the event of any dispute
            or difference arising between the parties hereto relating to or
            arising out of this Agreement, including the implementation,
            execution, interpretation, rectification, validity, enforceability,
            termination or rescission thereof, including the rights, obligations
            or liabilities of the parties hereto, the same will be adjudicated
            and determined by arbitration. The Indian Arbitration & Conciliation
            Act, 1996 or any statutory amendment or re-enactment thereof in
            force in India, shall govern the reference. Both parties shall
            appoint their respective arbitrator, and both arbitrators thus
            appointed should appoint the third Arbitrator who shall function as
            the presiding Arbitrator. The venue of arbitration shall be Udaipur,
            Rajasthan. The Courts in the city of Rajasthan shall have exclusive
            jurisdiction to entertain try and determine the same.
            <br />
            <br /> 16. Both the parties hereby agree neither to Circumvent or
            nor to disclose the identities, Information as well as the essence
            of the project etc of each other's/Principals, clients etc. to any
            other Third party and neither of us will approach each otherâ€™s
            contracts as identified from time to time.
            <br />
            <br />
          </Text>
        </Box>

        {/* Commencement Date and Term Section */}
        <Box>
          <Heading as="h3" mb={4}>
            <br />
            PRIMARY NOTE
          </Heading>
          <Text>
            <br />
            <br />
            (A) In the matter of fact failure, not submitted or succeed company
            is entitled to receive amount by any cost. If you achieve the
            accuracy which mentioned above, then Utility charges will be deduct
            from your work payment and if you fail to achieve accuracy in given
            timeline, then also you have to pay as a liability which describe
            above.
            <br />
            <br />
            (B) This charges related to service, development and maintenance
            cost of the platform where you working online.
            <br />
            <br /> (c) If you deny paying the said amount then company will take
            this matter legally & all the legal expenses will be clear by your
            side, company is not liable for the same.
          </Text>
        </Box>

        <Box>
          <Heading as="h3" mb={4}>
            <br />
            Required Accuracy by the company:
          </Heading>
          <Text>
            You must have to provide 90% accuracy in form filling work (540
            Forms) in 5 Days. if you are fail to provide 90% accuracy, you must
            have to pay registration amount
            <br />
            <br /> Registration Amount : 5700 (Per Month Basis) INR. Reg. Amount
            Will Deduct From Your Salary per month Salary (Weekly) : 20520.00
            INR
            <br />
            <br />
            <p style={{ color: "red" }}>
              Below cut off - you are not qualified for payment & id will be
              terminating by server side.
            </p>
            <br />
            <br />
            <br />
          </Text>
        </Box>

        <Box>
          <Text
            style={{
              fontWeight: "bold", // Add this line to make the text more bold
            }}
          >
            IN WITNESS WHEREOF
          </Text>
          <Text>
            the parties hereto have executed these presents on the date
            hereinbefore written:
          </Text>
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            testing I hereby affirm by my signature that I have read this Work
            from Home Agreement, and understand and agree to all of its
            provisions. The Work from Home Agreement itself is not a contract of
            employment and may not be construed as one. I understand that I am
            accountable to all previous confidentiality agreements, policies and
            procedures of the company. I have read a copy of the Work from Home
            Policy. I understand all the rules & regulations which are mentioned
            in agreement and I am ready to do work with Tricom Enterprise.
          </Text>
        </Box>

        <Box>
          <Text fontWeight={"500"} fontSize={"1.5rem"} mt="4">
            Employer : -
          </Text>
          <Text>
            Name : Cropton Service <br />
            Email : helplinezxservicewww@gmail.com <br />
            Address : KASTURI WADI INDRA BAZAR GHANSHAM APARTMENT JAIPUR,
            RAJASTHAN(RJ), INDIA(IN) 302031
          </Text>
        </Box>
        <Box m={["1rem", "7rem"]}>
          <Text fontWeight={"500"} fontSize={"1.5rem"} mt="4">
            A. Employer : -
          </Text>
          <Text>
            Name : Zemex Service <br />
            Email : helplinezxservicewww@gmail.com <br />
            Address : KASTURI WADI INDRA BAZAR GHANSHAM APARTMENT JAIPUR,
            RAJASTHAN(RJ), INDIA(IN) 302031
          </Text>

          <Text fontWeight={"500"} fontSize={"1.5rem"} mt="4">
            B. Employee : -
          </Text>
        </Box>

        <Box mt={"-10rem"} boxSize="sm">
          <Image src={sign} alt="Stamp" />
        </Box>
        {/* <FormControl w={["350px", "400px"]}>
          <FormLabel>Name</FormLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter Name"
            _hover={{ borderColor: "teal.500" }}
          />
        </FormControl> */}
        <FormControl w={["350px", "400px"]}>
          <FormLabel>Email</FormLabel>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter Your Email "
            _hover={{ borderColor: "teal.500" }}
          />
        </FormControl>
        <FormControl w={["350px", "400px"]}>
          <FormLabel>Start-Date</FormLabel>
          <Input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            placeholder="Enter the Date"
            min={todayFormatted}
            max={tomorrowFormatted}
            _hover={{ borderColor: "teal.500" }}
          />
          {/* <Select width={{base:"300px" , md:"400px"}}>
        <option value="">Today</option>
        <option value="option2">Tomorrow</option>
      </Select> */}
        </FormControl>

        {/* <FormControl>
      <FormLabel>Date</FormLabel>
      <Select width={{base:"300px" , md:"400px"}}>
        <option value="">Today</option>
        <option value="option2">Tomorrow</option>
      </Select>
    </FormControl> */}

        {/* Upload Signature and Photo Section */}
        <Table w={["300px", "700px"]} style={{ marginTop: "20px" }}>
          <Tr>
            <Td>Upload Signature</Td>
            {/* <Td>
              <Input
                onChange={(e) => setSignature(e.target.files[0])}
                type="file"
              />
            </Td> */}
            <Td></Td>
          </Tr>
          <Tr>
            <Td>Upload Your Photo</Td>
            {/* <Td>
              <Input
                onChange={(e) => setPhoto(e.target.files[0])}
                type="file"
              />
            </Td> */}
            <Input onChange={handleSignatureChange} type="file" />
            {signaturePreview && (
              <Image
                width={"4rem"}
                height={"4rem"}
                src={signaturePreview}
                alt="Photo Preview"
              />
            )}
            <Td>
              <Input onChange={handlePhotoChange} type="file" />
              {photoPreview && (
                <Image
                  width={"4rem"}
                  height={"4rem"}
                  src={photoPreview}
                  alt="Photo Preview"
                />
              )}
            </Td>
          </Tr>
        </Table>
        <Button
          onClick={handleSubmit}
          mt={"1rem"}
          ml={"1.6rem"}
          bg={"#DD372D"}
          _hover={{ background: "gray", color: "white" }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default StampPaper;
