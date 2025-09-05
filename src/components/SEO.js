import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SEO = ({ title, description }) => (
  <Helmet>
    <title>{title}</title>
    {description && <meta name="description" content={description} />}
  </Helmet>
);

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default SEO; 