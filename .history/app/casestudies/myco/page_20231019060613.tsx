import CaseStudyHero from "../components/CaseStudyHero"
import CaseStudyDescription from "../components/CaseStudyDescription"
export default function Myco (){
    return (
    <>
    <div className="">
    <CaseStudyHero 
    title="My Centre Office Innovation" 
    subtitle="Sund & Bælt finds value in intelligent infrastructure" 
    imageUrl="/images/back.png" 
    buttonText="Go to Website"
    link ="https://www.mycenteroffice.com/"
/>




    <div className="container mx-auto p-4">
    <CaseStudyDescription
        title="Revamping My Centre Office's Brand and Online Presence"
        description="TMy Centre Office is an all-in-one business management platform that helps companies onboard customers, get paid, deliver services, track activities, and grow.

        "
        links={[
          { text: "Visit My Centre Office", url: "https://www.mycenteroffice.com/" },
          { text: "Request a Quote", url: "https://www.bloopglobal.com/contact" }
        ]}
        
        challenge="Here's the specific challenge that was faced..."
        solution="Here's how the challenge was innovatively addressed..."
        imageUrl="/images/web.png"
      
        results={[
        "Cut website load time in half for a 300% speed improvement",
        "Increased organic traffic 2X in just 3 months after launch.",
        "Improved Google search ranking for relevant keywords.",
        "Greater brand awareness and customer satisfaction",
     
    ]}
    >
          </CaseStudyDescription>
    </div>


</div>
    </>
    )
}