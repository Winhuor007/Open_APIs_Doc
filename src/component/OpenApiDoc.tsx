// OpenApiDoc.tsx
import { API } from "@stoplight/elements";
import "@stoplight/elements/styles.min.css";
import "../styles/customize-stoplight.css";

export default function OpenApiDoc() {
  return (
    <div id="openapi-docs" className="w-full h-screen overflow-hidden">
      <div className="stoplight-container w-full h-full overflow-y-auto overflow-x-hidden relative">
        <API
          apiDescriptionUrl="/openapi.yaml"
          router="hash"
          layout="responsive"
          hideSchemas
          tryItCredentialsPolicy="include"
          logo="https://th.bing.com/th/id/OIP.UoNYMWK4IXfd_oK0haIuOAHaHa?w=177&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1"
        />
      </div>
    </div>
  );
}
