import PricingEstimator from "../../components/pricing/pricing-estimator";

export const metadata = {
  title: "Pricing",
  description:
    "Estimate construction pricing for residential and commercial projects with Capital Engineering Ceylon.",
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingPage() {
  return <PricingEstimator />;
}
