import { useEffect, useState } from "react";

export default function TrackingScripts() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;

    const appendHtml = (html, target) => {
      if (!html?.trim() || !target) return;

      const container = document.createElement("div");
      container.innerHTML = html;

      Array.from(container.childNodes).forEach((node) => {
        if (node.nodeName === "SCRIPT") {
          const sc = document.createElement("script");

          Array.from(node.attributes).forEach((a) => {
            sc.setAttribute(a.name, a.value);
          });

          if (node.src) {
            sc.src = node.src;
          } else {
            sc.textContent = node.textContent;
          }

          target.appendChild(sc);
          return;
        }

        target.appendChild(node.cloneNode(true));
      });
    };

    fetch(`${import.meta.env.VITE_BACKEND_URL_API}/settings/site`)
      .then(r => r.json())
      .then(s => {
        // 1. Google Analytics (GA4)
        if (s.ga_tracking_id?.trim()) {
          const sc = document.createElement("script");
          sc.async = true;
          sc.src = `https://www.googletagmanager.com/gtag/js?id=${s.ga_tracking_id}`;
          document.head.appendChild(sc);
          window.dataLayer = window.dataLayer || [];
          window.gtag = function() { window.dataLayer.push(arguments); };
          window.gtag("js", new Date());
          window.gtag("config", s.ga_tracking_id);
        }

        // 2. Google Tag Manager
        if (s.gtm_id?.trim()) {
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer',s.gtm_id);
          // Also inject noscript iframe into body
          const ns = document.createElement("noscript");
          const iframe = document.createElement("iframe");
          iframe.src = `https://www.googletagmanager.com/ns.html?id=${s.gtm_id}`;
          iframe.height = "0"; iframe.width = "0";
          iframe.style.display = "none"; iframe.style.visibility = "hidden";
          ns.appendChild(iframe);
          document.body.insertBefore(ns, document.body.firstChild);
        }

        // 3. Facebook Pixel
        if (s.fb_pixel_id?.trim()) {
          !function(f,b,e,v,n,t,sc) {
            if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;sc=b.getElementsByTagName(e)[0];
            sc.parentNode.insertBefore(t,sc)
          }(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");
          window.fbq("init", s.fb_pixel_id);
          window.fbq("track", "PageView");
        }

        // 4. TikTok Pixel
        if (s.tiktok_pixel_id?.trim()) {
          !function(w,d,t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
            ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
            ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
            for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
            ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
            ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
            ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;
            ttq._o=ttq._o||{};ttq._o[e]=n||{};
            var o=d.createElement("script");o.type="text/javascript";o.async=!0;o.src=i+"?sdkid="+e+"&lib="+t;
            var a=d.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
            ttq.load(s.tiktok_pixel_id);
            ttq.page();
          }(window,document,"ttq");
        }

        // 5. Custom Head Scripts
        appendHtml(s.custom_head_scripts, document.head);
        appendHtml(s.custom_footer_scripts, document.body);

        setLoaded(true);
      })
      .catch(() => {});
  }, [loaded]);

  return null;
}
