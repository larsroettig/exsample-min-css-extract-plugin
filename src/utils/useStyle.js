

const useStyle = (defaultClasses, propsClasses) => {
    return propsClasses ? { ...defaultClasses, ...propsClasses } : defaultClasses;
}


export default useStyle;
