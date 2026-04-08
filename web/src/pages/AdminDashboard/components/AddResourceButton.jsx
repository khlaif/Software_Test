const AddResourceButton = ({
    onClick,
    label = "إضافة قسم / جهاز",
    className = "",
}) => {
    return (
        <button
            className={`add-department-btn ${className}`.trim()}
            type="button"
            onClick={onClick}
        >
            <span>{label}</span>
        </button>
    );
};

export default AddResourceButton;