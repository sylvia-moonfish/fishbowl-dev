import { styled } from "@mui/material/styles";

import * as React from "react";

import SiteInfo from "/data/site-info";
import { generateHead, generatePreviewImage } from "/src/utility";

export default function BisGuide(props) {
  const FullscreenIframeComponent = styled("iframe")({
    border: "none",
    position: "fixed",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  });

  return (
    <React.Fragment>
      {generateHead(
        `5.2 BiS 가이드 | ${SiteInfo.siteTitle}`,
        "파이널 판타지 14 패치 5.2 BiS 가이드"
      )}
      {generatePreviewImage(
        "https://platy.vercel.app/patch-banners/shb/5.2.jpg"
      )}
      <FullscreenIframeComponent src="https://fishbowl-legacy.vercel.app/5.2/guide/bis-guide"></FullscreenIframeComponent>
    </React.Fragment>
  );
}
