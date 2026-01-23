import { Helmet } from "react-helmet-async";
import "./SEO.css";

const SEO = ({
  title = "General montesorri academy",
  description = "A modern starter school focused on excellence and growth.",
  keywords = "school, education, learning",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
};

export default SEO;
