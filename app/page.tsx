import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Services from "@/components/sections/Services";
import ClinicVideo from "@/components/sections/ClinicVideo";
import Doctors from "@/components/sections/Doctors";
import InquiryForm from "@/components/sections/InquiryForm";
import WhyUs from "@/components/sections/WhyUs";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import ScrollTop from "@/components/sections/ScrollTop";

export const metadata: Metadata = {
  title: "Dentica – An Advanced Oral Care Centre | Bhubaneswar",
  description:
    "Expert dental care by MDS specialists in Bhubaneswar, Odisha. Root canal by Dr. Sambarta Das, braces by Dr. Anand Garabadu. Book your appointment today.",
};

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustBar />
      <Services />
      <ClinicVideo />
      <Doctors />
      <InquiryForm />
      <WhyUs />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <ScrollTop />
    </>
  );
}
