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
          { text: "Visit Website", url: "https://specialhomesltd.com/" },
          { text: "Request a Quote", url: "https://www.bloopglobal.com.com/contact" }
        ]}
        
        challenge="
        Special Homes needed a website to showcase their luxury residential community as the first in Ghana with unique sustainable living features like backyard gardens. However, they lacked an online presence to attract prospective home buyers.


        "
        solution="We built an elegant, user-friendly website that reflected Special Homes' commitment to a luxurious yet sustainable lifestyle."
        imageUrl="/images/special2.png"
        
        results={[
          "Over 300% increase in customer inquiries in 6 months.",
          "Website now primary driver of sales leads.",
          "Improved Google search ranking for relevant keywords.",
          "Faster response to leads with online contact forms.",
          "Positive feedback on user experience from site visitors."
      ]}
      >
        {/* Any additional child content you want to place inside the CaseStudyDescription component */}
      </CaseStudyDescription>
    </div>


</div>
    </>
    )
}