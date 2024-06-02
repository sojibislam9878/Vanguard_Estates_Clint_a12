import PropTypes from 'prop-types';
const SectionTitle = ({title, para}) => {
    return (
        <div className="text-center">
        <h1 className="text-4xl font-extrabold mt-6 font-play">{title}</h1>
        <p className="leading-7 opacity-80 mt-6 lg:w-2/3 mx-auto">{para}</p>
      </div>
    );
};
SectionTitle.propTypes = {
    title: PropTypes.string,
    para: PropTypes.string
  };
export default SectionTitle;