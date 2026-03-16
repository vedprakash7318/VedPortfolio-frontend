import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, name = 'Erved Prakash', type = 'website', image = 'https://ervedprakash.in/preview.png' }) => {
  const socialProfiles = [
    "https://github.com/vedprakash7318",
    "https://www.linkedin.com/in/vedprakashvp/",
    "https://www.instagram.com/erved_prakash",
    "https://www.facebook.com/share/1AxaipLsx9/"
  ];

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords ? `${keywords}, ved prakash, ved prakash full stack developer, ved prakash mern developer` : `ved prakash, ved prakash full stack developer, ved prakash mern developer, Erved Prakash, software developer, MERN stack developer, full stack developer`} />
      <meta name='author' content={name} />

      {/* Open Graph tags */}
      <meta property='og:type' content={type} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
      <meta property='og:url' content={window.location.href} />
      {socialProfiles.map((profile, index) => (
        <meta key={index} property="og:see_also" content={profile} />
      ))}

      {/* Twitter tags */}
      <meta name='twitter:creator' content='@erved_prakash' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />
    </Helmet>
  );
};

export default SEO;
