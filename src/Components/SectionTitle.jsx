import PropTypes from 'prop-types';
const SectionTitle = ({title, para}) => {
    return (
        <div className="text-center mt-12 lg:mt-32">
        <h1 className="text-4xl font-extrabold mt-6 font-play">{title}</h1>
        <p className="leading-7 opacity-80 mt-6 lg:w-2/3 mx-auto border-b-2  border-dashed md:mb-16 mb-8 md:pb-8 pb-6">{para}</p>
      </div>
    );
};
SectionTitle.propTypes = {
    title: PropTypes.string,
    para: PropTypes.string
  };
export default SectionTitle;