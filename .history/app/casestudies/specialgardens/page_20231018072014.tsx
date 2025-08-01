import CaseStudyHero from "../components/CaseStudyHero"
import CaseStudyDescription from "../components/CaseStudyDescription"
export default function Myco (){
    return (
    <>
    <div className="">
    <CaseStudyHero 
    title="Helping Special Homes Drive 300% More Leads With A Custom Website" 
    subtitle="Bringing Sustainable Luxury Living to Ghana" 
    imageUrl="/images/specialhomes.png" 
    buttonText="Explore the Project"
/>





    <div className="container mx-auto p-4">
    <CaseStudyDescription
        title="Special Homes is a pioneering residential community in Ghana"
        description="Special Homes is a pioneering residential community in Ghana, offering luxurious suburban living with sustainable features like backyard gardens.."
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