"use client";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

const PIXEL = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const GA = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/** Loads Meta Pixel / GA4 only when real IDs are configured, and fires PageView on route changes. */
export default function Analytics() {
  const pathname = usePathname();
  useEffect(() => { track("PageView", { path: pathname }); }, [pathname]);
  return (
    <>
      {PIXEL && (
        <Script id="meta-pixel" strategy="afterInteractive">{`
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL}');`}</Script>
      )}
      {GA && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA}',{send_page_view:false});`}</Script>
        </>
      )}
    </>
  );
}
