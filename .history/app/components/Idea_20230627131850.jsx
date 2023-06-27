import Image from "next/image";
import TabsPage from "../Tabs/page";
 // Import custom Tabs component

export default function IdeaToCompanySection() {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row">
        {/* Video Section */}
        <div className="md:w-1/2 flex items-center justify-center">
          {/* Replace the video URL with your own */}
          <video
            src="/path/to/video.mp4"
            className="w-full h-auto"
            controls
          ></video>
        </div>

        {/* Content Section */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <div className="mx-auto md:ml-8">
            {/* Logo and Section Title */}
            <div className="flex items-center mb-6">
              <Image
                src="/images/funding.png"
                alt="Bloop Global"
                width={500}
                height={250}
              />
              <h2 className="text-4xl font-bold text-gray-800 md:ml-8">
                Idea To Company:<br />
                Turning Ideas into Successful Businesses
              </h2>
            </div>

            {/* Section Description */}
            <p className="text-lg text-gray-600 mb-8">
              At Bloop Global, we partner with top talent to invest in, build,
              and grow successful companies. Our mission is to tackle big
              societal problems, create products that people love, and build
              businesses that can compete with the biggest names in the world.
            </p>

            {/* Tabs */}
            <Tabs>
              {/* "How we do it" Tab Content */}
              <div label="How we do it">
                {/* Add content for "How we do it" tab */}
                <p>Content for "How we do it" tab goes here.</p>
              </div>

              {/* "Those we have helped" Tab Content */}
              <div label="Those we have helped">
                {/* Add content for "Those we have helped" tab */}
                <p>Content for "Those we have helped" tab goes here.</p>
              </div>
           <TabsPage/>
          </div>
        </div>
      </div>
    </div>
  );
}
