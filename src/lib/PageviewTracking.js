import React from "react";
import { useMatomo } from "@datapunt/matomo-tracker-react";
import { useRouter } from "found";

export default ({ children }) => {
  const { trackPageView, enableLinkTracking } = useMatomo();
  const { router } = useRouter();

  React.useEffect(() => {
    trackPageView();

    router.addNavigationListener((location) => {
      trackPageView();
    });
  }, []);

  enableLinkTracking();

  return <React.Fragment>{children}</React.Fragment>;
};
