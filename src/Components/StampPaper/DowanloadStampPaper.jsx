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
  Flex,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
// import image from "./SVG STAM.svg";

import { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { usePDF } from "react-to-pdf";

const StampPaperView = () => {
  const { toPDF, targetRef } = usePDF({ filename: "Agreement.pdf" });
  const locationdata = useLocation();
  const { id } = useParams();
  console.log(id, "userId");
  const appUrl = import.meta.env.VITE_APP_API_URL;
  const [doc, setDoc] = useState(null);
  const [inputField, setInputField] = useState({
    name: "",
    email: "",
    startdate: "",
    address: "",
    photo: "",
    signature: "",
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);
  console.log(photoPreview);

  const [loader, setLoader] = useState(false);

  const downlodePDF = async (photoPreview, signaturePreview) => {
    const capture = document.querySelector(".downLodeBox");
    setLoader(true);

    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [canvas.width, canvas.height],
      });

      const marginLeft = 0;
      const marginTop = 0;
      const contentWidth = doc.internal.pageSize.getWidth() - 2 * marginLeft;

      const contentHeight = doc.internal.pageSize.getHeight() - 2 * marginTop;

      const aspectRatio = canvas.width / canvas.height;
      let imgWidth = contentWidth;
      let imgHeight = contentWidth / aspectRatio;

      if (imgHeight > contentHeight) {
        imgHeight = contentHeight;
        imgWidth = contentHeight * aspectRatio;
      }

      const imgX = marginLeft + (contentWidth - imgWidth) / 2;
      const imgY = marginTop + (contentHeight - imgHeight) / 2;

      doc.addImage(imgData, "PNG", imgX, imgY, imgWidth, imgHeight);

      // const photoX = marginLeft + 420;
      // const photoY = doc.internal.pageSize.getHeight() - 480;
      // if (photoPreview) {
      //     doc.addImage(photoPreview, "JPEG", photoX, photoY, 35, 75);
      // }

      // const signatureX = marginLeft + 480;
      // const signatureY = doc.internal.pageSize.getHeight() - 480;
      // if (signaturePreview) {
      //     doc.addImage(signaturePreview, "PNG", signatureX, signatureY, 35, 75);
      // }

      const photoWidth = 0.05 * contentWidth;
      const photoHeight = photoWidth / aspectRatio / 3;
      const photoX = marginLeft + 0.2 * contentWidth;
      const photoTopMargin = 0.08 * contentHeight;
      const photoY =
        doc.internal.pageSize.getHeight() -
        0.05 * contentHeight -
        photoHeight -
        photoTopMargin;

      if (photoPreview) {
        doc.addImage(
          photoPreview,
          "JPEG",
          photoX,
          photoY,
          photoWidth,
          photoHeight
        );
      }

      const signatureWidth = 0.05 * contentWidth;
      const signatureHeight = signatureWidth / aspectRatio / 3;
      const signatureX = marginLeft + 0.2 * contentWidth;
      const signatureTopMargin = -0.09 * contentHeight;
      const signatureY =
        doc.internal.pageSize.getHeight() -
        0.25 * contentHeight -
        signatureHeight -
        signatureTopMargin;

      if (signaturePreview) {
        doc.addImage(
          signaturePreview,
          "PNG",
          signatureX,
          signatureY,
          signatureWidth,
          signatureHeight
        );
      }

      // Save the PDF and open it in a new tab
      doc.save("Agreement.pdf");
      setLoader(false);

      // Open the PDF in a new tab
      // const pdfBlob = doc.output('blob');
      // const pdfUrl = URL.createObjectURL(pdfBlob);
      // window.open(pdfUrl, '_blank');
    });
  };

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

  // useEffect to call
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/aggriment/getaggrimentdetails`,
          {
            email:
              locationdata?.state?.data?.email || "kaustubhraut135@gmail.com",
          }
        );
        const data = response.data;
        console.log(response.data.data.signature, "signmature");
        console.log(data, "data hai ye");
        console.log(data?.User);
        //console.log(`${appUrl} / data?.signature`);
        setInputField({
          name: response.data.data?.name,
          email: response.data.data?.email || "kaustubhraut135@gmail.com",
          startdate: response.data.data?.startdate,
          address: response.data.data?.address,
          signature: response.data.data?.signature,
          photo: response.data.data?.photo,
        });
        console.log(inputField, "inputField");
        setPhotoPreview(response.data.data.photo);
        setSignaturePreview(response.data.data?.signature);

        console.log(photoPreview, "photoPreview");
        console.log(signaturePreview, "signaturePreview");
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [id]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setInputField({
      ...prevValue,
      [name]: value,
    });
  };
  console.log("onChangeHandler", onChangeHandler);

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];

    // Check if a file is selected
    if (file) {
      // Read the file as a data URL
      const reader = new FileReader();
      reader.onload = () => {
        setInputField({
          ...inputField,
          [field]: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Box ref={targetRef} m={["1rem", "7rem"]} className="downLodeBox">
        <Box display="flex" flexDirection="column" textAlign="center">
          <Box
            mx="auto"
            boxSize={{ base: "100%", md: "auto" }} // Adjusted to "auto" for non-base screen sizes
            objectFit="contain"
            mb={{ base: "2", lg: "0" }}
            maxWidth="100%" // Added maxWidth property
          >
            <Image src={frontpage} alt="Description of the image" />
          </Box>
        </Box>

        <Box>
          <Text>
            Presently we are providing the business for form filling more
            meaningfully described in the column Scope of Work, through their
            principals. AND WHEREAS the Business Associate is engaged inter
            alia, in the business of providing a wide Spectrum of online form
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
            <br />
            {/* Additional details ... */}
          </Text>
        </Box>

        {/* Additional content here ... */}

        <Box>
          <Text fontWeight={"500"} fontSize={"1.5rem"} mt="4">
            Employer : -
          </Text>
          <Text>
            Name : Zemex Service <br />
            Email : helplinezxservicewww@gmail.com <br />
            Address : KASTURI WADI INDRA BAZAR GHANSHAM APARTMENT JAIPUR,
            RAJASTHAN(RJ), INDIA(IN) 302031
          </Text>
        </Box>

        <Box>
          <FormControl w="400px">
            <Text fontSize="md">Email: {inputField.email}</Text>
          </FormControl>
          <FormControl w="400px">
            <Text fontSize="md">Start-Date: {inputField.startdate}</Text>
          </FormControl>

          <Table w="700px" style={{ marginTop: "20px" }}>
            <Tr>
              <Td>
                <Box onChange={handleSignatureChange}>
                  <Text mb={"10px"}>Signature</Text>
                  {signaturePreview && (
                    <Image
                      src={signaturePreview}
                      alt="Signature Preview"
                      w="25%"
                    />
                  )}
                </Box>
              </Td>
              <Td>
                <Box ml={"-10rem"} onChange={handlePhotoChange}>
                  <Text mb={"10px"}>Photo</Text>
                  {photoPreview && (
                    <Image src={photoPreview} alt="Photo Preview" w="20%" />
                  )}
                </Box>
              </Td>
            </Tr>
          </Table>
        </Box>

        {/* Ensure all other sections are closed properly */}
      </Box>
    </>
  );
};

export default StampPaperView;
