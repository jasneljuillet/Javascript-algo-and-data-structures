import React from "react";
import Navbar from "@/components/_App/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import ForgotPasswordForm from "@/components/Authentication/ForgotPasswordForm";
import Footer from "@/components/_App/Footer";

export default function ForgotPasswordPage() {
  return (
    <>
      <Navbar user={user} />

      <PageBanner
        pageTitle="Mot de passe oublié"
        homePageUrl="/"
        homePageText="Acceuil"
        activePageText="Mot de passe oublié"
      />

      <ForgotPasswordForm />

      <Footer />
    </>
  );
}
