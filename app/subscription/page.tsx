import { Suspense } from "react";
import SubscriptionTabs from "@/components/SubscriptionTabs";
import Benefit from "@/components/Benefit";
import BenefitTab from "@/components/BenefitTab";
import CardTab from "@/components/CardTab";

function TabContent({ tab }: { tab: string }) {
  if (tab === "benefit") return <BenefitTab />;
  if (tab === "card") return <CardTab />;
  return <Benefit bg="/images/bg_white_benefit.png" />;
}

export default async function SubscriptionPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const { tab = "service" } = await searchParams;

  return (
    <>
      <section className="relative h-[720px]">
        <video src="https://static.lge.co.kr/kr/caresolutions/images/care-service-kv-pc.mp4" autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover object-center" />
      </section>

      <Suspense>
        <SubscriptionTabs />
      </Suspense>

      <TabContent tab={tab} />
    </>
  );
}
