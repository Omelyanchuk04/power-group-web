import React from "react";
import styles from "./about.module.scss";
import Link from "next/link";
import AboutHero from "./components/AboutHero";
import AboutExperience from "./components/AboutExperience";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutExperience />
    </>
  );
}
