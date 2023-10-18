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
        
        challenge="
        Special Homes needed a website to showcase their luxury residential community as the first in Ghana with unique sustainable living features like backyard gardens. However, they lacked an online presence to attract prospective home buyers.


        "
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