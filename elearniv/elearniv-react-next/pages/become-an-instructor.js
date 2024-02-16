import React, { useEffect } from "react";
import Navbar from "@/components/_App/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import SubscribeForm from "@/components/Common/SubscribeForm";
import FunFactsThree from "@/components/Common/FunFactsThree";
import ApplyAsInstructor from "@/components/BecomeAInstructor/ApplyAsInstructor";
import RegisterForm from "@/components/BecomeAInstructor/RegisterForm";
import Footer from "@/components/_App/Footer";
import { useRouter } from "next/router";

export default function BecomeAInstructorPage({ user }) {
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/authentication");
    }
  }, []);

  return (
    <>
      <Navbar user={user} />

      <PageBanner
        pageTitle="Devenir instructeur"
        homePageUrl="/"
        homePageText="Acceuil"
        activePageText="Devenir instructeur"
      />

      <RegisterForm user={user} />

      <ApplyAsInstructor />

      <div className="pb-100">
        <FunFactsThree />
      </div>

      <SubscribeForm />

      <Footer />
    </>
  );
}
