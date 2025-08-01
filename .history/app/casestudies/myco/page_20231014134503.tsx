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
    buttonText="Explore the Project"
/>





    <div className="container mx-auto p-4">
    <CaseStudyDescription
        title="Around the US, more than one in three bridges are crumbling and need repair."
        description="The 2020 American Road & Transportation Builders Association (ARTBA) Bridge Report says that more than 46,000 US bridges are “structurally deficient” and are in poor condition—and that those bridges are crossed 178 million times a day. Crumbling infrastructures are a concern throughout the world. The G20 Global Infrastructure Outlook predicts that there will be a USD 15 trillion gap between infrastructure funding and the work that must be completed by 2040."
        links={[
          { text: "Bridge Report", url: "https://www.example.com" },
          { text: "Infrastructure Outlook", url: "https://www.example.com" }
        ]}
        
        challenge="Here's the specific challenge that was faced..."
        solution="Here's how the challenge was innovatively addressed..."
        imageUrl="/images/web.png"
      >
        {/* Any additional child content you want to place inside the CaseStudyDescription component */}
      </CaseStudyDescription>
    </div>


</div>
    </>
    )
}