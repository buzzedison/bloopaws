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



h

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
        results={[
        "Cut website load time in half for a 300% speed improvement",
        "Increased organic traffic 2X in just 3 months after launch.",
        "Improved Google search ranking for relevant keywords.",
        "Greater brand awareness and customer satisfaction",
     
    ]}
      </CaseStudyDescription>
    </div>


</div>
    </>
    )
}