import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function AboutPage() {
  const faqs = [
    {
      question: "How do I search for properties?",
      answer:
        "You can search for properties using our search bar at the top of the page. Filter by location, price range, number of bedrooms, and more to find your perfect property.",
    },
    {
      question: "How do I contact a property owner or agent?",
      answer:
        "Each property listing has contact information for the agent or owner. You can reach out via phone, email, or use the contact form on the property details page.",
    },
    {
      question: "Can I list my own property for sale or rent?",
      answer:
        "Yes! Create an account, go to your profile, and select 'My Listings' to add a new property. You can upload photos, add details, and set your price.",
    },
    {
      question: "Are there any fees for using this platform?",
      answer:
        "Basic property browsing is free for all users. Sellers may have listing fees depending on the package selected. Check our pricing page for more details.",
    },
    {
      question: "How accurate are the price predictions?",
      answer:
        "Our price predictions use advanced algorithms and historical data to provide estimates. While we strive for accuracy, they should be used as a guide rather than a guarantee.",
    },
    {
      question: "Can I save properties to view later?",
      answer:
        "Yes, you can save properties to your favorites by clicking the heart icon on any property card. View your saved properties in your user profile.",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-16 space-y-16">
      {/* About Us Section */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-bold">About RealEstate</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 mb-12">
          Connecting buyers and sellers for over a decade with trusted property listings and market insights.
        </p>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 text-left">
            <h2 className="text-3xl font-semibold">Our Mission</h2>
            <p className="text-gray-600">
              At RealEstate, we believe everyone deserves to find their perfect home. Our mission is to simplify the
              property search process and provide transparent, accurate information to help you make informed decisions.
            </p>
            <p className="text-gray-600">
              We're committed to innovation, using cutting-edge technology to provide price predictions, market
              analytics, and a seamless user experience for both buyers and sellers.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image src="/images/placeholder.svg" alt="Our team" width={600} height={400} className="w-full max-w-lg object-cover" />
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="text-center space-y-6">
        <h2 className="text-4xl font-bold my-12">Our Team</h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Meet the dedicated professionals working to make your property journey a success.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 my-12">
          {[
            {
              name: "Sarah Johnson",
              role: "CEO & Founder",
              image: "/images/placeholder.svg",
              bio: "With over 15 years in real estate, Sarah founded RealEstate to transform how people find homes.",
            },
            {
              name: "Michael Chen",
              role: "Head of Property Listings",
              image: "/images/placeholder.svg",
              bio: "Michael ensures all property listings meet our quality standards and helps sellers showcase their properties.",
            },
            {
              name: "Jessica Williams",
              role: "Lead Data Scientist",
              image: "/images/placeholder.svg",
              bio: "Jessica develops our price prediction algorithms and market analysis tools to provide accurate insights.",
            },
          ].map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center space-y-4">
              <Image src={member.image} alt={member.name} width={150} height={150} className="mx-auto rounded-full" />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
              <p className="text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="text-center space-y-6 mt-28">
        <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Find answers to common questions about using our platform.
        </p>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b py-4">
                <AccordionTrigger className="text-lg font-semibold text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
